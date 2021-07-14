// this skill was updated at 2021/07/14.

const skillList = [
  { name: "デザイン", month: 75 },
  { name: "映像制作", month: 52 },
  { name: "モーショングラフィックス", month: 28 },
  { name: "Webフロントエンド", month: 16 },
];

skillList.sort((a, b) => {
  if (a.month < b.month) return 1;
  if (a.month > b.month) return -1;
  return 0;
});

for (i = 0; i < skillList.length; i++) {
  const logoLength = 6;
  const skillName = JSON.stringify(skillList[i].name).replace(/"/g, "");
  const skillMonth = JSON.stringify(skillList[i].month);
  const firstMonth = JSON.stringify(skillList[0].month);
  const round = Math.floor((skillMonth / firstMonth) * logoLength);

  const skillOutput = document.getElementById("skillOutput");

  skillOutput.insertAdjacentHTML(
    "beforeend",
    "<li><p class='skill-name'>" +
      skillName +
      `</p><div class='parameter is-flex' id='logoParts${i}'></div></li>`
  );

  const logoParts = document.getElementById(`logoParts${i}`);

  logoParts.insertAdjacentHTML(
    "beforeend",
    "<div class='part'><img src='/image/dg4-init.svg'></div>"
  );
  for (k = 0; k < round; k++) {
    if (k % 2 != 0) {
      logoParts.insertAdjacentHTML(
        "beforeend",
        "<div class='part'><img src='/image/d-blue.svg'></div>"
      );
    } else {
      logoParts.insertAdjacentHTML(
        "beforeend",
        "<div class='part'><img src='/image/g-blue.svg'></div>"
      );
    }
  }
  for (k = 0; k < logoLength - round; k++) {
    if (round % 2 != 0) {
      if (k % 2 != 0) {
        logoParts.insertAdjacentHTML(
          "beforeend",
          "<div class='part'><img src='/image/g-gray.svg'></div>"
        );
      } else {
        logoParts.insertAdjacentHTML(
          "beforeend",
          "<div class='part'><img src='/image/d-gray.svg'></div>"
        );
      }
    } else {
      if (k % 2 != 0) {
        logoParts.insertAdjacentHTML(
          "beforeend",
          "<div class='part'><img src='/image/d-gray.svg'></div>"
        );
      } else {
        logoParts.insertAdjacentHTML(
          "beforeend",
          "<div class='part'><img src='/image/g-gray.svg'></div>"
        );
      }
    }
  }
  logoParts.insertAdjacentHTML(
    "beforeend",
    "<div class='part'><img src='/image/g-gray.svg'></div>"
  );
}
