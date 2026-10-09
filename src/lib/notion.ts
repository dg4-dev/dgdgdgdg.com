import {
  Client,
  ClientErrorCode,
  isFullBlock,
  isFullPage,
  isNotionClientError,
  type BlockObjectResponse,
} from '@notionhq/client';
import { withCache } from './notion-cache';
import { hasExpiredUnsavedFile } from './notion-images';
import type { Work } from './works';

// Notion クライアントの初期化
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// データソースIDの取得
export const dataSourceId = import.meta.env.NOTION_DATASOURCE_ID;

/** 子ブロックを children に入れたブロック */
export type NotionBlock = BlockObjectResponse & { children?: NotionBlock[] };

// キャッシュに期限切れのファイルURLがあり、その画像がまだ保存されていなければ取り直す
const cacheOptions = { isValid: (data: unknown) => !hasExpiredUnsavedFile(data) };

// Notion API の回数制限（平均で毎秒 3 回ほど）に当たらないよう、同時に送るリクエストを絞る
const MAX_CONCURRENT_REQUESTS = 3;
let activeRequests = 0;
const waitingRequests: (() => void)[] = [];

// 時間切れ・回数制限・Notion 側の不具合は一時的なことが多いので、間をあけて送り直す
// （@notionhq/client は自分では送り直さず、1 回失敗するとビルド全体が止まるため）
const RETRY_DELAYS_MS = [1000, 2000, 4000];

/** 送り直す失敗なら、その理由を返す。送り直しても変わらない失敗（401・404 など）なら null */
function retryReason(error: unknown): string | null {
  if (!isNotionClientError(error)) return null;
  if (error.code === ClientErrorCode.RequestTimeout) return '時間切れ';
  if ('status' in error && (error.status === 429 || error.status >= 500)) return `HTTP ${error.status}`;
  return null;
}

/** 429 の Retry-After（秒）をミリ秒にする。なければ null */
function retryAfterMs(error: unknown): number | null {
  if (!isNotionClientError(error) || !('headers' in error) || !(error.headers instanceof Headers)) return null;
  const seconds = Number(error.headers.get('retry-after'));
  return seconds > 0 ? seconds * 1000 : null;
}

async function withRetry<T>(request: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await request();
    } catch (error) {
      const reason = retryReason(error);
      if (!reason || attempt >= RETRY_DELAYS_MS.length) throw error;
      const delay = retryAfterMs(error) ?? RETRY_DELAYS_MS[attempt];
      console.warn(`[notion] ${delay / 1000} 秒後に送り直します（${attempt + 1} 回目。理由: ${reason}）`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function withRequestLimit<T>(request: () => Promise<T>): Promise<T> {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests++;
  } else {
    // 前のリクエストが終わると、その枠をそのまま受け取る
    await new Promise<void>((resolve) => waitingRequests.push(resolve));
  }
  try {
    // 送り直しを待つ間も枠を持ったままにし、回数制限のときにほかのリクエストも控える
    return await withRetry(request);
  } finally {
    const next = waitingRequests.shift();
    if (next) next();
    else activeRequests--;
  }
}

// Notionデータベースからデータを取得（全件・キャッシュ付き）
// 1回の取得は最大100件なので、has_more / next_cursor でページ送りする
export async function getNotionData(): Promise<{ results: Work[] }> {
  return withCache(
    'notionData',
    async () => {
      try {
        const results: Work[] = [];
        let startCursor: string | undefined;

        do {
          const response = await withRequestLimit(() =>
            notion.dataSources.query({
              data_source_id: dataSourceId,
              page_size: 100,
              ...(startCursor ? { start_cursor: startCursor } : {}),
            }),
          );
          results.push(...response.results.filter(isFullPage));
          startCursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
        } while (startCursor);

        return { results };
      } catch (error) {
        console.error('Notion API Error:', error);
        throw error;
      }
    },
    cacheOptions,
  );
}

// ブロックを再帰的に取得（子ブロックを含む・ページネーション対応・キャッシュ付き）
export async function getNotionBlocksRecursive(blockId: string): Promise<NotionBlock[]> {
  return withCache(
    `notionBlocksRecursive:${blockId}`,
    async () => {
      try {
        const results: BlockObjectResponse[] = [];
        let startCursor: string | undefined;

        do {
          const response = await withRequestLimit(() =>
            notion.blocks.children.list({
              block_id: blockId,
              page_size: 100,
              ...(startCursor ? { start_cursor: startCursor } : {}),
            }),
          );
          results.push(...response.results.filter(isFullBlock));
          startCursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
        } while (startCursor);

        // 各ブロックに対して、子ブロックがある場合は再帰的に取得
        const blocksWithChildren = await Promise.all(
          results.map(async (block): Promise<NotionBlock> => {
            // 同期ブロックの複製は、中身を元のブロックから取る（元のページに権限がなければ複製側から取る）
            const syncedFromId = block.type === 'synced_block' ? block.synced_block.synced_from?.block_id : undefined;
            if (syncedFromId) {
              const children = await getNotionBlocksRecursive(syncedFromId).catch(() =>
                block.has_children ? getNotionBlocksRecursive(block.id) : [],
              );
              return { ...block, children };
            }
            if (block.has_children) {
              const children = await getNotionBlocksRecursive(block.id);
              return { ...block, children };
            }
            return block;
          }),
        );

        return blocksWithChildren;
      } catch (error) {
        console.error('Notion Blocks Recursive Error:', error);
        throw error;
      }
    },
    cacheOptions,
  );
}
