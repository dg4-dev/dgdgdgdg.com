import { css } from "@emotion/react";

export const click = css`
  cursor: -webkit-image-set(url("/images/cursor/cursor-pointer.png") 1x, url("/images/cursor/cursor-pointer@2x.png") 2x),
    pointer;
  * {
    cursor: -webkit-image-set(
        url("/images/cursor/cursor-pointer.png") 1x,
        url("/images/cursor/cursor-pointer@2x.png") 2x
      ),
      pointer;
  }
`;
