import { css } from "@emotion/react";
import {
  SiFigma,
  SiAdobexd,
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAseprite,
  SiAdobelightroom,
  SiAdobeaftereffects,
  SiAdobepremierepro,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import Note from "@/components/Note";
import meaningItemElm from "@/components/about/MeaningItem";
import SkillGraph from "@/components/about/SkillGraph";
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

const ulItems = css`
  line-height: 1.6em;
  display: flex;
  div {
    background-color: ${dg4Color.black};
    color: #ffffff;

    .heading {
      font-weight: bold;
    }

    ul {
      margin-top: 8px;
    }
  }
`;

const businessItems = css`
  justify-content: space-between;

  div {
    width: 235px;

    padding: 24px 40px;

    ul li {
      list-style: disc inside;
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

const techItems = css`
  flex-direction: column;
  gap: 16px;

  div {
    padding: 24px;
    padding-top: 16px;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      li {
        padding: 4px 10px;
        border: 1px solid #ffffff;
        border-radius: 4px;

        display: flex;
        align-items: center;
        gap: 8px;

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
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
  display: flex;
  justify-content: space-between;

  gap: 40px;

  ${breakPoint.tab} {
    flex-wrap: wrap;
  }

  ${breakPoint.sp} {
    flex-direction: column;
  }
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
            <H3 css={meaningHeading} en='Meaning of "dgdgdgdg"' ja='"だがし"に含まれる意味' />
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
            <div css={[ulItems, businessItems]}>
              <div>
                <h3 className="heading">Webサイト制作</h3>
                <ul>
                  <li>ワイヤーフレーム</li>
                  <li>デザイン</li>
                  <li>コーディング</li>
                  <li>STUDIO実装</li>
                </ul>
              </div>
              <div>
                <h3 className="heading">デザイン</h3>
                <ul>
                  <li>ロゴ</li>
                  <li>名刺</li>
                  <li>ドット絵</li>
                  <li>チラシ・ポスター</li>
                </ul>
              </div>
              <div>
                <h3 className="heading">映像制作</h3>
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
          <div className="content">
            <H3 en="Technologies" ja="使用技術" />
            <div css={[ulItems, techItems]}>
              <div>
                <h4 className="heading">Webサイト制作</h4>
                <ul>
                  <li>
                    <SiFigma />
                    <span>Figma</span>
                  </li>
                  <li>
                    <SiAdobexd color="default" />
                    <span>Adobe XD</span>
                  </li>
                  <li>STUDIO</li>
                  <li>
                    <SiHtml5 color="default" />
                    <span>HTML</span>
                  </li>
                  <li>
                    <SiCss3 color="default" />
                    <span>CSS</span>
                  </li>
                  <li>
                    <SiSass color="default" />
                    <span>Sass</span>
                  </li>
                  <li>
                    <SiJavascript color="default" />
                    <span>JavaScript</span>
                  </li>
                  <li>
                    <SiTypescript color="default" />
                    <span>TypeScript</span>
                  </li>
                  <li>
                    <SiReact color="default" />
                    <span>React</span>
                  </li>
                  <li>
                    <SiNextdotjs />
                    <span>Next.js</span>
                  </li>
                  <li>
                    <SiVuedotjs color="default" />
                    <span>Vue.js</span>
                  </li>
                  <li>
                    <SiGit color="default" />
                    <span>Git</span>
                  </li>
                  <li>
                    <SiGithub />
                    <span>GitHub</span>
                  </li>
                  <li>
                    <SiGitlab color="default" />
                    <span>GitLab</span>
                  </li>
                  <li>
                    <SiBitbucket color="default" />
                    <span>Bitbucket</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="heading">デザイン</h4>
                <ul>
                  <li>
                    <SiAdobeillustrator color="default" />
                    <span>Adobe Illustrator</span>
                  </li>
                  <li>
                    <SiFigma />
                    <span>Figma</span>
                  </li>
                  <li>
                    <SiAdobexd color="default" />
                    <span>Adobe XD</span>
                  </li>
                  <li>
                    <SiAdobephotoshop color="default" />
                    <span>Adobe Photoshop</span>
                  </li>
                  <li>
                    <SiAseprite />
                    <span>Aseprite</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="heading">映像制作</h4>
                <ul>
                  <li>
                    <SiAdobephotoshop color="default" />
                    <span>Adobe Photoshop</span>
                  </li>
                  <li>
                    <SiAdobelightroom color="default" />
                    <span>Adobe Lightroom</span>
                  </li>
                  <li>
                    <SiAdobeaftereffects color="default" />
                    <span>Adobe After Effects</span>
                  </li>
                  <li>
                    <SiAdobepremierepro color="default" />
                    <span>Adobe Premiere Pro</span>
                  </li>
                  <li>Loopback</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content" css={skillContent}>
            <div>
              <H3 en="Days Ratio" ja="始めてからの日数比" />
              <SkillGraph />
            </div>
            <div>
              <H3 en="Self Assessment" ja="自己評価" />
              <SkillGraph
                amountData={[
                  {
                    name: "デザイン",
                    amount: 8,
                  },
                  {
                    name: "映像制作",
                    amount: 5,
                  },
                  {
                    name: "モーショングラフィックス",
                    amount: 6,
                  },
                  {
                    name: "Web制作",
                    amount: 10,
                  },
                ]}
                color={dg4Color.blue}
                graphWidth={78}
              />
            </div>
          </div>
          <Button text="See Works Page" css={button} href="/works" />
        </Container>
      </section>
    </Layout>
  );
};

export default About;
