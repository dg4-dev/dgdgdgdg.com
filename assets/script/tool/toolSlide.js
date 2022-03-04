const writeTools = (getData) => {
  // getData.forEach((value) => {
  //   const content = document.createElement("div");
  //   content.className = "content is-flex";
  //   $("#toolOutput").appendChild(content);

  //   const contentName = document.createElement("h3");
  //   contentName.className = "click";
  //   content.appendChild(contentName);

  //   const contentNameEn = document.createElement("span");
  //   contentNameEn.innerText = `${value.contentName.en}`;
  //   contentNameEn.className = "en";
  //   contentName.appendChild(contentNameEn);

  //   const contentNameJa = document.createElement("span");
  //   contentNameJa.innerText = `${value.contentName.ja}`;
  //   contentNameJa.className = "ja";
  //   contentName.appendChild(contentNameJa);

  //   const contentArrow = document.createElement("div");
  //   contentArrow.className = "accord-arrow";
  //   contentName.appendChild(contentArrow);

  //   const toolList = document.createElement("div");
  //   toolList.className = "items center is-flex";
  //   content.appendChild(toolList);

  //   contentName.addEventListener("click", () => {
  //     toolList.classList.toggle("ac-open");
  //     contentArrow.classList.toggle("ac-open");
  //   });

  //   value.items.forEach((valueChild) => {
  //     const toolItem = document.createElement("div");
  //     toolItem.className = "item";
  //     toolList.appendChild(toolItem);

  //     const itemImg = document.createElement("div");
  //     itemImg.className = "item-img center";
  //     toolItem.appendChild(itemImg);

  //     const itemImage = document.createElement("img");
  //     const fmtMaker = valueChild.maker.toLowerCase().replace(/[." -]/g, "");
  //     const fmtName = valueChild.name.toLowerCase().replace(/[." -]/g, "");
  //     itemImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
  //     itemImg.appendChild(itemImage);

  //     const itemName = document.createElement("p");
  //     itemName.className = "item-name center";
  //     itemName.innerText = `${valueChild.name}`;
  //     toolItem.appendChild(itemName);

  //     const itemMakerNGen = document.createElement("p");
  //     itemMakerNGen.className = "item-maker-n-gen center";
  //     itemMakerNGen.innerText = `${valueChild.maker}・${valueChild.gen}`;
  //     toolItem.appendChild(itemMakerNGen);
  //   });
  // });

  // シャッフル関数
  const shuffle = ([...array]) => {
    array.forEach((e, i) => {
      const j = ~~(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return array;
  };

  // itemsを統合・シャッフル・奇数個の場合末尾切り捨て
  planeItems = [];
  getData.forEach((content) => planeItems.push(...content.items));
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
      const toolItem = document.createElement("div");
      toolItem.className = "tool-item swiper-slide";
      $("#toolList").appendChild(toolItem);

      twoItems.forEach((item) => {
        const toolItemChild = document.createElement("div");
        toolItemChild.className = "tool-item-child";
        toolItem.appendChild(toolItemChild);

        const itemImage = document.createElement("img");
        const fmtMaker = item.maker.toLowerCase().replace(/[." -]/g, "");
        const fmtName = item.name.toLowerCase().replace(/[." -]/g, "");
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
