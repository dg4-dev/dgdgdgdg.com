import { Client } from '@notionhq/client';
import { withCache } from './notion-cache';
import { hasExpiredUnsavedFile } from './notion-images';

// Notion クライアントの初期化
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// データソースIDの取得
export const dataSourceId = import.meta.env.NOTION_DATASOURCE_ID;

// キャッシュに期限切れのファイルURLがあり、その画像がまだ保存されていなければ取り直す
const cacheOptions = { isValid: (data: unknown) => !hasExpiredUnsavedFile(data) };

// Notionデータベースからデータを取得（全件・キャッシュ付き）
// 1回の取得は最大100件なので、has_more / next_cursor でページ送りする
export async function getNotionData() {
  return withCache(
    'notionData',
    async () => {
      try {
        const results: any[] = [];
        let startCursor: string | undefined;
        let response: any;

        do {
          response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            page_size: 100,
            ...(startCursor ? { start_cursor: startCursor } : {}),
          });
          results.push(...(response.results ?? []));
          startCursor = response.has_more ? response.next_cursor : undefined;
        } while (startCursor);

        return { ...response, results, has_more: false, next_cursor: null };
      } catch (error) {
        console.error('Notion API Error:', error);
        throw error;
      }
    },
    cacheOptions,
  );
}

// 個別ページの詳細を取得（キャッシュ付き）
export async function getNotionPage(pageId: string) {
  return withCache(
    `notionPage:${pageId}`,
    async () => {
      try {
        const page = await notion.pages.retrieve({ page_id: pageId });
        return page;
      } catch (error) {
        console.error('Notion Page Retrieve Error:', error);
        throw error;
      }
    },
    cacheOptions,
  );
}

// ページのブロック（コンテンツ）を取得（キャッシュ付き）
export async function getNotionBlocks(pageId: string) {
  return withCache(`notionBlocks:${pageId}`, async () => {
    try {
      const blocks = await notion.blocks.children.list({
        block_id: pageId,
      });
      return blocks;
    } catch (error) {
      console.error('Notion Blocks List Error:', error);
      throw error;
    }
  });
}

// ブロックを再帰的に取得（子ブロックを含む・ページネーション対応・キャッシュ付き）
export async function getNotionBlocksRecursive(blockId: string): Promise<any[]> {
  return withCache(
    `notionBlocksRecursive:${blockId}`,
    async () => {
      try {
        const results: any[] = [];
        let startCursor: string | undefined;

        do {
          const response: any = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 100,
            ...(startCursor ? { start_cursor: startCursor } : {}),
          });
          results.push(...(response.results ?? []));
          startCursor = response.has_more ? response.next_cursor : undefined;
        } while (startCursor);

        // 各ブロックに対して、子ブロックがある場合は再帰的に取得
        const blocksWithChildren = await Promise.all(
          results.map(async (block: any) => {
            // 同期ブロックの複製は、中身を元のブロックから取る（元のページに権限がなければ複製側から取る）
            const syncedFromId = block.type === 'synced_block' ? block.synced_block?.synced_from?.block_id : undefined;
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

// カスタムIDからページを検索する関数
export async function findPageByCustomId(customId: string) {
  try {
    // データソースから全データを取得（getNotionData内でキャッシュされる）
    const response = await getNotionData();

    // カスタムIDがマッチするページを検索
    const page = response.results.find((item: any) => {
      const pageCustomId = item.properties?.id?.rich_text?.[0]?.plain_text;
      return pageCustomId === customId;
    });

    if (!page) {
      throw new Error(`Page with custom id "${customId}" not found`);
    }

    return page;
  } catch (error) {
    console.error('Find Page By Custom ID Error:', error);
    throw error;
  }
}
