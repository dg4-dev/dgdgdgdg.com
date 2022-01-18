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

  const skillMonth =
    (nowDate.getFullYear() - value.start.getFullYear()) * 12 +
    (nowDate.getMonth() - value.start.getMonth());
  const firstMonth =
    (nowDate.getFullYear() - skillList[0].start.getFullYear()) * 12 +
    (nowDate.getMonth() - skillList[0].start.getMonth());
  const round = Math.floor((skillMonth / firstMonth) * 100);

  const li = document.createElement("li");
  li.className = "skill-item";
  $("#skillOutput").appendChild(li);

  const skillName = document.createElement("p");
  skillName.className = "skill-name";
  skillName.innerText = `${value.name}`;
  li.appendChild(skillName);

  const skillBar = document.createElement("div");
  skillBar.className = "skill-bar";
  li.appendChild(skillBar);

  const skillParam = document.createElement("div");
  skillParam.className = "skill-param";
  skillParam.style = `width: ${round * 0.95}%;`;
  skillBar.appendChild(skillParam);
});
