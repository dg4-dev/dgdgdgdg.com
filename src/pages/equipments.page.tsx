import { css } from "@emotion/react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import EquipmentsModal from "@/components/about/EquipmentsModal";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import { categoryNames } from "@/data/categoryNames";
import { client } from "@/libs/client";
import { breakPoint } from "@/styles/config";
import { equipment } from "@/types/equipments";

const Equipments = ({ equipments }: { equipments: equipment[] }) => {
  console.log(equipments);

  const itemElements = categoryNames.map(({ en, ja }) => {
    const items = equipments.filter((item) => item.category[0] === en);
    const sortedItems = items.sort((a, b) => a.order - b.order);

    const itemContent = sortedItems.map(({ name, maker, about, image, generation, variety, owning }) => {
      const equipmentsItem = css`
        width: calc(100% / 6);
        ${breakPoint.tab} {
          width: calc(100% / 3);
        }
      `;

      return (
        <div key={name + variety} css={equipmentsItem}>
          <EquipmentsModal
            name={name}
            maker={maker[0]}
            about={about}
            imgName={image.url}
            gen={generation}
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
  });

  return (
    <Layout
      title="Equipments"
      description="使用している機材をドット絵として描き上げています。使用機材そのものの詳しい情報もこちら。"
    >
      <H1 />
      {itemElements}
    </Layout>
  );
};

export default Equipments;

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "equipments", queries: { limit: 100 } });

  return {
    props: {
      equipments: data.contents,
    },
  };
};
