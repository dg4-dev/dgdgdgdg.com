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
    word-break: break-all;
    font-size: 16px;
    color: ${dg4Color.cyan};
    text-decoration: underline;
    transition: all 0.3s;
  }
  a:hover {
    opacity: 0.5;
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
