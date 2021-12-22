const linkData = [
  "note",
  "twitter",
  "facebook",
  "youtube",
  "instagram",
  "gitlab",
  "github",
  "suzuri",
];

linkData.forEach((value) => {
  $("#linkList").insertAdjacentHTML(
    "beforeend",
    `
    <li>
      <a
        href='https://${value}.dgdgdgdg.com'
        target='_blank'
        rel='noopener norefferer'
      >
      <div class='icon'>
        <img src='/assets/image/icon/${value}.webp'>
      </div>
      </a>
    </li>
    `
  );
});
