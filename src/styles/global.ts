import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

const global = css`
  // font
  @font-face {
    font-family: "Atomic Dot";
    src: url("/fonts/DG4AtomicDot-SquareVF.ttf");
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
    cursor: pointer;
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
