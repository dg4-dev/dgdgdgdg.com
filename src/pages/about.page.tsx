import { css } from "@emotion/react";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import Note from "@/components/Note";
import meaningItemElm from "@/components/about/MeaningItem";
import skillGraph from "@/components/about/SkillGraph";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import H3 from "@/components/heading/Heading3";
import { breakPoint, dg4Color } from "@/styles/config";

const card = css`
  border-radius: 40px;
  background: ${dg4Color.black};

  ${breakPoint.sp} {
    border-radius: 24px;
  }
`;

const cardImages = css`
  width: 100%;
  height: 250px;

  background-image: url("/images/ogp.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 40px 40px 0 0;

  position: relative;

  ${breakPoint.sp} {
    height: 200px;

    border-radius: 24px 24px 0 0;
  }
`;

const profileImage = css`
  width: 192px;
  height: 192px;

  border-radius: 50%;
  border: 4px solid ${dg4Color.black};

  position: absolute;
  bottom: 0;
  left: 32px;
  transform: translateY(50%);

  > * {
    border-radius: 50%;
  }

  ${breakPoint.sp} {
    width: 135px;
    height: 135px;

    left: 24px;
  }
`;

const cardContents = css`
  padding: 32px;
  padding-left: 256px;

  color: #ffffff;

  h4 ruby {
    color: #fff;
    font-size: 24px;
    font-weight: bold;

    rt {
      font-size: 12px;
      font-weight: bold;
    }
  }

  ${breakPoint.sp} {
    padding: 24px;
    padding-top: 84px;
  }
`;

const advInfo = css`
  margin-top: 16px;

  p {
    color: #ffffff99;
    line-height: 1.6em;

    display: flex;
    gap: 8px;

    ::before {
      color: #ffffff;
    }
  }

  .place::before {
    content: "📍";
  }

  .startDate {
    margin-top: 8px;
    ::before {
      content: "📅";
    }
  }
`;

const businessItems = css`
  line-height: 1.6em;
  display: flex;
  justify-content: space-between;

  div {
    width: 235px;
    padding: 24px 40px;

    background-color: ${dg4Color.black};
    color: #ffffff;

    h3 {
      font-weight: bold;
    }

    ul {
      margin-top: 8px;
      li {
        list-style: disc inside;
      }
    }

    ${breakPoint.sp} {
      width: 100%;
    }
  }

  ${breakPoint.tab} {
    flex-wrap: wrap;
    gap: 16px;
  }
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
          <div className="content">
            <H3 en="My Profile" ja="プロフィール" />
            <div css={card}>
              <div css={cardImages}>
                <div css={profileImage}>
                  <Image src="/images/profile.png" width={192} height={192} alt="profile image" />
                </div>
              </div>
              <div css={cardContents}>
                <h4>
                  <ruby>
                    dgdgdgdg<rt>だがし</rt>
                  </ruby>
                </h4>
                <div css={advInfo}>
                  <p className="place">〒986-0822 宮城県石巻市中央2丁目4-3 パナックけいてい</p>
                  <p className="startDate">2021年2月1日から事業を開始しました</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content logo">
            <H3 en="Logo" ja="ロゴ" />
            <div className="item">
              <Note>dgdgdgdgで「だがし」と読みます</Note>
              <div className="logo" css={logoImage}>
                <Logo />
              </div>
            </div>
            <Button css={button} href="/design-resource" />
          </div>

          <div className="content meaning">
            <H3 css={meaningHeading} en={`Meaning of "dgdgdgdg"`} ja={`"だがし"に含まれる意味`} />
          </div>
        </Container>
        <Container css={meaningContainer}>
          <div className="content">
            <ul css={meaningItem}>{[meaningItemElm, meaningItemElm, meaningItemElm]}</ul>
          </div>
        </Container>
      </section>

      <section id="Business">
        <Container>
          <H2 en="Business" ja="事業内容" />
          <div className="content">
            <div css={businessItems}>
              <div>
                <h3>Webサイト制作</h3>
                <ul>
                  <li>ワイヤーフレーム</li>
                  <li>デザイン</li>
                  <li>コーディング</li>
                  <li>STUDIO実装</li>
                </ul>
              </div>
              <div>
                <h3>デザイン</h3>
                <ul>
                  <li>ロゴ</li>
                  <li>名刺</li>
                  <li>ドット絵</li>
                  <li>チラシ・ポスター</li>
                </ul>
              </div>
              <div>
                <h3>映像制作</h3>
                <ul>
                  <li>写真 撮影・編集</li>
                  <li>動画 撮影・編集</li>
                  <li>2dモーション</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="skill">
        <Container>
          <H2 en="Skill" ja="スキル" />
          <div className="content" css={skillContent}>
            <ul>{skillGraph}</ul>
            <Button css={button} href="/works" />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default About;
