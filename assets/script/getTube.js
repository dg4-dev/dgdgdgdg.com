const writeTube = (getData) => {
  getData.items.forEach((value) => {
    const sizeNames = ["maxres", "standard", "high", "medium", "default"];
    const sizeName = sizeNames.find(
      (sizeName) => value.snippet.thumbnails[sizeName]
    );

    const videoItem = document.createElement("div");
    videoItem.className = "item";
    $("#videoList").appendChild(videoItem);

    const videoLink = document.createElement("a");
    videoLink.href = `https://youtube.com/watch?v=${value.snippet.resourceId.videoId}`;
    videoLink.target = "_blank";
    videoLink.rel = "noopener norefferer";
    videoLink.className = "image";
    videoItem.appendChild(videoLink);

    const videoThumb = document.createElement("img");
    videoThumb.src = value.snippet.thumbnails[sizeName].url;
    videoLink.appendChild(videoThumb);

    const videoTitle = document.createElement("h4");
    videoTitle.className = "title";
    videoTitle.innerText = value.snippet.title;
    videoItem.appendChild(videoTitle);
  });
};

const tubeUrl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=UUS8EPayq8U-DY3508IQ8-Ow&key=AIzaSyCSLvqlklNFu_geh4sDoUhYpF1lVw8Yqz8";

fetch(tubeUrl)
  .then((response) => response.json())
  .then((data) => {
    writeTube(data);
  });
