import { css } from "@emotion/react";
import Image from "next/image";

const SimulationItem = ({ year }: { year: number }) => {
  const simulationHeading = css`
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
  `;

  const itemLogo = css`
    margin-top: 16px;
  `;

  return (
    <div>
      <h4 css={simulationHeading}>{year}年2月</h4>
      <div>
        <Image src={`/images/skill/${year}-para.png`} width={307} height={272} alt="" />
      </div>
      <div css={itemLogo}>
        <Image src={`/images/skill/${year}-logo.png`} width={307} height={78} alt="" />
      </div>
    </div>
  );
};

export default SimulationItem;
