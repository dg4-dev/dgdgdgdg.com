import { css } from "@emotion/react";

import { bp, cWidth } from "@/styles/config";

const containerStyle = css`
  width: ${cWidth.pc};

  margin-left: auto;
  margin-right: auto;

  ${bp.tab} {
    width: ${cWidth.tab};
  }
  ${bp.sp} {
    width: ${cWidth.sp};
  }

  .content:not(:first-child) {
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
    <div css={containerStyle} className={className}>
      {children}
    </div>
  );
};

export default Container;
