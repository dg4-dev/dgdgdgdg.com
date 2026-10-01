/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_API_KEY: string;
  readonly NOTION_DATASOURCE_ID: string;
  readonly GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Works 一覧の絞り込みに使うカテゴリ（src/pages/works/index.astro で入れ、ヘッダーで読む） */
  __CATEGORIES_DATA__?: string[];
}
