/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/react";

import { breakPoint } from "@/styles/config";

type itemProps =
  | {
      title: string;
      imgHref: string;
      link?: false;
      href?: undefined;
      className?: string;
    }
  | {
      title: string;
      imgHref: string;
      link: true;
      href: string;
      className?: string;
    }
  | {
      title: undefined;
      imgHref: string;
      link: true;
      href: undefined;
      className?: string;
    };

const Item = ({ title, imgHref, link = false, href, className = undefined }: itemProps) => {
  const item = css`
    width: calc((100% / 4) - 16px);
    padding-bottom: 24px;
    margin: 8px;

    ${breakPoint.tab} {
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

    ${breakPoint.sp} {
      font-size: 14px;
      line-height: 20px;
    }
  `;

  const isSvg = imgHref.includes("svg");
  const img = isSvg ? <object data={imgHref} type="image/svg+xml" /> : <img src={imgHref} alt="" />;

  return link ? (
    <div css={item} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="image" css={image}>
          {img}
        </div>
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
