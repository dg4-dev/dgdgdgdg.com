import { Client } from '@notionhq/client';

// Notion クライアントの初期化
export const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// データソースIDの取得
export const dataSourceId = import.meta.env.NOTION_DATASOURCE_ID;

// Notionデータベースからデータを取得
export async function getNotionData() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
    });
    return response;
  } catch (error) {
    console.error('Notion API Error:', error);
    throw error;
  }
}
