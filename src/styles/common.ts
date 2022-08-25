import { css } from "@emotion/react";

import dg4Color from "@/styles/config/color";

const style = css`
  // font
  @font-face {
    font-family: "Dont";
    src: url("/fonts/Dont.ttf");
  }

  @font-face {
    font-family: "Dont Round";
    src: url("/fonts/DontRound.ttf");
  }

  @font-face {
    font-family: "Dont Circle";
    src: url("/fonts/DontCircle.ttf");
  }

  @font-face {
    font-family: "Zen Kaku Gothic New";
    font-weight: normal;
    src: url("/fonts/ZenKakuGothicNew-Regular.ttf");
  }

  @font-face {
    font-family: "Zen Kaku Gothic New";
    font-weight: bold;
    src: url("/fonts/ZenKakuGothicNew-Bold.ttf");
  }

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

    cursor: -webkit-image-set(url("/images/cursor-normal.png") 1x, url("/images/cursor-normal@2x.png") 2x), default;
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
