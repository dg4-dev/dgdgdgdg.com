import { css } from "@emotion/react";
import dayjs from "dayjs";
import Image from "next/image";

import type { NextPage } from "next";

import Age from "@/api/nowAge";
import Button from "@/components/button";
import Container from "@/components/container";
import H1 from "@/components/heading/h1";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { center, flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

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

const meaningRaw: {
  phrase: string;
  mean: [string, ...string[]];
}[] = [
  {
    phrase: "4",
    mean: ["四季", "四つ葉のクローバー", "四次元", ".mp4"],
  },
  {
    phrase: "dgdg",
    mean: ["ドラムの音"],
  },
  {
    phrase: "deep",
    mean: ["深い", "奥行きのある"],
  },
  {
    phrase: "駄菓子",
    mean: ["多種多様", "多方面"],
  },
  {
    phrase: "dig",
    mean: ["調べる", "いいものを発掘する"],
  },
  {
    phrase: "digital",
    mean: ["デジタル"],
  },
  {
    phrase: "delight",
    mean: ["喜び", "楽しみ"],
  },
  {
    phrase: "design",
    mean: ["デザイン"],
  },
  { phrase: "geek", mean: ["オタク"] },
];

const meaningItemElm = meaningRaw.map((value) => {
  const meaningBit = css`
    width: fit-content;
    padding: 0 24px;
  `;

  const meaningPhrase = css`
    white-space: nowrap;
    font-family: "Dont", sans-serif;
    font-size: 64px;
    margin-bottom: 16px;

    ${bp.sp} {
      font-size: 56px;
    }
  `;

  const cyan = css`
    color: ${dg4Color.cyan};
  `;

  const noto = css`
    font-family: "Zen Kaku Gothic New", sans-serif;
    font-weight: bold;
  `;

  const meaningPara = css`
    white-space: nowrap;
    line-height: 24px;
  `;

  const meaningPhraseElms = value.phrase.split("").map((letter, index) => {
    if (letter.match(/[dg4]/g)) {
      return (
        <span key={`${letter}${index}`} css={cyan}>
          {letter}
        </span>
      );
    } else if (letter.match(/[駄菓子]/g)) {
      return (
        <span key={`${letter}${index}`} css={[cyan, noto]}>
          {letter}
        </span>
      );
    } else {
      return <span key={`${letter}${index}`}>{letter}</span>;
    }
  });

  const meaningParaElm = value.mean.map((meanParaItem) => (
    <>
      {meanParaItem}
      <br />
    </>
  ));

  return (
    <li key={value.phrase} css={meaningBit}>
      <div css={meaningPhrase}>{meaningPhraseElms}</div>
      <p css={meaningPara}>{meaningParaElm}</p>
    </li>
  );
});

const skillRaw = [
  {
    name: "デザイン",
    start: dayjs("2015-05-01"),
  },
  {
    name: "映像制作",
    start: dayjs("2017-04-01"),
  },
  {
    name: "モーショングラフィックス",
    start: dayjs("2019-04-01"),
  },
  {
    name: "Web制作",
    start: dayjs("2019-10-01"),
  },
];

const skillGraph = skillRaw.map(({ name, start }) => {
  const skillTime = Number(dayjs()) - Number(start);
  const firstTime = Number(dayjs()) - Number(skillRaw[0].start);
  const round = ~~((skillTime / firstTime) * 100);

  const skillItem = css`
    :not(:first-of-type) {
      margin-top: 40px;
    }
  `;

  const skillName = css`
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const skillBar = css`
    width: 350px;
    height: 10px;

    background-color: #eee;

    position: relative;

    ${bp.sp} {
      width: 100%;
    }

    ::after {
      content: "";
      display: block;

      height: 100%;
      background-color: ${dg4Color.cyan};
      position: absolute;
      width: ${round * 0.95}%;
    }
  `;

  return (
    <li key={name} css={skillItem}>
      <p css={skillName}>{name}</p>
      <div css={skillBar}></div>
    </li>
  );
});

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
