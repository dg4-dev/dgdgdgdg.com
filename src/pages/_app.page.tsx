import { Global } from "@emotion/react";

import type { AppProps } from "next/app";

import global from "@/styles/global";
import reset from "@/styles/reset";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={[reset, global]} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
