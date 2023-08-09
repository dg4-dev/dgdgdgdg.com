import { css } from "@emotion/react";
import { useState } from "react";

import H3 from "../../heading/Heading3";

import { breakPoint, dg4Color } from "@/styles/config";

const FontContentGR = ({ text }: { text: string }) => {
  const defaultStyles = {
    fontSize: 80,
    lineHeight: 100,
    letterSpacing: 0,
    textAlign: "center",
    backgroundColor: "#eeeeee",
    textColor: dg4Color.black,

    label: "Dont GR Custom",
    rnds: 50,
    dtsz: 50,
  };

  const [styles, setStyles] = useState(defaultStyles);

  const handleRndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyles({
      ...styles,
      rnds: Number(event.target.value),
    });
    setLabel(Number(event.target.value), styles.dtsz);
  };

  const handleDtszChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyles({
      ...styles,
      dtsz: Number(event.target.value),
    });
    setLabel(styles.rnds, Number(event.target.value));
  };

  // set alignment
  const setAlign = (event: React.ChangeEvent<HTMLInputElement>) =>
    setStyles({
      ...styles,
      textAlign: event.target.value,
    });

  // reverse color
  const reverseColor = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      backgroundColor: prevStyles.textColor,
      textColor: prevStyles.backgroundColor,
    }));
  };

  // shuffle value
  const shuffleValue = () => {
    const randomNumber = (n: number) => {
      return Math.floor(Math.random() * n);
    };

    const threeAlternate = () => {
      if (randomNumber(3) === 0) {
        return "left";
      } else if (randomNumber(3) === 2) {
        return "right";
      } else {
        return "center";
      }
    };

    const randomColor = () => {
      return `#${randomNumber(16777216).toString(16).padStart(6, "0")}`;
    };

    const randomVRnds = () => {
      return randomNumber(100);
    };

    const randomVDtsz = () => {
      return randomNumber(50) + 50;
    };

    setStyles((prevStyles) => ({
      ...prevStyles,
      fontSize: randomNumber(170) + 10,
      lineHeight: randomNumber(100) + 100,
      letterSpacing: randomNumber(50),
      textAlign: threeAlternate(),
      backgroundColor: randomColor(),
      textColor: randomColor(),

      rnds: randomVRnds(),
      dtsz: randomVDtsz(),
    }));

    setLabel(randomVRnds(), randomVDtsz());
  };

  // copy value
  const copyValue = () => {
    // create textarea
    const copyElement = document.createElement("textarea");

    copyElement.value = `font-family: "Dont-GR";\nfont-variation-settings: "rnds" ${styles.rnds}, "dtsz" ${
      styles.dtsz
    };\nfont-size: ${styles.fontSize}px;\nline-height: ${styles.lineHeight / 100}em;\nletter-spacing: ${
      styles.letterSpacing / 100
    }em;\ntext-align: ${styles.textAlign};\nbackground-color: ${styles.backgroundColor};\ncolor: ${styles.textColor};`;
    document.body.appendChild(copyElement);

    // copy
    navigator.clipboard.writeText(copyElement.value);
    document.body.removeChild(copyElement);

    // copy alert
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${dg4Color.blue};
        color: #fff;
        padding: 8px 16px;
        border-radius: 4px;
        font-family: 'Dont', sans-serif;
        font-size: 20px;
        z-index: 100;
      " id="copyAlert">Copied!</div>`
    );

    setTimeout(() => {
      const copyAlert = document.getElementById("copyAlert");
      if (copyAlert) {
        copyAlert.remove();
      }
    }, 1000);
  };

  // set label
  // rndsが0かつdtszが100の場合はlabelを"Square"にする
  // rndsが100かつdtszが100の場合はlabelを"Circle"にする
  // rndsが0かつdtszが50の場合はlabelを"Square mini"にする
  // rndsが100かつdtszが50の場合はlabelを"Circle mini"にする

  const setLabel = (rnds: number, dtsz: number) => {
    let newLabel = "Dont GR Custom";
    if (rnds === 0 && dtsz === 100) {
      newLabel = "Dont GR Square";
    } else if (rnds === 100 && dtsz === 100) {
      newLabel = "Dont GR Circle";
    } else if (rnds === 0 && dtsz === 50) {
      newLabel = "Dont GR Square mini";
    } else if (rnds === 100 && dtsz === 50) {
      newLabel = "Dont GR Circle mini";
    }

    setStyles((prevStyles) => ({
      ...prevStyles,
      label: newLabel,
    }));
  };

  const fontContent = css`
    display: flex;
    flex-direction: column;
  `;

  const editWrapper = css`
    display: flex;

    gap: 40px;

    margin-bottom: 24px;

    ${breakPoint.tab} {
      flex-direction: column;
    }
  `;

  const rangeContainer = css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    gap: 40px;

    ${breakPoint.tab} {
      justify-content: end;
    }

    ${breakPoint.sp} {
      flex-direction: column;
      gap: 8px;
    }
  `;

  const rangeWrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;

    width: calc(calc(100% / 3) - calc(80px / 3));

    ${breakPoint.sp} {
      width: 100%;
    }
  `;

  const makeRange = (image: string) => css`
    ::before {
      content: "";
      display: block;

      width: 24px;
      height: 24px;

      background-repeat: no-repeat;
      background-position: center;
      background-image: url(${image});

      ${breakPoint.sp} {
        width: 36px;
        height: 36px;
      }
    }
  `;

  const rangeFontSize = makeRange("/images/ui/textformat-size.svg");
  const rangeLineHeight = makeRange("/images/ui/arrow-up-and-down.svg");
  const rangeLetterSpacing = makeRange("/images/ui/arrow-left-and-right.svg");
  const rangeRoundness = makeRange("/images/ui/roundness.svg");
  const rangeDotSize = makeRange("/images/ui/arrow-up-left-and-arrow-down-right.svg");

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

  const buttonContainer = css`
    height: fit-content;

    display: flex;
    gap: 40px;

    ${breakPoint.tab} {
      width: 100%;
      justify-content: flex-end;
    }

    ${breakPoint.sp} {
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 24px;
    }

    @media screen and (max-width: 444px) {
      div:last-of-type {
        margin-left: auto;
      }
    }

    @media screen and (max-width: 295px) {
      justify-content: center;
      div:last-of-type {
        margin-left: 0;
      }
    }
  `;

  const buttonWrapper = css`
    display: flex;
    gap: 16px;

    ${breakPoint.sp} {
      gap: 8px;
    }
  `;

  const makeButtonAlign = (image: string) => css`
    ::before {
      content: "";
      display: block;

      width: 24px;
      height: 24px;

      background-image: url(${image});
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

  const buttonAlignLeft = makeButtonAlign("/images/ui/text-alignleft.svg");
  const buttonAlignCenter = makeButtonAlign("/images/ui/text-aligncenter.svg");
  const buttonAlignRight = makeButtonAlign("/images/ui/text-alignright.svg");

  const colorWrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const buttonSquare = css`
    display: block;

    width: 24px;
    height: 24px;

    ${breakPoint.sp} {
      width: 36px;
      height: 36px;
    }
  `;

  const colorInput = css`
    ::-webkit-color-swatch {
      border: 2px solid #ddd;
      width: 100%;
    }

    ::-webkit-color-swatch-wrapper {
      padding: 0;

      width: 100%;
    }
  `;

  const buttonWithToolTip = css`
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  `;

  const reverseButton = css`
    background-image: url("/images/ui/arrow-left-arrow-right.svg");
  `;

  const shuffleButton = css`
    background-image: url("/images/ui/shuffle.svg");
  `;

  const resetButton = css`
    background-image: url("/images/ui/arrow-counterclockwise.svg");
  `;

  const copyButton = css`
    background-image: url("/images/ui/doc-on-doc.svg");
  `;

  const itemLetter = css`
    text-align: ${styles.textAlign};
    font-size: ${styles.fontSize}px;
    letter-spacing: ${styles.letterSpacing / 100}em;
    line-height: ${styles.lineHeight / 100}em;
    padding: 16px;
    background-color: ${styles.backgroundColor};
    color: ${styles.textColor};

    font-variation-settings: "rnds" ${styles.rnds}, "dtsz" ${styles.dtsz};

    overflow-wrap: break-word;

    min-height: calc(${styles.lineHeight / 100}em + 32px);

    transition: all 0.2s ease-in-out;
  `;

  const ff = css`
    font-family: "Dont-GR", sans-serif;
  `;

  return (
    <div className="content" css={fontContent}>
      <H3 en={styles.label} />
      <div css={editWrapper}>
        <div css={rangeContainer}>
          <div css={[rangeWrapper, rangeFontSize]} title="Font Size">
            <input
              type="range"
              min="10"
              max="180"
              value={styles.fontSize}
              className="clickable"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStyles({ ...styles, fontSize: Number(event.target.value) })
              }
              css={rangeInput}
            />
          </div>
          <div css={[rangeWrapper, rangeLineHeight]} title="Line Height">
            <input
              type="range"
              min="100"
              max="200"
              value={styles.lineHeight}
              className="clickable"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStyles({ ...styles, lineHeight: Number(event.target.value) })
              }
              css={rangeInput}
            />
          </div>
          <div css={[rangeWrapper, rangeLetterSpacing]} title="Letter Spacing">
            <input
              type="range"
              min="0"
              max="50"
              value={styles.letterSpacing}
              className="clickable"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStyles({
                  ...styles,
                  letterSpacing: Number(event.target.value),
                })
              }
              css={rangeInput}
            />
          </div>
          <div css={[rangeWrapper, rangeDotSize]} title="Dot Size">
            <input
              type="range"
              min="50"
              max="100"
              value={styles.dtsz}
              className="clickable"
              onChange={handleDtszChange}
              css={rangeInput}
            />
          </div>
          <div css={[rangeWrapper, rangeRoundness]} title="Roundness">
            <input
              type="range"
              min="0"
              max="100"
              value={styles.rnds}
              className="clickable"
              onChange={handleRndChange}
              css={rangeInput}
            />
          </div>
        </div>
        <div css={buttonContainer}>
          <div css={buttonWrapper} title="Text Align">
            <label className="clickable">
              <input
                type="radio"
                value="left"
                checked={styles.textAlign === "left"}
                onChange={setAlign}
                css={buttonAlignLeft}
              />
            </label>
            <label className="clickable">
              <input
                type="radio"
                value="center"
                checked={styles.textAlign === "center"}
                onChange={setAlign}
                css={buttonAlignCenter}
              />
            </label>
            <label className="clickable">
              <input
                type="radio"
                value="right"
                checked={styles.textAlign === "right"}
                onChange={setAlign}
                css={buttonAlignRight}
              />
            </label>
          </div>
          <div css={colorWrapper}>
            <input
              className="clickable"
              type="color"
              value={styles.backgroundColor}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStyles({
                  ...styles,
                  backgroundColor: event.target.value,
                })
              }
              css={[buttonSquare, colorInput]}
            />
            <button
              onClick={reverseColor}
              className="clickable"
              css={[buttonWithToolTip, buttonSquare, reverseButton]}
              title="Swap Color"
            />
            <input
              className="clickable"
              type="color"
              value={styles.textColor}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStyles({
                  ...styles,
                  textColor: event.target.value,
                })
              }
              css={[buttonSquare, colorInput]}
            />
          </div>
          <div css={buttonWrapper}>
            <button
              onClick={shuffleValue}
              className="clickable"
              css={[buttonWithToolTip, buttonSquare, shuffleButton]}
              title="Shuffle"
            />
            <button
              onClick={() => {
                setStyles(defaultStyles);
              }}
              className="clickable"
              css={[buttonWithToolTip, buttonSquare, resetButton]}
              title="Reset"
            />
            <button
              onClick={copyValue}
              className="clickable"
              css={[buttonWithToolTip, buttonSquare, copyButton]}
              title="Copy CSS"
            />
          </div>
        </div>
      </div>
      <div css={[itemLetter, ff]}>{text}</div>
    </div>
  );
};

export default FontContentGR;
