import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";

import type { NextPage } from "next";

import HeaderLink from "@/components/header/headerLink";
import common from "@/styles/common";
import bp from "@/styles/config/breakpoint";
import dg4Color from "@/styles/config/color";

const outside = css`
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  padding-left: 26px;
  z-index: 1000;

  ${bp.sp} {
    padding-left: 12px;
  }
`;

const logo = css`
  width: 150px;
  height: auto;

  ${bp.sp} {
    width: 120px;
  }
`;

const burger = css`
  width: 90px;
  height: 90px;
  background-color: ${dg4Color.cyan};

  justify-content: center;
  align-items: center;

  ${bp.sp} {
    width: 65px;
    height: 65px;
  }

  :hover .line-item1 {
    top: 6px;
    transition: all 0.2s;

    ${bp.sp} {
      top: 4px;
    }
  }
  :hover .line-item2 {
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s;
  }

  :hover .line-item3 {
    top: 18px;
    transition: all 0.2s;
    ${bp.sp} {
      top: 12px;
    }
  }
`;

const line = css`
  width: 35px;
  height: 27px;

  position: relative;

  ${bp.sp} {
    width: 30px;
    height: 19px;
  }

  .line-item {
    width: 100%;
    height: 3px;

    position: absolute;

    background-color: #fff;
  }

  .line-item1 {
    top: 0;
    transition: all 0.2s;
  }

  .line-item1.is-open {
    top: 12px;
    transition: all 0.2s;

    ${bp.sp} {
      top: 8px;
    }
  }

  .line-item2 {
    visibility: visible;
    opacity: 1;
    top: 12px;
    transition: all 0.2s;

    ${bp.sp} {
      top: 8px;
    }
  }

  .line-item2.is-open {
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s;
  }

  .line-item3 {
    top: 24px;
    transition: all 0.2s;
    ${bp.sp} {
      top: 16px;
    }
  }

  .line-item3.is-open {
    top: 12px;
    transition: all 0.2s;

    ${bp.sp} {
      top: 8px;
    }
  }
`;

const nav = css`
  background-color: ${dg4Color.cyan};
`;

const Header: NextPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  let openState = openMenu ? "is-open" : "";

  return (
    <header css={common.flex}>
      <div css={[outside, common.flex]}>
        <Link href="/">
          <a css={logo}>
            <object data="/images/logo.svg" type="image/svg+xml" />
          </a>
        </Link>
        <div css={[burger, common.click, common.flex]} onClick={() => menuFunction()}>
          <div css={[line, common.flex]}>
            <div className={`line-item line-item1 ${openState}`} />
            <div className={`line-item line-item2 ${openState}`} />
            <div className={`line-item line-item3 ${openState}`} />
          </div>
        </div>
      </div>

      <nav css={nav}>
        <ul>
          <li>
            <HeaderLink href="/about" en="About" ja="dgdgdgdgとは" />
            <ul>
              <li>
                <HeaderLink href="/about/brand" en="Brand resource" ja="ブランドリソース" />
              </li>
              <li>
                <HeaderLink href="/about/tool" en="Tool" ja="ツール一覧" />
              </li>
            </ul>
          </li>
          <li>
            <HeaderLink href="/works" en="Works" ja="dgdgdgdgの作品" />
          </li>
          <li>
            <HeaderLink href="/service" en="Service" ja="dgdgdgdgのプラン" />
          </li>
          <li>
            <HeaderLink href="/contact" en="Contact" ja="dgdgdgdgに問い合わせる" />
          </li>
        </ul>
      </nav>

      <HeaderLink
        href="https://www.radio.dgdgdgdg.com/"
        en="Enter the radio title"
        ja="ラジオのタイトルを入力"
        ext={true}
      />
      <HeaderLink href="https://www.apps.dgdgdgdg.com/" en="dg4 app archive" ja="dg4アプリアーカイブ" ext={true} />
    </header>
  );
};

export default Header;
