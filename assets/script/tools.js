const toolList = [
  {
    contentName: "Software",
    items: [
      {
        image: "adobe-ai",
        name: "Adobe Illustrator",
        gen: "Latest version",
      },
      {
        image: "adobe-xd",
        name: "Adobe XD",
        gen: "Latest version",
      },
      {
        image: "adobe-pr",
        name: "Adobe Premiere Pro",
        gen: "Latest version",
      },
      {
        image: "adobe-ae",
        name: "Adobe After Effects",
        gen: "Latest version",
      },
      {
        image: "adobe-ps",
        name: "Adobe Photoshop",
        gen: "Latest version",
      },
      {
        image: "adobe-lr",
        name: "Adobe Lightroom",
        gen: "Latest version",
      },
      {
        image: "studio",
        name: "STUDIO",
        gen: "Latest version",
      },
      {
        image: "figma",
        name: "Figma",
        gen: "Latest version",
      },
    ],
  },
  {
    contentName: "Hardware",
    items: [
      {
        image: "macbook",
        name: 'MacBook Pro 16"',
        gen: "2019",
      },
      {
        image: "ipad",
        name: 'iPad Pro 12.9"',
        gen: "2020 (4th Gen)",
      },
      {
        image: "ipadmini",
        name: "iPad mini",
        gen: "2021 (6th Gen)",
      },
      {
        image: "iphone13pro",
        name: "iPhone 13 Pro",
        gen: "2021",
      },
      {
        image: "iphone",
        name: "iPhone SE",
        gen: "2020 (2nd Gen)",
      },
    ],
  },
  {
    contentName: "Shooting equipment",
    items: [
      {
        image: "xs10",
        name: "FUJIFILM X-S10",
        gen: "2020",
      },
      {
        image: "xf35",
        name: "XF 35mm F1.4 R",
        gen: "2012",
      },
      {
        image: "xf1855",
        name: "XF 18-55mm F2.8-4 R OIS",
        gen: "2012",
      },
      {
        image: "wtulens",
        name: "GIZMON Wtulens L",
        gen: "2018",
      },
      {
        image: "rsc2",
        name: "DJI RSC 2",
        gen: "2020",
      },
      {
        image: "om4",
        name: "DJI OM4",
        gen: "2020",
      },
    ],
  },
];

toolList.forEach((value, index) => {
  const toolOutput = document.getElementById("toolOutput");

  toolOutput.insertAdjacentHTML(
    "beforeend",
    `<div class='content is-flex'><h3>${value.contentName}</h3><div id='toolContent${index}' class="items center is-flex"></div></div>`
  );

  value.items.forEach((valueChild) => {
    const toolContent = document.getElementById(`toolContent${index}`);
    toolContent.insertAdjacentHTML(
      "beforeend",
      `<div class="item"><div class="item-img center"><img src="/assets/image/tool-${valueChild.image}.webp" /></div><p class="item-name center">${valueChild.name}</p><p class="item-gen center">${valueChild.gen}</p></div>`
    );
  });
});
