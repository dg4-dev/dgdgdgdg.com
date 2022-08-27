import { css } from "@emotion/react";
import Link from "next/link";

import type { NextPage } from "next";

import HeaderLink from "@/components/header/headerLink";
import dg4Color from "@/styles/config/color";

const nav = css`
  background-color: ${dg4Color.cyan};
`;

const Header: NextPage = () => {
  return (
    <header>
      <nav css={nav}>
        <ul>
          <li>
            <Link href={"/"}>Top</Link>
          </li>
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
