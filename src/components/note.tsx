import { css } from "@emotion/react";

import { dg4Color } from "@/styles/config";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const para = css`
  line-height: 1.5;
  text-align: center;
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

const Note = ({ className, children }: Props) => {
  return (
    <p css={para} className={className}>
      {children}
    </p>
  );
};

export default Note;
