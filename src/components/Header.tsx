import { UrlObject } from "url";

import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";

import Logo from "./Logo";

import { dg4Color, breakPoint } from "@/styles/config";

const header = css`
  display: flex;

  justify-content: flex-end;
  .inside.is-open {
    height: 100vh;
    z-index: 999;
  }
`;

const outside = css`
  position: fixed;

  display: flex;
  align-items: center;

  gap: 20px;

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

  display: grid;
  place-items: center;

  ${breakPoint.sp} {
    width: 65px;
    height: 65px;
  }

  :hover rect:nth-of-type(1) {
    transform: translateY(6px);

    ${breakPoint.sp} {
      transform: translateY(4px);
    }
  }
  :hover rect:nth-of-type(2) {
    visibility: hidden;
    opacity: 0;
  }

  :hover rect:nth-of-type(3) {
    transform: translateY(18px);
    ${breakPoint.sp} {
      transform: translateY(12px);
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

  rect {
    width: 100%;
    height: 3px;

    position: absolute;

    fill: #fff;
    transition: all 0.2s;
  }

  rect:nth-of-type(1) {
    transform: translateY(0);
  }

  rect:nth-of-type(1).is-open {
    transform: translateY(12px);

    ${breakPoint.sp} {
      transform: translateY(8px);
    }
  }

  rect:nth-of-type(2) {
    visibility: visible;
    opacity: 1;
    transform: translateY(12px);

    ${breakPoint.sp} {
      transform: translateY(8px);
    }
  }

  rect:nth-of-type(2).is-open {
    visibility: hidden;
    opacity: 0;
  }

  rect:nth-of-type(3) {
    transform: translateY(24px);
    ${breakPoint.sp} {
      transform: translateY(16px);
    }
  }

  rect:nth-of-type(3).is-open {
    transform: translateY(12px);

    ${breakPoint.sp} {
      transform: translateY(8px);
    }
  }
`;

const inside = css`
  position: fixed;
  width: 100%;
  z-index: -999;

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

  display: grid;
  place-items: center;
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

  position: relative;

  display: grid;
  place-items: center;

  margin-left: auto;
  transition: all 0.2s;

  ${breakPoint.tab} {
    position: static;
  }

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
  font-family: "Dont-GR", sans-serif;
  font-variation-settings: "rnds" 0, "dtsz" 100;
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

    margin-top: auto;
    margin-bottom: auto;

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
    <a css={externalLinkStyle} href={href.toString()} target="_blank" rel="noopener noreferrer">
      <div className="en" css={[linkEN, externalLinkEN]}>
        {en}
      </div>
      <div className="ja" css={[linkJA, externalLinkJA]}>
        {ja}
      </div>
    </a>
  ) : (
    <Link href={href} css={headerLinkStyle} passHref>
      <div className="en" css={linkEN}>
        {en}
      </div>
      <div className="ja" css={linkJA}>
        {ja}
      </div>
    </Link>
  );
};

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => setOpenMenu(!openMenu);
  const menuReset = () => setOpenMenu(false);
  let openState = openMenu ? "is-open" : "";

  const extLinkContents = (
    <ul>
      <li>
        <HeaderLink
          href="https://www.solid.dgdgdgdg.com/"
          en="Solid Point"
          ja="Solid Point (共作チーム)"
          external={true}
        />
      </li>
      <li>
        <HeaderLink href="https://www.apps.dgdgdgdg.com/" en="dg4-apps" ja="dg4-apps" external={true} />
      </li>
    </ul>
  );

  return (
    <header css={header}>
      <div css={outside}>
        <Link href="/" css={logo} onClick={() => menuReset()}>
          <Logo />
        </Link>
        <div css={burger} className="clickable" onClick={() => menuFunction()}>
          <svg css={line}>
            <rect className={openState} />
            <rect className={openState} />
            <rect className={openState} />
          </svg>
        </div>
      </div>

      <div css={inside} className={`inside ${openState}`}>
        <div css={white} className={`white ${openState}`}>
          {extLinkContents}
        </div>
        <div css={cyan} className={`cyan ${openState}`}>
          <nav css={nav} className={`nav ${openState}`}>
            <ul>
              <HeaderLink href="/about" en="About" ja="dgdgdgdgとは" />
              <HeaderLink href="/works" en="Works" ja="作品紹介" />
            </ul>
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
