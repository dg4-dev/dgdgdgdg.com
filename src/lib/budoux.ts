// budoux の入口（index.js）から読み込むと、使わない HTML 処理用の linkedom まで
// Worker のバンドルに入る（約 500KB）。パッケージの exports では Parser とモデルだけを
// 読み込めないので、ファイルを直接読み込む
import { Parser } from '../../node_modules/budoux/module/parser.js';
import { model as jaModel } from '../../node_modules/budoux/module/data/models/ja.js';
import { escapeHtml } from './html';

const parser = new Parser(jaModel);

/**
 * 日本語の文を文節に分け、エスケープしてから <wbr> でつないだ HTML を返す。
 * 使う要素には .phrases（word-break: keep-all）を付け、文節の途中で改行しないようにする。
 */
export function wrapPhrases(text: string): string {
  return parser.parse(text).map(escapeHtml).join('<wbr>');
}
