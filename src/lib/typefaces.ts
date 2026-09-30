import { typefaces, type TypefaceSource } from '@/data/typefaces';
import { parseFontInfo, type FontInfo } from './font-info';

export interface Typeface extends TypefaceSource, FontInfo {
  /** サイト内で配信するフォントファイルのパス */
  fontUrl: string;
  /** @font-face で使う名前（サイト全体の書体と重ならないよう接頭辞をつける） */
  cssFamily: string;
  repoUrl: string;
  licenseText: string;
  presets: { name: string; coordinates: Record<string, number> }[];
}

function rawUrl(source: TypefaceSource, path: string): string {
  return `https://raw.githubusercontent.com/${source.repo}/${source.ref}/${path}`;
}

export function fontFileName(source: TypefaceSource): string {
  const ext = source.fontPath.match(/\.(ttf|otf|woff2?)$/i)?.[0].toLowerCase() ?? '.ttf';
  return `${source.slug}${ext}`;
}

async function fetchFromGitHub(url: string): Promise<Response> {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    throw new Error(`GitHub fetch failed: ${url} (${response.status})`);
  }
  return response;
}

// build 中は同じフォントを何度も取得しないよう、プロセス内で結果を使い回す
const fontCache = new Map<string, Promise<ArrayBuffer>>();

/** GitHub からフォントファイルを取得する */
export function fetchFontFile(source: TypefaceSource): Promise<ArrayBuffer> {
  let pending = fontCache.get(source.slug);
  if (!pending) {
    pending = fetchFromGitHub(rawUrl(source, source.fontPath)).then((res) => res.arrayBuffer());
    pending.catch(() => fontCache.delete(source.slug));
    fontCache.set(source.slug, pending);
  }
  return pending;
}

async function loadTypeface(source: TypefaceSource): Promise<Typeface | null> {
  try {
    const [font, licenseText] = await Promise.all([
      fetchFontFile(source),
      source.licensePath
        ? fetchFromGitHub(rawUrl(source, source.licensePath))
            .then((res) => res.text())
            .catch(() => '')
        : Promise.resolve(''),
    ]);
    const info = parseFontInfo(font);

    return {
      ...source,
      ...info,
      fontUrl: `/typefaces/files/${fontFileName(source)}`,
      cssFamily: `Typeface ${source.slug}`,
      repoUrl: `https://github.com/${source.repo}`,
      licenseText: licenseText.trim(),
      presets: source.presets ?? info.instances,
    };
  } catch (error) {
    // 取得に失敗した書体は掲載せず、build は続行する
    console.warn(`[typefaces] Skipped ${source.slug}:`, error);
    return null;
  }
}

/** 掲載する書体を新しい順で返す */
export async function getTypefaces(): Promise<Typeface[]> {
  const loaded = await Promise.all(typefaces.map(loadTypeface));
  return loaded.filter((t): t is Typeface => t !== null).sort((a, b) => b.year - a.year);
}

/** 書体ページの <head> に入れる @font-face */
export function fontFaceCss(list: Typeface[]): string {
  return list
    .map((t) => {
      const wght = t.axes.find((a) => a.tag === 'wght');
      const weight = wght ? `${wght.min} ${wght.max}` : 'normal';
      return `@font-face { font-family: '${t.cssFamily}'; src: url('${t.fontUrl}'); font-weight: ${weight}; font-display: block; }`;
    })
    .join('\n');
}

/** 軸の値を font-variation-settings の書式にする */
export function variationSettings(coordinates: Record<string, number>): string {
  return Object.entries(coordinates)
    .map(([tag, value]) => `'${tag}' ${value}`)
    .join(', ');
}
