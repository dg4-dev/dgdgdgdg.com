import { css } from "@emotion/react";

import { center } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const heading2 = css`
  width: fit-content;
  height: 100px;
  position: relative;

  text-align: center;

  padding-top: 8px;
  margin-bottom: 80px;

  ${bp.tab} {
    margin-bottom: 60px;
  }
  ${bp.sp} {
    height: 50px;

    padding-top: 0px;
    margin-bottom: 40px;
  }

  .en {
    font-family: "Dont", sans-serif;
    font-size: 60px;

    ${bp.sp} {
      font-size: 40px;
    }
  }
  .ja {
    font-family: "Zen Kaku Gothic New", sans-serif;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.2em;
    color: ${dg4Color.cyan};

    margin-top: 8px;
  }

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center center;
    top: 0px;
  }

  ::before {
    background-image: url("/images/h2-l.svg");
    left: -130px;

    ${bp.sp} {
      width: 50px;
      height: 50px;
      left: -75px;
    }
  }

  ::after {
    background-image: url("/images/h2-r.svg");
    right: -130px;

    ${bp.sp} {
      width: 50px;
      height: 50px;
      right: -75px;
    }
  }
`;

type Props = {
  en: string;
  ja: string;
  className?: string;
};

const Heading2 = ({ en, ja, className }: Props) => {
  return (
    <h2 css={[heading2, center]} className={className}>
      <div className="en">{en}</div>
      <div className="ja">{ja}</div>
    </h2>
  );
};

export default Heading2;
