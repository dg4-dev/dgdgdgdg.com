import { css } from "@emotion/react";
import { useState } from "react";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import FontContent from "@/components/works/FontContent";
import Item from "@/components/works/Item";
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
    font-family: "Menlo", "Courier", "Courier New", sans-serif;
    font-size: 18px;
    width: 100%;
    background-color: #fafafa;

    padding: 12px 20px;
    border: 1px solid #bebebe;
    border-radius: 4px;

    margin-top: 16px;

    cursor: text;
  }
`;

const button = css`
  margin-left: auto;
  margin-right: auto;
`;

const Works: NextPage = () => {
  // sample text
  const defaultSampleText = "Almost before we knew it, we had left the ground.";
  const [sampleText, setSampleText] = useState<string>(defaultSampleText);
  const changeSampleText = (event: React.ChangeEvent<HTMLInputElement>) => setSampleText(event.target.value);

  return (
    <Layout title="Works" description="フォント、ロゴ、Webサイトと、制作実績の中からピックアップしてご紹介します。">
      <H1 en="Works" ja="作品紹介" />

      <section id="font">
        <Container css={fontContainer}>
          <H2 en="Font" ja="フォント" />
          <div css={sampleWrapper}>
            <span>サンプルテキスト</span>
            <input type="text" value={sampleText} onChange={changeSampleText} />
          </div>
          <FontContent text={sampleText} />
          <Button
            href="https://github.com/dg4-dev/atomic-dot/raw/main/var-fonts.zip"
            text="Download"
            css={button}
            external={true}
          />
        </Container>
      </section>

      <section id="pixelArt">
        <Container css={contain}>
          <H2 en="Pixel Art" ja="ドット絵" />
          <div css={itemList}>
            <Item title="使用機材" imgHref="/images/works/strida.png" link={true} href="/equipments" />
          </div>
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

      <section id="web">
        <Container css={contain}>
          <H2 en="Website" ja="Webサイト" />
          <div css={itemList}>
            <Item title="dgdgdgdg" imgHref="/images/works/dg4web.webp" />
            <Item
              title="dg4 app archive"
              imgHref="/images/works/archive.webp"
              link={true}
              href="https://dg4-design.github.io"
            />
            <Item
              title="あいうえ奥出雲"
              imgHref="/images/works/aiue.webp"
              link={true}
              href="https://aiueokuizumo.com/"
            />
            <Item
              title="自然食食堂 さん"
              imgHref="/images/works/sun-naturalfood.studio.site_.png"
              link={true}
              href="https://sun-naturalfood.studio.site/"
            />
            <Item
              title="株式会社 千葉工業"
              imgHref="/images/works/chibaindustrial.co.jp_.png"
              link={true}
              href="https://chibaindustrial.co.jp/"
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Works;
