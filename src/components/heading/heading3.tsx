import { css } from "@emotion/react";

import { bp, dg4Color } from "@/styles/config";

const heading3 = css`
  margin-bottom: 32px;
  position: relative;
  padding-left: 24px;

  ${bp.sp} {
    margin-bottom: 20px;
  }

  .en {
    font-family: "Dont", "Zen Kaku Gothic New", sans-serif;
    font-size: 36px;
    ${bp.sp} {
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

const Heading3 = ({ en, ja, className }: Props) => {
  const JA = ja ? <div className="ja">{ja}</div> : <></>;
  return (
    <div css={heading3} className={className}>
      <h3 className="en">{en}</h3>
      {JA}
    </div>
  );
};

export default Heading3;
