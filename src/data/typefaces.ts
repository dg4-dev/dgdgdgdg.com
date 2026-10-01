/**
 * 自作書体の一覧。
 * フォントファイルと LICENSE は GitHub のパブリックリポジトリから build 時に取得する。
 * 書体名・バージョン・可変軸・収録文字はフォントファイルから読み取るため、ここには書かない。
 */
export interface TypefaceSource {
  /** URL に使う識別子（/typefaces/{slug}） */
  slug: string;
  /** GitHub リポジトリ（owner/name） */
  repo: string;
  /** 取得するブランチ・タグ */
  ref: string;
  /** リポジトリ内のフォントファイルのパス */
  fontPath: string;
  /** リポジトリ内のライセンスファイルのパス */
  licensePath?: string;
  /** 公開年（一覧の並び順と表示に使う） */
  year: number;
  /** 書体の紹介文 */
  description: string;
  /** スタイル見本。未指定ならフォントの名前付きインスタンスを使う */
  presets?: { name: string; coordinates: Record<string, number> }[];
}

export const typefaces: TypefaceSource[] = [
  {
    slug: 'atomic-dot',
    repo: 'dg4-dev/atomic-dot',
    ref: 'main',
    fontPath: 'dg4-atomic_dot.ttf',
    licensePath: 'LICENSE',
    year: 2023,
    description:
      '点の集まりで組み立てたドット書体。点の形（四角〜丸）、太さ、傾きを可変軸で連続的に調整できます。このサイトのナビゲーションや見出しにも使っています。',
    presets: [
      { name: 'Square', coordinates: { RNDS: 0, wght: 400, slnt: 0 } },
      { name: 'Square Light', coordinates: { RNDS: 0, wght: 200, slnt: 0 } },
      { name: 'Circle', coordinates: { RNDS: 100, wght: 400, slnt: 0 } },
      { name: 'Circle Light', coordinates: { RNDS: 100, wght: 200, slnt: 0 } },
      { name: 'Square Italic', coordinates: { RNDS: 0, wght: 400, slnt: 40 } },
      { name: 'Square Light Italic', coordinates: { RNDS: 0, wght: 200, slnt: 40 } },
      { name: 'Circle Italic', coordinates: { RNDS: 100, wght: 400, slnt: 40 } },
      { name: 'Circle Light Italic', coordinates: { RNDS: 100, wght: 200, slnt: 40 } },
    ],
  },
  {
    slug: 'wave-live',
    repo: 'dg4-dev/wave-live',
    ref: 'main',
    fontPath: 'dg4-wave_live.ttf',
    licensePath: 'LICENSE',
    year: 2026,
    description: '均一な太さの線で描いた欧文書体。合字（ff / fi / fl など）とカーニングを備えています。',
  },
];
