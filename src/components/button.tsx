import { UrlObject } from "url";

import { css } from "@emotion/react";
import Link from "next/link";

import { bp, dg4Color } from "@/styles/config";

const btn = css`
  display: block;

  transition: all 0.2s;
  font-weight: bold;
  background-color: #fff;

  width: fit-content;
  height: 50px;
  line-height: 50px;
  text-align: center;

  padding: 0 16px;
  box-shadow: 4px 4px 0px 0px ${dg4Color.black};

  transform: translate(-4px, -4px);

  ${bp.sp} {
    height: 40px;
    line-height: 40px;
  }

  :hover {
    box-shadow: 0px 0px 0px 0px ${dg4Color.black};
    transform: translate(0px, 0px);
    transition: all 0.2s;
  }
`;

type Props = {
  href: string | UrlObject;
  text?: string;
  className?: string;
};

const Button = ({ href, text = "See more", className }: Props) => {
  return (
    <Link href={href}>
      <a css={btn} className={className}>
        {text}
      </a>
    </Link>
  );
};

export default Button;
