/* eslint-disable react/jsx-no-undef */
import { css } from "@emotion/react";
import Image from "next/image";

import { breakPoint } from "@/styles/config";

const pageTitle = css`
  padding-top: 0px;
  height: 370px;
  position: relative;

  ${breakPoint.tab} {
    height: 270px;
  }
  ${breakPoint.sp} {
    height: 200px;
  }
`;

const heading1 = css`
  width: 100%;
  max-width: 1024px;
  color: #fff;
  z-index: 5;
  position: absolute;

  margin-top: 35px;

  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  ${breakPoint.tab} {
    max-width: none;
    width: calc(100% - 40px);
  }

  ${breakPoint.sp} {
    width: calc(100% - 24px);
  }

  .en {
    font-family: "Dont-GR", sans-serif;
    font-variation-settings: "rnds" 0, "dtsz" 100;
    font-size: 100px;

    ${breakPoint.tab} {
      font-size: 64px;
    }

    ${breakPoint.sp} {
      font-size: 48px;
    }
  }
  .ja {
    font-family: "Zen Kaku Gothic New", sans-serif;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.2em;
  }
`;

const bg = css`
  object-fit: cover;
  filter: brightness(60%);
`;

interface HeadingProps {
  en: string;
  ja: string;
}

const H1 = ({ en, ja }: HeadingProps) => {
  const formattedPageName = en.toLowerCase().replace(/[ ]/g, "");
  const imagePath = `/images/fv/${formattedPageName}.jpg`;

  return (
    <section css={pageTitle}>
      <div css={heading1}>
        <h1 className="en">{en}</h1>
        <div className="ja">{ja}</div>
      </div>
      <Image css={bg} src={imagePath} priority={true} layout="fill" alt={`${formattedPageName} first view`} />
    </section>
  );
};

export default H1;
