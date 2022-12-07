import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import { flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const footerStyle = css`
  background-color: ${dg4Color.black};

  padding-top: 64px;
  padding-bottom: 90px;

  ${bp.tab} {
    padding-top: 40px;
    padding-bottom: 70px;
  }
`;

const footerContainer = css`
  width: 1024px;
  display: flex;
  justify-content: space-between;

  ${bp.tab} {
    flex-direction: column;
  }
`;

const messageContent = css`
  gap: 24px;
  transform: translate(4px, 4px);

  ${bp.sp} {
    justify-content: center;
  }
`;

const footerBtn = css`
  position: relative;
  padding-left: 44px;

  ${bp.sp} {
    padding-left: 36px;
  }

  ::before {
    content: "";
    display: block;
    width: 40px;
    height: 40px;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 4px;

    margin: auto 0;

    ${bp.sp} {
      width: 32px;
      height: 32px;
    }
  }
`;

const tdmBtn = css`
  ::before {
    background-image: url("/images/icon/twitter.svg");
  }
`;

const mesBtn = css`
  ::before {
    background-image: url("/images/icon/messenger.svg");
  }
`;

const credit = css`
  flex-direction: column;
  align-items: flex-end;

  ${bp.tab} {
    margin-top: 40px;
    margin-left: auto;
  }

  ${bp.sp} {
    width: auto;
    margin-top: 24px;
    margin-left: unset;
  }
`;

const creditLogo = css`
  width: 100%;

  object {
    min-width: 384px;

    ${bp.sp} {
      min-width: unset;
      margin: 0 4px;
    }
  }
`;

const linkPrivacy = css`
  text-decoration: underline;
  display: block;
  margin-top: 20px;
  margin-bottom: 12px;
`;

const whiteText = css`
  font-size: 12px;
  color: #fff;
`;

const LinkItems = () => {
  const linkItem = css`
    max-width: 600px;
    margin-top: 32px;
    transform: translate(-22px, 0);

    ${bp.sp} {
      flex-wrap: wrap;
      transform: unset;
      max-width: unset;
    }
  `;

  const itemContent = css`
    width: 12.5%;
    ${bp.sp} {
      width: 25%;
    }
  `;

  const linkData = ["note", "zenn", "twitter", "facebook", "youtube", "instagram", "github", "suzuri"];

  const linkElm = linkData.map((value) => {
    const href = `https://${value}.dgdgdgdg.com`;
    const src = `/images/icon/${value}.svg`;

    return (
      <li key={value} css={itemContent}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Image className="img" src={src} width="154" height="154" alt="" />
        </a>
      </li>
    );
  });
  return <ul css={[linkItem, flex]}>{linkElm}</ul>;
};

const Footer: NextPage = () => {
  return (
    <footer id="footer" css={footerStyle}>
      <Container css={footerContainer}>
        <div>
          <div className="content" css={[messageContent, flex]}>
            <Button css={[footerBtn, tdmBtn]} href="https://twitterdm.dgdgdgdg.com" text="Twitter DM" ext={true} />
            <Button css={[footerBtn, mesBtn]} href="https://messenger.dgdgdgdg.com" text="Messenger" ext={true} />
          </div>
          <LinkItems />
        </div>

        <div css={[credit, flex]}>
          <Link href="/">
            <a css={creditLogo}>
              <object data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
            </a>
          </Link>
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
