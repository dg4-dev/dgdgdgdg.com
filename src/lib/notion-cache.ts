import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/** キャッシュディレクトリのパス */
const CACHE_DIR = join(process.cwd(), '.notion-cache');

/** デフォルトTTL: 1時間 */
const DEFAULT_TTL_MS = 60 * 60 * 1000;

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

/** キャッシュキーからファイルパスを生成 */
function cacheFilePath(key: string): string {
  const hash = createHash('md5').update(key).digest('hex');
  return join(CACHE_DIR, `${hash}.json`);
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

/**
 * キャッシュ付き非同期関数ラッパー。
 * キャッシュが有効ならそれを返し、なければ fetcher を実行してキャッシュに保存する。
 */
export async function withCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) {
    console.log(`[notion-cache] HIT: ${key}`);
    return cached;
  }

  console.log(`[notion-cache] MISS: ${key}`);
  const data = await fetcher();
  setCache(key, data);
  return data;
}
