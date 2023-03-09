import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import H1 from "@/components/heading/heading1";
import H2 from "@/components/heading/heading2";
import H3 from "@/components/heading/heading3";
import Layout from "@/components/layout";
// import InstaItemList from "@/components/works/InstaItemList";
import Item from "@/components/works/item";
import YoutubeItemList from "@/components/works/youtubeItemList";
import { breakPoint, dg4Color } from "@/styles/config";

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
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`;

const button = css`
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const FontContent = ({ name }: { name: "Dont" | "Dont Round" | "Dont Circle" }) => {
  // font size
  const defaultFontSize = 32;
  const [fontSize, setFontSizeValue] = useState<number>(defaultFontSize);
  const changeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => setFontSizeValue(parseInt(event.target.value));

  // line height
  const defaultLineHeight = 100;
  const [lineHeight, setLineHeightValue] = useState<number>(defaultLineHeight);
  const changeLineHeight = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLineHeightValue(parseInt(event.target.value));

  // text align
  const defaultTextAlign = "center";
  const [textAlign, setTextAlign] = useState<string>(defaultTextAlign);
  const changeTextAlign = (event: React.ChangeEvent<HTMLInputElement>) => setTextAlign(event.target.value);

  // background color
  // const defaultBackgroundColor = "#eeeeee";
  // const [backgroundColor, setBackgroundColor] = useState<string>(defaultBackgroundColor);
  // const changeBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(event.target.value);

  // text color
  // const defaultTextColor = ${dg4Color.black};
  // const [textColor, setTextColor] = useState<string>(defaultTextColor);
  // const changeTextColor = (event: React.ChangeEvent<HTMLInputElement>) => setTextColor(event.target.value);

  // contentEditableは意図的なものだが、console.errorが出るので一時的に無効化
  console.error = function () {};

  const fontContent = css`
    display: flex;
    flex-direction: column;
  `;

  const editWrapper = css`
    display: flex;
    align-items: center;
    gap: 40px;

    margin-bottom: 24px;

    ${breakPoint.sp} {
      gap: 24px;
      flex-wrap: wrap;
    }
  `;

  const rangeWrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;

    ::before {
      content: "";
      display: block;

      width: 24px;
      height: 24px;

      background-repeat: no-repeat;
      background-position: center;

      ${breakPoint.sp} {
        width: 36px;
        height: 36px;
      }
    }
  `;

  const rangeFontSize = css`
    ::before {
      background-image: url("/images/ui/textformat-size.svg");
    }
  `;

  const rangeLineHeight = css`
    ::before {
      background-image: url("/images/ui/arrow-up-and-down-text-horizontal.svg");
    }
  `;

  const rangeInput = css`
    -webkit-appearance: none;
    appearance: none;

    background-color: #ddd;
    height: 2px;

    width: 100%;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;

      width: 16px;
      height: 16px;

      display: block;
      background-color: ${dg4Color.cyan};
      border-radius: 50%;

      box-shadow: none;

      ${breakPoint.sp} {
        width: 20px;
        height: 20px;
      }
    }
  `;

  const radioWrapper = css`
    display: flex;
    gap: 16px;
  `;

  const buttonAlign = css`
    ::before {
      content: "";
      display: block;

      width: 24px;
      height: 24px;

      background-repeat: no-repeat;
      background-position: center;
      filter: grayscale(100%) brightness(30%);

      ${breakPoint.sp} {
        width: 36px;
        height: 36px;
      }
    }

    :checked {
      ::before {
        filter: grayscale(0) brightness(100%);
      }
    }
  `;

  const buttonAlignLeft = css`
    ::before {
      background-image: url("/images/ui/text-alignleft.svg");
    }
  `;

  const buttonAlignCenter = css`
    ::before {
      background-image: url("/images/ui/text-aligncenter.svg");
    }
  `;

  const buttonAlignRight = css`
    ::before {
      background-image: url("/images/ui/text-alignright.svg");
    }
  `;

  // const colorInput = css`
  //   ::before {
  //     content: "";
  //     display: block;

  //     width: 32px;
  //     height: 32px;
  //   }
  // `;

  const itemLetter = css`
    text-align: ${textAlign};
    font-size: ${fontSize}px;
    line-height: ${lineHeight}%;
    padding: 16px;
    background-color: #eee;
    /* background-color: {backgroundColor}; */
    /* color: {textColor}; */

    /* cursor: text; */
  `;

  const ff = css`
    font-family: ${name}, sans-serif;
  `;

  return (
    <div className="content" css={fontContent}>
      <H3 en={name} />
      <div css={editWrapper}>
        <div css={[rangeWrapper, rangeFontSize]}>
          <input
            type="range"
            min="10"
            max="180"
            defaultValue={defaultFontSize}
            className="clickable"
            onChange={changeFontSize}
            css={rangeInput}
          />
        </div>
        <div css={[rangeWrapper, rangeLineHeight]}>
          <input
            type="range"
            min="100"
            max="200"
            defaultValue={defaultLineHeight}
            className="clickable"
            onChange={changeLineHeight}
            css={rangeInput}
          />
        </div>
        <div css={radioWrapper}>
          <label className="clickable">
            <input
              type="radio"
              value="left"
              checked={textAlign === "left"}
              onChange={changeTextAlign}
              css={[buttonAlign, buttonAlignLeft]}
            />
          </label>
          <label className="clickable">
            <input
              type="radio"
              value="center"
              checked={textAlign === "center"}
              onChange={changeTextAlign}
              css={[buttonAlign, buttonAlignCenter]}
            />
          </label>
          <label className="clickable">
            <input
              type="radio"
              value="right"
              checked={textAlign === "right"}
              onChange={changeTextAlign}
              css={[buttonAlign, buttonAlignRight]}
            />
          </label>
        </div>
        {/* TODO: あとでやるわ */}
        {/* <input
          type="color"
          value={backgroundColor}
          onChange={changeBackgroundColor}
          css={[
            colorInput,
            css`
              ::before {
                background-color: ${backgroundColor};
              }
            `,
          ]}
        />
        <input
          type="color"
          value={textColor}
          onChange={changeTextColor}
          css={[
            colorInput,
            css`
              ::before {
                background-color: ${textColor};
              }
            `,
          ]}
        /> */}
      </div>
      {/* <div contentEditable spellCheck="false" css={[itemLetter, ff]}> */}
      <div css={[itemLetter, ff]}>Almost before we knew it, we had left the ground.</div>
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
          <div css={fontDesc}>
            <Image src="/images/works/dont-desc.webp" width={500} height={175} alt="" />
          </div>
          <FontContent name="Dont" />
          <FontContent name="Dont Round" />
          <FontContent name="Dont Circle" />

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
            <Item title="dgdgdgdg" imgHref="/images/logo.svg" />
            <Item title="自然食食堂 さん" imgHref="/images/works/sunlogo.webp" />
            <Item title="モノクローム" imgHref="/images/works/monologo.webp" />
          </div>
        </Container>
      </section>

      <section id="photography">
        <Container css={contain}>
          <H2 en="Photography" ja="写真" />
          {/* <InstaItemList /> */}
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
