import { css } from "@emotion/react";

import type { NextPage } from "next";

import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { dg4Color } from "@/styles/config";

const notFoundSection = css`
  width: 100%;
  height: 100vh;

  position: relative;
  align-items: center;
  padding-top: 0;
  margin-bottom: 0;

  display: flex;

  :last-child {
    margin-bottom: 0;
  }

  ::before {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    content: "";
    background-image: url("/images/fv/top.png");
    background-position: center center;
    background-size: cover;
    filter: blur(16px);
    opacity: 0.6;

    z-index: -1;
  }

  div {
    margin-left: auto;
    margin-right: auto;
  }
`;

const dont = css`
  font-family: "Dont", sans-serif;
  text-align: center;
`;

const heading1 = css`
  font-size: 120px;
  color: ${dg4Color.cyan};
`;

const para = css`
  font-size: 36px;
  margin-bottom: 30px;
`;

const Works: NextPage = () => {
  return (
    <Layout title="Page not found" noindex={true}>
      <section css={notFoundSection}>
        <div>
          <h1 css={[heading1, dont]}>404</h1>
          <p css={[para, dont]}>Page not found :(</p>
          <Button
            href="/"
            text="Back to top"
            css={css`
              margin: 0 auto;
            `}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Works;
