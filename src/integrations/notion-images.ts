import type { AstroIntegration } from 'astro';
import { cpSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { clearManifest, getUsedFiles } from '../lib/notion-images';

/**
 * ビルド中に public/notion-images/ にダウンロードされた画像を
 * dist/ 出力ディレクトリにコピーする Astro Integration。
 *
 * Astro は public/ → dist/ のコピーをビルド開始時に行うため、
 * ページレンダリング中にダウンロードされた画像は自動ではコピーされない。
 *
 * ビルド完了後、今回使われなかったファイルだけを削除する（未使用ファイルの掃除）。
 */
export function notionImages(): AstroIntegration {
  return {
    name: 'notion-images',
    hooks: {
      'astro:build:start': () => {
        // 前回のマニフェストをリセット（画像ファイルは消さない）
        clearManifest();
      },
      'astro:build:done': ({ dir }) => {
        const src = join(process.cwd(), 'public', 'notion-images');
        const dest = join(dir.pathname, 'notion-images');

        if (!existsSync(src)) {
          console.log('[notion-images] No downloaded images found, skipping copy.');
          return;
        }

        // 今回のビルドで使われたファイル一覧をマニフェストから取得
        const usedFiles = getUsedFiles();

        // マニフェスト自体を削除（dist にコピーしない）
        clearManifest();

        // dist/ にコピー
        cpSync(src, dest, { recursive: true });
        console.log(`[notion-images] Copied notion-images to build output.`);

        // 今回のビルドで使われなかったファイルを掃除
        const allFiles = readdirSync(src).filter((f) => !f.startsWith('.'));
        const unused = allFiles.filter((f) => !usedFiles.has(f));

        for (const file of unused) {
          unlinkSync(join(src, file));
          const destFile = join(dest, file);
          if (existsSync(destFile)) {
            unlinkSync(destFile);
          }
        }

        if (unused.length > 0) {
          console.log(`[notion-images] Removed ${unused.length} unused file(s): ${unused.join(', ')}`);
        }
      },
    },
  };
}
