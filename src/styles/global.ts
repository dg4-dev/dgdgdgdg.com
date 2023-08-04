import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

const global = css`
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
    font-family: "Dont-GR";
    src: url("/fonts/Dont-GR-SquareVF.ttf");
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
    line-height: 1;
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

    cursor: -webkit-image-set(url("/images/cursor/cursor-normal.png") 1x, url("/images/cursor/cursor-normal@2x.png") 2x),
      default;
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

  a {
    display: block;
    text-decoration: none;
    color: ${dg4Color.black};
    transition: all 0.3s;
  }

  a:hover {
    opacity: 0.5;
  }

  a,
  a *,
  .clickable,
  .clickable * {
    cursor: -webkit-image-set(
        url("/images/cursor/cursor-pointer.png") 1x,
        url("/images/cursor/cursor-pointer@2x.png") 2x
      ),
      pointer;
  }

  section {
    padding-top: 120px;

    ${breakPoint.tab} {
      padding-top: 80px;
    }

    ${breakPoint.sp} {
      padding-top: 60px;
    }
  }

  section:last-child {
    margin-bottom: 160px;

    ${breakPoint.tab} {
      margin-bottom: 120px;
    }

    ${breakPoint.sp} {
      margin-bottom: 80px;
    }
  }

  ruby rt {
    font-size: 0.4em;
  }
`;

export default global;
