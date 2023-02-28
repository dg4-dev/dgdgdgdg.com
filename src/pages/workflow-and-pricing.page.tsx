import { css } from "@emotion/react";

import type { NextPage } from "next";

import Container from "@/components/container";
import H1 from "@/components/heading/heading1";
import H2 from "@/components/heading/heading2";
import H3 from "@/components/heading/heading3";
import Layout from "@/components/layout";
import Note from "@/components/note";
import { dg4Color, breakPoint } from "@/styles/config";

const workflowContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px 20px;
`;

const workflowItems = css`
  height: fit-content;
  position: relative;
  z-index: 0;
  padding: 20px 0;
  ${breakPoint.sp} {
    width: 100%;
  }
`;

const workflowItem = css`
  width: 300px;
  padding-left: 32px;

  position: relative;

  ${breakPoint.tab} {
    width: 270px;
  }
  ${breakPoint.sp} {
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

  ${breakPoint.tab} {
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

  ${breakPoint.sp} {
    font-size: 12px;
  }
`;

const pricingPlanItems = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  justify-content: space-between;

  ${breakPoint.tab} {
    gap: 20px 25px;
  }
`;

const pricingPlanItem = css`
  width: 380px;
  font-weight: bold;
  color: #fff;
  padding: 16px;

  ${breakPoint.tab} {
    width: 350px;
  }

  ${breakPoint.sp} {
    width: 100%;
  }
`;

const pricingPlanItemTitle = css`
  font-size: 20px;
  text-align: center;
`;

const pricingPlanItemPrice = css`
  font-family: "Dont", sans-serif;
  font-size: 64px;
  font-weight: normal;
  text-align: center;
  margin-top: 12px;
`;

const pricingPlanItemText = css`
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
`;

const setItemBG = css`
  background-color: ${dg4Color.blue};
`;
const singleItemBG = css`
  background-color: ${dg4Color.cyan};
`;

const Service: NextPage = () => {
  const workflowRaw: {
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

  type ListProps = {
    option: string;
  };

  const WorkflowList = ({ option }: ListProps) => {
    return (
      <>
        {workflowRaw[option].map(({ text, badge }) => {
          const nowColor = badge?.color as string;
          const color = css`
            background-color: ${dg4Color[nowColor]};
          `;
          return badge ? (
            <div key={text} css={workflowItem}>
              <div css={itemText}>{text}</div>
              <div css={[itemBadge, color]}>{badge.text}</div>
            </div>
          ) : (
            <div key={text} css={workflowItem}>
              <div css={itemText}>{text}</div>
            </div>
          );
        })}
      </>
    );
  };

  const pricingPlanRaw: {
    [key in string]: {
      title: string;
      price: number;
      pricingPlanText?: string;
    }[];
  } = {
    set: [
      {
        title: "コーポレートセット",
        price: 240000,
        pricingPlanText:
          "新しく会社を立ち上げた方やデザインのリニューアルにおすすめ！ロゴ・名刺・Webをまとめたプランです。",
      },
      {
        title: "PVセット",
        price: 120000,
        pricingPlanText: "ロゴ・アニメーション・映像の撮影と編集をまとめた、PV・MVに最適なプランです。",
      },
    ],
    single: [
      {
        title: "Webサイト (1ページ ~)",
        price: 65000,
      },
      {
        title: "映像制作",
        price: 50000,
      },
      {
        title: "モーショングラフィックス",
        price: 10000,
      },
      {
        title: "ロゴデザイン",
        price: 50000,
      },
      {
        title: "ポスターデザイン",
        price: 30000,
      },
      {
        title: "名刺デザイン",
        price: 15000,
      },
      {
        title: "ドット絵",
        price: 3000,
      },
      {
        title: "写真撮影",
        price: 5000,
      },
    ],
  };

  const PricingPlanList = ({ option }: ListProps) => {
    return (
      <>
        {pricingPlanRaw[option].map(({ title, price, pricingPlanText }) => {
          const priceString = price.toLocaleString();
          return pricingPlanText ? (
            <div key={title} css={[pricingPlanItem, setItemBG]}>
              <h4 css={pricingPlanItemTitle}>{title}</h4>
              <div css={pricingPlanItemPrice}>{priceString}</div>
              <div css={pricingPlanItemText}>{pricingPlanText}</div>
            </div>
          ) : (
            <div key={title} css={[pricingPlanItem, singleItemBG]}>
              <h4 css={pricingPlanItemTitle}>{title}</h4>
              <div css={pricingPlanItemPrice}>{priceString} ~</div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Layout title="Service | dgdgdgdg" description="Webサイトやデザインの制作の流れ、承っているプランをご紹介します。">
      <H1 />

      <section id="workflow">
        <Container>
          <H2 en="Workflow" ja="制作の流れ" />
          <div className="content" css={workflowContent}>
            <div css={workflowItems}>
              <H3 en="Design" ja="デザイン" />
              <WorkflowList option="design" />
            </div>
            <div css={workflowItems}>
              <H3 en="Website" ja="ウェブサイト" />
              <WorkflowList option="web" />
            </div>
          </div>
        </Container>
      </section>

      <section id="pricingPlan">
        <Container>
          <H2 en="Pricing Plan" ja="料金プラン" />
          <Note>表示料金は基本料です。お打ち合わせ後に正式見積りとなります。</Note>
          <div className="content setplan">
            <H3 en="Set plan" ja="セットプラン" />
            <div css={pricingPlanItems}>
              <PricingPlanList option="set" />
            </div>
          </div>
          <div className="content single">
            <H3 en="Single Plan" ja="単体プラン" />
            <div css={pricingPlanItems}>
              <PricingPlanList option="single" />
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Service;
