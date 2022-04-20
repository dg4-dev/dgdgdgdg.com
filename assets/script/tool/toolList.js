const writeTools = (getData) => {
  getData.forEach(({ contentName, items }) => {
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
    titleEn.textContent = contentName.en;
    cateTitle.appendChild(titleEn);

    const titleJa = document.createElement("span");
    titleJa.className = "ja";
    titleJa.textContent = contentName.ja;
    cateTitle.appendChild(titleJa);

    const toolWrapper = document.createElement("div");
    toolWrapper.className = "tool-wrapper";
    toolCate.appendChild(toolWrapper);

    const toolList = document.createElement("div");
    toolList.className = "tool-list center is-flex";
    toolWrapper.appendChild(toolList);

    items.forEach(({ name, maker, about, gen, storeId }) => {
      const toolItem = document.createElement("div");
      toolItem.className = "tool-item";
      toolList.appendChild(toolItem);

      const toolItemCover = document.createElement("div");
      toolItemCover.className = "cover click";
      toolItem.appendChild(toolItemCover);

      const coverImage = document.createElement("img");
      const fmtMaker = maker.toLowerCase().replace(/[."+() -]/g, "");
      const fmtName = name.toLowerCase().replace(/[."+() -]/g, "");
      coverImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
      toolItemCover.appendChild(coverImage);

      const toolItemModal = document.createElement("div");
      toolItemModal.className = "modal is-flex";
      toolItem.appendChild(toolItemModal);

      let cardImage;
      if (storeId) {
        cardImage = document.createElement("a");
        cardImage.href = `https://amzn.to/${storeId}`;
        cardImage.target = "_blank";
        cardImage.rel = "noopener noreferrer";
      } else {
        cardImage = document.createElement("div");
      }
      cardImage.className = "img";
      toolItemModal.appendChild(cardImage);

      const cardImageInner = document.createElement("img");
      cardImageInner.src = coverImage.src;
      cardImage.appendChild(cardImageInner);

      const cardDesc = document.createElement("div");
      cardDesc.className = "desc";
      toolItemModal.appendChild(cardDesc);

      const descName = document.createElement("div");
      descName.className = "name";
      descName.textContent = name;
      cardDesc.appendChild(descName);

      const descMakerNGen = document.createElement("div");
      descMakerNGen.className = "maker-and-gen";
      descMakerNGen.textContent = maker;
      gen && (descMakerNGen.textContent = `${maker}・${gen}`);
      cardDesc.appendChild(descMakerNGen);

      const descAbout = document.createElement("div");
      descAbout.className = "about";
      descAbout.textContent = about;
      cardDesc.appendChild(descAbout);

      const modalCloseBtn = document.createElement("div");
      modalCloseBtn.className = "close-btn center click";
      toolItemModal.appendChild(modalCloseBtn);

      const modalEvent = (elm) => {
        elm.addEventListener("click", () => {
          toolItemModal.classList.toggle("active");
          document.body.classList.toggle("is-open");
        });
      };
      modalEvent(toolItemCover);
      modalEvent(modalCloseBtn);
    });
  });
};

const toolDataURL = "/assets/script/tool/toolData.json";

fetch(toolDataURL)
  .then((response) => response.json())
  .then((data) => writeTools(data));
