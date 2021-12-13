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
        name: "AUTO HALF",
        maker: "RICOH",
        gen: "1962",
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
        gen: "2020 (4th Gen)",
      },
      {
        name: "iPad mini",
        maker: "Apple",
        gen: "2021 (6th Gen)",
      },
      {
        name: "iPhone 13 Pro",
        maker: "Apple",
        gen: "2021",
      },
      {
        name: "iPhone SE",
        maker: "Apple",
        gen: "2020 (2nd Gen)",
      },
    ],
  },
];

toolList.forEach((value, index) => {
  $("#toolOutput").insertAdjacentHTML(
    "beforeend",
    `
    <div class='content is-flex'>
      <h3>${value.contentName}</h3>
      <div id='toolContent${index}' class="items center is-flex"></div>
    </div>
    `
  );

  value.items.forEach((valueChild) => {
    const imgName = `${valueChild.maker
      .toLowerCase()
      .replace(/[." -]/g, "")}-${valueChild.name
      .toLowerCase()
      .replace(/[." -]/g, "")}`;

    $(`#toolContent${index}`).insertAdjacentHTML(
      "beforeend",
      `
      <div class="item">
        <div class="item-img center">
          <img src="/assets/image/tool/${imgName}.webp" />
        </div>
        <p class="item-name center">
          ${valueChild.name}
        </p>
        <p class="item-maker center">
          ${valueChild.maker}
        </p>
        <p class="item-gen center">
          ${valueChild.gen}
        </p>
      </div>
      `
    );
  });
});
