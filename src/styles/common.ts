import { css } from "@emotion/react";

export const flex = css`
  display: flex;
`;

export const center = css`
  margin-left: auto;
  margin-right: auto;
`;

export const click = css`
  cursor: -webkit-image-set(url("/images/cursor-pointer.png") 1x, url("/images/cursor-pointer@2x.png") 2x), pointer;
  * {
    cursor: -webkit-image-set(url("/images/cursor-pointer.png") 1x, url("/images/cursor-pointer@2x.png") 2x), pointer;
  }
`;
