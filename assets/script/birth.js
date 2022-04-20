const birth = dayjs("2001-11-10");
const age = dayjs() - birth;
$("#age").innerText = ~~(age / 315576e5);
