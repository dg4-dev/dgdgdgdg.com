import { createHash } from 'crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * キャッシュディレクトリのパス。
 * Cloudflare Pages のビルドキャッシュは Astro なら node_modules/.astro だけを次のビルドに残すので、その中に置く
 */
const CACHE_DIR = join(process.cwd(), 'node_modules', '.astro', 'notion-cache');

/** ビルドで使ったキャッシュのファイル名の記録（ビルドの終わりに、ここにないファイルを消す） */
const MANIFEST_PATH = join(CACHE_DIR, '.manifest');

/** デフォルトTTL: 24時間 */
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

/** 環境変数 NOTION_CACHE_TTL_MS でTTLを上書き可能（ミリ秒） */
function getTtlMs(): number {
  const envTtl = process.env.NOTION_CACHE_TTL_MS;
  if (envTtl) {
    const parsed = Number(envTtl);
    if (parsed > 0) return parsed;
  }
  return DEFAULT_TTL_MS;
}

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

/** キャッシュキーからファイル名を生成 */
function cacheFileName(key: string): string {
  return `${createHash('md5').update(key).digest('hex')}.json`;
}

/** キャッシュキーからファイルパスを生成 */
function cacheFilePath(key: string): string {
  return join(CACHE_DIR, cacheFileName(key));
}

/**
 * ビルドで使ったキャッシュとして記録する。
 * インテグレーション側と別プロセスでもファイル経由で共有できる。
 */
function recordUsedKey(key: string): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
  appendFileSync(MANIFEST_PATH, cacheFileName(key) + '\n');
}

/** 記録を削除する（ビルド開始時にリセット用。キャッシュのファイルは消さない） */
export function clearCacheManifest(): void {
  if (existsSync(MANIFEST_PATH)) {
    unlinkSync(MANIFEST_PATH);
  }
}

/**
 * 今回のビルドで使わなかったキャッシュのファイルを削除し、消したファイル名を返す。
 * 記録がないとき（キャッシュを一度も使わなかったときなど）は何も消さない。
 */
export function removeUnusedCache(): string[] {
  if (!existsSync(MANIFEST_PATH)) return [];

  const used = new Set(readFileSync(MANIFEST_PATH, 'utf-8').split('\n').filter(Boolean));
  const unused = readdirSync(CACHE_DIR).filter((f) => f.endsWith('.json') && !used.has(f));
  for (const file of unused) {
    unlinkSync(join(CACHE_DIR, file));
  }
  return unused;
}

/** キャッシュから読み取り。期限切れまたは存在しない場合は null */
export function getCached<T>(key: string): T | null {
  const filePath = cacheFilePath(key);
  if (!existsSync(filePath)) return null;

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const entry: CacheEntry<T> = JSON.parse(raw);
    const age = Date.now() - entry.timestamp;
    if (age > getTtlMs()) return null;
    return entry.data;
  } catch {
    return null;
  }
}

/** データをキャッシュに保存 */
export function setCache<T>(key: string, data: T): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  const entry: CacheEntry<T> = {
    timestamp: Date.now(),
    data,
  };

  writeFileSync(cacheFilePath(key), JSON.stringify(entry));
}

interface CacheOptions<T> {
  /** false を返すと、TTL 内でもキャッシュを捨てて取り直す */
  isValid?: (data: NoInfer<T>) => boolean;
}

/**
 * キャッシュ付き非同期関数ラッパー。
 * キャッシュが有効ならそれを返し、なければ fetcher を実行してキャッシュに保存する。
 */
export async function withCache<T>(key: string, fetcher: () => Promise<T>, options: CacheOptions<T> = {}): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) {
    if (!options.isValid || options.isValid(cached)) {
      console.log(`[notion-cache] HIT: ${key}`);
      recordUsedKey(key);
      return cached;
    }
    console.log(`[notion-cache] STALE: ${key}`);
  }

  console.log(`[notion-cache] MISS: ${key}`);
  const data = await fetcher();
  setCache(key, data);
  recordUsedKey(key);
  return data;
}
