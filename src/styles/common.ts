import { css } from "@emotion/react";

const common: any = {
  flex: css`
    display: flex;
  `,
  center: css`
    margin-left: auto;
    margin-right: auto;
  `,
  click: css`
    cursor: -webkit-image-set(url("/images/cursor-pointer.png") 1x, url("/images/cursor-pointer@2x.png") 2x), pointer;
    * {
      cursor: -webkit-image-set(url("/images/cursor-pointer.png") 1x, url("/images/cursor-pointer@2x.png") 2x), pointer;
    }
  `,
};

export default common;
