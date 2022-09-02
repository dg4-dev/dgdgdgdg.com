import dayjs from "dayjs";

const secondsOld = Number(dayjs()) - Number(dayjs("2001-11-10"));
const Age = `${~~(secondsOld / 315576e5)}`;

export default Age;
