import { typefaces, type TypefaceSource } from '@/data/typefaces';
import { parseFontInfo, type FontInfo } from './font-info';

export interface Typeface extends TypefaceSource, FontInfo {
  /** サイト内で配信するフォントファイルのパス */
  fontUrl: string;
  /** @font-face で使う名前（サイト全体の書体と重ならないよう接頭辞をつける） */
  cssFamily: string;
  repoUrl: string;
  licenseText: string;
  /** バージョンの出どころ（GitHub のリリース・タグ）のページ。フォントから読んだ場合は空 */
  versionUrl: string;
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

function githubApi(path: string): Promise<Response> {
  const token = import.meta.env.GITHUB_TOKEN;
  return fetch(`https://api.github.com/repos/${path}`, {
    signal: AbortSignal.timeout(15000),
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'dgdgdgdg.com',
      // 未認証だと 1 時間 60 回までなので、トークンがあれば使う
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

/** v1.2.10 > v1.2.9 となるよう、数字の部分を数値として比べる */
function compareVersionTags(a: string, b: string): number {
  const pa = a.match(/\d+/g)?.map(Number) ?? [];
  const pb = b.match(/\d+/g)?.map(Number) ?? [];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

interface LatestVersion {
  version: string;
  url: string;
}

/**
 * GitHub の最新バージョンを取得する。
 * Latest リリースを優先し、リリースがなければバージョン番号の形をしたタグのうち最も新しいものを使う。
 */
async function fetchLatestVersion(repo: string): Promise<LatestVersion | null> {
  const release = await githubApi(`${repo}/releases/latest`);
  if (release.ok) {
    const data = await release.json();
    if (data.tag_name) return { version: data.tag_name, url: data.html_url };
  } else if (release.status !== 404) {
    throw new Error(`GitHub API failed: releases/latest (${release.status})`);
  }

  const tags = await githubApi(`${repo}/tags?per_page=100`);
  if (!tags.ok) {
    throw new Error(`GitHub API failed: tags (${tags.status})`);
  }
  const names: string[] = (await tags.json()).map((tag: { name: string }) => tag.name);
  const latest = names
    .filter((name) => /^v?\d+(\.\d+)*$/.test(name))
    .sort(compareVersionTags)
    .pop();
  return latest ? { version: latest, url: `https://github.com/${repo}/releases/tag/${latest}` } : null;
}

// 一覧・詳細・フォント配信の各ページで呼ばれるため、API の呼び出しはリポジトリごとに 1 回にする
const versionCache = new Map<string, Promise<LatestVersion | null>>();

function getLatestVersion(repo: string): Promise<LatestVersion | null> {
  let pending = versionCache.get(repo);
  if (!pending) {
    pending = fetchLatestVersion(repo).catch((error) => {
      // 取得できなくてもフォントに書かれたバージョンで表示できるので、build は止めない
      console.warn(`[typefaces] Could not get the latest version of ${repo}:`, error);
      return null;
    });
    versionCache.set(repo, pending);
  }
  return pending;
}

async function loadTypeface(source: TypefaceSource): Promise<Typeface | null> {
  try {
    const [font, latest, licenseText] = await Promise.all([
      fetchFontFile(source),
      getLatestVersion(source.repo),
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
      // GitHub の最新バージョンを優先し、取れなければフォントに書かれたバージョンを使う
      version: latest?.version ?? info.version,
      versionUrl: latest?.url ?? '',
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
