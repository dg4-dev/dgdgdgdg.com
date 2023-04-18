import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import FontContent from "@/components/works/FontContent";
import InstaItemList from "@/components/works/InstaItemList";
import Item from "@/components/works/Item";
import YoutubeItemList from "@/components/works/YoutubeItemList";
import { breakPoint } from "@/styles/config";

const contain = css`
  width: 100%;
`;

const itemList = css`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
`;

const fontContainer = css`
  width: calc(100% - 40px);
  max-width: 1024px;
  ${breakPoint.tab} {
    max-width: 1024px;
  }
`;

const fontDesc = css`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const sampleWrapper = css`
  margin-top: 64px;
  margin-bottom: ${-80 + 40}px;

  ${breakPoint.tab} {
    margin-bottom: ${-60 + 30}px;
  }

  ${breakPoint.sp} {
    margin-bottom: ${-40 + 20}px;
  }

  input {
    width: 100%;
    background-color: #fafafa;

    padding: 8px 16px;
    border: 1px solid #bebebe;
    border-radius: 4px;

    margin-top: 16px;

    cursor: text;
  }
`;

const button = css`
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const Works: NextPage = () => {
  // sample text
  const defaultSampleText = "Almost before we knew it, we had left the ground.";
  const [sampleText, setSampleText] = useState<string>(defaultSampleText);
  const changeSampleText = (event: React.ChangeEvent<HTMLInputElement>) => setSampleText(event.target.value);

  return (
    <Layout
      title="Works"
      description="フォント、ロゴ、写真、動画、Webサイトと、制作実績の中からピックアップしてご紹介します。"
    >
      <H1 />

      <section id="font">
        <Container css={fontContainer}>
          <H2 en="Font" ja="フォント" />
          <div css={fontDesc}>
            <Image src="/images/works/dont-desc.webp" width={500} height={175} alt="" />
          </div>
          <div css={sampleWrapper}>
            <span>サンプルテキスト</span>
            <input type="text" value={sampleText} onChange={changeSampleText} />
          </div>
          <FontContent text={sampleText} name="Dont" />
          <FontContent text={sampleText} name="Dont Round" />
          <FontContent text={sampleText} name="Dont Circle" />
          <Button
            href="https://github.com/dg4-design/dont/blob/main/fonts.zip?raw=true"
            text="Download"
            css={button}
            external={true}
          />
        </Container>
      </section>

      <section id="logo">
        <Container css={contain}>
          <H2 en="Logo Design" ja="ロゴデザイン" />
          <div css={itemList}>
            <Item title="自然食食堂 さん" imgHref="/images/works/sunlogo.webp" />
            <Item title="モノクローム" imgHref="/images/works/monologo.webp" />
          </div>
        </Container>
      </section>

      <section id="photography">
        <Container css={contain}>
          <H2 en="Photography" ja="写真" />
          <InstaItemList />
          <Button external={true} href="https://instagram.dgdgdgdg.com/" text="Instagram" css={button} />
        </Container>
      </section>

      <section id="video">
        <Container css={contain}>
          <H2 en="Video" ja="映像" />
          <YoutubeItemList />
          <Button external={true} href="https://youtube.dgdgdgdg.com/" text="YouTube" css={button} />
        </Container>
      </section>

      <section id="web">
        <Container css={contain}>
          <H2 en="Website" ja="Webサイト" />
          <div css={itemList}>
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
