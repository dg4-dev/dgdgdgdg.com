import { css } from "@emotion/react";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import H1 from "@/components/heading/h1";
import H2 from "@/components/heading/h2";
import H3 from "@/components/heading/h3";
import Layout from "@/components/layout";
import { center, flex } from "@/styles/common";
import { bp, dg4Color } from "@/styles/config";

const flowContent = css`
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px 20px;
`;

const flowItems = css`
  height: fit-content;
  position: relative;
  z-index: 0;
  padding: 20px 0;
  ${bp.sp} {
    width: 100%;
  }
`;

const flowItem = css`
  width: 300px;
  padding-left: 32px;

  position: relative;

  ${bp.tab} {
    width: 270px;
  }
  ${bp.sp} {
    width: 100%;
  }

  ::before {
    content: "";
    width: 12px;
    height: 12px;
    background-color: ${dg4Color.cyan};

    border-radius: 18px;
    margin: auto 16px auto 0px;

    position: absolute;
    top: 50%;
    left: 0;

    transform: translate(0, -50%);
  }

  :not(:nth-of-type(1)) {
    margin-top: 56px;
  }
`;

const itemText = css`
  font-size: 20px;
  font-weight: bold;

  ${bp.tab} {
    font-size: 16px;
  }
`;

const itemBadge = css`
  width: fit-content;
  height: fit-content;
  font-size: 14px;
  color: #fff;
  padding: 8px 14px;
  border-radius: 5px;

  margin-top: 16px;

  ${bp.sp} {
    font-size: 12px;
  }
`;

const btn = css`
  margin-top: 40px;
`;

const Service: NextPage = () => {
  const flowRaw: {
    [key in string]: {
      text: string;
      badge?: {
        text: string;
        color: "blue" | "orange" | "black";
      };
    }[];
  } = {
    design: [
      {
        text: "お問い合わせ・ご相談",
      },
      {
        text: "ヒアリング",
        badge: {
          text: "お打ち合わせ (1回目)",
          color: "blue",
        },
      },
      {
        text: "お見積の提出",
        badge: {
          text: "お見積の提出まで無料！",
          color: "orange",
        },
      },
      {
        text: "ご契約",
      },
      {
        text: "デザイン案のご提出・ご確認",
        badge: {
          text: "お打ち合わせ (2回目)",
          color: "blue",
        },
      },
      {
        text: "納品",
        badge: {
          text: "製作費のお支払い",
          color: "black",
        },
      },
    ],
    web: [
      {
        text: "お問い合わせ・ご相談",
      },
      {
        text: "ヒアリング",
        badge: {
          text: "お打ち合わせ (1回目)",
          color: "blue",
        },
      },
      {
        text: "構成案・お見積の提出",
        badge: {
          text: "お見積の提出まで無料！",
          color: "orange",
        },
      },
      {
        text: "ご契約",
      },
      {
        text: "デザイン案のご提出・ご確認",
        badge: {
          text: "お打ち合わせ (2回目)",
          color: "blue",
        },
      },
      {
        text: "実装",
      },

      {
        text: "検証・公開準備・ご確認",
        badge: {
          text: "お打ち合わせ (3回目)",
          color: "blue",
        },
      },
      {
        text: "公開・納品",
        badge: {
          text: "製作費のお支払い",
          color: "black",
        },
      },
      {
        text: "保守・更新",
      },
    ],
  };
  const flowList = (opt: string) => {
    return flowRaw[opt].map(({ text, badge }) => {
      const nowColor = badge?.color as string;
      const color = css`
        background-color: ${dg4Color[nowColor]};
      `;
      return badge ? (
        <div key={text} css={flowItem}>
          <div css={itemText}>{text}</div>
          <div css={[itemBadge, color]}>{badge.text}</div>
        </div>
      ) : (
        <div key={text} css={flowItem}>
          <div css={itemText}>{text}</div>
        </div>
      );
    });
  };
  return (
    <Layout
      title="Service"
      description="dgdgdgdgがnextの練習用に作成するページ。参考記事はJSだが、TSの練習も兼ねて進める。[参考](https://www.webopixel.net/javascript/1714.html)"
    >
      <H1 />

      <section id="flow">
        <Container>
          <H2 en="Flow" ja="制作の流れ" />
          <div className="content" css={[flowContent, flex]}>
            <div css={flowItems}>
              <H3 en="Design" ja="デザイン" />
              {flowList("design")}
            </div>
            <div css={flowItems}>
              <H3 en="Web site" ja="ウェブサイト" />
              {flowList("web")}
            </div>
          </div>
          <Button text="See Contact" href="/contact" css={[btn, center]} />
        </Container>
      </section>
    </Layout>
  );
};

export default Service;
