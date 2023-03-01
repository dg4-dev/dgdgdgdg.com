import { css } from "@emotion/react";
import dayjs from "dayjs";

import { breakPoint, dg4Color } from "@/styles/config";

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

const maxMonths = skillRaw.reduce((max, skill) => Math.max(max, dayjs().diff(skill.start, "month")), 0);

const skillGraph = skillRaw.map(({ name, start }) => {
  const months = dayjs().diff(start, "month");
  const ratio = Math.round((months / maxMonths) * 100);

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
      background-color: ${dg4Color.cyan};
      position: absolute;
      width: ${ratio * 0.95}%;
    }
  `;

  return (
    <li key={name} css={skillItem}>
      <p css={skillName}>{name}</p>
      <path css={skillBar}></path>
    </li>
  );
});

export default skillGraph;
