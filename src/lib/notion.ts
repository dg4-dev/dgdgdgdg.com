import { Client, isFullBlock, isFullPage, type BlockObjectResponse } from '@notionhq/client';
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

async function withRequestLimit<T>(request: () => Promise<T>): Promise<T> {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests++;
  } else {
    // 前のリクエストが終わると、その枠をそのまま受け取る
    await new Promise<void>((resolve) => waitingRequests.push(resolve));
  }
  try {
    return await request();
  } finally {
    const next = waitingRequests.shift();
    if (next) next();
    else activeRequests--;
  }
}

// 作品の一覧（ビルドの中ではメモリに残して使い回す）
let notionDataPromise: Promise<{ results: Work[] }> | undefined;

// Notionデータベースからデータを取得（全件）
// 一覧は Notion で変えた内容を次のビルドに必ず反映するため、ファイルにはキャッシュせず、ビルドのたびに取り直す
// 同じビルド（同じプロセス）の中では、最初に取ったものをほかのページでも使う
export function getNotionData(): Promise<{ results: Work[] }> {
  notionDataPromise ??= fetchNotionData().catch((error) => {
    // 失敗したものは残さず、次に呼ばれたときに取り直す（開発サーバーで一度失敗しても止まらないように）
    notionDataPromise = undefined;
    throw error;
  });
  return notionDataPromise;
}

// 1回の取得は最大100件なので、has_more / next_cursor でページ送りする
async function fetchNotionData(): Promise<{ results: Work[] }> {
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
}

/**
 * 作品のページの本文（子ブロックも含む）を取得する（キャッシュ付き）。
 * キャッシュのキーにページの最終更新日時を入れ、Notion で本文を変えたら取り直す。
 * ほかのページにある同期ブロックの元を変えても最終更新日時は変わらないので、その分は有効期限（既定 24 時間）で取り直す
 */
export async function getArticleBlocks(work: Work): Promise<NotionBlock[]> {
  return withCache(
    `articleBlocks:${work.id}:${work.last_edited_time}`,
    async () => {
      try {
        return await fetchBlocksRecursive(work.id);
      } catch (error) {
        console.error('Notion Blocks Recursive Error:', error);
        throw error;
      }
    },
    cacheOptions,
  );
}

// ブロックを再帰的に取得（子ブロックを含む・ページネーション対応）
async function fetchBlocksRecursive(blockId: string): Promise<NotionBlock[]> {
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
  return Promise.all(
    results.map(async (block): Promise<NotionBlock> => {
      // 同期ブロックの複製は、中身を元のブロックから取る（元のページに権限がなければ複製側から取る）
      const syncedFromId = block.type === 'synced_block' ? block.synced_block.synced_from?.block_id : undefined;
      if (syncedFromId) {
        const children = await fetchBlocksRecursive(syncedFromId).catch(() =>
          block.has_children ? fetchBlocksRecursive(block.id) : [],
        );
        return { ...block, children };
      }
      if (block.has_children) {
        const children = await fetchBlocksRecursive(block.id);
        return { ...block, children };
      }
      return block;
    }),
  );
}
