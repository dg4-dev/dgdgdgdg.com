import { UrlObject } from "url";

import { css } from "@emotion/react";
import Link from "next/link";

import { breakPoint, dg4Color } from "@/styles/config";

const headerLinkStyle = css`
  display: block;
  width: 100%;
  height: fit-content;
  padding: 10px 20px;
`;

const linkEN = css`
  font-family: "Dont", sans-serif;
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  opacity: 0.5;

  margin-left: 2px;
`;

const linkJA = css`
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  color: #fff;

  ${breakPoint.sp} {
    font-size: 20px;
  }
`;

const externalLinkStyle = css`
  display: block;
  width: 360px;
  height: 80px;

  padding: 15px 20px;
  background-color: #fff;
  border: 3px solid ${dg4Color.cyan};

  position: relative;
  transition: all 0.3s;

  ${breakPoint.sp} {
    width: 290px;
    height: 70px;

    padding: 10px 20px;
  }

  :hover {
    opacity: 1;
  }

  ::before {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 100%;
    background-color: ${dg4Color.cyan};

    top: 0;
    left: 0;
    transition: all 0.3s;
  }

  :hover::before {
    width: 100%;
  }

  :hover .en {
    color: #fff;
    opacity: 0.5;
    transition: all 0.3s;
  }

  :hover .ja {
    color: #fff;
    transition: all 0.3s;
  }

  :hover .ja::after {
    background-image: url("/images/icon-external-white.svg");
  }
`;

const externalLinkEN = css`
  position: relative;
  color: ${dg4Color.cyan};
  opacity: 0.5;
`;

const externalLinkJA = css`
  color: ${dg4Color.cyan};
  position: relative;
  width: fit-content;
  ::after {
    content: "";
    position: absolute;
    width: 13px;
    height: 13px;

    right: -18px;
    top: 0;
    bottom: 0;

    margin: auto 0;

    background-image: url("/images/icon-external.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

type Props = {
  href: string | UrlObject;
  en: string;
  ja: string;
  external?: Boolean;
};

const HeaderLink = ({ href, en, ja, external = false }: Props) => {
  return external ? (
    <a css={externalLinkStyle} href={`${href}`} target="_blank" rel="noopener noreferrer">
      <div className="en" css={[linkEN, externalLinkEN]}>
        {en}
      </div>
      <div className="ja" css={[linkJA, externalLinkJA]}>
        {ja}
      </div>
    </a>
  ) : (
    <Link href={href} passHref>
      <a css={headerLinkStyle}>
        <div className="en" css={linkEN}>
          {en}
        </div>
        <div className="ja" css={linkJA}>
          {ja}
        </div>
      </a>
    </Link>
  );
};

export default HeaderLink;
