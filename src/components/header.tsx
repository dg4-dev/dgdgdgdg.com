import { UrlObject } from "url";

import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";

import type { NextPage } from "next";

import pageName from "@/pages/api/pageName";
import { dg4Color, breakPoint } from "@/styles/config";

const header = css`
  display: flex;
  .inside.is-open {
    height: 100vh;
  }
`;

const outside = css`
  position: fixed;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 26px;
  z-index: 1000;

  ${breakPoint.sp} {
    padding-left: 12px;
  }
`;

const logo = css`
  width: 150px;
  height: auto;

  ${breakPoint.sp} {
    width: 120px;
  }
`;

const burger = css`
  width: 90px;
  height: 90px;
  background-color: ${dg4Color.cyan};

  display: flex;
  justify-content: center;
  align-items: center;

  ${breakPoint.sp} {
    width: 65px;
    height: 65px;
  }

  :hover .line-item1 {
    top: 6px;

    ${breakPoint.sp} {
      top: 4px;
    }
  }
  :hover .line-item2 {
    visibility: hidden;
    opacity: 0;
  }

  :hover .line-item3 {
    top: 18px;
    ${breakPoint.sp} {
      top: 12px;
    }
  }
`;

const line = css`
  width: 35px;
  height: 27px;

  display: flex;

  position: relative;

  ${breakPoint.sp} {
    width: 30px;
    height: 19px;
  }

  .line-item {
    width: 100%;
    height: 3px;

    position: absolute;

    background-color: #fff;
    transition: all 0.2s;
  }

  .line-item1 {
    top: 0;
  }

  .line-item1.is-open {
    top: 12px;

    ${breakPoint.sp} {
      top: 8px;
    }
  }

  .line-item2 {
    visibility: visible;
    opacity: 1;
    top: 12px;

    ${breakPoint.sp} {
      top: 8px;
    }
  }

  .line-item2.is-open {
    visibility: hidden;
    opacity: 0;
  }

  .line-item3 {
    top: 24px;
    ${breakPoint.sp} {
      top: 16px;
    }
  }

  .line-item3.is-open {
    top: 12px;

    ${breakPoint.sp} {
      top: 8px;
    }
  }
`;

const inside = css`
  position: fixed;
  width: 100%;
  z-index: 999;

  display: flex;
  justify-content: space-between;

  .white.is-open {
    left: 0;
  }

  .cyan.is-open {
    width: 40%;
    height: 100vh;

    ${breakPoint.tab} {
      width: 100%;
      justify-content: normal;
      padding-top: 100px;
      padding-bottom: 100px;

      overflow-y: auto;
    }

    ${breakPoint.sp} {
      visibility: visible;
      padding-top: 70px;
      padding-bottom: 170px;
    }
  }
`;

const white = css`
  position: absolute;
  top: 0;
  left: -60%;
  width: 60%;
  height: 100vh;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  ${breakPoint.tab} {
    display: none;
  }

  ul li:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const cyan = css`
  width: 90px;
  height: 90px;
  background-color: ${dg4Color.cyan};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  transition: all 0.2s;

  ${breakPoint.sp} {
    width: 65px;
    height: 65px;
    visibility: hidden;
  }

  .nav.is-open {
    visibility: visible;
    opacity: 1;
  }

  .link-wrapper.is-open {
    visibility: visible;
    opacity: 1;
  }
`;

const nav = css`
  visibility: hidden;
  opacity: 0;

  ${breakPoint.tab} {
    width: 354px;
  }
  ${breakPoint.sp} {
    width: 284px;
  }

  ul li:not(:first-of-type) {
    margin-top: 26px;

    ${breakPoint.sp}
    margin-top: 16px;
  }

  ul li.indent {
    padding-left: 32px;
    margin-top: 0px;
  }

  ul li.indent a .ja {
    font-size: 20px;
    ${breakPoint.sp} {
      font-size: 16px;
    }
  }
`;

const linkWrapper = css`
  display: none;
  visibility: hidden;
  opacity: 0;
  margin-top: 24px;
  ${breakPoint.tab} {
    display: block;
  }

  ul li:not(:first-of-type) {
    margin-top: 20px;
  }
`;

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

const Header: NextPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => setOpenMenu(!openMenu);
  const menuReset = () => setOpenMenu(false);
  let openState = openMenu ? "is-open" : "";

  const linkContents = pageName.map(({ child, href, en, ja }) => {
    const isIndent = child ? "indent" : "";
    const linkContent = (
      <li className={isIndent} key={en} onClick={() => menuReset()}>
        <HeaderLink href={href} en={en} ja={ja} />
      </li>
    );
    return linkContent;
  });

  const extLinkContents = (
    <ul>
      <li>
        <HeaderLink
          href="https://www.radio.dgdgdgdg.com/"
          en="Enter the radio title"
          ja="ラジオのタイトルを入力"
          external={true}
        />
      </li>
      <li>
        <HeaderLink
          href="https://www.apps.dgdgdgdg.com/"
          en="dg4 app archive"
          ja="dg4アプリアーカイブ"
          external={true}
        />
      </li>
    </ul>
  );

  return (
    <header css={header}>
      <div css={outside}>
        <Link href="/">
          <a css={logo} onClick={() => menuReset()}>
            <object data="/images/logo.svg" type="image/svg+xml" />
          </a>
        </Link>
        <div css={burger} className="clickable" onClick={() => menuFunction()}>
          <div css={line}>
            <div className={`line-item line-item1 ${openState}`} />
            <div className={`line-item line-item2 ${openState}`} />
            <div className={`line-item line-item3 ${openState}`} />
          </div>
        </div>
      </div>

      <div css={inside} className={`inside ${openState}`}>
        <div css={white} className={`white ${openState}`}>
          {extLinkContents}
        </div>
        <div css={cyan} className={`cyan ${openState}`}>
          <nav css={nav} className={`nav ${openState}`}>
            <ul>{linkContents}</ul>
          </nav>
          <div css={linkWrapper} className={`link-wrapper ${openState}`}>
            {extLinkContents}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
