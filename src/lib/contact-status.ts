export type ContactStatus = 'open' | 'limited' | 'closed';

interface StatusResponse {
  status?: string;
}

/** Worker が応答しなくても、ページの表示を待たせすぎないための上限 */
const STATUS_TIMEOUT_MS = 3000;

/**
 * Status Worker から受付状況を取得する。
 * 取得できなかったときは limited を返す（訪問者には失敗を見せず、サーバーのログにだけ残す）。
 * endpoint が未設定（空文字を含む）のときは取得せずに limited を返す。
 */
export async function fetchContactStatus(
  endpoint: string | undefined,
  timeoutMs = STATUS_TIMEOUT_MS,
): Promise<ContactStatus> {
  if (!endpoint) return 'limited';

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as StatusResponse;
    if (data?.status === 'open' || data?.status === 'limited' || data?.status === 'closed') {
      return data.status;
    }
    throw new Error(`想定外の値: ${JSON.stringify(data?.status)}`);
  } catch (error) {
    console.warn('[contact] 受付状況を取得できなかったため、limited として表示します:', error);
    return 'limited';
  }
}
