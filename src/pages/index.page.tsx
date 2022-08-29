import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const topFV = css`
  width: 100%;
  height: 100vh;
  background-image: url("/images/fv.png");
  background-size: cover;
  background-position: center;

  position: relative;
`;

const scroll = css`
  position: absolute;
  bottom: 20px;
  right: 20px;

  font-family: "Dont", sans-serif;
  font-size: 24px;
  color: ${dg4Color.cyan};
`;

const content = css`
  justify-content: space-around;
  gap: 40px;

  ${bp.sp} {
    flex-direction: column;
  }

  .item {
    width: 100%;
    max-width: 230px;
    flex-direction: column;

    ${bp.sp} {
      max-width: none;
      margin-right: 0;
    }
  }
  .item p {
    line-height: 24px;
    margin-bottom: 20px;
  }
`;

const image = css`
  width: 100%;
  max-width: 530px;

  ${bp.sp} {
    max-width: none;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout description="">
      <section css={[topFV, flex]}>
        <div css={scroll}>Scroll Down</div>
      </section>
      <section>
        <Container>
          <H2 en="About" ja="dgdgdgdgとは" />
          <div className="content" css={[content, flex]}>
            <div className="item" css={[flex]}>
              <p>dgdgdgdgの概要、スキル、使用ツールについての説明です。</p>
              <Button href="/about" />
            </div>
            <div css={image}>
              <Image src="/images/about-fv.png" width="530" height="299" alt="" />
            </div>
          </div>
          <div className="content">
            <H3 en="Brand resource" ja="ブランドリソース" />
          </div>
          <div className="content">
            <H3 en="Tool" ja="ツール一覧" />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <H2 en="Works" ja="dgdgdgdgの作品" />
        </Container>
      </section>
      <section>
        <Container>
          <H2 en="Service" ja="dgdgdgdgのプラン" />
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
