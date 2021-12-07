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
    name: "Web制作",
    start: new Date(2019, 9),
  },
];

skillList.forEach((value) => {
  const nowDate = new Date();
  const startYear = value.start.getFullYear();
  const startMonth = value.start.getMonth();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();

  const elapsedMonths = (nowYear - startYear) * 12 + nowMonth - startMonth;

  value.start.months = elapsedMonths;
});

skillList.sort((a, b) => b.start.months - a.start.months);

skillList.forEach((value) => {
  const skillName = value.name.replace(/"/g, "");

  const skillMonth = value.start.months;
  const firstMonth = skillList[0].start.months;
  const round = Math.floor((skillMonth / firstMonth) * 100);

  $("#skillOutput").insertAdjacentHTML(
    "beforeend",
    `
    <li class="skill-item">
      <p class="skill-name">${skillName}</p>
      <div class="skill-bar">
        <div class="skill-param" style="width: ${round * 0.95}%;"></div>
      </div>
    </li>
    `
  );
});
