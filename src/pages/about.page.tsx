import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import meaningItemElm from "@/components/about/MeaningItem";
import skillGraph from "@/components/about/SkillGraph";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import H3 from "@/components/heading/Heading3";
import { breakPoint } from "@/styles/config";

const containerContent = css`
  display: flex;
  flex-direction: column;
`;

const infoItem = css`
  display: flex;
  gap: 50px;

  ${breakPoint.sp} {
    flex-direction: column;
    gap: 20px;
  }
`;

const infoImage = css`
  width: calc(100% - 370px);
  height: auto;

  ${breakPoint.sp} {
    width: 100%;
    padding: 32px;
    margin: 0 auto;
  }
`;

const infoTable = css`
  display: block;
  tbody tr {
    th {
      min-width: 5em;
      width: 120px;
      font-weight: bold;
      text-align: left;
      padding: 8px 0;
    }
    td {
      width: 230px;
    }

    ul {
      line-height: 1.6em;
    }

    /* add marker */
    li {
      list-style: disc inside;
    }

    li > ul {
      padding-left: 2em;
    }
  }
`;

const logoPara = css`
  text-align: center;
  margin-bottom: 40px;
`;

const logoImage = css`
  width: 600px;

  margin-left: auto;
  margin-right: auto;
  ${breakPoint.sp} {
    width: 100%;
  }
`;

const button = css`
  margin-top: 40px;

  margin-left: auto;
  margin-right: auto;
`;

const meaningHeading = css`
  margin-bottom: 80px;
`;

const meaningContainer = css`
  width: 100%;
`;

const meaningItem = css`
  display: flex;

  animation: loopSlide 25s infinite linear both;

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

  margin-left: auto;
  margin-right: auto;
`;

const About: NextPage = () => {
  return (
    <Layout title="About" description="dgdgdgdgについての概要、スキル、使用機材についての説明です。">
      <H1 />

      <section id="overview">
        <Container>
          <H2 en="Overview" ja="概要" />
          <div className="content" css={containerContent}>
            <H3 en="My Profile" ja="プロフィール" />
            <div css={infoItem}>
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
                    <th>所在地</th>
                    <td>宮城県</td>
                  </tr>
                  <tr>
                    <th>事業開始日</th>
                    <td>2021/02/01</td>
                  </tr>
                  <tr>
                    <th>事業内容</th>
                    <td>
                      <ul>
                        <li>
                          Webサイト制作
                          <ul>
                            <li>ワイヤーフレーム</li>
                            <li>デザイン</li>
                            <li>コーディング</li>
                            <li>STUDIO実装</li>
                          </ul>
                        </li>
                        <li>
                          デザイン
                          <ul>
                            <li>ロゴ</li>
                            <li>名刺</li>
                            <li>ドット絵</li>
                            <li>チラシ・ポスター</li>
                          </ul>
                        </li>
                        <li>
                          映像制作
                          <ul>
                            <li>写真 撮影・編集</li>
                            <li>動画 撮影・編集</li>
                            <li>アニメーション</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content logo" css={containerContent}>
            <H3 en="Logo" ja="ロゴ" />
            <div className="item">
              <p css={logoPara}>dgdgdgdgで「だがし」と読みます</p>
              <div className="logo" css={logoImage}>
                <Logo />
              </div>
            </div>
            <Button css={button} href="/design-resource" />
          </div>

          <div className="content meaning" css={containerContent}>
            <H3 css={meaningHeading} en={`Meaning of "dgdgdgdg"`} ja={`"だがし"に含まれる意味`} />
          </div>
        </Container>
        <Container css={meaningContainer}>
          <div className="content" css={containerContent}>
            <ul css={meaningItem}>{[meaningItemElm, meaningItemElm, meaningItemElm]}</ul>
          </div>
        </Container>
      </section>

      <section id="skill">
        <Container>
          <H2 en="Skill" ja="スキル" />
          <div className="content" css={[containerContent, skillContent]}>
            <ul>{skillGraph}</ul>
            <Button css={button} href="/works" />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default About;
