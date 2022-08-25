import type { NextPage } from "next";

import Container from "@/components/container";
import Layout from "@/components/layout";

// const yellowButtonCss = css`
//   color: green;

//   :hover {
//     background-color: #919100;
//   }
// `;

const Home: NextPage = () => {
  return (
    <Layout description="dgdgdgdgがnextの練習用に作成するページ。参考記事はJSだが、TSの練習も兼ねて進める。[参考](https://www.webopixel.net/javascript/1714.html)">
      <Container>
        <h1>Top Page is Here!</h1>
      </Container>
    </Layout>
  );
};

export default Home;
