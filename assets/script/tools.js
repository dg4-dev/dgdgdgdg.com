const toolList = [
  {
    contentName: "Software",
    items: [
      {
        name: "Adobe Illustrator",
        gen: "Latest version",
      },
      {
        name: "Adobe XD",
        gen: "Latest version",
      },
      {
        name: "Adobe Premiere Pro",
        gen: "Latest version",
      },
      {
        name: "Adobe After Effects",
        gen: "Latest version",
      },
      {
        name: "Adobe Photoshop",
        gen: "Latest version",
      },
      {
        name: "Adobe Lightroom",
        gen: "Latest version",
      },
      {
        name: "STUDIO",
        gen: "Latest version",
      },
      {
        name: "Figma",
        gen: "Latest version",
      },
    ],
  },
  {
    contentName: "Hardware",
    items: [
      {
        name: 'MacBook Pro 16"',
        gen: "2019",
      },
      {
        name: 'iPad Pro 12.9"',
        gen: "2020 (4th Gen)",
      },
      {
        name: "iPad mini",
        gen: "2021 (6th Gen)",
      },
      {
        name: "iPhone 13 Pro",
        gen: "2021",
      },
      {
        name: "iPhone SE",
        gen: "2020 (2nd Gen)",
      },
    ],
  },
  {
    contentName: "Shooting equipment",
    items: [
      {
        name: "FUJIFILM X-S10",
        gen: "2020",
      },
      {
        name: "XF 35mm F1.4 R",
        gen: "2012",
      },
      {
        name: "XF 18-55mm F2.8-4 R OIS",
        gen: "2012",
      },
      {
        name: "GIZMON Wtulens L",
        gen: "2018",
      },
      {
        name: "DJI RSC 2",
        gen: "2020",
      },
      {
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
    `
    <div class='content is-flex'>
      <h3>${value.contentName}</h3>
      <div id='toolContent${index}' class="items center is-flex"></div>
    </div>
    `
  );

  value.items.forEach((valueChild) => {
    const toolContent = document.getElementById(`toolContent${index}`);
    const imgName = valueChild.name.toLowerCase().replace(/[." -]/g, "");

    console.log(imgName);
    toolContent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="item">
        <div class="item-img center">
          <img src="/assets/image/tool-${imgName}.webp" />
        </div>
        <p class="item-name center">
          ${valueChild.name}
        </p>
        <p class="item-gen center">
          ${valueChild.gen}
        </p>
      </div>
      `
    );
  });
});
