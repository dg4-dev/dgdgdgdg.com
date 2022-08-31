import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Age from "@/api/nowAge";
import meaningItemElm from "@/components/about/meaningItem";
import skillGraph from "@/components/about/skillGraph";
import Button from "@/components/button";
import Container from "@/components/container";
import H1 from "@/components/heading/h1";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { center, flex } from "@/styles/common";
import { bp } from "@/styles/config";

const containerContent = css`
  flex-direction: column;
`;

const infoItem = css`
  gap: 50px;

  ${bp.sp} {
    flex-direction: column;
    gap: 20px;
  }
`;

const infoImage = css`
  width: calc(100% - 370px);
  height: auto;

  ${bp.sp} {
    width: 100%;
    padding: 32px;
    margin: 0 auto;
  }
`;

const infoTable = css`
  display: block;
  tbody tr {
    th {
      width: 120px;
      font-weight: bold;
      text-align: left;
      padding: 8px 0;
    }
    td {
      width: 230px;
    }
  }
`;

const logoPara = css`
  text-align: center;
  margin-bottom: 40px;
`;

const logoImage = css`
  width: 600px;
  ${bp.sp} {
    width: 100%;
  }
`;

const btn = css`
  margin-top: 40px;
`;

const meaningHeading = css`
  margin-bottom: 80px;
`;

const meaningContainer = css`
  width: 100%;
`;

const meaningItem = css`
  animation: loopSlide 15s infinite linear both;

  @keyframes loopSlide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-1991px);
    }
  }
`;

const skillContent = css`
  width: fit-content;
`;

const About: NextPage = () => {
  return (
    <Layout title="About | dgdgdgdg" description="dgdgdgdgについての概要、スキル、使用ツールについての説明です。">
      <H1 />

      <section id="overview">
        <Container>
          <H2 en="Overview" ja="概要" />
          <div className="content information" css={[containerContent, flex]}>
            <H3 en="Information" ja="情報" />
            <div css={[infoItem, flex]}>
              <div css={infoImage}>
                <Image src="/images/profile.png" width={600} height={600} alt="" />
              </div>
              <table css={infoTable}>
                <tbody>
                  <tr>
                    <th>名称</th>
                    <td>dgdgdgdg (だがし)</td>
                  </tr>
                  <tr>
                    <th>年齢</th>
                    <td>{Age}</td>
                  </tr>
                  <tr>
                    <th>所在地</th>
                    <td>宮城県</td>
                  </tr>
                  <tr>
                    <th>事業開始日</th>
                    <td>2021/02/01</td>
                  </tr>
                  <tr>
                    <th>事業内容</th>
                    <td>デザイン, 映像制作, Web制作</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content logo" css={[containerContent, flex]}>
            <H3 en="Logo" ja="ロゴマーク" />
            <div className="item">
              <p css={logoPara}>dgdgdgdgで「だがし」と読みます</p>
              <div className="logo" css={[logoImage, center]}>
                <object data="/images/logo.svg" type="image/svg+xml"></object>
              </div>
            </div>
            <Button css={[btn, center]} href="/about/brand" />
          </div>

          <div className="content meaning" css={[containerContent, flex]}>
            <H3 css={meaningHeading} en={`Meaning of "dgdgdgdg"`} ja={`"だがし"に含まれる意味`} />
          </div>
        </Container>
        <Container css={meaningContainer}>
          <div className="content" css={[flex]}>
            <ul css={[meaningItem, flex]}>{meaningItemElm}</ul>
            <ul css={[meaningItem, flex]}>{meaningItemElm}</ul>
            <ul css={[meaningItem, flex]}>{meaningItemElm}</ul>
          </div>
        </Container>
      </section>

      <section id="skill">
        <Container>
          <H2 en="Skill" ja="スキル" />
          <div className="content" css={[containerContent, skillContent, center, flex]}>
            <ul>{skillGraph}</ul>
            <Button css={[btn, center]} href="/works" />
          </div>
        </Container>
      </section>

      <section id="tool">
        <Container>
          <H2 en="Tool" ja="ツール" />
        </Container>
        <Container>
          <div css={flex}>
            {/* TODO: */}
            {/* {toolList} */}
          </div>
          <Button css={[btn, center]} href="/about/tool" />
        </Container>
      </section>
    </Layout>
  );
};

export default About;
