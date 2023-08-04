import { css } from "@emotion/react";

import { dg4Color } from "@/styles/config";

type Props = {
  className?: string;
  children: React.ReactNode;
  margin?: Boolean;
};

const para = css`
  line-height: 1.5;
  text-align: center;

  margin-top: 32px;
  margin-bottom: 32px;

  a {
    display: inline;
    word-break: break-all;
    color: ${dg4Color.cyan};
    text-decoration: underline;
  }

  span {
    font-weight: bold;
  }
`;

const Note = ({ children }: Props) => {
  return <p css={para}>{children}</p>;
};

export default Note;
