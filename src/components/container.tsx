import { css } from "@emotion/react";

import common from "@/styles/common";
import bp from "@/styles/config/breakpoint";
import cWidth from "@/styles/config/containerWidth";

const Container = ({ children }: { children: React.ReactNode }) => {
  const style = css`
    width: ${cWidth.pc};
    ${bp.tab} {
      width: ${cWidth.tab};
    }
    ${bp.sp} {
      width: ${cWidth.sp};
    }
  `;
  return (
    <div css={[style, common.center]} className="container">
      {children}
    </div>
  );
};

export default Container;
