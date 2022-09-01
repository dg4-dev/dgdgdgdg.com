import { css } from "@emotion/react";
import Link from "next/link";

import type { NextPage } from "next";

import Container from "@/components/container";
import { flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const footerStyle = css`
  background-color: ${dg4Color.black};

  padding-top: 30px;
  padding-bottom: 90px;

  ${bp.tab} {
    padding-top: 20px;
    padding-bottom: 70px;
  }
`;

const container = css`
  display: flex;
  max-width: 1024px;
  width: 100%;
  justify-content: space-between;
  padding: 0 40px;

  ${bp.tab} {
    padding: 0 20px;
    justify-content: flex-end;
  }

  ${bp.sp} {
    padding: 0 12px;
  }
`;

const pageList = css`
  gap: 0 40px;

  ${bp.tab} {
    display: none;
  }

  li {
    flex-direction: column;
  }
  li a {
    font-weight: bold;
    color: #fff;

    padding: 10px 0;
  }

  li a.child-page::before {
    content: "└ ";
  }

  li a.page-link {
    font-family: "Dont", sans-serif;
    font-size: 24px;
    font-weight: normal;
    opacity: 0.6;
  }

  li a.page-link:hover {
    opacity: 0.1;
  }
`;

const credit = css`
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
`;

const iconWrapper = css`
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const text = css`
  display: block;
  color: ${dg4Color.cyan};
  font-family: "Dont", sans-serif;
  font-size: 16px;
  margin-right: 8px;
`;

const iconItem = css`
  a {
    width: 40px;
    height: 40px;
    padding: 8px;
  }

  a object {
    width: 100%;
    height: 100%;
  }
`;

const linkPrivacy = css`
  text-decoration: underline;
  display: block;
  margin-bottom: 12px;
`;

const whiteText = css`
  font-size: 12px;
  color: #fff;
`;

const Footer: NextPage = () => {
  return (
    <footer css={footerStyle}>
      <Container css={container}>
        <ul css={[pageList, flex]}>
          <li css={flex}>
            <Link href="/about/">
              <a className="page-link">About</a>
            </Link>
            <ul>
              <li>
                <Link href="/about/#overview">概要</Link>
              </li>
              <li>
                <Link href="/about/brand/">
                  <a className="child-page">ブランドリソース</a>
                </Link>
              </li>
              <li>
                <Link href="/about/#skill">スキル</Link>
              </li>
              <li>
                <Link href="/about/#tool">ツール</Link>
              </li>
              <li>
                <Link href="/about/tool/">
                  <a className="child-page">ツール一覧</a>
                </Link>
              </li>
            </ul>
          </li>
          <li css={flex}>
            <Link href="/works/">
              <a className="page-link">Works</a>
            </Link>
            <ul>
              <li>
                <Link href="/works/#font">フォント</Link>
              </li>
              <li>
                <Link href="/works/#logo">ロゴ</Link>
              </li>
              <li>
                <Link href="/works/#photo">写真</Link>
              </li>
              <li>
                <Link href="/works/#video">動画</Link>
              </li>
              <li>
                <Link href="/works/#web">Webサイト</Link>
              </li>
            </ul>
          </li>
          <li css={flex}>
            <Link href="/service/">
              <a className="page-link">Service</a>
            </Link>
            <ul>
              <li>
                <Link href="/service/#flow">制作の流れ</Link>
              </li>
              <li>
                <Link href="/service/#plan">プラン</Link>
              </li>
            </ul>
          </li>
          <li css={flex}>
            <Link href="/contact/">
              <a className="page-link">Contact</a>
            </Link>
            <ul>
              <li>
                <Link href="/contact/#message">メッセージ</Link>
              </li>
              <li>
                <Link href="/contact/#link">リンク</Link>
              </li>
            </ul>
          </li>
        </ul>
        <div css={[credit, flex]}>
          <ul css={[iconWrapper, flex]}>
            <p css={text}>Share on</p>
            <li css={iconItem}>
              <a
                href="https://twitter.com/intent/tweet?text=%0a%23dg4_design%20@dg4_design%20より%0ahttps://dgdgdgdg.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <object data="/images/icon-twitter.svg" type="image/svg+xml" />
              </a>
            </li>
            <li css={iconItem}>
              <a
                href="http://www.facebook.com/share.php?u=https://dgdgdgdg.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <object data="/images/icon-facebook.svg" type="image/svg+xml" />
              </a>
            </li>
          </ul>
          <Link href="/privacy-policy/">
            <a css={[linkPrivacy, whiteText]}>プライバシーポリシー</a>
          </Link>
          <p css={whiteText}>©︎ 2021 dgdgdgdg</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
