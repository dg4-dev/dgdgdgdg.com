import { css } from "@emotion/react";
import Head from "next/head";
import Image from "next/image";

import type { NextPage } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Loading from "@/components/loading";

// TODO: Lottieのためのリンク
// https://blue-de.com/butterfly-scissor-difference/
// https://codepen.io/michaelzero00/pen/KKXJjOg
// https://zenn.dev/hndr/scraps/b5b33f1157db5d#comment-292449cb553aae

const fv = css`
  position: relative;
  width: 100vw;
  height: 100vh;

  span img {
    object-fit: cover;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>{'dgdgdgdg | 宮城県でデザイン、映像制作、Web制作をしている"だがし"です。'}</title>

        <meta
          name="description"
          content={
            "2021年2月1日に19歳で開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。"
          }
        />
        <meta name="og:url" content={"https://dgdgdgdg.com/"} />
        <meta name="og:title" content={'dgdgdgdg | 宮城県でデザイン、映像制作、Web制作をしている"だがし"です。'} />
        <meta
          name="og:description"
          content={
            "2021年2月1日に19歳で開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。"
          }
        />

        {/* ogp image */}
        <meta name="og:image" content="https://dgdgdgdg.com/images/ogp.webp" />

        {/* Facebook OGP Settings */}
        <meta property="fb:admins" content="2006199369534363" />

        {/* Twitter OGP Settings */}
        <meta name="twitter:creator" content="@dg4_design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://dgdgdgdg.com/images/ogp.webp" />
      </Head>

      <Loading />

      <Header />

      <section css={fv}>
        <Image priority={true} src="/images/fv/top.png" layout="fill" alt="" />
      </section>

      <Footer />
    </>
  );
};

export default Home;
