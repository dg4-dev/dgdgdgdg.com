import { css } from "@emotion/react";

import common from "@/styles/common";
import { bp, cWidth } from "@/styles/config";

const containerStyle = css`
  width: ${cWidth.pc};
  ${bp.tab} {
    width: ${cWidth.tab};
  }
  ${bp.sp} {
    width: ${cWidth.sp};
  }

  .content:not(:nth-of-type(1)) {
    padding-top: 80px;

    ${bp.tab} {
      padding-top: 60px;
    }

    ${bp.sp} {
      padding-top: 40px;
    }
  }
`;

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div css={[containerStyle, common.center]} className={className}>
      {children}
    </div>
  );
};

export default Container;
