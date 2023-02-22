import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import { dg4Color, breakPoint } from "@/styles/config";

const footerStyle = css`
  background-color: ${dg4Color.black};

  padding-top: 56px;
  padding-bottom: 90px;

  ${breakPoint.tab} {
    padding-top: 20px;
    padding-bottom: 70px;
  }
`;

const footerContainer = css`
  width: 1024px;
  display: flex;
  justify-content: space-between;

  ${breakPoint.tab} {
    flex-direction: column;
  }
`;

const contact = css``;

const messageContent = css`
  display: flex;
  gap: 24px;
  transform: translate(4px, 4px);

  ${breakPoint.sp} {
    margin-left: 8px;
  }
`;

const credit = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${breakPoint.tab} {
    margin-top: 40px;
    margin-left: auto;
  }

  ${breakPoint.sp} {
    width: auto;
    margin-left: unset;
  }
`;

const creditLogo = css`
  width: 100%;

  object {
    min-width: 384px;
    width: 100%;

    ${breakPoint.sp} {
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

    display: flex;

    ${breakPoint.sp} {
      flex-wrap: wrap;
    }
  `;

  const itemContent = css`
    width: 12.5%;
    ${breakPoint.sp} {
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
          <Image src={src} width="135" height="135" alt="" />
        </a>
      </li>
    );
  });
  return <ul css={linkItem}>{linkElm}</ul>;
};

const Footer: NextPage = () => {
  return (
    <footer id="footer" css={footerStyle}>
      <Container css={footerContainer}>
        <div css={contact}>
          <div className="content" css={messageContent}>
            <Button href="https://twitterdm.dgdgdgdg.com" text="Twitter DM" external={true} />
            <Button href="https://messenger.dgdgdgdg.com" text="Messenger" external={true} />
          </div>
          <LinkItems />
        </div>

        <div css={credit}>
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
