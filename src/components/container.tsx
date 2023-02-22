import { css } from "@emotion/react";

import { breakPoint, containerWidth } from "@/styles/config";

const containerStyle = css`
  width: ${containerWidth.pc};

  margin-left: auto;
  margin-right: auto;

  ${breakPoint.tab} {
    width: ${containerWidth.tab};
  }
  ${breakPoint.sp} {
    width: ${containerWidth.sp};
  }

  .content:not(:first-child) {
    padding-top: 80px;

    ${breakPoint.tab} {
      padding-top: 60px;
    }

    ${breakPoint.sp} {
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
