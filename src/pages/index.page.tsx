import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Layout from "@/components/Layout";

// TODO: Lottieのためのリンク
// https://blue-de.com/butterfly-scissor-difference/
// https://codepen.io/michaelzero00/pen/KKXJjOg
// https://zenn.dev/hndr/scraps/b5b33f1157db5d#comment-292449cb553aae

const fv = css`
  position: relative;
  width: 100vw;
  height: 100vh;

  padding-top: 0;

  :last-child {
    margin-bottom: 0;
  }

  span img {
    object-fit: cover;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout description="2021年2月1日に開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。">
      <section css={fv}>
        <Image priority={true} src="/images/fv/top.png" layout="fill" alt="dg4 first view" />
      </section>
    </Layout>
  );
};

export default Home;
