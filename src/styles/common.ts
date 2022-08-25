import { css } from "@emotion/react";

import dg4Color from "@/styles/config/color";

const style = css`
  // font
  /* @font-face {
    font-family: "Dont";
    src: url(/assets/font/Dont.ttf);
  }

  @font-face {
    font-family: "Dont Round";
    src: url(/assets/font/DontRound.ttf);
  }

  @font-face {
    font-family: "Dont Circle";
    src: url(/assets/font/DontCircle.ttf);
  }

  @font-face {
    font-family: "Zen Kaku Gothic New";
    font-weight: normal;
    src: url(/assets/font/ZenKakuGothicNew-Regular.ttf);
  }

  @font-face {
    font-family: "Zen Kaku Gothic New";
    font-weight: bold;
    src: url(/assets/font/ZenKakuGothicNew-Bold.ttf);
  } */

  body {
    font-family: "Zen Kaku Gothic New", sans-serif;
    color: ${dg4Color.black};
  }

  object {
    pointer-events: none;
  }

  main {
    min-height: 100vh;
  }

  header,
  main,
  footer {
    overflow: hidden;
  }

  * {
    font-weight: normal;

    // cursor: -webkit-image-set(url(/assets/image/cursor-normal.png) 1x, url(/assets/image/cursor-normal@2x.png) 2x), default
    user-select: none;
    scroll-behavior: smooth;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  // image
  img {
    width: 100%;
    height: auto;

    pointer-events: none;
  }
`;

export default style;
