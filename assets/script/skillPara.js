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

for (i = 0; i < skillList.length; i++) {
  const nowDate = new Date();
  const startYear = skillList[i].start.getFullYear();
  const startMonth = skillList[i].start.getMonth();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();

  const elapsedMonths = (nowYear - startYear) * 12 + nowMonth - startMonth;

  skillList[i].start.months = elapsedMonths;
}

skillList.sort((a, b) => {
  if (a.start.months < b.start.months) return 1;
  if (a.start.months > b.start.months) return -1;
  return 0;
});

for (i = 0; i < skillList.length; i++) {
  const skillName = JSON.stringify(skillList[i].name).replace(/"/g, "");

  const skillMonth = JSON.stringify(skillList[i].start.months);
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
}
