import { css } from "@emotion/react";

import Container from "../container";
import H2 from "../heading/h2";

import ToolModal from "./toolModal";

import { data } from "@/api/tool/data";
import { center, flex } from "@/styles/common";
import { bp } from "@/styles/config";

const toolList = data.map(({ contentName: { en, ja }, items }) => {
  const toolListSt = css`
    flex-wrap: wrap;
  `;

  const itemContent = items.map(({ name, maker, about, gen, variety, owning }) => {
    const fmtMaker = maker.toLowerCase().replace(/[."+() -]/g, "");
    const fmtName = name.toLowerCase().replace(/[."+() -]/g, "");
    const fmtVariety = variety ? variety.toLowerCase().replace(/[."+() -]/g, "") : undefined;
    const imgName = fmtVariety
      ? `/images/tool/${fmtMaker}-${fmtName}-${fmtVariety}.png`
      : `/images/tool/${fmtMaker}-${fmtName}.png`;

    const nameNOwn = variety ? `${name} (${variety})` : name;

    const toolItem = css`
      width: calc(100% / 6);
      ${bp.tab} {
        width: calc(100% / 3);
      }
    `;

    return (
      <div key={`${name}${variety}`} css={toolItem}>
        <ToolModal imgName={imgName} nameNOwn={nameNOwn} maker={maker} gen={gen} about={about} />
      </div>
    );
  });

  return (
    <section key={en} className="tool-category">
      <Container>
        <H2 en={en} ja={ja} />
      </Container>

      <div css={[toolListSt, center, flex]}>{itemContent}</div>
    </section>
  );
});

export default toolList;
