import { SerializedStyles, css } from "@emotion/react";
import dayjs from "dayjs";

const Logo = () => {
  const skillList = [
    { date: dayjs("2015-05-01"), months: 0 },
    { date: dayjs("2017-04-01"), months: 0 },
    { date: dayjs("2019-04-01"), months: 0 },
    { date: dayjs("2019-10-01"), months: 0 },
  ];

  skillList.forEach((skill) => {
    const nowDate = dayjs();
    const startYear = skill.date.year();
    const startMonth = skill.date.month();
    const nowYear = nowDate.year();
    const nowMonth = nowDate.month();

    const elapsedMonths = (nowYear - startYear) * 12 + nowMonth - startMonth;

    skill.months = elapsedMonths;
  });

  skillList.sort((a, b) => b.months - a.months);

  const styles: SerializedStyles[] = [];

  skillList.forEach(({ months }) => {
    const skillMonth = months;
    const firstMonth = skillList[0].months;
    const round = Math.floor((skillMonth / firstMonth) * 100);

    styles.push(
      css({
        fill: `#00${Math.floor((212 * round) / 100).toString(16)}${Math.floor((212 * round) / 100).toString(16)}`,
      })
    );
  });

  console.log(styles);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 149.3">
      <g>
        <path css={styles[0]} d="M40.8,39.4L0,80.2l57.3,57.3V0H40.8V39.4z M40.8,97.7L23.3,80.2l17.5-17.5V97.7z" />
        <path
          css={styles[0]}
          d="M70.8,11.1l0,78h36.9L70.8,126v1.7v21.6l69.1-69.1L70.8,11.1z M87.3,72.6V50.9L109,72.6L87.3,72.6z"
        />
        <path
          css={styles[1]}
          d="M194.2,39.4l-40.8,40.8l57.3,57.3V0h-16.5V39.4z M194.2,97.7l-17.5-17.5l17.5-17.5V97.7z"
        />
        <path
          css={styles[1]}
          d="M224.2,11.1l0,78H261L224.2,126v1.7v21.6l69.1-69.1L224.2,11.1z M240.7,72.6V50.9l21.7,21.7L240.7,72.6z"
        />
        <path
          css={styles[2]}
          d="M347.6,39.4l-40.8,40.8l57.3,57.3V0h-16.5V39.4z M347.6,97.7l-17.5-17.5l17.5-17.5V97.7z"
        />
        <path
          css={styles[2]}
          d="M377.6,11.1l0,78h36.9L377.6,126v1.7v21.6l69.1-69.1L377.6,11.1z M394,72.6V50.9l21.7,21.7L394,72.6z"
        />
        <path
          css={styles[3]}
          d="M500.9,39.4l-40.8,40.8l57.3,57.3V0h-16.5V39.4z M500.9,97.7l-17.5-17.5l17.5-17.5V97.7z"
        />
        <path
          css={styles[3]}
          d="M530.9,11.1v78h36.9L530.9,126v1.7v21.6L600,80.2L530.9,11.1z M547.4,72.6V50.9l21.7,21.7L547.4,72.6z"
        />
      </g>
    </svg>
  );
};

export default Logo;
