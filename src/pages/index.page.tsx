import { css } from "@emotion/react";

import type { NextPage } from "next";

import Layout from "@/components/Layout";
import { breakPoint, dg4Color } from "@/styles/config";

// TODO: Lottieのためのリンク
// https://blue-de.com/butterfly-scissor-difference/
// https://codepen.io/michaelzero00/pen/KKXJjOg
// https://zenn.dev/hndr/scraps/b5b33f1157db5d#comment-292449cb553aae

const fv = css`
  background-color: ${dg4Color.black};

  position: relative;
  width: 100vw;
  height: 120vh;

  padding-top: 0;

  :last-child {
    margin-bottom: 0;
  }

  .space {
    width: 97vw;

    position: absolute;
    top: 0;
    bottom: 0;
    left: -14vw;

    margin: auto;

    ${breakPoint.sp} {
      width: unset;
      height: 80vh;

      left: 0;
      right: 0;
    }
  }

  .logo {
    position: absolute;
  }

  .logo:nth-of-type(2) {
    width: 10vw;

    top: 32vh;
    left: 30vw;
  }

  .logo:nth-of-type(3) {
    width: 14vw;

    top: 18vh;
    left: 51vw;
  }

  .logo:nth-of-type(4) {
    width: 52vw;

    top: 44vh;
    left: 54vw;
  }

  .logo:nth-of-type(5) {
    width: 138vw;

    top: 58vh;
    left: -77vw;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout description="2021年2月1日に開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。">
      <section css={fv}>
        <object className="space" data="/images/fv/space.svg" type="image/svg+xml"></object>
        <object className="logo" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        <object className="logo" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        <object className="logo" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        <object className="logo" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
      </section>
    </Layout>
  );
};

export default Home;
