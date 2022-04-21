const writeTools = (getData) => {
  getData.forEach(({ contentName, items }) => {
    const toolCate = c$("section");
    toolCate.className = "tool-category";
    g$("#toolPage").appendChild(toolCate);

    const toolContain = c$();
    toolContain.className = "container center";
    toolCate.appendChild(toolContain);

    const cateTitle = c$("h2");
    cateTitle.className = "center";
    toolContain.appendChild(cateTitle);

    const titleEn = c$("span");
    titleEn.className = "en";
    titleEn.textContent = contentName.en;
    cateTitle.appendChild(titleEn);

    const titleJa = c$("span");
    titleJa.className = "ja";
    titleJa.textContent = contentName.ja;
    cateTitle.appendChild(titleJa);

    const toolWrapper = c$();
    toolWrapper.className = "tool-wrapper";
    toolCate.appendChild(toolWrapper);

    const toolList = c$();
    toolList.className = "tool-list center is-flex";
    toolWrapper.appendChild(toolList);

    items.forEach(({ name, maker, about, gen, storeId }) => {
      const toolItem = c$();
      toolItem.className = "tool-item";
      toolList.appendChild(toolItem);

      const toolItemCover = c$();
      toolItemCover.className = "cover click";
      toolItem.appendChild(toolItemCover);

      const coverImage = c$("img");
      const fmtMaker = maker.toLowerCase().replace(/[."+() -]/g, "");
      const fmtName = name.toLowerCase().replace(/[."+() -]/g, "");
      coverImage.src = `/assets/image/tool/${fmtMaker}-${fmtName}.png`;
      toolItemCover.appendChild(coverImage);

      const toolItemModal = c$();
      toolItemModal.className = "modal";
      toolItem.appendChild(toolItemModal);

      const modalCloseBtn = c$();
      modalCloseBtn.className = "close-btn center click";
      toolItemModal.appendChild(modalCloseBtn);

      const scroll = c$();
      scroll.className = "scroll is-flex";
      toolItemModal.appendChild(scroll);

      const cardImage = c$("img");
      cardImage.src = coverImage.src;
      scroll.appendChild(cardImage);

      const cardDesc = c$();
      cardDesc.className = "desc";
      scroll.appendChild(cardDesc);

      const descName = c$();
      descName.className = "name";
      descName.textContent = name;
      cardDesc.appendChild(descName);

      const descMakerNGen = c$();
      descMakerNGen.className = "maker-and-gen";
      descMakerNGen.textContent = gen ? `${maker}・${gen}` : `${maker}`;
      cardDesc.appendChild(descMakerNGen);

      const descAbout = c$();
      descAbout.className = "about";
      descAbout.textContent = about;
      cardDesc.appendChild(descAbout);

      if (storeId) {
        const descLink = c$("a");
        descLink.href = `https://amzn.to/${storeId}`;
        descLink.className = "link";
        descLink.target = "_blank";
        descLink.rel = "noopener noreferrer";
        descLink.textContent = "Amazon";
        cardDesc.appendChild(descLink);
      }

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
