import { css } from "@emotion/react";

import bp from "@/styles/config/breakpoint";
import cWidth from "@/styles/config/containerWidth";

const Container = ({ children }: { children: React.ReactNode }) => {
  const style = css`
    width: ${cWidth.pc};
    margin-left: auto;
    margin-right: auto;
    ${bp.tab} {
      width: ${cWidth.tab};
    }
    ${bp.sp} {
      width: ${cWidth.sp};
    }
  `;
  return <div css={style}>{children}</div>;
};

export default Container;
