import { css } from "@emotion/react";
import dayjs from "dayjs";

import { breakPoint, dg4Color } from "@/styles/config";

const skillStart = [
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

const skillAmount = skillStart.map((skill) => ({
  name: skill.name,
  amount: dayjs().diff(skill.start, "month"),
}));

type SkillGraphProps = {
  amountData?: {
    name: string;
    amount: number;
  }[];
  color?: string;
};

const SkillGraph = ({ amountData = skillAmount, color = dg4Color.cyan }: SkillGraphProps) => {
  const maxAmount = Math.max(...amountData.map(({ amount }) => amount));
  const skillGraph = amountData.map(({ name, amount }) => {
    const ratio = Math.round((amount / maxAmount) * 100);

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

      ${breakPoint.sp} {
        width: 100%;
      }

      ::after {
        content: "";
        display: block;

        height: 100%;
        background-color: ${color};
        position: absolute;
        width: ${ratio * 0.95}%;
      }
    `;

    return (
      <li key={name} css={skillItem}>
        <p css={skillName}>{name}</p>
        <div css={skillBar}></div>
      </li>
    );
  });
  return <ul>{skillGraph}</ul>;
};

export default SkillGraph;
