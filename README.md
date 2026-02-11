<div align="center">

# dgdgdgdg.com

**https://dgdgdgdg.com**

![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff)
![Notion](https://img.shields.io/badge/Notion_API-000?logo=notion&logoColor=fff)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=fff)
![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)

</div>

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Setup

```bash
bun install
```

### Environment Variables

`.env` をプロジェクトルートに作成してください。

```env
NOTION_API_KEY=<YOUR_NOTION_API_KEY>
NOTION_DATASOURCE_ID=<YOUR_NOTION_DATASOURCE_ID>
```

### Commands

| コマンド | 説明 |
| --- | --- |
| `bun run dev` | 開発サーバーを起動 |
| `bun run build` | プロダクションビルド |
| `bun run preview` | ビルド結果をプレビュー |

---

## Project Structure

```
src/
├── components/    # 再利用可能なコンポーネント
├── layouts/       # ページレイアウト
├── lib/           # ユーティリティ・Notion API クライアント
├── pages/         # ルーティング
└── styles/        # グローバルスタイル
```
