import type { NextPage } from "next";

import toolList from "@/components/about/toolList";
import { H1 } from "@/components/heading/headingPortal";
import Layout from "@/components/layout";

const Tool: NextPage = () => {
  return (
    <Layout
      title="Tool | dgdgdgdg"
      description="使用しているツールをドット絵として描き上げています。ツールそのものの詳しい情報もこちら。"
    >
      <H1 />
      {toolList}
    </Layout>
  );
};

export default Tool;
