import { createHash } from 'crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

/** マニフェストファイルのパス（ビルド中に使われたファイル一覧） */
const MANIFEST_PATH = join(process.cwd(), 'public', 'images', 'works', '.manifest');

/**
 * ビルドで使われたファイル名をマニフェストに追記する。
 * インテグレーション側と別プロセスでもファイル経由で共有できる。
 */
function recordUsedFile(filename: string): void {
  const dir = join(process.cwd(), 'public', 'images', 'works');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  appendFileSync(MANIFEST_PATH, filename + '\n');
}

/**
 * マニフェストから使用済みファイル一覧を読み取る。
 */
export function getUsedFiles(): Set<string> {
  if (!existsSync(MANIFEST_PATH)) return new Set();
  const content = readFileSync(MANIFEST_PATH, 'utf-8');
  return new Set(content.split('\n').filter(Boolean));
}

/**
 * マニフェストファイルを削除する（ビルド開始時にリセット用）。
 */
export function clearManifest(): void {
  if (existsSync(MANIFEST_PATH)) {
    unlinkSync(MANIFEST_PATH);
  }
}

/**
 * URLからクエリパラメータを除外し、origin + pathname だけ返す。
 * Notion の署名付きURL（X-Amz-Signature 等）が変わっても同じハッシュになる。
 */
function stripQueryParams(url: string): string {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

/**
 * Notion画像URLをハッシュ化してローカルパスを生成
 * クエリパラメータを除外してからハッシュするため、同じ画像には安定したファイル名がつく。
 */
function getLocalImagePath(imageUrl: string): string {
  const hash = createHash('md5').update(stripQueryParams(imageUrl)).digest('hex');
  const ext = getImageExtension(imageUrl);
  return `/images/works/${hash}${ext}`;
}

/**
 * URL から拡張子を推測（クエリパラメータを除外）
 */
function getImageExtension(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|mp4|mov|avi|webm|mkv)$/i);
    if (match) return match[0].toLowerCase();
  } catch (e) {
    // URL解析失敗
  }
  // デフォルトはJPEG（Notionの画像は多くがJPEG）
  return '.jpg';
}

/**
 * 画像をダウンロードしてpublic/images/works/に保存
 * すでに存在する場合はスキップ
 * @returns ローカルパス（/images/works/xxx.jpg）
 */
export async function downloadAndSaveImage(imageUrl: string): Promise<string> {
  if (!imageUrl) return '';

  const localPath = getLocalImagePath(imageUrl);
  const publicDir = join(process.cwd(), 'public', 'images', 'works');
  const filename = localPath.replace('/images/works/', '');
  const fullPath = join(publicDir, filename);

  // ビルドで使われたファイルとして記録
  recordUsedFile(filename);

  // すでに存在する場合はスキップ
  if (existsSync(fullPath)) {
    return localPath;
  }

  try {
    // ディレクトリが存在しない場合は作成
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // 画像をダウンロード
    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(15000), // 15秒タイムアウト
    });

    if (!response.ok) {
      warnDownloadFailed(imageUrl, `HTTP ${response.status}`);
      return imageUrl; // ダウンロード失敗時は元URLを返す
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ファイルに保存
    writeFileSync(fullPath, buffer);
    console.log(`Downloaded: ${localPath}`);

    return localPath;
  } catch (error) {
    warnDownloadFailed(imageUrl, error instanceof Error ? error.message : String(error));
    return imageUrl; // エラー時は元URLを返す
  }
}

/**
 * ダウンロードの失敗をビルドのログで目立つように出す。
 * 元URLのままページに出るため、Notion の URL なら期限が切れると本番で表示されなくなる。
 */
function warnDownloadFailed(imageUrl: string, reason: string): void {
  console.warn(
    `\n[notion-images] ⚠ 画像をダウンロードできませんでした（${reason}）。元のURLのままページに出ます。\n  ${imageUrl}\n`,
  );
}

/** 期限切れとみなす余裕（ビルド中に期限が切れないよう、5分前から期限切れ扱いにする） */
const EXPIRY_MARGIN_MS = 5 * 60 * 1000;

/**
 * Notion API のレスポンスに、期限切れの署名付きファイルURL（{ url, expiry_time }）があり、
 * その画像がまだ public/images/works/ に保存されていなければ true を返す。
 * 保存済みの画像は URL を使わずにローカルのファイルを使うので、期限が切れていても問題ない。
 */
export function hasExpiredUnsavedFile(data: unknown): boolean {
  const publicDir = join(process.cwd(), 'public', 'images', 'works');
  const deadline = Date.now() + EXPIRY_MARGIN_MS;

  const visit = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.some(visit);
    if (!value || typeof value !== 'object') return false;

    const obj = value as Record<string, unknown>;
    if (typeof obj.url === 'string' && typeof obj.expiry_time === 'string') {
      const expiry = Date.parse(obj.expiry_time);
      if (!Number.isNaN(expiry) && expiry <= deadline) {
        const filename = getLocalImagePath(obj.url).replace('/images/works/', '');
        if (!existsSync(join(publicDir, filename))) return true;
      }
    }

    return Object.values(obj).some(visit);
  };

  return visit(data);
}

/**
 * 複数の画像を並列ダウンロード
 */
export async function downloadImages(imageUrls: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  await Promise.all(
    imageUrls.map(async (url) => {
      if (!url) return;
      const localPath = await downloadAndSaveImage(url);
      results.set(url, localPath);
    }),
  );

  return results;
}

/**
 * Notion の署名付きURLかどうかを判定
 */
export function isNotionUrl(url: string): boolean {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes('s3.us-west-2.amazonaws.com') ||
      urlObj.hostname.includes('prod-files-secure') ||
      urlObj.hostname.includes('notion.so')
    );
  } catch {
    return false;
  }
}
