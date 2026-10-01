// budoux の入口（index.js）から読み込むと、使わない HTML 処理用の linkedom まで
// Worker のバンドルに入る（約 500KB）。パッケージの exports では Parser とモデルだけを
// 読み込めないので、ファイルを直接読み込む
import { Parser } from '../../node_modules/budoux/module/parser.js';
import { model as jaModel } from '../../node_modules/budoux/module/data/models/ja.js';
import { escapeHtml } from './html';

const parser = new Parser(jaModel);

/** 文末とみなす文節（。！？ のあとに閉じかっこが続いてもよい） */
const SENTENCE_END = /[。．！？!?][」』）)\]】"”]*\s*$/;

/**
 * 文字をエスケープし、文末の文節だけを <span class="phrase-end"> で囲んだ HTML を返す。
 * 文の途中はどこで改行してもよく、文末の文節だけは途中で改行しない
 * （「た。」など 1〜2 文字だけの行ができないようにする）。
 * @param endsBlock true なら、記号がなくても最後の文節を文末として扱う（見出しや段落の終わり）
 */
export function keepSentenceEnds(text: string, { endsBlock = true }: { endsBlock?: boolean } = {}): string {
  const phrases = parser.parse(text);
  return phrases
    .map((phrase, i) => {
      const isEnd = SENTENCE_END.test(phrase) || (endsBlock && i === phrases.length - 1);
      return isEnd && phrase.trim() ? `<span class="phrase-end">${escapeHtml(phrase)}</span>` : escapeHtml(phrase);
    })
    .join('');
}
