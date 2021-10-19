const toolList = [
  {
    contentName: "Software",
    items: [
      {
        image: "tool-adobe-ai",
        name: "Adobe Illustrator",
        gen: "Latest version",
      },
      {
        image: "tool-adobe-xd",
        name: "Adobe XD",
        gen: "Latest version",
      },
      {
        image: "tool-adobe-pr",
        name: "Adobe Premiere Pro",
        gen: "Latest version",
      },
      {
        image: "tool-adobe-ae",
        name: "Adobe After Effects",
        gen: "Latest version",
      },
      {
        image: "tool-adobe-ps",
        name: "Adobe Photoshop",
        gen: "Latest version",
      },
      {
        image: "tool-adobe-lr",
        name: "Adobe Lightroom",
        gen: "Latest version",
      },
      {
        image: "tool-studio",
        name: "STUDIO",
        gen: "Latest version",
      },
      {
        image: "tool-figma",
        name: "Figma",
        gen: "Latest version",
      },
    ],
  },
  {
    contentName: "Hardware",
    items: [
      {
        image: "tool-macbook",
        name: 'MacBook Pro 16"',
        gen: "2019",
      },
      {
        image: "tool-ipad",
        name: 'iPad Pro 12.9"',
        gen: "2020 (4th Gen)",
      },
      {
        image: "tool-ipadmini",
        name: "iPad mini",
        gen: "2021 (6th Gen)",
      },
      {
        image: "tool-iphone13pro",
        name: "iPhone 13 Pro",
        gen: "2021",
      },
      {
        image: "tool-iphone",
        name: "iPhone SE",
        gen: "2020 (2nd Gen)",
      },
    ],
  },
  {
    contentName: "Shooting equipment",
    items: [
      {
        image: "tool-xs10",
        name: "FUJIFILM X-S10",
        gen: "2020",
      },
      {
        image: "tool-xf35",
        name: "XF 35mm F1.4 R",
        gen: "2012",
      },
      {
        image: "tool-xf1855",
        name: "XF 18-55mm F2.8-4 R OIS",
        gen: "2012",
      },
      {
        image: "tool-wtulens",
        name: "GIZMON Wtulens L",
        gen: "2018",
      },
      {
        image: "tool-rsc2",
        name: "DJI RSC 2",
        gen: "2020",
      },
      {
        image: "tool-om4",
        name: "DJI OM4",
        gen: "2020",
      },
    ],
  },
];

for (i = 0; i < toolList.length; i++) {
  const toolOutput = document.getElementById("toolOutput");

  toolOutput.insertAdjacentHTML(
    "beforeend",
    `<div class='content is-flex'><h3>${
      toolList[i].contentName
    }</h3><div id='toolContent${[i]}' class="items center is-flex"></div></div>`
  );

  for (j = 0; j < toolList[i].items.length; j++) {
    const toolContent = document.getElementById(`toolContent${[i]}`);
    toolContent.insertAdjacentHTML(
      "beforeend",
      `<div class="item"><div class="item-img center"><img src="/assets/image/${toolList[i].items[j].image}.webp" /></div><p class="item-name center">${toolList[i].items[j].name}</p><p class="item-gen center">${toolList[i].items[j].gen}</p></div>`
    );
  }
}
