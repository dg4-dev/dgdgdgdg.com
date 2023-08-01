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

  .content:not(:first-of-type) {
    margin-top: 80px;

    ${breakPoint.tab} {
      margin-top: 60px;
    }

    ${breakPoint.sp} {
      margin-top: 40px;
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
