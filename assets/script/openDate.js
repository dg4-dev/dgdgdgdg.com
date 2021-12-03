const openDay = new Date(2021, 1, 1);
var today = new Date();

$("#toToday").insertAdjacentHTML(
  "beforeend",
  "(今日で" + Math.ceil((today - openDay) / 86400000) + "日)"
);
