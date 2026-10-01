// Notion のブロックを記事本文の HTML に変換する
// 記事ページ（src/pages/works/article/[id].astro）から使う

// ブロックをレンダリングするヘルパー関数（子ブロックも再帰的に処理）
function renderBlock(block: any): string {
  const { type, id, children } = block;
  const value = block[type];

  // 子ブロックのレンダリング
  const childrenHtml = children && children.length > 0 ? renderBlocks(children) : '';

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
      return `<pre><code class="language-${escapeHtml(value.language)}">${renderRichText(value.rich_text)}</code></pre>`;
    case 'image':
      const imageUrl = value.type === 'file' ? value.file.url : value.external.url;
      const caption = value.caption ? renderRichText(value.caption) : '';
      // alt には装飾タグを含めず、文字だけを入れる
      const alt = escapeHtml(plainText(value.caption));
      return `<figure><img src="${escapeHtml(imageUrl)}" alt="${alt}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
    case 'video':
      const videoUrl = value.type === 'file' ? value.file.url : value.external.url;
      const videoCaption = value.caption ? renderRichText(value.caption) : '';

      // YouTube/VimeoのURLを検出してiframeに変換
      function convertVideoUrl(url: string): { url: string; isEmbed: boolean } {
        try {
          const urlObj = new URL(url);

          // YouTube
          if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            let videoId = '';
            if (urlObj.hostname.includes('youtu.be')) {
              videoId = urlObj.pathname.slice(1);
            } else {
              videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop() || '';
            }
            if (videoId) {
              return { url: `https://www.youtube.com/embed/${videoId}`, isEmbed: true };
            }
          }

          // Vimeo
          if (urlObj.hostname.includes('vimeo.com')) {
            const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
            if (videoId) {
              return { url: `https://player.vimeo.com/video/${videoId}`, isEmbed: true };
            }
          }

          // その他のURLはvideoタグで表示
          return { url, isEmbed: false };
        } catch (e) {
          // URL解析に失敗した場合はvideoタグで表示
          return { url, isEmbed: false };
        }
      }

      const videoInfo = convertVideoUrl(videoUrl);
      const videoEscapedUrl = videoInfo.url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      // YouTube/Vimeoの場合はiframeで表示
      if (videoInfo.isEmbed) {
        return `<figure class="video-container">
          <div class="embed-container">
            <iframe 
              src="${videoEscapedUrl}" 
              loading="lazy" 
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          ${videoCaption ? `<figcaption>${videoCaption}</figcaption>` : ''}
        </figure>`;
      }

      // その他の場合はvideoタグで表示
      return `<figure class="video-container"><video src="${videoEscapedUrl}" controls preload="metadata"></video>${videoCaption ? `<figcaption>${videoCaption}</figcaption>` : ''}</figure>`;
    case 'divider':
      return '<hr />';
    case 'embed':
      // Notionのembedブロックをiframeで表示
      if (!value.url) return '';

      // URLをembed用に変換する関数
      function convertToEmbedUrl(url: string): { url: string; isTwitter: boolean } {
        try {
          const urlObj = new URL(url);

          // X (Twitter)
          if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
            // TwitterのツイートURLを検出
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            const statusIndex = pathParts.indexOf('status');
            if (statusIndex !== -1 && pathParts[statusIndex + 1]) {
              return { url, isTwitter: true };
            }
          }

          // YouTube
          if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            let videoId = '';

            // youtu.be形式: https://youtu.be/VIDEO_ID
            if (urlObj.hostname.includes('youtu.be')) {
              videoId = urlObj.pathname.split('/').filter(Boolean)[0] || '';
            }
            // youtube.com形式
            else if (urlObj.hostname.includes('youtube.com')) {
              // クエリパラメータから取得: ?v=VIDEO_ID
              videoId = urlObj.searchParams.get('v') || '';

              // クエリパラメータにない場合はパスから取得
              if (!videoId) {
                const pathParts = urlObj.pathname.split('/').filter(Boolean);
                // /embed/VIDEO_ID または /v/VIDEO_ID の形式
                const embedIndex = pathParts.indexOf('embed');
                const vIndex = pathParts.indexOf('v');

                if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
                  videoId = pathParts[embedIndex + 1];
                } else if (vIndex !== -1 && pathParts[vIndex + 1]) {
                  videoId = pathParts[vIndex + 1];
                } else if (pathParts.length > 0) {
                  // 最後のパスセグメントを試す
                  videoId = pathParts[pathParts.length - 1];
                }
              }
            }

            // videoIdが見つかった場合、クエリパラメータ（時間指定など）を保持
            if (videoId) {
              const timeParam = urlObj.searchParams.get('t');
              const embedUrl = timeParam
                ? `https://www.youtube.com/embed/${videoId}?start=${timeParam.replace(/[^0-9]/g, '')}`
                : `https://www.youtube.com/embed/${videoId}`;
              return { url: embedUrl, isTwitter: false };
            }
          }

          // Vimeo
          if (urlObj.hostname.includes('vimeo.com')) {
            const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
            if (videoId) {
              return { url: `https://player.vimeo.com/video/${videoId}`, isTwitter: false };
            }
          }

          // その他のURLはそのまま使用
          return { url, isTwitter: false };
        } catch (e) {
          // URL解析に失敗した場合はそのまま返す
          return { url, isTwitter: false };
        }
      }

      const embedInfo = convertToEmbedUrl(value.url);
      const escapedUrl = embedInfo.url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      // Twitterの場合は特別な処理
      if (embedInfo.isTwitter) {
        const twitterEscapedUrl = value.url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return `<div class="embed-container embed-twitter" data-embed-url="${twitterEscapedUrl}">
          <blockquote class="twitter-tweet" data-theme="light">
            <a href="${twitterEscapedUrl}"></a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>`;
      }

      // その他のサービスはiframeで表示
      return `<div class="embed-container" data-embed-url="${escapedUrl}">
        <iframe 
          src="${escapedUrl}" 
          loading="lazy" 
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div class="embed-fallback">
          <p>埋め込みコンテンツを表示できませんでした。</p>
          <a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">元のページを開く</a>
        </div>
      </div>`;
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
      return `<p><em>Unsupported block type: ${escapeHtml(type)}</em></p>${childrenHtml}`;
  }
}

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

// HTML の本文・属性に入れる文字列をエスケープする
export function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// リッチテキストを装飾なしの文字列にする
function plainText(richTextArray: any[] | undefined): string {
  return (richTextArray ?? []).map((text) => text.plain_text ?? '').join('');
}

// リッチテキストをHTMLに変換
function renderRichText(richTextArray: any[]) {
  if (!richTextArray || richTextArray.length === 0) return '';

  return richTextArray
    .map((text) => {
      // 文字をエスケープしてから装飾タグで囲む（コードに書いた <div> などをそのまま表示するため）
      let content = escapeHtml(text.plain_text ?? '');

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

// ブロックをグループ化してレンダリング（リストを適切に処理）
export function renderBlocks(blocks: any[]) {
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
