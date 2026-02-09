# dgdgdgdg.com

[dgdgdgdg.com](https://dgdgdgdg.com) のソースコードです。

## Tech Stack

- [Astro](https://astro.build/)
- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Notion API](https://developers.notion.com/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Setup

```bash
bun install
```

### Environment Variables

`.env` ファイルをプロジェクトルートに作成し、以下の変数を設定してください。

```env
NOTION_API_KEY=<YOUR_NOTION_API_KEY>
NOTION_DATASOURCE_ID=<YOUR_NOTION_DATASOURCE_ID>
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Preview

```bash
bun run preview
```

## Project Structure

```
src/
├── components/    # 再利用可能なコンポーネント
├── layouts/       # ページレイアウト
├── lib/           # ユーティリティ・API クライアント
├── pages/         # ルーティング
└── styles/        # グローバルスタイル
```
