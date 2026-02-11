import type { AstroIntegration } from 'astro';
import { cpSync, existsSync, rmSync } from 'fs';
import { join } from 'path';

/**
 * ビルド中に public/notion-images/ にダウンロードされた画像を
 * dist/ 出力ディレクトリにコピーする Astro Integration。
 *
 * Astro は public/ → dist/ のコピーをビルド開始時に行うため、
 * ページレンダリング中にダウンロードされた画像は自動ではコピーされない。
 */
export function notionImages(): AstroIntegration {
  return {
    name: 'notion-images',
    hooks: {
      'astro:build:start': () => {
        const dir = join(process.cwd(), 'public', 'notion-images');
        if (existsSync(dir)) {
          rmSync(dir, { recursive: true });
          console.log('[notion-images] Cleaned public/notion-images/.');
        }
      },
      'astro:build:done': ({ dir }) => {
        const src = join(process.cwd(), 'public', 'notion-images');
        const dest = join(dir.pathname, 'notion-images');

        if (!existsSync(src)) {
          console.log('[notion-images] No downloaded images found, skipping copy.');
          return;
        }

        cpSync(src, dest, { recursive: true });
        console.log(`[notion-images] Copied notion-images to build output.`);
      },
    },
  };
}
