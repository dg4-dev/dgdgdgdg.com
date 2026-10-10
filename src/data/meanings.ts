/** dgdgdgdg に込めた意味（言葉と、その言葉から連想するもの）。About ページに出す */
export const meanings: {
  phrase: string;
  mean: [string, ...string[]];
}[] = [
  {
    phrase: '4',
    mean: ['四季', '.mp4', '四次元', '四則演算'],
  },
  {
    phrase: 'dgdg',
    mean: ['ドラムの音'],
  },
  {
    phrase: 'deep',
    mean: ['深い', '奥行きのある'],
  },
  {
    phrase: '駄菓子',
    mean: ['多種多様', '多方面'],
  },
  {
    phrase: 'dig',
    mean: ['調べる', '発掘する'],
  },
  {
    phrase: 'digital',
    mean: ['デジタル'],
  },
  {
    phrase: 'delight',
    mean: ['喜び', '楽しみ'],
  },
  {
    phrase: 'design',
    mean: ['デザイン'],
  },
  { phrase: 'geek', mean: ['オタク'] },
];

/** 言葉の中で、dgdgdgdg とつながる文字（アクセント色にする） */
export const highlightChars = new Set(['d', 'g', '4', '駄', '菓', '子']);
