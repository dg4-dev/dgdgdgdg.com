const linkData = [
  { name: "Clubhouse" },
  { name: "Qiita" },
  { name: "Note" },
  { name: "Twitter" },
  { name: "Facebook" },
  { name: "Discord" },
  { name: "YouTube" },
  { name: "Apple Music" },
  { name: "Instagram" },
  { name: "Gitlab" },
  { name: "Github" },
  { name: "Suzuri" },
];

const linkList = document.getElementById("linkList");

for (i = 0; i < linkData.length; i++) {
  const formated = linkData[i].name.toLowerCase().replace(/\s+/g, "");

  linkList.insertAdjacentHTML(
    "beforeend",
    "<li><a href='https://" +
      formated +
      ".dgdgdgdg.com' target='_blank' rel='noopener norefferer' class='is-flex'><div class='icon'><img src='/assets/image/i-" +
      formated +
      ".webp' alt='icon'></div><span class='sub'>" +
      linkData[i].name +
      "</span></a></li>"
  );
}
