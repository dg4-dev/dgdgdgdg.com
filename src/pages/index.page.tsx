import { css } from "@emotion/react";

import type { NextPage } from "next";

import Layout from "@/components/Layout";
import Parallax from "@/components/Parallax";
import { breakPoint, dg4Color } from "@/styles/config";

// TODO: Lottieのためのリンク
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

  #space {
    width: 97vw;

    position: absolute;
    top: 0;
    bottom: 0;
    left: -14vw;

    margin: auto;

    ${breakPoint.sp} {
      width: unset;
      height: 100vh;

      left: 0;
      right: 0;

      margin-left: -20vw;
    }
  }

  .logo {
    position: absolute;
  }

  #logo1 {
    width: 10vw;

    top: 32vh;
    left: 30vw;
  }

  #logo2 {
    width: 14vw;

    top: 18vh;
    left: 51vw;
  }

  #logo3 {
    width: 52vw;

    top: 44vh;
    left: 54vw;
  }

  #logo4 {
    width: 138vw;

    top: 58vh;
    left: -77vw;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout description="2021年2月1日に開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。">
      <section css={fv}>
        <object id="space" data="/images/fv/space.svg" type="image/svg+xml"></object>
        <Parallax factor={0.4}>
          <object className="logo" id="logo1" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        </Parallax>
        <Parallax factor={0.2}>
          <object className="logo" id="logo2" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        </Parallax>
        <Parallax factor={-0.4}>
          <object className="logo" id="logo3" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        </Parallax>
        <Parallax factor={-0.8}>
          <object className="logo" id="logo4" data="/images/dist/logo-white.svg" type="image/svg+xml"></object>
        </Parallax>
      </section>
    </Layout>
  );
};

export default Home;
