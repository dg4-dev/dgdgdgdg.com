import { css } from "@emotion/react";

import { breakPoint, dg4Color } from "@/styles/config";

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

export default WorkflowList;
