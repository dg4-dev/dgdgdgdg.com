/** 作品カードのリンク先 */
export interface WorkLink {
  href: string;
  /** true のときは外部リンク（新しいタブで開く） */
  external: boolean;
}

/**
 * Notion の External Link 列の URL を返す。
 * http: / https: の URL のときだけ使い、それ以外（javascript: など）や空のときは null。
 */
export function getExternalUrl(work: any): string | null {
  const raw = work.properties?.['External Link']?.url;
  if (typeof raw !== 'string' || !raw.trim()) return null;
  try {
    const url = new URL(raw.trim());
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * 作品カードのリンク先を返す。
 * - プライベート作品: リンクなし（null）
 * - 外部リンクがある作品: 外部リンク（新しいタブで開く）
 * - それ以外: 詳細ページ
 */
export function getWorkLink(work: any): WorkLink | null {
  if (work.properties?.Private?.checkbox) return null;

  const externalUrl = getExternalUrl(work);
  if (externalUrl) return { href: externalUrl, external: true };

  const workId = work.properties?.id?.rich_text?.[0]?.plain_text ?? work.id;
  return { href: `/works/article/${workId}`, external: false };
}
