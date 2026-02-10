// src/status-worker.ts

export interface Env {
  STATUS_KV: KVNamespace;
  API_TOKEN: '6e3311262a2446dbb8470ef11d7928e4'; // Cloudflare ダッシュボードで設定するシークレット
}

type Status = 'open' | 'limited' | 'closed';

function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/status') {
      return new Response('Not Found', { status: 404 });
    }

    // CORS プリフライト
    if (request.method === 'OPTIONS') {
      return jsonResponse({}, { status: 204 });
    }

    // GET /status: 現在のステータス取得
    if (request.method === 'GET') {
      const stored = await env.STATUS_KV.get('status');
      const status: Status =
        stored === 'open' || stored === 'limited' || stored === 'closed' ? (stored as Status) : 'open';

      return jsonResponse({ status });
    }

    // POST /status: ステータス更新（Appleショートカットから）
    if (request.method === 'POST') {
      const auth = request.headers.get('Authorization') ?? '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

      if (!token || token !== env.API_TOKEN) {
        return jsonResponse({ error: 'Unauthorized' }, { status: 401 });
      }

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ error: 'Invalid JSON' }, { status: 400 });
      }

      const next = (body as { status?: string })?.status;

      if (next !== 'open' && next !== 'limited' && next !== 'closed') {
        return jsonResponse({ error: 'Invalid status. Use one of: open, limited, closed.' }, { status: 400 });
      }

      await env.STATUS_KV.put('status', next);

      return jsonResponse({ status: next });
    }

    return jsonResponse({ error: 'Method Not Allowed' }, { status: 405 });
  },
} satisfies ExportedHandler<Env>;
