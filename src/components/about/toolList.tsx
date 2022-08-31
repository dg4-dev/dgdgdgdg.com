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

  const heading2 = css`
    .en {
      ${bp.tab} {
        font-size: 40px;
      }
      ${bp.sp} {
        font-size: 24px;
      }
    }
  `;

  const itemContent = items.map(({ name, maker, about, gen, variety, owning }) => {
    const toolItem = css`
      width: calc(100% / 6);
      ${bp.tab} {
        width: calc(100% / 3);
      }
    `;

    return (
      <div key={`${name}${variety}`} css={toolItem}>
        <ToolModal name={name} maker={maker} about={about} gen={gen} variety={variety} owning={owning} />
      </div>
    );
  });

  return (
    <section key={en} className="tool-category">
      <Container>
        <H2 css={heading2} en={en} ja={ja} />
      </Container>

      <div css={[toolListSt, center, flex]}>{itemContent}</div>
    </section>
  );
});

export default toolList;
