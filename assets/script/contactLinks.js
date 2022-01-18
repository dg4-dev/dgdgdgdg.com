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
  const li = document.createElement("li");
  $("#linkList").appendChild(li);

  const linkLink = document.createElement("a");
  linkLink.href = `https://${value}.dgdgdgdg.com`;
  linkLink.target = "_blank";
  linkLink.rel = "noopener norefferer";
  li.appendChild(linkLink);

  const linkIcon = document.createElement("div");
  linkIcon.class = "icon";
  linkLink.appendChild(linkIcon);

  const linkImg = document.createElement("img");
  linkImg.src = `/assets/image/icon/${value}.webp`;
  linkIcon.appendChild(linkImg);
});
