const linkData = [
  { name: "Note" },
  { name: "Twitter" },
  { name: "Facebook" },
  { name: "YouTube" },
  { name: "Instagram" },
  { name: "Gitlab" },
  { name: "Github" },
  { name: "Suzuri" },
];

linkData.forEach((value) => {
  const formated = value.name.toLowerCase().replace(/\s+/g, "");

  $("#linkList").insertAdjacentHTML(
    "beforeend",
    "<li><a href='https://" +
      formated +
      ".dgdgdgdg.com' target='_blank' rel='noopener norefferer' class='is-flex'><div class='icon'><img src='/assets/image/i-" +
      formated +
      ".webp' alt='icon'></div><span class='sub'>" +
      value.name +
      "</span></a></li>"
  );
});
