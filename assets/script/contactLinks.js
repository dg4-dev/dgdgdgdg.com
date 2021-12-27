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

  const linkLink = document.createElement("a");
  linkLink.href = `https://${value}.dgdgdgdg.com`;
  linkLink.target = "_blank";
  linkLink.rel = "noopener norefferer";

  const linkIcon = document.createElement("div");
  linkIcon.class = "icon";

  const linkImg = document.createElement("img");
  linkImg.src = `/assets/image/icon/${value}.webp`;

  linkIcon.appendChild(linkImg);
  linkLink.appendChild(linkIcon);
  li.appendChild(linkLink);
  $("#linkList").appendChild(li);
});
