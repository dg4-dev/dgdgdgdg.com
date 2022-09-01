import { css } from "@emotion/react";

import type { NextPage } from "next";

import Button from "@/components/button";
import Container from "@/components/container";
import { H1, H2, H3 } from "@/components/heading/headingPortal";
import Layout from "@/components/layout";
import Note from "@/components/note";
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
  margin-top: 32px;
`;

const planItems = css`
  flex-wrap: wrap;
  gap: 20px 40px;
  justify-content: space-between;

  ${bp.tab} {
    gap: 20px 25px;
  }
`;

const planItem = css`
  width: 380px;
  font-weight: bold;
  color: #fff;
  padding: 16px;

  ${bp.tab} {
    width: 350px;
  }

  ${bp.sp} {
    width: 100%;
  }
`;

const planItemTitle = css`
  font-size: 20px;
  text-align: center;
`;

const planItemPrice = css`
  font-family: "Dont", sans-serif;
  font-size: 64px;
  font-weight: normal;
  text-align: center;
  margin-top: 12px;
`;

const planItemText = css`
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

  const planRaw: {
    [key in string]: {
      title: string;
      price: Number;
      planText?: string;
    }[];
  } = {
    set: [
      {
        title: "PVセット",
        price: 120000,
        planText: "ロゴ・アニメーション・映像の撮影と編集をまとめた、PV・MVに最適なプランです。",
      },
      {
        title: "コーポレートセット",
        price: 240000,
        planText: "新しく会社を立ち上げた方やデザインのリニューアルにおすすめ！ロゴ・名刺・Webをまとめたプランです。",
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
    ],
  };

  const planList = (opt: string) => {
    return planRaw[opt].map(({ title, price, planText }) => {
      const priceString = price.toLocaleString();
      return planText ? (
        <div key={title} css={[planItem, setItemBG]}>
          <h4 css={planItemTitle}>{title}</h4>
          <div css={planItemPrice}>{priceString}</div>
          <div css={planItemText}>{planText}</div>
        </div>
      ) : (
        <div key={title} css={[planItem, singleItemBG]}>
          <h4 css={planItemTitle}>{title}</h4>
          <div css={planItemPrice}>{priceString} ~</div>
        </div>
      );
    });
  };

  return (
    <Layout title="Service | dgdgdgdg" description="Webサイトやデザインの制作の流れ、承っているプランをご紹介します。">
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

      <section id="plan">
        <Container>
          <H2 en="Plan" ja="プラン" />
          <Note>表示料金は基本料です。お打ち合わせ後に正式見積りとなります。</Note>
          <div className="content setplan">
            <H3 en="Set plan" ja="セットプラン" />
            <div css={[planItems, flex]}>{planList("set")}</div>
          </div>
          <div className="content single">
            <H3 en="Single Plan" ja="単体プラン" />
            <div css={[planItems, flex]}>{planList("single")}</div>
            <Button text="See Contact" href="/contact" css={[btn, center]} />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Service;
