import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

const heading3 = css`
  position: relative;
  padding-left: 24px;
  margin-bottom: 32px;

  ${breakPoint.sp} {
    margin-bottom: 20px;
  }

  .en {
    font-family: "Dont-GR", "Zen Kaku Gothic New", sans-serif;
    font-variation-settings: "rnds" 0, "dtsz" 100;
    font-size: 36px;
    ${breakPoint.sp} {
      font-size: 22px;
    }
  }

  .ja {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.2em;
    margin-top: 8px;
    color: ${dg4Color.cyan};
  }

  ::before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    background-color: ${dg4Color.cyan};
    position: absolute;
    left: 0;
  }
`;

type Props = {
  en: string;
  ja?: string;
  className?: string;
};

const H3 = ({ en, ja, className }: Props) => {
  const JA = ja ? <div className="ja">{ja}</div> : <></>;
  return (
    <div css={heading3} className={className}>
      <h3 className="en">{en}</h3>
      {JA}
    </div>
  );
};

export default H3;
