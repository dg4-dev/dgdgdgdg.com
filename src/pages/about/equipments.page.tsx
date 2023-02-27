import { css } from "@emotion/react";

import type { NextPage } from "next";

import EquipmentsModal from "@/components/about/equipmentsModal";
import Container from "@/components/container";
import H1 from "@/components/heading/heading1";
import H2 from "@/components/heading/heading2";
import Layout from "@/components/layout";
import { categoryNames } from "@/pages/api/equipments/categoryNames";
import { itemData } from "@/pages/api/equipments/itemData";
import { breakPoint } from "@/styles/config";

const Equipments: NextPage = () => {
  return (
    <Layout
      title="Equipments | dgdgdgdg"
      description="使用している機材をドット絵として描き上げています。使用機材そのものの詳しい情報もこちら。"
    >
      <H1 />
      {categoryNames.map(({ en, ja }) => {
        const items = itemData.filter((item) => item.category === en);

        const itemContent = items.map(({ name, maker, about, imgName, gen, variety, owning }) => {
          const equipmentsItem = css`
            width: calc(100% / 6);
            ${breakPoint.tab} {
              width: calc(100% / 3);
            }
          `;

          return (
            <div key={`${name}${variety}`} css={equipmentsItem}>
              <EquipmentsModal
                name={name}
                maker={maker}
                about={about}
                imgName={imgName}
                gen={gen}
                variety={variety}
                owning={owning}
              />
            </div>
          );
        });

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

        return (
          <section key={en} className="equipments-category">
            <Container>
              <H2 css={heading2} en={en} ja={ja} />
            </Container>

            <div css={equipmentsListSt}>{itemContent}</div>
          </section>
        );
      })}
    </Layout>
  );
};

export default Equipments;
