// 記事本文のブロックを描画する前の下ごしらえ（画像・動画の保存と、ブックマークの OG 情報の取得）
import type { NotionBlock } from './notion';
import { withCache } from './notion-cache';
import { downloadAndSaveImage, isNotionUrl } from './notion-images';

export interface BookmarkMeta {
  title?: string;
  description?: string;
  image?: string;
  logo?: string;
}

/** OG 情報とファビコンを付けたブロック（ブックマークの描画で使う） */
export type ArticleBlock = NotionBlock & {
  children?: ArticleBlock[];
  _og?: BookmarkMeta | null;
  _favicon?: string;
};

function flatten(blocks: ArticleBlock[]): ArticleBlock[] {
  return blocks.flatMap((block) => [block, ...flatten(block.children ?? [])]);
}

/** 本文の画像・動画のうち Notion にアップロードしたものを保存し、サイト内のパスに差し替える */
export async function localizeBlockMedia(blocks: ArticleBlock[]): Promise<void> {
  for (const block of flatten(blocks)) {
    if (block.type !== 'image' && block.type !== 'video') continue;
    const media = block.type === 'image' ? block.image : block.video;
    const url = media.type === 'file' ? media.file.url : media.type === 'external' ? media.external.url : '';
    if (!url || !isNotionUrl(url)) continue;

    const localPath = await downloadAndSaveImage(url);
    // ローカルパスを external として格納（描画では external.url を使う）
    const localized = { type: 'external' as const, external: { url: localPath }, caption: media.caption };
    if (block.type === 'image') block.image = localized;
    else block.video = localized;
  }
}

// microlink API で OG 情報を取得する（キャッシュ付き）
// 取得できなかったときはキャッシュせず、次のビルドで取り直す
async function getBookmarkMeta(url: string): Promise<BookmarkMeta | null> {
  try {
    return await withCache(`bookmarkMeta:${url}`, async () => {
      const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, {
        signal: AbortSignal.timeout(8000),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = (await res.json())?.data;
      if (!d) throw new Error('no data');
      return {
        title: typeof d.title === 'string' ? d.title : undefined,
        description: typeof d.description === 'string' ? d.description : undefined,
        image: typeof d.image?.url === 'string' ? d.image.url : undefined,
        logo: typeof d.logo?.url === 'string' ? d.logo.url : undefined,
      };
    });
  } catch {
    return null;
  }
}

/** ブックマークのブロックに OG 情報（タイトル・説明・画像）とファビコンを付ける。まとめて同時に取得する */
export async function attachBookmarkMeta(blocks: ArticleBlock[]): Promise<void> {
  const bookmarks = flatten(blocks).filter((block) => block.type === 'bookmark' && block.bookmark.url);
  await Promise.all(
    bookmarks.map(async (block) => {
      if (block.type !== 'bookmark') return;
      block._og = await getBookmarkMeta(block.bookmark.url);
      try {
        const { hostname } = new URL(block.bookmark.url);
        block._favicon = block._og?.logo ?? `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
      } catch {
        block._favicon = '';
      }
    }),
  );
}
