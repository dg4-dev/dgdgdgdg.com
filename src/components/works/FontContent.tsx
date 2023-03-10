import { css } from "@emotion/react";
import { useState } from "react";

import H3 from "../heading/Heading3";

import { breakPoint, dg4Color } from "@/styles/config";

const FontContent = ({ name, text }: { name: "Dont" | "Dont Round" | "Dont Circle"; text: string }) => {
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
  const defaultBackgroundColor = "#eeeeee";
  const [backgroundColor, setBackgroundColor] = useState<string>(defaultBackgroundColor);
  const changeBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(event.target.value);

  // text color
  const defaultTextColor = dg4Color.black;
  const [textColor, setTextColor] = useState<string>(defaultTextColor);
  const changeTextColor = (event: React.ChangeEvent<HTMLInputElement>) => setTextColor(event.target.value);

  // reverse color
  const reverseColor = () => {
    setBackgroundColor(textColor);
    setTextColor(backgroundColor);
  };

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
      gap: 24px 0;
      justify-content: space-between;
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

  const colorWrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const colorInput = css`
    display: block;

    width: 24px;
    height: 24px;

    ${breakPoint.sp} {
      width: 32px;
      height: 32px;
    }

    ::-webkit-color-swatch {
      border: 2px solid #ddd;
      width: 100%;
    }

    ::-webkit-color-swatch-wrapper {
      padding: 0;

      width: 100%;
    }
  `;

  const reverseButton = css`
    ::before {
      content: "";
      display: block;

      background-image: url("/images/ui/arrow-left-arrow-right.svg");
      background-repeat: no-repeat;
      background-position: center;

      width: 24px;
      height: 24px;

      ${breakPoint.sp} {
        width: 32px;
        height: 32px;
      }
    }
  `;

  const itemLetter = css`
    text-align: ${textAlign};
    font-size: ${fontSize}px;
    line-height: ${lineHeight / 100}em;
    padding: 16px;
    background-color: ${backgroundColor};
    color: ${textColor};

    overflow-wrap: break-word;

    min-height: calc(${lineHeight / 100}em + 32px);
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
        <div css={colorWrapper}>
          <input
            className="clickable"
            type="color"
            value={backgroundColor}
            onChange={changeBackgroundColor}
            css={colorInput}
          />
          <button onClick={reverseColor} className="clickable" css={reverseButton} />
          <input className="clickable" type="color" value={textColor} onChange={changeTextColor} css={colorInput} />
        </div>
      </div>
      <div css={[itemLetter, ff]}>{text}</div>
    </div>
  );
};

export default FontContent;
