import type { AstroIntegration } from 'astro';
import { clearCacheManifest, removeUnusedCache } from '../lib/notion-cache';

/**
 * ビルドで使わなかった Notion のキャッシュ（node_modules/.astro/notion-cache/）を消す Astro Integration。
 *
 * 作品の本文のキャッシュはキーに最終更新日時が入るので、Notion で本文を直すたびに古いファイルが残る。
 * 作品やブックマークを消したときも同じで、そのままだとビルドキャッシュにたまっていく。
 *
 * ビルドが途中で失敗したときは astro:build:done まで進まないので、何も消えない。
 */
export function notionCache(): AstroIntegration {
  return {
    name: 'notion-cache',
    hooks: {
      'astro:build:start': () => {
        // 前回の記録をリセット（キャッシュのファイルは消さない）
        clearCacheManifest();
      },
      'astro:build:done': () => {
        const unused = removeUnusedCache();
        // 記録自体は次のビルドに要らないので消す
        clearCacheManifest();
        if (unused.length > 0) {
          console.log(`[notion-cache] Removed ${unused.length} unused file(s).`);
        }
      },
    },
  };
}
