const skillList = [
  {
    name: "デザイン",
    start: new Date(2015, 4),
  },
  {
    name: "映像制作",
    start: new Date(2017, 3),
  },
  {
    name: "モーショングラフィックス",
    start: new Date(2019, 3),
  },
  {
    name: "Webフロントエンド",
    start: new Date(2019, 3),
  },
  {
    name: "写真撮影",
    start: new Date(2020, 10),
  },
];

for (i = 0; i < skillList.length; i++) {
  const nowDate = new Date();
  const startYear = skillList[i].start.getFullYear();
  const startMonth = skillList[i].start.getMonth();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();

  const elapsedMonths = (nowYear - startYear) * 12 + nowMonth - startMonth;

  skillList[i].months = elapsedMonths;
}

skillList.sort((a, b) => {
  if (a.months < b.months) return 1;
  if (a.months > b.months) return -1;
  return 0;
});

for (i = 0; i < skillList.length; i++) {
  const logoLength = 6;
  const skillName = JSON.stringify(skillList[i].name).replace(/"/g, "");
  const skillMonth = JSON.stringify(skillList[i].months);
  const firstMonth = JSON.stringify(skillList[0].months);
  const round = Math.floor((skillMonth / firstMonth) * logoLength);

  const skillOutput = document.getElementById("skillOutput");

  skillOutput.insertAdjacentHTML(
    "beforeend",
    "<li><p class='skill-name'>" +
      skillName +
      `</p><div class='parameter is-flex' id='logoParts${i}'></div></li>`
  );

  const logoParts = document.getElementById(`logoParts${i}`);

  function insertImage(imageName) {
    logoParts.insertAdjacentHTML(
      "beforeend",
      "<div class='part'><img src='/assets/image/" + imageName + ".svg'></div>"
    );
  }

  insertImage("dg4-init");
  for (j = 0; j < round; j++) {
    if (j % 2 != 0) {
      insertImage("d-blue");
    } else {
      insertImage("g-blue");
    }
  }
  for (j = 0; j < logoLength - round; j++) {
    if (round % 2 != 0) {
      if (j % 2 != 0) {
        insertImage("g-gray");
      } else {
        insertImage("d-gray");
      }
    } else {
      if (j % 2 != 0) {
        insertImage("d-gray");
      } else {
        insertImage("g-gray");
      }
    }
  }
  insertImage("g-gray");
}
