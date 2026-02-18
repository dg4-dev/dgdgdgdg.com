import { createHash } from 'crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

/** マニフェストファイルのパス（ビルド中に使われたファイル一覧） */
const MANIFEST_PATH = join(process.cwd(), 'public', 'notion-images', '.manifest');

/**
 * ビルドで使われたファイル名をマニフェストに追記する。
 * インテグレーション側と別プロセスでもファイル経由で共有できる。
 */
function recordUsedFile(filename: string): void {
  const dir = join(process.cwd(), 'public', 'notion-images');
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
  return `/notion-images/${hash}${ext}`;
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
 * 画像をダウンロードしてpublic/notion-images/に保存
 * すでに存在する場合はスキップ
 * @returns ローカルパス（/notion-images/xxx.jpg）
 */
export async function downloadAndSaveImage(imageUrl: string): Promise<string> {
  if (!imageUrl) return '';

  const localPath = getLocalImagePath(imageUrl);
  const publicDir = join(process.cwd(), 'public', 'notion-images');
  const filename = localPath.replace('/notion-images/', '');
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
      console.warn(`Failed to download image: ${imageUrl} (${response.status})`);
      return imageUrl; // ダウンロード失敗時は元URLを返す
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ファイルに保存
    writeFileSync(fullPath, buffer);
    console.log(`Downloaded: ${localPath}`);

    return localPath;
  } catch (error) {
    console.error(`Error downloading image ${imageUrl}:`, error);
    return imageUrl; // エラー時は元URLを返す
  }
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
