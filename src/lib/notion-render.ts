// Notion のブロックを記事本文の HTML に変換する
// 記事ページ（src/pages/works/article/[id].astro）から使う

import { keepSentenceEnds } from './budoux';
import { escapeHtml } from './html';

export { escapeHtml };

// ブロックをレンダリングするヘルパー関数（子ブロックも再帰的に処理）
function renderBlock(block: any): string {
  const { type, children } = block;
  const value = block[type];

  // 子ブロックのレンダリング
  const childrenHtml = children && children.length > 0 ? renderBlockList(children) : '';

  switch (type) {
    case 'paragraph':
      // インデントした子ブロックは段落の後に続けて出す
      return `<p>${renderRichText(value.rich_text)}</p>${childrenHtml ? `<div class="block-children">${childrenHtml}</div>` : ''}`;
    // 見出しの子ブロック（トグル見出しの中身）は、開いた状態で見出しの後に出す
    case 'heading_1':
      return `<h1>${renderRichText(value.rich_text)}</h1>${childrenHtml}`;
    case 'heading_2':
      return `<h2>${renderRichText(value.rich_text)}</h2>${childrenHtml}`;
    case 'heading_3':
      return `<h3>${renderRichText(value.rich_text)}</h3>${childrenHtml}`;
    case 'bulleted_list_item':
      return `<li>${renderRichText(value.rich_text)}${childrenHtml}</li>`;
    case 'numbered_list_item':
      return `<li>${renderRichText(value.rich_text)}${childrenHtml}</li>`;
    case 'to_do':
      const checked = value.checked ? 'checked' : '';
      return `<li class="todo-item"><input type="checkbox" ${checked} disabled /> <span>${renderRichText(value.rich_text)}</span>${childrenHtml}</li>`;
    case 'toggle':
      return `<details class="toggle-block"><summary>${renderRichText(value.rich_text)}</summary><div class="toggle-content">${childrenHtml}</div></details>`;
    case 'child_page':
      // 子ページは表示しない
      return '';
    case 'callout': {
      // アイコンは絵文字のときだけ出す（画像のアイコンは使っていない）
      const icon =
        value.icon?.type === 'emoji'
          ? `<span class="callout-icon" aria-hidden="true">${escapeHtml(value.icon.emoji)}</span>`
          : '';
      const text = renderRichText(value.rich_text);
      return `<aside class="callout">${icon}<div class="callout-body">${text ? `<p>${text}</p>` : ''}${childrenHtml}</div></aside>`;
    }
    case 'quote':
      return `<blockquote><p>${renderRichText(value.rich_text)}</p>${childrenHtml}</blockquote>`;
    case 'column_list':
      return `<div class="columns">${childrenHtml}</div>`;
    case 'column': {
      // 列の幅（Notion で列の幅を変えたときだけ width_ratio が入る）
      const ratio = typeof value?.width_ratio === 'number' ? value.width_ratio : 1;
      return `<div class="column" style="flex-grow: ${ratio}">${childrenHtml}</div>`;
    }
    case 'synced_block':
      // 同期ブロックは見た目を持たないので、中身だけを出す
      return childrenHtml;
    case 'code':
      return `<pre><code class="language-${escapeHtml(value.language)}">${renderRichText(value.rich_text, { keepEnds: false })}</code></pre>`;
    case 'image':
      const imageUrl = value.type === 'file' ? value.file.url : value.external.url;
      const caption = value.caption ? renderRichText(value.caption) : '';
      // alt には装飾タグを含めず、文字だけを入れる
      const alt = escapeHtml(plainText(value.caption));
      return `<figure><img src="${escapeHtml(imageUrl)}" alt="${alt}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
    case 'video': {
      const videoUrl = value.type === 'file' ? value.file.url : value.external.url;
      const videoCaption = value.caption ? renderRichText(value.caption) : '';
      const figcaption = videoCaption ? `<figcaption>${videoCaption}</figcaption>` : '';
      const embedUrl = toVideoEmbedUrl(videoUrl);

      // YouTube/Vimeoの場合はiframeで表示
      if (embedUrl) {
        return `<figure class="video-container"><div class="embed-container">${iframe(embedUrl)}</div>${figcaption}</figure>`;
      }

      // その他の場合はvideoタグで表示
      return `<figure class="video-container"><video src="${escapeHtml(videoUrl)}" controls preload="metadata"></video>${figcaption}</figure>`;
    }
    case 'divider':
      return '<hr />';
    case 'embed': {
      // Notionのembedブロックをiframeで表示
      if (!value.url) return '';

      // X (Twitter) の投稿は blockquote にし、widgets.js で埋め込みに変える（読み込みは renderBlocks で 1 回だけ）
      if (isTweetUrl(value.url)) {
        const tweetUrl = escapeHtml(value.url);
        return `<div class="embed-container embed-twitter" data-embed-url="${tweetUrl}"><blockquote class="twitter-tweet"><a href="${tweetUrl}"></a></blockquote></div>`;
      }

      // YouTube/Vimeo は埋め込み用の URL に変え、その他のサービスはそのまま iframe で表示
      const embedUrl = escapeHtml(toVideoEmbedUrl(value.url) ?? value.url);
      return `<div class="embed-container" data-embed-url="${embedUrl}">
        ${iframe(embedUrl)}
        <div class="embed-fallback">
          <p>埋め込みコンテンツを表示できませんでした。</p>
          <a href="${embedUrl}" target="_blank" rel="noopener noreferrer">元のページを開く</a>
        </div>
      </div>`;
    }
    case 'table':
      return renderTable(value, children ?? []);
    case 'table_row':
      // table_rowは親のtableブロック内で処理されるためここでは処理しない
      return '';
    case 'bookmark': {
      // Notionのbookmarkブロックをリンクカードとして表示（タイトル・説明・ファビコン・OG画像付き）
      if (!value.url) return '';
      const bookmarkUrl = value.url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const bookmarkCaption = value.caption && value.caption.length > 0 ? renderRichText(value.caption) : '';
      const og = block._og;
      const favicon = block._favicon ?? '';
      const titleText = og?.title ? escapeHtml(og.title) : bookmarkCaption || escapeHtml(value.url);
      const descText = og?.description ? escapeHtml(og.description) : '';
      const rawDisplay = value.url.replace(/^https?:\/\//, '');
      const displayUrl = rawDisplay.length > 50 ? rawDisplay.slice(0, 50) + '...' : rawDisplay;
      const imgUrl = og?.image ? og.image.replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '';
      return `<div class="bookmark-container">
        <a href="${bookmarkUrl}" target="_blank" rel="noopener noreferrer" class="bookmark-link">
          <div class="bookmark-left">
            <div class="bookmark-title">${titleText}</div>
            ${descText ? `<div class="bookmark-description">${descText}</div>` : ''}
            <div class="bookmark-meta">
              ${favicon ? `<img class="bookmark-favicon" src="${favicon.replace(/"/g, '&quot;')}" alt="" width="16" height="16" />` : ''}
              <span class="bookmark-url">${escapeHtml(displayUrl)}</span>
            </div>
          </div>
          ${imgUrl ? `<div class="bookmark-right"><img class="bookmark-og-image" src="${imgUrl}" alt="" loading="lazy" /></div>` : ''}
        </a>
      </div>`;
    }
    default:
      // 未対応のブロックでも、子ブロックの中身は消さずに出す
      // 「Unsupported block type」は開発時だけ表示し、本番では出さない
      return `${import.meta.env?.DEV ? `<p><em>Unsupported block type: ${escapeHtml(type)}</em></p>` : ''}${childrenHtml}`;
  }
}

// 埋め込み用の iframe（src はエスケープ済みの URL を渡す）
function iframe(escapedSrc: string): string {
  return `<iframe src="${escapedSrc}" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
}

/**
 * YouTube・Vimeo の URL を埋め込み用の URL にする。それ以外は null。
 * YouTube は youtu.be/ID・watch?v=ID・/embed/ID・/v/ID・/shorts/ID などに対応し、t（秒）は start にする。
 */
function toVideoEmbedUrl(url: string): string | null {
  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch {
    return null;
  }
  const { hostname, pathname, searchParams } = urlObj;
  const pathParts = pathname.split('/').filter(Boolean);

  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    let videoId = '';
    if (hostname.includes('youtu.be')) {
      videoId = pathParts[0] ?? '';
    } else {
      const markerIndex = pathParts.findIndex((part) => part === 'embed' || part === 'v');
      videoId =
        searchParams.get('v') ||
        (markerIndex !== -1 ? (pathParts[markerIndex + 1] ?? '') : (pathParts[pathParts.length - 1] ?? ''));
    }
    if (!videoId) return null;
    const start = searchParams.get('t')?.replace(/[^0-9]/g, '');
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}${start ? `?start=${start}` : ''}`;
  }

  if (hostname.includes('vimeo.com')) {
    const videoId = pathParts[pathParts.length - 1];
    return videoId ? `https://player.vimeo.com/video/${encodeURIComponent(videoId)}` : null;
  }

  return null;
}

// X (Twitter) の投稿の URL か（/ユーザー名/status/ID の形）
function isTweetUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    const isTwitter = hostname.includes('twitter.com') || hostname.includes('x.com');
    const pathParts = pathname.split('/').filter(Boolean);
    const statusIndex = pathParts.indexOf('status');
    return isTwitter && statusIndex !== -1 && Boolean(pathParts[statusIndex + 1]);
  } catch {
    return false;
  }
}

/**
 * ツイートの埋め込みを、ページのテーマに合わせて widgets.js で表示するスクリプト。
 * テーマはヘッダーの切り替え（src/components/header.astro の initWorksThemeToggle）と同じく、
 * sessionStorage の works-dark、なければ端末の設定で決める。
 * View Transitions でページを移動したときは、読み込み済みの widgets.js で埋め込みだけを作り直す。
 * 同じ記事に戻ったときも実行されるよう、data-astro-rerun を付ける（Astro は一度実行したスクリプトを実行し直さない）。
 */
const TWEET_SCRIPT = `<script data-astro-rerun>
(() => {
  let dark = false;
  try {
    const saved = sessionStorage.getItem('works-dark');
    dark = saved !== null ? saved === '1' : matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {}
  document.querySelectorAll('blockquote.twitter-tweet').forEach((el) => el.setAttribute('data-theme', dark ? 'dark' : 'light'));
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.charset = 'utf-8';
  document.head.appendChild(script);
})();
</script>`;

// テーブルを table_row の子ブロックから組み立てる
function renderTable(value: any, rows: any[]): string {
  const hasColumnHeader = Boolean(value.has_column_header);
  const hasRowHeader = Boolean(value.has_row_header);

  const renderRow = (row: any, rowIndex: number) => {
    const cells: any[][] = row.table_row?.cells ?? [];
    const cellsHtml = cells
      .map((cell, colIndex) => {
        const content = renderRichText(cell);
        if (hasColumnHeader && rowIndex === 0) return `<th scope="col">${content}</th>`;
        if (hasRowHeader && colIndex === 0) return `<th scope="row">${content}</th>`;
        return `<td>${content}</td>`;
      })
      .join('');
    return `<tr>${cellsHtml}</tr>`;
  };

  const tableRows = rows.filter((row) => row.type === 'table_row');
  const headRows = hasColumnHeader ? tableRows.slice(0, 1) : [];
  const bodyRows = hasColumnHeader ? tableRows.slice(1) : tableRows;
  const offset = headRows.length;

  const thead = headRows.length ? `<thead>${headRows.map((row, i) => renderRow(row, i)).join('')}</thead>` : '';
  const tbody = `<tbody>${bodyRows.map((row, i) => renderRow(row, i + offset)).join('')}</tbody>`;
  return `<div class="table-container"><table>${thead}${tbody}</table></div>`;
}

// 文中の URL（http:// / https:// に続く ASCII の文字）は文節に分けない
const URL_PATTERN = /(https?:\/\/[!-~]+)/;

// 文末の文節を途中で改行しないようにする（URL の部分はエスケープだけ）
function wrapText(text: string, endsBlock: boolean): string {
  const parts = text.split(URL_PATTERN);
  return parts
    .map((part, i) =>
      i % 2 === 1 ? escapeHtml(part) : keepSentenceEnds(part, { endsBlock: endsBlock && i === parts.length - 1 }),
    )
    .join('');
}

// リッチテキストを装飾なしの文字列にする
function plainText(richTextArray: any[] | undefined): string {
  return (richTextArray ?? []).map((text) => text.plain_text ?? '').join('');
}

// リッチテキストをHTMLに変換
function renderRichText(richTextArray: any[], { keepEnds = true }: { keepEnds?: boolean } = {}) {
  if (!richTextArray || richTextArray.length === 0) return '';

  return richTextArray
    .map((text, index) => {
      // 文字をエスケープしてから装飾タグで囲む（コードに書いた <div> などをそのまま表示するため）
      // 文末の文節は途中で改行しないようにする。コードはそのまま
      const plain = text.plain_text ?? '';
      const endsBlock = index === richTextArray.length - 1;
      let content = keepEnds && !text.annotations.code ? wrapText(plain, endsBlock) : escapeHtml(plain);

      if (text.annotations.bold) content = `<strong>${content}</strong>`;
      if (text.annotations.italic) content = `<em>${content}</em>`;
      if (text.annotations.strikethrough) content = `<s>${content}</s>`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.code) content = `<code>${content}</code>`;
      if (text.href) content = `<a href="${escapeHtml(text.href)}">${content}</a>`;

      return content;
    })
    .join('');
}

/** 記事本文のブロックを HTML にする。ツイートの埋め込みがあれば、widgets.js を読み込むスクリプトを 1 回だけ付ける */
export function renderBlocks(blocks: any[]): string {
  const html = renderBlockList(blocks);
  return html.includes('class="twitter-tweet"') ? html + TWEET_SCRIPT : html;
}

// ブロックをグループ化してレンダリング（リストを適切に処理）
function renderBlockList(blocks: any[]): string {
  const result: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const type = block.type;

    // 連続するリストアイテムをグループ化
    if (type === 'bulleted_list_item') {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(renderBlock(blocks[i]));
        i++;
      }
      result.push(`<ul>${items.join('')}</ul>`);
    } else if (type === 'numbered_list_item') {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(renderBlock(blocks[i]));
        i++;
      }
      result.push(`<ol>${items.join('')}</ol>`);
    } else if (type === 'to_do') {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === 'to_do') {
        items.push(renderBlock(blocks[i]));
        i++;
      }
      result.push(`<ul class="todo-list">${items.join('')}</ul>`);
    } else {
      result.push(renderBlock(block));
      i++;
    }
  }

  return result.join('');
}
