import { css } from "@emotion/react";
import Image from "next/image";

import { bp } from "@/styles/config";

type itemProps =
  | {
      title: string;
      imgHref: string;
      link?: false;
      href?: undefined;
    }
  | {
      title: string;
      imgHref: string;
      link: true;
      href: string;
    };

const Item = ({ title, imgHref, link = false, href }: itemProps) => {
  const item = css`
    width: calc((100% / 4) - 16px);
    padding-bottom: 24px;
    margin: 8px;

    ${bp.tab} {
      width: calc(50% - 16px);
    }
  `;

  const image = css`
    display: block;
    object {
      padding: 50px 0;
    }
  `;

  const heading4 = css`
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    margin-top: 20px;

    ${bp.sp} {
      font-size: 14px;
      line-height: 20px;
    }
  `;

  const isSvg = imgHref.includes("svg");
  const img = isSvg ? (
    <object data={imgHref} type="image/svg+xml" />
  ) : (
    <Image src={imgHref} width={496} height={339} alt="" />
  );

  return link ? (
    <div css={item}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div css={image}>{img}</div>
        <h4 css={heading4}>{title}</h4>
      </a>
    </div>
  ) : (
    <div css={item}>
      <div css={image}>{img}</div>
      <h4 css={heading4}>{title}</h4>
    </div>
  );
};

export default Item;
