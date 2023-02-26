/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/react";

import { itemData, itemDataProps } from "@/pages/api/equipments/itemData";
import { breakPoint } from "@/styles/config";

const shuffle = ([...array]) => {
  array.forEach((e, i) => {
    const j = ~~(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });
  return array;
};

// 配列をシャッフルする
const shuffledItems = shuffle(itemData);

// 配列の要素数が奇数の場合、最後の要素を削除する
if (shuffledItems.length % 2 === 1) shuffledItems.pop();

// 配列を分割する関数
const sliceByNumber = (array: itemDataProps[], number: number) => {
  const length = Math.ceil(array.length / number);
  return new Array(length).fill(1).map((_, i) => array.slice(i * number, (i + 1) * number));
};

const EquipmentsSlide = sliceByNumber(shuffledItems, 2).map((twoItems, index) => {
  const twoImages = twoItems.map(({ maker, name, variety }) => {
    const fmtMaker = maker.toLowerCase().replace(/[."+() -]/g, "");
    const fmtName = name.toLowerCase().replace(/[."+() -]/g, "");
    const fmtVariety = variety ? variety.toLowerCase().replace(/[."+() -]/g, "") : undefined;
    const imgName = fmtVariety
      ? `/images/equipments/${fmtMaker}-${fmtName}-${fmtVariety}.png`
      : `/images/equipments/${fmtMaker}-${fmtName}.png`;

    const equipmentsImage = css`
      display: block;

      /* ぼやけさせないぞ */
      image-rendering: pixelated;
    `;

    return <img key={imgName} css={equipmentsImage} src={imgName} alt="" />;
  });

  const equipmentsItem = css`
    width: 250px;
    ${breakPoint.tab} {
      width: 20vw;
    }
    ${breakPoint.sp} {
      width: calc(100vw / 3);
    }
  `;

  return (
    <div key={index} css={equipmentsItem}>
      {twoImages}
    </div>
  );
});

export default EquipmentsSlide;
