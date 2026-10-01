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
  /** 書体の紹介文（1 要素が 1 段落） */
  description: string[];
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
    description: [
      '文字として読める限界まで点を減らしたドット書体です。点を打つか打たないか、それだけで文字を組み立てています。これ以上分けられない最小の単位という意味で「atomic」と名づけました。',
      '2019年に形を考えはじめ、2023年8月2日にバリアブルフォントにしました。点の形（四角から丸）、太さ、傾きを自由に変えられます。',
    ],
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
    description: [
      '手元に PC がなかった時期に、iPad だけで書体を作れるか試したのがはじまりです。基本の字形は iPad で描き、PC に戻ってからは合字やカーニングなど、仕上げの作業を続けています。',
      'ff / fi / fl などの合字のほか、「dg」をロゴの形にする任意の合字（dlig）と、数字にはさまれたコロンの位置を整える字形（calt）を入れています。',
    ],
  },
];
