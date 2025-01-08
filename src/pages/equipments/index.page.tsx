/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/react";
import Link from "next/link";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import { categoryNames } from "@/data/categoryNames";
import { client } from "@/libs/client";
import { breakPoint } from "@/styles/config";
import { equipmentType } from "@/types/equipments";

export const runtime = "experimental-edge";

const Equipments = ({ equipments }: { equipments: equipmentType[] }) => {
  const itemElements = categoryNames.map(({ en, ja }) => {
    const items = equipments.filter((item) => item.category[0] === en);
    const sortedItems = items.sort((a, b) => a.order - b.order);

    const itemContent = sortedItems.map(({ id, image }) => {
      const equipmentsItem = css`
        width: calc(100% / 6);
        display: block;
        line-height: 0;

        /* ぼやけさせないぞ */
        image-rendering: pixelated;
        ${breakPoint.tab} {
          width: calc(100% / 3);
        }
      `;

      return (
        <Link
          key={id}
          css={equipmentsItem}
          href={`/equipments/${id}`}
          onClick={() => {
            sessionStorage.setItem("scrollPosition", window.scrollY.toString());
          }}
        >
          <img src={image.url} alt={id} />
        </Link>
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
      <H1 en="Equipments" ja="使用機材" />
      {itemElements}
    </Layout>
  );
};

export default Equipments;

export const getServerSideProps = async () => {
  const data = await client.get({ endpoint: "equipments", queries: { fields: "id,category,order,image", limit: 100 } });

  return {
    props: {
      equipments: data.contents,
    },
  };
};
