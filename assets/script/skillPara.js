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

skillList.sort((a, b) => {
  if (a.start.months < b.start.months) return 1;
  if (a.start.months > b.start.months) return -1;
  return 0;
});

skillList.forEach((value) => {
  const skillName = JSON.stringify(value.name).replace(/"/g, "");

  const skillMonth = JSON.stringify(value.start.months);
  const firstMonth = JSON.stringify(skillList[0].start.months);
  const round = Math.floor((skillMonth / firstMonth) * 100);
  const skillOutput = document.getElementById("skillOutput");

  skillOutput.insertAdjacentHTML(
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
