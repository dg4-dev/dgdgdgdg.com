import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import { H1, H2, H3 } from "@/components/heading/headingPortal";
import Layout from "@/components/layout";
import InstaItemList from "@/components/works/InstaItemList";
import Item from "@/components/works/item";
import YoutubeItemList from "@/components/works/youtubeItemList";
import { center, flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const contain = css`
  width: 100%;
`;

const itemList = css`
  width: 100%;
  flex-wrap: wrap;
`;

const fontContainer = css`
  width: calc(100% - 40px);
  max-width: 1024px;
  ${bp.tab} {
    max-width: 1024px;
  }
`;

const fontDesc = css`
  max-width: 500px;
  margin-bottom: 30px;
`;

const btn = css`
  margin-top: 40px;
`;

const FontContent = ({ name }: { name?: string }) => {
  const fontContent = css`
    flex-direction: column;
  `;

  const fontItem = css`
    width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
  `;

  const itemLetter = css`
    text-align: center;
    font-size: 32px;
    line-height: 48px;
    padding: 16px 16px 32px;
    background-color: #eee;
  `;

  const dlLink = css`
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 20px;
    font-weight: bold;
    color: ${dg4Color.cyan};
    text-decoration: underline;
  `;

  const fontName = name ? `Dont ${name}` : "Dont";

  const ff = () => {
    if (name === "Round") {
      return css`
        font-family: "Dont Round", sans-serif;
      `;
    } else if (name === "Circle") {
      return css`
        font-family: "Dont Circle", sans-serif;
      `;
    } else {
      return css`
        font-family: "Dont", sans-serif;
      `;
    }
  };

  return (
    <div className="content" css={[fontContent, flex]}>
      <H3 en={fontName} />
      <div css={fontItem}>
        <div css={[itemLetter, ff]}>Almost before we knew it, we had left the ground.</div>
        <a css={dlLink} download href={`/fonts/${fontName.replace(" ", "")}.ttf`}>
          .ttf
        </a>
      </div>
    </div>
  );
};

const Works: NextPage = () => {
  return (
    <Layout
      title="Works | dgdgdgdg"
      description="フォント、ロゴ、写真、動画、Webサイトと、制作実績の中からピックアップしてご紹介します。"
    >
      <H1 />

      <section id="font">
        <Container css={fontContainer}>
          <H2 en="Font" ja="フォント" />
          <div css={[fontDesc, center]}>
            <Image src="/images/dont-desc.webp" width={500} height={175} alt="" />
          </div>
          <FontContent />
          <FontContent name="Round" />
          <FontContent name="Circle" />
        </Container>
      </section>

      <section id="logo">
        <Container css={contain}>
          <H2 en="Logo" ja="ロゴ" />
          <div css={[itemList, flex]}>
            <Item title="dgdgdgdg" imgHref="/images/logo.svg" />
            <Item title="自然食食堂 さん" imgHref="/images/works/sunlogo.webp" />
            <Item title="モノクローム" imgHref="/images/works/monologo.webp" />
          </div>
        </Container>
      </section>

      <section id="photo">
        <Container css={contain}>
          <H2 en="Photo" ja="写真" />
          <InstaItemList />
          <Button ext={true} href="https://instagram.dgdgdgdg.com/" text="Instagram" css={[btn, center]} />
        </Container>
      </section>

      <section id="video">
        <Container css={contain}>
          <H2 en="Video" ja="動画" />
          <YoutubeItemList />
          <Button ext={true} href="https://youtube.dgdgdgdg.com/" text="YouTube" css={[btn, center]} />
        </Container>
      </section>

      <section id="web">
        <Container css={contain}>
          <H2 en="Web Site" ja="Webサイト" />
          <div css={[itemList, flex]}>
            <Item title="dgdgdgdg" imgHref="/images/works/dg4web.webp" />
            <Item
              title="dg4 app archive"
              imgHref="/images/works/archive.webp"
              link={true}
              href="https://www.apps.dgdgdgdg.com/"
            />
            <Item
              title="あいうえ奥出雲"
              imgHref="/images/works/aiue.webp"
              link={true}
              href="https://aiueokuizumo.com/"
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Works;
