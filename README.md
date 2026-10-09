<div align="center">

# dgdgdgdg.com

**https://dgdgdgdg.com**

<img src="public/images/ogp.jpg" alt="dgdgdgdg.com Banner" width="100%">

<br>

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![Sass](https://img.shields.io/badge/Sass-C69?style=for-the-badge&logo=sass&logoColor=fff)
![Notion](https://img.shields.io/badge/Notion_API-000?style=for-the-badge&logo=notion&logoColor=fff)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=fff)
![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge&logo=bun&logoColor=fff)

<br>

**English** | [日本語](README.ja.md)

</div>

---

## 🚀 About

This is the source code for **dgdgdgdg.com**, a personal website built with Astro and Cloudflare Pages. It leverages the Notion API for content management, providing a dynamic and easily updatable site.

## ⚡ Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (latest version)

### Installation & Run

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## 🔐 Environment Variables

Managed via [dotenvx](https://dotenvx.com/).

```bash
# 1. Copy template
cp .env.example .env

# 2. Edit .env with real values
vi .env

# 3. Encrypt (generates .env.keys)
npx dotenvx encrypt
```

> [!IMPORTANT]
> Set `DOTENV_PRIVATE_KEY` from `.env.keys` in your local environment or CI/CD secrets.

## 🛠 Project Structure

```bash
src/
├── components/    # Reusable UI components
├── data/          # Typeface list (source of the Typefaces page)
├── layouts/       # Page layouts
├── lib/           # Utilities & Notion API client
├── pages/         # File-based routing
└── styles/        # Global styles (Sass)
```

## 🔤 Adding a Typeface

The Typefaces page (`/typefaces`) fetches each font file and LICENSE from the latest release of its public GitHub repository at build time. The site-wide atomic dot and wave live fonts use the same fetched files.
Family name, version, variable axes and glyphs are read from the font file itself, so adding a typeface only takes one entry in `src/data/typefaces.ts`.

The version shown prefers the latest GitHub release, then the newest version tag (e.g. `v1.2.3`), then the version written in the font file.
Unauthenticated GitHub API calls are limited to 60 per hour, so setting `GITHUB_TOKEN` (read-only access to public repositories) in the build environment is recommended.
If the token is invalid (401), the API is called again without it. If the API still fails (for example, because of the rate limit), the version is taken from the repository's tag list via git (`info/refs`), which the API rate limit does not apply to. The reason for each failure is printed in the build log as `[typefaces] ...`.

```ts
{
  slug: 'new-font',              // URL (/typefaces/new-font)
  repo: 'dg4-dev/new-font',      // GitHub repository
  ref: 'main',                   // branch used when the latest release can't be found
  fontPath: 'new-font.ttf',      // font file in the repository
  licensePath: 'LICENSE',        // license file in the repository (optional)
  year: 2026,
  description: ['Introduction of the typeface (one paragraph per item)'],
  // presets: [...]              // style samples (optional; defaults to the font's named instances)
},
```

## 📜 Scripts

| Command                         | Description                                    |
| :------------------------------ | :--------------------------------------------- |
| `bun run dev`                   | Start development server                       |
| `bun run build`                 | Build for production                           |
| `bunx wrangler pages dev dist/` | Preview build with Wrangler                    |
| `bun run check`                 | Type check (`astro check`)                     |
| `bun run format`                | Format with Prettier                           |
| `bun run format:check`          | Check formatting (also runs on GitHub Actions) |

## 📮 Status Worker

The availability shown on the Contact page (`open` / `limited` / `closed`) comes from a separate Cloudflare Worker, `workers/status-worker.ts`.
`GET /status` returns the current status, and `POST /status` with `Authorization: Bearer <API_TOKEN>` and `{"status": "open"}` updates it.

```bash
# 1. Create the KV namespace (first time only) and put its id in workers/wrangler.toml
bunx wrangler kv namespace create STATUS_KV

# 2. Set the token used for updates (first time only)
bunx wrangler secret put API_TOKEN --config workers/wrangler.toml

# 3. Deploy
bunx wrangler deploy --config workers/wrangler.toml
```

Set the deployed URL (`https://<worker>.workers.dev/status`) as `PUBLIC_STATUS_ENDPOINT`.
If it is not set or the Worker can't be reached, the Contact page shows `limited`.
