const writeTools = (getData) => {
  // シャッフル関数
  const shuffle = ([...array]) => {
    array.forEach((e, i) => {
      const j = ~~(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return array;
  };

  // itemsを統合・シャッフル・奇数個の場合末尾切り捨て
  const planeItems = getData
    .map(({ items }) => items)
    .reduce((e, i) => {
      return e.concat(i);
    });

  const shuffledItems = shuffle(planeItems);
  if (shuffledItems.length % 2 === 1) shuffledItems.pop();

  // 配列を分割する関数
  const sliceByNumber = (array, number) => {
    const length = Math.ceil(array.length / number);
    return new Array(length)
      .fill()
      .map((_, i) => array.slice(i * number, (i + 1) * number));
  };

  slicedItems = sliceByNumber(shuffledItems, 2);

  const fakeLoop = () => {
    slicedItems.forEach((twoItems) => {
      const toolItem = c$("div");
      toolItem.className = "tool-item swiper-slide";
      $("#toolList").appendChild(toolItem);

      twoItems.forEach((item) => {
        const toolItemChild = c$("div");
        toolItemChild.className = "tool-item-child";
        toolItem.appendChild(toolItemChild);

        const itemImage = c$("img");
        const fmtMaker = item.maker.toLowerCase().replace(/[."+() -]/g, "");
        const fmtName = item.name.toLowerCase().replace(/[."+() -]/g, "");
        itemImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
        toolItemChild.appendChild(itemImage);
      });
    });
  };

  fakeLoop();
  fakeLoop();
  fakeLoop();
};

const toolDataURL = "/assets/script/tool/toolData.json";

fetch(toolDataURL)
  .then((response) => response.json())
  .then((data) => writeTools(data));
