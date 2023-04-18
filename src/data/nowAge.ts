import dayjs from "dayjs";

const birthDate = dayjs("2001-11-10");
const age = dayjs().diff(birthDate, "year");

export default age;
