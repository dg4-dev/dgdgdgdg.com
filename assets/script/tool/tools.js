const writeTools = (getData) => {
  getData.forEach((value) => {
    const content = document.createElement("div");
    content.className = "content is-flex";
    $("#toolOutput").appendChild(content);

    const contentName = document.createElement("h3");
    contentName.className = "click";
    content.appendChild(contentName);

    const contentNameEn = document.createElement("span");
    contentNameEn.innerText = `${value.contentName.en}`;
    contentNameEn.className = "en";
    contentName.appendChild(contentNameEn);

    const contentNameJa = document.createElement("span");
    contentNameJa.innerText = `${value.contentName.ja}`;
    contentNameJa.className = "ja";
    contentName.appendChild(contentNameJa);

    const contentArrow = document.createElement("div");
    contentArrow.className = "accord-arrow";
    contentName.appendChild(contentArrow);

    const toolList = document.createElement("div");
    toolList.className = "items center is-flex";
    content.appendChild(toolList);

    contentName.addEventListener("click", () => {
      toolList.classList.toggle("ac-open");
      contentArrow.classList.toggle("ac-open");
    });

    value.items.forEach((valueChild) => {
      const toolItem = document.createElement("div");
      toolItem.className = "item";
      toolList.appendChild(toolItem);

      const itemImg = document.createElement("div");
      itemImg.className = "item-img center";
      toolItem.appendChild(itemImg);

      const itemImage = document.createElement("img");
      const fmtMaker = valueChild.maker.toLowerCase().replace(/[." -]/g, "");
      const fmtName = valueChild.name.toLowerCase().replace(/[." -]/g, "");
      itemImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
      itemImg.appendChild(itemImage);

      const itemName = document.createElement("p");
      itemName.className = "item-name center";
      itemName.innerText = `${valueChild.name}`;
      toolItem.appendChild(itemName);

      const itemMakerNGen = document.createElement("p");
      itemMakerNGen.className = "item-maker-n-gen center";
      itemMakerNGen.innerText = `${valueChild.maker}・${valueChild.gen}`;
      toolItem.appendChild(itemMakerNGen);
    });
  });
};

const toolDataURL = "/assets/script/tool/toolData.json";

fetch(toolDataURL)
  .then((response) => response.json())
  .then((data) => writeTools(data));
