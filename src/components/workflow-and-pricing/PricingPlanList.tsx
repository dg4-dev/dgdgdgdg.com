import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

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

const PricingPlanList = ({ option }: { option: string }) => {
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

export default PricingPlanList;
