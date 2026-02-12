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

環境変数は [dotenvx](https://dotenvx.com/) で暗号化管理しています。

```bash
# 1. .env.example をコピー
cp .env.example .env

# 2. .env に実際の値を記入
vi .env

# 3. 暗号化（.env.keys に復号鍵が生成される）
npx dotenvx encrypt

# 4. .env をコミット（暗号化済みなので安全）
git add .env
```

| ファイル | 用途 | コミット |
| --- | --- | --- |
| `.env` | 暗号化された環境変数 | する |
| `.env.keys` | 復号用の秘密鍵 | **しない** |
| `.env.example` | テンプレート | する |

> `.env.keys` の `DOTENV_PRIVATE_KEY` をローカルの環境変数またはCI/CDのシークレットに設定してください。

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
