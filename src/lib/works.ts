import type { PageObjectResponse } from '@notionhq/client';
import { downloadAndSaveImage, isNotionUrl } from './notion-images';

/** Notion の Works データベースの 1 行（作品） */
export type Work = PageObjectResponse;

type Property = Work['properties'][string];
type PropertyOf<T extends Property['type']> = Extract<Property, { type: T }>;

/** 指定した種類のプロパティを返す。列がない・種類が違うときは undefined */
function property<T extends Property['type']>(work: Work, name: string, type: T): PropertyOf<T> | undefined {
  const value = work.properties?.[name];
  return value?.type === type ? (value as PropertyOf<T>) : undefined;
}

function plainText(items: { plain_text: string }[] | undefined): string {
  return (items ?? []).map((item) => item.plain_text).join('');
}

/** URL に使う作品の ID（id 列。空なら Notion のページ ID） */
export function getWorkId(work: Work): string {
  return plainText(property(work, 'id', 'rich_text')?.rich_text) || work.id;
}

export function getTitle(work: Work): string {
  return plainText(property(work, 'Title', 'title')?.title) || 'No title';
}

export function getClient(work: Work): string {
  return plainText(property(work, 'Client', 'rich_text')?.rich_text);
}

export function getSummary(work: Work): string {
  return plainText(property(work, 'Summary', 'rich_text')?.rich_text);
}

/** 作成日（YYYY-MM-DD）。未入力なら空文字 */
export function getCreatedDate(work: Work): string {
  return property(work, 'Created Date', 'date')?.date?.start ?? '';
}

export function getCategories(work: Work): { name: string; color: string }[] {
  return property(work, 'Category', 'multi_select')?.multi_select ?? [];
}

export function isPrivate(work: Work): boolean {
  return property(work, 'Private', 'checkbox')?.checkbox ?? false;
}

export function isFeatured(work: Work): boolean {
  return property(work, 'Featured', 'checkbox')?.checkbox ?? false;
}

/** Notion にアップロードしたカバー画像の URL（署名付きで約 1 時間で期限が切れる）。なければ空文字 */
function getCoverUrl(work: Work): string {
  const file = property(work, 'Cover', 'files')?.files?.[0];
  return file?.type === 'file' ? file.file.url : '';
}

/**
 * カバー画像を public/notion-images/ に保存し、サイト内のパスを返す。
 * カバー画像がなければ空文字、保存できなければ Notion の URL を返す。
 */
export async function localizeCover(work: Work): Promise<string> {
  const url = getCoverUrl(work);
  return url && isNotionUrl(url) ? downloadAndSaveImage(url) : url;
}

/** 日付（YYYY-MM-DD）を表示用の年月（YYYY-MM）にする */
export function formatYearMonth(date: string): string {
  return date.substring(0, 7);
}

/** 作成日の新しい順に並べる。作成日がない作品は最後 */
export function compareByCreatedDateDesc(a: Work, b: Work): number {
  const dateA = getCreatedDate(a);
  const dateB = getCreatedDate(b);
  if (!dateA && !dateB) return 0;
  if (!dateA) return 1;
  if (!dateB) return -1;
  return dateB.localeCompare(dateA);
}

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
export function getExternalUrl(work: Work): string | null {
  const raw = property(work, 'External Link', 'url')?.url;
  if (!raw?.trim()) return null;
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
export function getWorkLink(work: Work): WorkLink | null {
  if (isPrivate(work)) return null;

  const externalUrl = getExternalUrl(work);
  if (externalUrl) return { href: externalUrl, external: true };

  return { href: `/works/article/${getWorkId(work)}`, external: false };
}
