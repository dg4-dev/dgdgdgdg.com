import { css } from "@emotion/react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const para = css`
  line-height: 1.5;
  text-align: center;
  margin-bottom: 32px;
`;

const Note = ({ className, children }: Props) => {
  return (
    <p css={para} className={className}>
      {children}
    </p>
  );
};

export default Note;
