<div align="center">

# dgdgdgdg.com

**https://dgdgdgdg.com**

<img src="public/images/ogp.webp" alt="dgdgdgdg.com Banner" width="100%">

<br>

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![Sass](https://img.shields.io/badge/Sass-C69?style=for-the-badge&logo=sass&logoColor=fff)
![Notion](https://img.shields.io/badge/Notion_API-000?style=for-the-badge&logo=notion&logoColor=fff)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=fff)
![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge&logo=bun&logoColor=fff)

<br>

[English](README.md) | **日本語**

</div>

---

## 🚀 概要

Astro と Cloudflare Pages で構築された個人サイト **dgdgdgdg.com** のソースコードです。コンテンツ管理に Notion API を利用しており、動的かつ簡単に更新できるサイトを実現しています。

## ⚡ クイックスタート

### 前提条件
- [Bun](https://bun.sh/) (最新版)

### インストールと実行

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev
```

## 🔐 環境変数

[dotenvx](https://dotenvx.com/) で管理しています。

```bash
# 1. テンプレートをコピー
cp .env.example .env

# 2. .env に実際の値を設定
vi .env

# 3. 暗号化 (.env.keys が生成されます)
npx dotenvx encrypt
```

> [!IMPORTANT]
> `.env.keys` にある `DOTENV_PRIVATE_KEY` をローカル環境変数または CI/CD のシークレットに設定してください。

## 🛠 プロジェクト構成

```bash
src/
├── components/    # 再利用可能な UI コンポーネント
├── data/          # 書体一覧（Typefaces ページの掲載元）
├── layouts/       # ページレイアウト
├── lib/           # ユーティリティ・Notion API クライアント
├── pages/         # ファイルベースルーティング
└── styles/        # グローバルスタイル (Sass)
```

## 🔤 書体の追加

Typefaces ページ（`/typefaces`）は、GitHub のパブリックリポジトリの最新リリースからフォントファイルと LICENSE を build 時に取得して作っています。サイト全体で使っている atomic dot も、ここで取得したファイルを使います。
書体名・バージョン・可変軸・収録文字はフォントファイルから読み取るため、新しい書体は `src/data/typefaces.ts` に 1 件足すだけで掲載できます。

バージョンは GitHub の Latest リリースを優先し、リリースがなければ最新のバージョンタグ（`v1.2.3` など）、それもなければフォントファイルに書かれたバージョンを表示します。
GitHub API は未認証だと 1 時間 60 回までなので、build 環境では `GITHUB_TOKEN`（public リポジトリの読み取りのみ）を設定しておくと安心です。

```ts
{
  slug: 'new-font',              // URL（/typefaces/new-font）
  repo: 'dg4-dev/new-font',      // GitHub リポジトリ
  ref: 'main',                   // 最新リリースが取れないときに使うブランチ
  fontPath: 'new-font.ttf',      // リポジトリ内のフォントファイル
  licensePath: 'LICENSE',        // リポジトリ内のライセンス（任意）
  year: 2026,
  description: ['書体の紹介文（1 要素が 1 段落）'],
  // presets: [...]              // スタイル見本（任意。省略時はフォントの名前付きインスタンス）
},
```

## 📜 スクリプト

| コマンド | 説明 |
| :--- | :--- |
| `bun run dev` | 開発サーバーを起動 |
| `bun run build` | プロダクションビルド |
| `bun run preview` | ビルド結果をローカルでプレビュー |
