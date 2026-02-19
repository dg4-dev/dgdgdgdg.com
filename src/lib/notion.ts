import { Client } from '@notionhq/client';
import { withCache } from './notion-cache';

// Notion クライアントの初期化
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// データソースIDの取得
export const dataSourceId = import.meta.env.NOTION_DATASOURCE_ID;

// Notionデータベースからデータを取得（キャッシュ付き）
export async function getNotionData() {
  return withCache('notionData', async () => {
    try {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
      });
      return response;
    } catch (error) {
      console.error('Notion API Error:', error);
      throw error;
    }
  });
}

// 個別ページの詳細を取得（キャッシュ付き）
export async function getNotionPage(pageId: string) {
  return withCache(`notionPage:${pageId}`, async () => {
    try {
      const page = await notion.pages.retrieve({ page_id: pageId });
      return page;
    } catch (error) {
      console.error('Notion Page Retrieve Error:', error);
      throw error;
    }
  });
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
  return withCache(`notionBlocksRecursive:${blockId}`, async () => {
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
  });
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
