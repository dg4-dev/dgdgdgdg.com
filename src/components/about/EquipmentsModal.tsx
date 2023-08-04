/* eslint-disable @next/next/no-img-element */

import { css } from "@emotion/react";
import { useState } from "react";

import { dg4Color, breakPoint } from "@/styles/config";

const cover = css`
  img {
    display: block;

    /* ぼやけさせないぞ */
    image-rendering: pixelated;
  }
`;

const modal = css`
  position: fixed;
  top: 100%;
  left: 0;

  z-index: 1000;

  width: 100%;
  height: 100vh;

  background-color: #fff;
`;

const closeButton = css`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;

  width: 40px;
  height: 40px;

  margin-left: auto;
  margin-right: auto;

  ${breakPoint.sp} {
    top: 20px;
  }

  ::before,
  ::after {
    content: "";
    display: block;
    width: 40px;
    border-top: 3px solid ${dg4Color.black};
    position: absolute;
    top: 50%;
  }
  ::before {
    transform: rotate(25deg);
  }
  ::after {
    transform: rotate(-25deg);
  }
`;

const scrolls = css`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 64px;

  ${breakPoint.sp} {
    flex-direction: column;
    justify-content: normal;
    overflow-y: auto;
    padding: 64px 24px;
  }

  img {
    display: block;
    width: 60%;
    max-width: 760px;

    object-fit: contain;

    /* ぼやけさせないぞ */
    image-rendering: pixelated;

    ${breakPoint.sp} {
      width: 100%;
      max-width: 380px;
    }
  }
`;

const desc = css`
  width: 40%;
  line-height: 1.5;
  margin-left: 40px;

  ${breakPoint.sp} {
    width: 100%;
    margin-left: 0;
    margin-top: 24px;
  }

  .name {
    font-weight: bold;
    font-size: 24px;
  }
  .about {
    margin-top: 16px;
  }
`;

type Props = {
  name: string;
  maker: string;
  about: string;
  imgName: string;
  gen?: number | string;
  variety?: string;
  owning?: number;
};

const EquipmentsModal = ({ name, maker, about, imgName, gen, variety, owning }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const nameNVer = variety ? `${name} - ${variety}` : name;
  const nameNVerNOwn = owning ? `${nameNVer} * ${owning}` : nameNVer;

  const makerNGen = gen ? `${maker}・${gen}` : maker;

  let isOpen = modalIsOpen
    ? css`
        top: 0;
        transition: all 0.3s;
      `
    : css`
        top: 100%;
        transition: all 0.3s;
      `;

  return (
    <>
      <div css={cover} className="clickable" onClick={() => setIsOpen(true)}>
        <img src={`/images/equipments/${imgName}`} alt={imgName} />
      </div>
      <div css={[modal, isOpen]}>
        <div css={closeButton} className="clickable" onClick={() => setIsOpen(false)}></div>
        <div css={scrolls}>
          <img src={`/images/equipments/${imgName}`} alt={imgName} />
          <div css={desc}>
            <div className="name">{nameNVerNOwn}</div>
            <div className="maker-and-gen">{makerNGen}</div>
            <div className="about">{about}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentsModal;
