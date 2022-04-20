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
  const li = c$("li");
  $("#linkList").appendChild(li);

  const linkLink = c$("a");
  linkLink.href = `https://${value}.dgdgdgdg.com`;
  linkLink.target = "_blank";
  linkLink.rel = "noopener noreferrer";
  li.appendChild(linkLink);

  const linkIcon = c$("div");
  linkIcon.class = "icon";
  linkLink.appendChild(linkIcon);

  const linkImg = c$("img");
  linkImg.src = `/assets/image/icon/${value}.svg`;
  linkIcon.appendChild(linkImg);
});
