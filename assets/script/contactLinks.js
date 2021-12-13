const linkData = [
  "Note",
  "Twitter",
  "Facebook",
  "YouTube",
  "Instagram",
  "Gitlab",
  "Github",
  "Suzuri",
];

linkData.forEach((value) => {
  const formated = value.toLowerCase().replace(/\s+/g, "");

  $("#linkList").insertAdjacentHTML(
    "beforeend",
    `
    <li>
      <a
        href='https://${formated}.dgdgdgdg.com'
        target='_blank'
        rel='noopener norefferer'
        class='is-flex'
      >
      <div class='icon'>
        <img src='/assets/image/icon/${formated}.webp'>
      </div>
      <span class='sub'>${value}</span>
      </a>
    </li>
    `
  );
});
