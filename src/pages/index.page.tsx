import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { flex, center } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const topFV = css`
  width: 100%;
  height: 100vh;
  background-image: url("/images/fv/top.png");
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
  justify-content: space-between;
  gap: 40px;

  ${bp.sp} {
    flex-direction: column;
  }

  .item {
    width: 100%;
    max-width: 230px;
    flex-direction: column;

    ${bp.sp} {
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

  ${bp.tab} {
    max-width: none;
  }
`;

const aboutContent = css`
  .item {
    width: 100%;
    max-width: none;
    flex-direction: row;
    justify-content: space-between;
    gap: 40px;

    ${bp.sp} {
      flex-direction: column;
    }
    .text {
      max-width: 230px;

      ${bp.sp} {
        max-width: none;
        margin-right: 0;
      }
    }
  }
`;

const contact = css`
  background-color: ${dg4Color.blue};

  height: 280px;
  align-items: center;

  padding-top: 0;
  margin-top: 120px;
  margin-bottom: 0px;

  ${bp.tab} {
    margin-top: 80px;
  }
  ${bp.sp} {
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 60px;
  }
`;

const wrapper = css`
  width: 100%;
  max-width: 600px;

  justify-content: space-between;

  align-items: center;

  ${bp.sp} {
    flex-direction: column;
    justify-content: start;
  }
  .content {
    flex-direction: column;
    color: #fff;

    ${bp.sp} {
      margin-bottom: 20px;
      margin-right: auto;
    }
    h2 {
      font-family: "Dont", sans-serif;
      font-size: 60px;
      margin-bottom: 20px;
    }
  }
`;

const contactBtn = css`
  ${bp.sp} {
    margin-right: auto;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout
      title='dgdgdgdg | 宮城県でデザイン、映像制作、Web制作をしている"だがし"です。'
      description="2021年2月1日に19歳で開業。デザイン、映像制作、Web制作をメインに、多方面であることを生かしつつ洗練されたものを目指して制作していきます。"
    >
      <section css={[topFV, flex]}>
        <div css={scroll}>Scroll Down</div>
      </section>
      <section>
        <Container>
          <H2 en="About" ja="dgdgdgdgとは" />
          <div className="content" css={[content, flex]}>
            <div className="item" css={flex}>
              <p>dgdgdgdgの概要、スキル、使用ツールについての説明です。</p>
              <Button href="/about" />
            </div>
            <div css={image}>
              <Image src="/images/fv/about.jpg" width="616" height="347" alt="" />
            </div>
          </div>
          <div className="content" css={[content, aboutContent]}>
            <H3 en="Brand resource" ja="ブランドリソース" />
            <div className="item" css={flex}>
              <div className="text">
                <p>
                  サイトのカラーやロゴについて詳しく説明します。
                  <br />
                  ロゴデータの配布も。
                </p>

                <Button href="/about/brand" />
              </div>
              <div css={image}>
                <Image src="/images/fv/brand.jpg" width="616" height="347" alt="" />
              </div>
            </div>
          </div>
          <div className="content" css={[content, aboutContent]}>
            <H3 en="Tool" ja="ツール一覧" />
            <div className="item" css={flex}>
              <div className="text">
                <p>
                  使用しているツールをドット絵として描き上げています。
                  <br />
                  ツールそのものの詳しい情報もこちら。
                </p>

                <Button href="/about/tool" />
              </div>
              <div css={image}>
                <Image src="/images/fv/tool.jpg" width="616" height="347" alt="" />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <H2 en="Works" ja="dgdgdgdgの作品" />
          <div className="content" css={[content, flex]}>
            <div className="item" css={flex}>
              <p>フォント、Webサイト、ロゴ、写真、動画と、制作実績の中からピックアップしてご紹介します。</p>
              <Button href="/works" />
            </div>
            <div css={image}>
              <Image src="/images/fv/works.jpg" width="616" height="347" alt="" />
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <H2 en="Service" ja="dgdgdgdgのプラン" />
          <div className="content" css={[content, flex]}>
            <div className="item" css={flex}>
              <p>Webサイトやデザインの制作の流れ、承っているプランをご紹介します。</p>
              <Button href="/service" />
            </div>
            <div css={image}>
              <Image src="/images/fv/service.jpg" width="616" height="347" alt="" />
            </div>
          </div>
        </Container>
      </section>
      <section css={[contact, flex]}>
        <div css={[wrapper, center, flex]}>
          <div className="content" css={flex}>
            <h2>Contact</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          <Button css={contactBtn} href="/contact" />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
