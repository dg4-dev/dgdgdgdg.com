import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { dg4Color, breakPoint } from "@/styles/config";

const footerStyle = css`
  background-color: ${dg4Color.black};

  padding-top: 64px;
  padding-bottom: 90px;

  ${breakPoint.tab} {
    padding-top: 40px;
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

const messageContent = css`
  display: flex;
  gap: 24px;
  transform: translate(4px, 4px);

  ${breakPoint.sp} {
    justify-content: center;
  }
`;

const footerButton = css`
  position: relative;
  padding-left: 44px;

  ${breakPoint.sp} {
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

    background-size: contain;
    background-repeat: no-repeat;

    ${breakPoint.sp} {
      width: 32px;
      height: 32px;
    }
  }
`;

const messengerButton = css`
  ::before {
    background-image: url("/images/icon/messenger.svg");
  }
`;

const emailButton = css`
  ::before {
    background-size: 22px;
    background-position: center;
    background-image: url("/images/ui/envelope-fill.svg");
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
    margin-top: 24px;
    margin-left: unset;
  }
`;

const creditLogo = css`
  width: 100%;

  object {
    min-width: 384px;

    ${breakPoint.sp} {
      min-width: unset;
      margin: 0 4px;
    }
  }
`;

const copyRightText = css`
  font-size: 12px;
  color: #fff;

  margin-top: 20px;
`;

const LinkItems = () => {
  const linkItem = css`
    max-width: 600px;
    margin-top: 32px;
    transform: translate(-22px, 0);

    display: flex;

    ${breakPoint.sp} {
      flex-wrap: wrap;
      transform: unset;
      max-width: unset;
    }
  `;

  const itemContent = css`
    width: 12.5%;
    ${breakPoint.sp} {
      width: 25%;
    }
  `;

  const linkData = ["zenn", "instagram", "youtube", "suzuri", "github", "threads", "twitter", "note"];

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
  return <ul css={linkItem}>{linkElm}</ul>;
};

const Footer: NextPage = () => {
  return (
    <footer id="footer" css={footerStyle}>
      <Container css={footerContainer}>
        <div>
          <div className="content" css={messageContent}>
            <Button
              css={[footerButton, messengerButton]}
              href="https://messenger.dgdgdgdg.com"
              text="Messenger"
              external={true}
            />
            <Button css={[footerButton, emailButton]} href="mailto:info@dgdgdgdg.com" text="E-mail" external={true} />
          </div>
          <LinkItems />
        </div>

        <div css={credit}>
          <Link href="/">
            <a css={creditLogo}>
              <object data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
            </a>
          </Link>
          <p css={copyRightText}>©︎ 2021 dgdgdgdg</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
