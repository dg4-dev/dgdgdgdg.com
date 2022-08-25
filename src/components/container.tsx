import { css } from "@emotion/react";

import size from "@/styles/config/size";

const Container = ({ children }: { children: React.ReactNode }) => {
  const style = css`
    width: ${size.cWidth.pc};
    margin-left: auto;
    margin-right: auto;
    @media (${size.bp.tab}) {
      width: ${size.cWidth.tab};
    }
    @media (${size.bp.sp}) {
      width: ${size.cWidth.sp};
    }
  `;
  return <div css={style}>{children}</div>;
};

export default Container;
