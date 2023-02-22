import type { NextPage } from "next";

import equipmentsList from "@/components/about/equipmentsList";
import H1 from "@/components/heading/heading1";
import Layout from "@/components/layout";

const Equipments: NextPage = () => {
  return (
    <Layout
      title="Equipments | dgdgdgdg"
      description="使用している機材をドット絵として描き上げています。使用機材そのものの詳しい情報もこちら。"
    >
      <H1 />
      {equipmentsList}
    </Layout>
  );
};

export default Equipments;
