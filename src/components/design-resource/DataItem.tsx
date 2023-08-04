import { css } from "@emotion/react";
import Image from "next/image";

import { breakPoint, dg4Color } from "@/styles/config";

const DataItem = ({ name }: { name: string }) => {
  const logoItem = css`
    height: 160px;
    width: calc((100% / 3) - 16px);
    position: relative;
    padding: 24px;
    margin: 8px;

    display: flex;

    border-radius: 16px;

    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;

    ${breakPoint.sp} {
      width: calc(100% - 16px);
    }
  `;

  const img = css`
    object-fit: contain;
  `;

  const linkWrap = css`
    position: absolute;
    bottom: 10px;
    right: 10px;

    a {
      display: inline;
      word-break: break-all;
      font-size: 20px;
      font-weight: bold;
      color: ${dg4Color.cyan};
      text-decoration: underline;
    }
    a:not(:first-of-type) {
      margin-left: 8px;
    }
  `;

  const isWhite = name.includes("white");
  const white = isWhite
    ? css`
        background-color: #444;
        background-image: linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%),
          linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%);
        background-size: 40px 40px;
        background-position: 0 0, 20px 20px;
      `
    : css``;

  const imgHref = `/images/dist/${name}.png`;

  return (
    <div css={[logoItem, white]}>
      <Image css={img} src={imgHref} width={552} height={264} alt={name} />
      <div css={linkWrap}>
        <a href={imgHref} download>
          .svg
        </a>
        <a href={imgHref} download>
          .png
        </a>
      </div>
    </div>
  );
};

export default DataItem;
