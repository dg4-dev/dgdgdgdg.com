import "@/styles/config/_reset.scss";
import { Global } from "@emotion/react";

import type { AppProps } from "next/app";

import style from "@/styles/common";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={style} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
