import type { NextPage } from "next";

import Layout from "@/components/layout";

const About: NextPage = () => {
  return (
    <Layout
      title="About"
      description="dgdgdgdgがnextの練習用に作成するページ。参考記事はJSだが、TSの練習も兼ねて進める。[参考](https://www.webopixel.net/javascript/1714.html)"
    >
      <h1>About Page</h1>
    </Layout>
  );
};

export default About;
