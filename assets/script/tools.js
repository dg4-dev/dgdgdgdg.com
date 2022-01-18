const toolList = [
  {
    contentName: "Software",
    items: [
      {
        name: "Illustrator",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "XD",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "Premiere Pro",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "After Effects",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "Photoshop",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "Lightroom",
        maker: "Adobe",
        gen: "Latest version",
      },
      {
        name: "STUDIO",
        maker: "STUDIO",
        gen: "Latest version",
      },
      {
        name: "Figma",
        maker: "Figma",
        gen: "Latest version",
      },
    ],
  },
  {
    contentName: "Shooting equipment",
    items: [
      {
        name: "X-S10",
        maker: "FUJIFILM",
        gen: "2020",
      },
      {
        name: "XF 35mm F1.4 R",
        maker: "FUJIFILM",
        gen: "2012",
      },
      {
        name: "XF 18-55mm F2.8-4 R OIS",
        maker: "FUJIFILM",
        gen: "2012",
      },
      {
        name: "Wtulens L",
        maker: "GIZMON",
        gen: "2018",
      },
      {
        name: "X-700",
        maker: "MINOLTA",
        gen: "1981",
      },
      {
        name: "X-7",
        maker: "MINOLTA",
        gen: "1980",
      },
      {
        name: "MD ROKKOR 50mm F1.7",
        maker: "MINOLTA",
        gen: "1979",
      },
      {
        name: "MD ZOOM 35-70mm F3.5",
        maker: "MINOLTA",
        gen: "1981",
      },
      {
        name: "MD ZOOM 75-150mm F4",
        maker: "MINOLTA",
        gen: "1981",
      },
      {
        name: "RMC 80-200mm f4.0",
        maker: "Tokina",
        gen: "1984",
      },
      {
        name: "RSC 2",
        maker: "DJI",
        gen: "2020",
      },
      {
        name: "OM4",
        maker: "DJI",
        gen: "2020",
      },
    ],
  },
  {
    contentName: "Hardware",
    items: [
      {
        name: 'MacBook Pro 16"',
        maker: "Apple",
        gen: "2019",
      },
      {
        name: 'iPad Pro 12.9"',
        maker: "Apple",
        gen: "2020",
      },
      {
        name: "iPad mini",
        maker: "Apple",
        gen: "2021",
      },
      {
        name: "iPhone 13 Pro",
        maker: "Apple",
        gen: "2021",
      },
      {
        name: "iPhone SE",
        maker: "Apple",
        gen: "2020",
      },
    ],
  },
];

toolList.forEach((value, index) => {
  const content = document.createElement("div");
  content.className = "content is-flex";
  $("#toolOutput").appendChild(content);

  const contentName = document.createElement("h3");
  contentName.innerText = `${value.contentName}`;
  content.appendChild(contentName);

  const toolList = document.createElement("div");
  toolList.id = `toolContent${index}`;
  toolList.className = "items center is-flex";
  content.appendChild(toolList);

  value.items.forEach((valueChild) => {
    const imgName = `${valueChild.maker
      .toLowerCase()
      .replace(/[." -]/g, "")}-${valueChild.name
      .toLowerCase()
      .replace(/[." -]/g, "")}`;

    const toolItem = document.createElement("div");
    toolItem.className = "item";
    $(`#toolContent${index}`).appendChild(toolItem);

    const itemImg = document.createElement("div");
    itemImg.className = "item-img center";
    toolItem.appendChild(itemImg);

    const itemImage = document.createElement("img");
    itemImage.src = `/assets/image/tool/${imgName}.webp`;
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
