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

const gray = css`
  background-color: ${dg4Color.black};
`;
const orange = css`
  background-color: ${dg4Color.orange};
`;
const blue = css`
  background-color: ${dg4Color.blue};
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
        color: string;
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
          color: "gray",
        },
      },
    ],
  };
  const flowDesign = flowRaw.design.map((value) => {
    return value.badge ? (
      <div key={value.text} css={flowItem}>
        <div css={itemText}>{value.text}</div>
        <div css={[itemBadge, value.badge.color]}>{value.badge.text}</div>
      </div>
    ) : (
      <div key={value.text} css={flowItem}>
        <div css={itemText}>{value.text}</div>
      </div>
    );
  });
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
            <div css={flowItems} className="items design">
              <H3 en="Design" ja="デザイン" />
              {flowDesign}
            </div>
            <div className="items web">
              <H3 en="Web site" ja="ウェブサイト" />
              <div css={flowItem}>
                <div css={itemText}>お問い合わせ・ご相談</div>
              </div>
              <div css={flowItem}>
                <div css={itemText}>ヒアリング</div>
                <div css={[itemBadge, blue]}>お打ち合わせ (1回目)</div>
              </div>
              <div css={flowItem}>
                <div css={itemText}>構成案・お見積の提出</div>
                <div css={[itemBadge, orange]}>お見積の提出まで無料！</div>
              </div>
              <div className="item">
                <div className="text">ご契約</div>
              </div>
              <div className="item">
                <div className="text">デザイン案のご提出・ご確認</div>
                <div className="badge indigo">お打ち合わせ (2回目)</div>
              </div>
              <div className="item">
                <div className="text">実装</div>
              </div>
              <div className="item">
                <div className="text">検証・公開準備・ご確認</div>
                <div className="badge indigo">お打ち合わせ (3回目)</div>
              </div>
              <div className="item">
                <div className="text">公開・納品</div>
                <div className="badge gray">製作費のお支払い</div>
              </div>
              <div className="item">
                <div className="text">保守・更新</div>
              </div>
            </div>
          </div>
          <Button text="See Contact" href="/contact" css={[btn, center]} />
        </Container>
      </section>
    </Layout>
  );
};

export default Service;
