import type { NextPage } from "next";

import H1 from "@/components/heading/h1";
import Layout from "@/components/layout";

const Contact: NextPage = () => {
  return (
    <Layout
      title="Contact"
      description="dgdgdgdgがnextの練習用に作成するページ。参考記事はJSだが、TSの練習も兼ねて進める。[参考](https://www.webopixel.net/javascript/1714.html)"
    >
      <H1 en="Contact" ja="dgdgdgdgに問い合わせる" />
    </Layout>
  );
};

export default Contact;
