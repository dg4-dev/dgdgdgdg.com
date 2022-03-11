const writeTools = (getData) => {
  getData.forEach((cate) => {
    const toolCate = document.createElement("section");
    toolCate.className = "tool-category";
    $("#toolPage").appendChild(toolCate);

    const toolContain = document.createElement("div");
    toolContain.className = "container center";
    toolCate.appendChild(toolContain);

    const cateTitle = document.createElement("h2");
    cateTitle.className = "center";
    toolContain.appendChild(cateTitle);

    const titleEn = document.createElement("span");
    titleEn.className = "en";
    titleEn.textContent = cate.contentName.en;
    cateTitle.appendChild(titleEn);

    const titleJa = document.createElement("span");
    titleJa.className = "ja";
    titleJa.textContent = cate.contentName.ja;
    cateTitle.appendChild(titleJa);

    const toolWrapper = document.createElement("div");
    toolWrapper.className = "tool-wrapper";
    toolCate.appendChild(toolWrapper);

    const toolList = document.createElement("div");
    toolList.className = "tool-list center is-flex";
    toolWrapper.appendChild(toolList);

    cate.items.forEach((cateItem) => {
      const toolItem = document.createElement("div");
      toolItem.className = "tool-item";
      toolList.appendChild(toolItem);

      const toolItemCover = document.createElement("div");
      toolItemCover.className = "cover click";
      toolItem.appendChild(toolItemCover);

      const coverImage = document.createElement("img");
      const fmtMaker = cateItem.maker.toLowerCase().replace(/[."+() -]/g, "");
      const fmtName = cateItem.name.toLowerCase().replace(/[."+() -]/g, "");
      coverImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
      toolItemCover.appendChild(coverImage);

      const toolItemModal = document.createElement("div");
      toolItemModal.className = "modal";
      toolItem.appendChild(toolItemModal);

      const modalCloseArea = document.createElement("div");
      modalCloseArea.className = "close-area click";
      toolItemModal.appendChild(modalCloseArea);

      const modalCard = document.createElement("div");
      modalCard.className = "card is-flex";
      toolItemModal.appendChild(modalCard);

      const cardImage = document.createElement("div");
      cardImage.className = "img";
      modalCard.appendChild(cardImage);

      const cardImageInner = document.createElement("img");
      cardImageInner.src = coverImage.src;
      cardImage.appendChild(cardImageInner);

      const cardDesc = document.createElement("div");
      cardDesc.className = "desc";
      modalCard.appendChild(cardDesc);

      const descName = document.createElement("div");
      descName.className = "name";
      descName.textContent = cateItem.name;
      cardDesc.appendChild(descName);

      const descMakerNGen = document.createElement("div");
      descMakerNGen.className = "maker-and-gen";
      descMakerNGen.textContent = cateItem.maker;
      cateItem.gen &&
        (descMakerNGen.textContent = `${cateItem.maker}・${cateItem.gen}`);
      cardDesc.appendChild(descMakerNGen);

      const descAbout = document.createElement("div");
      descAbout.className = "about";
      descAbout.textContent = cateItem.about;
      cardDesc.appendChild(descAbout);

      const modalCloseBtn = document.createElement("div");
      modalCloseBtn.className = "close-btn click";
      modalCard.appendChild(modalCloseBtn);

      const modalEvent = (elm) => {
        elm.addEventListener("click", () => {
          toolItemModal.classList.toggle("active");
          document.body.classList.toggle("is-open");
        });
      };
      modalEvent(toolItemCover);
      modalEvent(modalCloseArea);
      modalEvent(modalCloseBtn);
    });
  });
};

const toolDataURL = "/assets/script/tool/toolData.json";

fetch(toolDataURL)
  .then((response) => response.json())
  .then((data) => writeTools(data));
