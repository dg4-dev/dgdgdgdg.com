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

const Note = ({ className, children, margin = false }: Props) => {
  const paraMargin = margin
    ? css`
        margin-bottom: 40px;
      `
    : css``;

  return (
    <p css={[para, paraMargin]} className={className}>
      {children}
    </p>
  );
};

export default Note;
