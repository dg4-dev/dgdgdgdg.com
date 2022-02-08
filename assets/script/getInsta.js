const writeInsta = (getData) => {
  getData.media.data.forEach((elm) => {
    const instaPost = document.createElement("div");
    instaPost.className = "post-photo";
    $("#postList").appendChild(instaPost);

    const instaLink = document.createElement("a");
    instaLink.href = elm.permalink;
    instaLink.target = "_blank";
    instaLink.rel = "noopener noreferrer";
    instaPost.appendChild(instaLink);

    const instaImg = document.createElement("img");
    instaImg.src = elm.media_url;
    instaLink.appendChild(instaImg);
  });
};

const instaUrl =
  "https://graph.facebook.com/v3.0/17841445773642608?fields=name%2Cmedia.limit(15)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cusername%7D&access_token=EABFZByCZAxiGABAIRfTq7Ed6i1aSv29Ybhfa9gZCa5eDy7OQlMDjyYKznYicaChlUJMRmD3Lb7hOFDRhsv0pryvZBTHZAjZAUUZCZC1Xgbb20mJIHpge1Gvp7P0I7kwvqZCt0xyfvwwGjVuJ7Y1ZAfyZAWgUf0Xg9ZAcNaZBhVUtAExWYp2LqkZCPrlYAV";

fetch(instaUrl)
  .then((response) => response.json())
  .then((data) => writeInsta(data));
