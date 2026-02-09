/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_API_KEY: string;
  readonly NOTION_DATASOURCE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
