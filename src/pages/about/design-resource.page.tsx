import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

import type { NextPage } from "next";

import Container from "@/components/container";
import H1 from "@/components/heading/heading1";
import H2 from "@/components/heading/heading2";
import H3 from "@/components/heading/heading3";
import Layout from "@/components/layout";
import Note from "@/components/note";
import { breakPoint, dg4Color } from "@/styles/config";

const containerContent = css`
  display: flex;
  flex-direction: column;
`;

const colorContent = css`
  height: 500px;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 40% 28% 30%;

  ${breakPoint.tab} {
    height: 60vw;
  }

  ${breakPoint.sp} {
    display: flex;
    height: auto;
  }

  .color-item-cyan {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }
  .color-item-black {
    grid-row: 1 / 2;
    grid-column: 2 / 4;
  }
  .color-item-blue {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
  .color-item-orange {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
  }
`;

const simuList = css`
  display: flex;
  gap: 32px;
`;

const logoList = css`
  display: flex;
  flex-wrap: wrap;
  ${breakPoint.sp} {
    flex-direction: column;
  }
`;

const fontSample = css`
  text-align: center;
  font-size: 32px;
  line-height: 48px;
  padding: 16px;
  background-color: #eee;

  font-family: "Dont", "Zen Kaku Gothic New", sans-serif;

  ${breakPoint.sp} {
    font-size: 24px;
    line-height: 36px;
    padding: 12px;
  }
`;

const dont = css`
  font-family: "Dont", sans-serif;
`;

const zen = css`
  font-family: "Zen Kaku Gothic New", sans-serif;
`;

const ColorItem = ({ color }: { color: string }) => {
  const colorItem = css`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    color: #fff;
    padding: 16px 12px;
    border-radius: 8px;
    margin: 4px;

    background-color: ${dg4Color[color]};

    ${breakPoint.sp} {
      height: 120px;
    }
  `;

  const colorItemText = css`
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: center;
    font-size: 20px;
    .hex {
      opacity: 0.7;
      font-weight: bold;
    }
    .name {
      margin-top: 12px;
      font-weight: bold;
    }
  `;

  return (
    <div className={`color-item-${color}`} css={colorItem}>
      <div css={[colorItemText]}>
        <p className="hex">{dg4Color[color]}</p>
        <p className="name">dg4Color.{color}</p>
      </div>
    </div>
  );
};

const SimuItem = ({ year }: { year: number }) => {
  const simu4 = css`
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
  `;

  const itemLogo = css`
    margin-top: 16px;
  `;

  return (
    <div>
      <h4 css={simu4}>{year}年2月</h4>
      <div>
        <Image src={`/images/skill/${year}-para.png`} width={307} height={272} alt="" />
      </div>
      <div css={itemLogo}>
        <Image src={`/images/skill/${year}-logo.png`} width={307} height={78} alt="" />
      </div>
    </div>
  );
};

const DataItem = ({ name }: { name: string }) => {
  const logoItem = css`
    height: 160px;
    width: calc((100% / 3) - 16px);
    position: relative;
    padding: 24px;
    margin: 8px;

    display: flex;

    border-radius: 16px;

    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;

    ${breakPoint.sp} {
      width: calc(100% - 16px);
    }
  `;

  const img = css`
    object-fit: contain;
  `;

  const linkWrap = css`
    position: absolute;
    bottom: 10px;
    right: 10px;

    a {
      display: inline;
      word-break: break-all;
      font-size: 20px;
      font-weight: bold;
      color: ${dg4Color.cyan};
      text-decoration: underline;
    }
    a:not(:first-of-type) {
      margin-left: 8px;
    }
  `;

  const isWhite = name.includes("white");
  const white = isWhite
    ? css`
        background-color: #444;
        background-image: linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%),
          linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%);
        background-size: 40px 40px;
        background-position: 0 0, 20px 20px;
      `
    : css``;

  const imgHref = `/images/dist/${name}.png`;

  return (
    <div css={[logoItem, white]}>
      <Image css={img} src={imgHref} width={552} height={264} alt="" />
      <div css={linkWrap}>
        <a href={imgHref} download>
          .svg
        </a>
        <a href={imgHref} download>
          .png
        </a>
      </div>
    </div>
  );
};

const DesignResource: NextPage = () => {
  return (
    <Layout
      title="Design Resource | dgdgdgdg"
      description="サイトのカラーやロゴについて詳しく説明します。ロゴデータの配布も。"
    >
      <H1 />

      <section id="color">
        <Container>
          <H2 en="Color Palette" ja="カラーパレット" />
          <Note>
            このサイトに使用しているカラーです。これらのカラーは
            <span> dgdgdgdg </span>に由来して、
            <br />
            16進数表記のカラーコードで&nbsp;
            <span>0</span>,&nbsp;<span>4</span>,&nbsp;<span>d</span>&nbsp;のみを組み合わせて設定しています。
          </Note>

          <div className="content" css={[containerContent, colorContent]}>
            <ColorItem color={"cyan"} />
            <ColorItem color={"black"} />
            <ColorItem color={"blue"} />
            <ColorItem color={"orange"} />
          </div>
        </Container>
      </section>

      <section id="logo">
        <Container>
          <H2 en="Logo" ja="ロゴ" />
          <div className="content">
            <object data="/images/logo.svg" type="image/svg+xml"></object>
          </div>
          <div className="content" css={containerContent}>
            <H3 en="Monthly Color" ja="月ごとの色" />
            <Note>
              メインで使用しているロゴは、<Link href="/about/#skill">4つのスキル</Link>
              の経験月数比を色に変換したものになっています。
              <br />
              それによって、ロゴの色は毎月
              <span>&nbsp;#00d4d4&nbsp;</span>
              に限りなく近づくように変化します。
            </Note>{" "}
            <div css={simuList}>
              <SimuItem year={2021} />
              <SimuItem year={2023} />
              <SimuItem year={2028} />
            </div>
          </div>

          <div className="content" css={containerContent}>
            <H3 en="Material Download" ja="素材ダウンロード" />
            <Note>ロゴ自体の編集、変更、変形、色の塗り直し、その他手を加えることはしないでください。</Note>
            <div css={logoList}>
              <DataItem name="logo-white" />
              <DataItem name="logo-black" />
              <DataItem name="logo-cyan" />
              <DataItem name="head-white" />
              <DataItem name="head-black" />
              <DataItem name="head-cyan" />
            </div>
          </div>
        </Container>
      </section>

      <section id="font">
        <H2 en="Font" ja="フォント" />
        <Container>
          <div className="content" css={containerContent}>
            <H3 en="Dont" />
            <Note>
              Dontは、このサイトのタイトル部分等に使用されているフォントです。
              <br />
              dgdgdgdgによるオリジナルのフォントで、<a href="/works/#font">こちら</a>で配布しています。
              <br />
              最小限のドットでアルファベットを表現しています。
            </Note>
            <div css={[fontSample, dont]}>Almost before we knew it, we had left the ground.</div>
          </div>
          <div className="content" css={containerContent}>
            <H3 en="Zen Kaku Gothic New" ja="ZEN角ゴシックNew" />
            <Note>
              Zen Kaku Gothic Newは、このサイトの文章部分に使用されているフォントです。
              <br />
              フォントのふところが狭く、引き締まった印象を与えます。
            </Note>
            <div css={[fontSample, zen]}>愛のあるユニークで豊かな書体</div>
            <div css={[fontSample, zen]}>Almost before we knew it, we had left the ground.</div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default DesignResource;