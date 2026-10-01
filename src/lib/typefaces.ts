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

function rawUrl(repo: string, ref: string, path: string): string {
  return `https://raw.githubusercontent.com/${repo}/${ref}/${path}`;
}

/** ファイルを取得する ref。最新リリース（なければ最新のバージョンタグ）を使い、取れなければ設定のブランチを使う */
async function resolveRef(source: TypefaceSource): Promise<string> {
  const latest = await getLatestVersion(source.repo);
  return latest?.version ?? source.ref;
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

/** GitHub の最新リリースからフォントファイルを取得する */
export function fetchFontFile(source: TypefaceSource): Promise<ArrayBuffer> {
  let pending = fontCache.get(source.slug);
  if (!pending) {
    pending = resolveRef(source)
      .then((ref) => fetchFromGitHub(rawUrl(source.repo, ref, source.fontPath)))
      .then((res) => res.arrayBuffer());
    pending.catch(() => fontCache.delete(source.slug));
    fontCache.set(source.slug, pending);
  }
  return pending;
}

function githubApi(path: string, token?: string): Promise<Response> {
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

let warnedInvalidToken = false;

/** GitHub API を呼ぶ。トークンが無効（期限切れなど）で 401 になったときは、トークンなしで呼び直す */
async function callGithubApi(path: string): Promise<Response> {
  const token = import.meta.env.GITHUB_TOKEN;
  const response = await githubApi(path, token);
  if (response.status !== 401 || !token) return response;

  if (!warnedInvalidToken) {
    warnedInvalidToken = true;
    console.warn('[typefaces] GITHUB_TOKEN が無効なため（401）、トークンなしで GitHub API を呼び直します');
  }
  return githubApi(path);
}

/** 失敗したときのログに、GitHub が返した理由（回数制限など）も出す */
async function apiError(name: string, response: Response): Promise<Error> {
  const message = await response
    .json()
    .then((data) => (typeof data?.message === 'string' ? data.message : ''))
    .catch(() => '');
  return new Error(`GitHub API failed: ${name} (${response.status}${message ? `: ${message}` : ''})`);
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

/** バージョン番号の形をしたタグ（v1.2.3 など）のうち、最も新しいもの */
function latestVersionTag(names: string[]): string | undefined {
  return names
    .filter((name) => /^v?\d+(\.\d+)*$/.test(name))
    .sort(compareVersionTags)
    .pop();
}

function tagVersion(repo: string, tag: string): LatestVersion {
  return { version: tag, url: `https://github.com/${repo}/releases/tag/${tag}` };
}

/**
 * GitHub API で最新バージョンを取得する。
 * Latest リリースを優先し、リリースがなければバージョン番号の形をしたタグのうち最も新しいものを使う。
 */
async function fetchLatestVersionFromApi(repo: string): Promise<LatestVersion | null> {
  const release = await callGithubApi(`${repo}/releases/latest`);
  if (release.ok) {
    const data = await release.json();
    if (data.tag_name) return { version: data.tag_name, url: data.html_url };
  } else if (release.status !== 404) {
    throw await apiError('releases/latest', release);
  }

  const tags = await callGithubApi(`${repo}/tags?per_page=100`);
  if (!tags.ok) {
    throw await apiError('tags', tags);
  }
  const latest = latestVersionTag((await tags.json()).map((tag: { name: string }) => tag.name));
  return latest ? tagVersion(repo, latest) : null;
}

/**
 * git の取得に使う URL（info/refs）からタグの一覧を読み、最も新しいバージョンのタグを返す。
 * GitHub API の回数制限を受けないので、API で取得できなかったときに使う。
 */
async function fetchLatestTagFromGit(repo: string): Promise<LatestVersion | null> {
  const response = await fetchFromGitHub(`https://github.com/${repo}.git/info/refs?service=git-upload-pack`);
  // 1 行に「<コミット> refs/tags/<タグ名>」が並ぶ。注釈付きタグは「<タグ名>^{}」の行もあるので、^ の手前までを名前にして重なりを除く
  // 最初の行は名前の後ろに NUL と機能の一覧が続くので、NUL でも区切る
  const names = [...(await response.text()).matchAll(/refs\/tags\/([^\s^\0]+)/g)].map((match) => match[1]);
  const latest = latestVersionTag([...new Set(names)]);
  return latest ? tagVersion(repo, latest) : null;
}

/** GitHub の最新バージョンを取得する。API で取得できなければ、git のタグの一覧から探す */
async function fetchLatestVersion(repo: string): Promise<LatestVersion | null> {
  try {
    return await fetchLatestVersionFromApi(repo);
  } catch (error) {
    console.warn(
      `[typefaces] GitHub API で ${repo} の最新バージョンを取得できなかったため、タグの一覧から探します:`,
      error,
    );
    return fetchLatestTagFromGit(repo);
  }
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

// 字形一覧では、よく使う合字から順に並べる
const FEATURE_ORDER = ['liga', 'dlig', 'calt'];

function featureOrder(feature: string): number {
  const index = FEATURE_ORDER.indexOf(feature);
  return index === -1 ? FEATURE_ORDER.length : index;
}

async function loadTypeface(source: TypefaceSource): Promise<Typeface | null> {
  try {
    const [font, latest, licenseText] = await Promise.all([
      fetchFontFile(source),
      getLatestVersion(source.repo),
      source.licensePath
        ? resolveRef(source)
            .then((ref) => fetchFromGitHub(rawUrl(source.repo, ref, source.licensePath!)))
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
      featureGlyphs: [...info.featureGlyphs].sort((a, b) => featureOrder(a.feature) - featureOrder(b.feature)),
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

/** 字形一覧に並ぶ字形の数（収録文字と合字などの合計） */
export function glyphCount(typeface: Typeface): number {
  return typeface.codepoints.length + typeface.featureGlyphs.length;
}

/** 軸の値を font-variation-settings の書式にする */
export function variationSettings(coordinates: Record<string, number>): string {
  return Object.entries(coordinates)
    .map(([tag, value]) => `'${tag}' ${value}`)
    .join(', ');
}
