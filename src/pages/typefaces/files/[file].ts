import type { APIRoute } from 'astro';
import { fetchFontFile, fontFileName, getTypefaces, type Typeface } from '@/lib/typefaces';

export const prerender = true;

// GitHub のフォントファイルを build 時に取得し、サイト内のファイルとして書き出す
export async function getStaticPaths() {
  const typefaces = await getTypefaces();
  return typefaces.map((typeface) => ({
    params: { file: fontFileName(typeface) },
    props: { typeface },
  }));
}

const CONTENT_TYPES: Record<string, string> = {
  ttf: 'font/ttf',
  otf: 'font/otf',
  woff: 'font/woff',
  woff2: 'font/woff2',
};

export const GET: APIRoute<{ typeface: Typeface }> = async ({ props }) => {
  const font = await fetchFontFile(props.typeface);
  const ext = fontFileName(props.typeface).split('.').pop() ?? 'ttf';
  return new Response(font, {
    headers: { 'Content-Type': CONTENT_TYPES[ext] ?? 'application/octet-stream' },
  });
};
