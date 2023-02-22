/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/react";

import { data } from "@/pages/api/equipments/data";
import { breakPoint } from "@/styles/config";

const shuffle = ([...array]) => {
  array.forEach((e, i) => {
    const j = ~~(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });
  return array;
};

// itemsを統合・シャッフル・奇数個の場合末尾切り捨て
const planeItems = data
  .map(({ items }) => items)
  .reduce((e, i) => {
    return e.concat(i);
  });

type item = {
  name: string;
  maker: string;
  about: string;
  gen: Number | "Latest version";
  variety?: string;
  owning?: Number;
};

const shuffledItems: item[] = shuffle(planeItems);

if (shuffledItems.length % 2 === 1) shuffledItems.pop();

// 配列を分割する関数
const sliceByNumber = (array: item[], number: number) => {
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
