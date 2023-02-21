import type { NextPage } from "next";

import equipmentsList from "@/components/about/equipmentsList";
import H1 from "@/components/heading/heading1";
import Layout from "@/components/layout";

const Equipments: NextPage = () => {
  return (
    <Layout
      title="Equipments | dgdgdgdg"
      description="使用しているツールをドット絵として描き上げています。ツールそのものの詳しい情報もこちら。"
    >
      <H1 />
      {equipmentsList}
    </Layout>
  );
};

export default Equipments;
