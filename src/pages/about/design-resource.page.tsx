import { css } from "@emotion/react";
import Link from "next/link";

import type { NextPage } from "next";

import Container from "@/components/container";
import ColorItem from "@/components/design-resource/ColorItem";
import DataItem from "@/components/design-resource/DataItem";
import SimulationItem from "@/components/design-resource/SimulationItem";
import H1 from "@/components/heading/heading1";
import H2 from "@/components/heading/heading2";
import H3 from "@/components/heading/heading3";
import Layout from "@/components/layout";
import Note from "@/components/note";
import { breakPoint } from "@/styles/config";

const containerContent = css`
  display: flex;
  flex-direction: column;
`;

const colorContent = css`
  height: 500px;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 50% 25% 25%;

  ${breakPoint.tab} {
    height: 60vw;
    grid-template-columns: 40% 30% 30%;
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

const simulationList = css`
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
            <div css={simulationList}>
              <SimulationItem year={2021} />
              <SimulationItem year={2023} />
              <SimulationItem year={2028} />
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
