import { css } from "@emotion/react";

import Container from "../container";

import EquipmentsModal from "./equipmentsModal";

import H2 from "@/components/heading/heading2";
import { data } from "@/pages/api/equipments/data";
import { breakPoint } from "@/styles/config";

const equipmentsList = data.map(({ contentName: { en, ja }, items }) => {
  const equipmentsListSt = css`
    display: flex;
    flex-wrap: wrap;

    margin-left: auto;
    margin-right: auto;
  `;

  const heading2 = css`
    .en {
      ${breakPoint.tab} {
        font-size: 40px;
      }
      ${breakPoint.sp} {
        font-size: 24px;
      }
    }
  `;

  const itemContent = items.map(({ name, maker, about, gen, variety, owning }) => {
    const equipmentsItem = css`
      width: calc(100% / 6);
      ${breakPoint.tab} {
        width: calc(100% / 3);
      }
    `;

    return (
      <div key={`${name}${variety}`} css={equipmentsItem}>
        <EquipmentsModal name={name} maker={maker} about={about} gen={gen} variety={variety} owning={owning} />
      </div>
    );
  });

  return (
    <section key={en} className="equipments-category">
      <Container>
        <H2 css={heading2} en={en} ja={ja} />
      </Container>

      <div css={equipmentsListSt}>{itemContent}</div>
    </section>
  );
});

export default equipmentsList;
