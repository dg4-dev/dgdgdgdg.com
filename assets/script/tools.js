const toolList = [
  {
    contentName: {
      en: "?",
      ja: "?",
    },
    items: [
      {
        name: "RC-704",
        maker: "National",
        gen: "1972",
      },
      {
        name: "10J-U50",
        maker: "TOSHIBA",
        gen: "1986",
      },
      {
        name: "AQUOS LC-13C1",
        maker: "SHARP",
        gen: "2001",
      },
      {
        name: 'STRiDA EVO 16"',
        maker: "STRiDA",
        gen: "2019",
      },
    ],
  },
  {
    contentName: {
      en: "Terminal device",
      ja: "端末機器",
    },
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
  {
    contentName: {
      en: "Shooting equipment",
      ja: "撮影機材",
    },
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
    contentName: {
      en: "Software",
      ja: "ソフトウェア",
    },
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
        name: "Visual Studio Code",
        maker: "Microsoft",
        gen: "Latest version",
      },
      {
        name: "Figma",
        maker: "Figma",
        gen: "Latest version",
      },
      {
        name: "STUDIO",
        maker: "STUDIO",
        gen: "Latest version",
      },
    ],
  },
  {
    contentName: {
      en: "Audio device",
      ja: "音響機器",
    },
    items: [
      {
        name: "DRUMSET SESSION I",
        maker: "AKG",
        gen: "ドラムマイクセット",
      },
      {
        name: "ATR2100x-USB",
        maker: "audio-technica",
        gen: "マイク",
      },
      {
        name: "QX1002USB",
        maker: "behringer",
        gen: "AIF",
      },
      {
        name: "ATH-M40x",
        maker: "audio-technica",
        gen: "ヘッドホン",
      },
      {
        name: "ear (1)",
        maker: "Nothing",
        gen: "イヤホン",
      },
      {
        name: "Powerbeats Pro",
        maker: "Beats",
        gen: "イヤホン",
      },
      {
        name: "Beats Flex",
        maker: "Beats",
        gen: "イヤホン",
      },
    ],
  },
  {
    contentName: {
      en: "Music Instrument",
      ja: "楽器",
    },
    items: [
      {
        name: "SW108",
        maker: "ARCO",
        gen: "カホン",
      },
      {
        name: "5000CJ",
        maker: "DW",
        gen: "カホンペダル",
      },
      {
        name: "MUS1455M",
        maker: "Pearl",
        gen: "スネアドラム",
      },
      {
        name: "FTS1410",
        maker: "Foldrum",
        gen: "フロアタムスネア",
      },
      {
        name: "P-932",
        maker: "Pearl",
        gen: "ペダル",
      },
      {
        name: "CC16MC-B",
        maker: "MEINL",
        gen: 'シンバル 16"',
      },
      {
        name: "CC12S-B",
        maker: "MEINL",
        gen: 'シンバル 12"',
      },
      {
        name: "PST-7 Crash",
        maker: "Paiste",
        gen: 'シンバル 16"',
      },
      {
        name: "PST-7 Splash",
        maker: "Paiste",
        gen: 'シンバル 10"',
      },
      {
        name: "PTM-10GH",
        maker: "Pearl",
        gen: "タンバリン",
      },
      {
        name: "SH50",
        maker: "MEINL",
        gen: "シェイカー",
      },
    ],
  },
];

toolList.forEach((value) => {
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
