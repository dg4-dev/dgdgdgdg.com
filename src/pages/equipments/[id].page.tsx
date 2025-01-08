/* eslint-disable @next/next/no-img-element */
import { Global, css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { client } from "@/libs/client";
import { breakPoint, dg4Color } from "@/styles/config";
import global from "@/styles/global";
import reset from "@/styles/reset";
import { equipmentType } from "@/types/equipments";

export const runtime = "experimental-edge";

const EquipmentDetail = ({
  equipments: { id, variety, name, image, about, owning, generation, maker },
}: {
  equipments: equipmentType;
}) => {
  useEffect(() => {
    return () => {
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        // 一時的にスムーススクロールを無効化
        document.documentElement.style.scrollBehavior = "auto";

        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: "auto",
        });

        // スクロール後にスムーススクロールを元に戻す
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";
        }, 100);
      }
    };
  }, []);

  const modal = css`
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

    h4.name {
      font-weight: bold;
      font-size: 24px;
    }
    p.about {
      margin-top: 16px;
    }
  `;

  return (
    <>
      <Global styles={[reset, global]} />

      <Head>
        <link rel="icon" href={image.url} />
        <title>{`${name} | Equipments | dgdgdgdg`}</title>

        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <div css={modal}>
          <Link href="/equipments" css={closeButton} className="clickable" />
          <div css={scrolls}>
            <img src={image.url} alt={id} />
            <div css={desc}>
              <h4 className="name">
                {name}
                {variety && ` - ${variety}`}
                {owning && ` * ${owning}`}
              </h4>
              <p>
                {maker}
                {generation && `・${generation}`}
              </p>
              <p className="about">{about}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EquipmentDetail;

export const getServerSideProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "equipments", queries: { limit: 100 }, contentId: id });

  return {
    props: {
      equipments: data,
    },
  };
};
