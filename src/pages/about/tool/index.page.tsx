import type { NextPage } from "next";

import H1 from "@/components/heading/h1";
import Layout from "@/components/layout";

const Tool: NextPage = () => {
  return (
    <Layout
      title="Tool"
      description="dgdgdgdgがnextの練習用に作成するページ。参考記事はJSだが、TSの練習も兼ねて進める。[参考](https://www.webopixel.net/javascript/1714.html)"
    >
      <H1 en="Tool" ja="ツール一覧" />
    </Layout>
  );
};

export default Tool;
