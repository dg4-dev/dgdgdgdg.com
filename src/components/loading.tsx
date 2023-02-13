import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { dg4Color } from "@/styles/config";

const loadElm = css`
  position: fixed;
  top: -200%;

  z-index: 65535;
  width: 100%;
  height: 100vh;
  background-color: ${dg4Color.cyan};
  line-height: 100vh;
  text-align: center;
  font-size: 64px;
  font-family: "Dont", sans-serif;
  color: #fff;

  animation-name: vision;
  animation-duration: 0.75s;
  animation-timing-function: ease-in-out;

  @keyframes vision {
    0% {
      top: -100%;
    }
    20% {
      top: 0%;
    }
    80% {
      top: 0%;
    }
    100% {
      top: 100%;
    }
  }
`;

const Loading = () => {
  const [loading, setLoading] = useState(true);

  const initialLoad = () => {
    setLoading(true);
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 750);
    return () => {
      clearTimeout(timer1);
    };
  };

  useEffect(initialLoad, []);

  return loading ? <div css={loadElm}>Loading...</div> : null;
};

export default Loading;
