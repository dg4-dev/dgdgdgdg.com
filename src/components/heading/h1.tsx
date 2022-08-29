import { css } from "@emotion/react";

// import { center } from "@/styles/common";
import { bp } from "@/styles/config";

const pageTitle = css`
  padding-top: 0px;
  height: 370px;
  position: relative;

  ${bp.tab} {
    height: 270px;
  }
  ${bp.sp} {
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

  ${bp.tab} {
    max-width: none;
    width: calc(100% - 40px);
  }

  ${bp.sp} {
    width: calc(100% - 24px);
  }

  .en {
    font-family: "Dont", sans-serif;
    font-size: 100px;

    ${bp.tab} {
      font-size: 64px;
    }

    ${bp.sp} {
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

type Props = {
  en: string;
  ja: string;
};

const H1 = ({ en, ja }: Props) => {
  const formattedPageName = en.toLowerCase().replace(" ", "");
  const imagePath = `/images/fv/${formattedPageName}.jpg`;
  const bg = css`
    background-image: url(${imagePath});
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: center center;
    filter: brightness(60%);
  `;
  return (
    <section css={pageTitle}>
      <h1 css={heading1}>
        <div className="en">{en}</div>
        <div className="ja">{ja}</div>
      </h1>
      <div css={bg}></div>
    </section>
  );
};

export default H1;
