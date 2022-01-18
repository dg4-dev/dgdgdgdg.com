const writeTube = (getData) => {
  getData.items.forEach((value) => {
    const thumbWidth = [];
    Object.values(value.snippet.thumbnails).forEach((thumbValue) =>
      thumbWidth.push(thumbValue.width)
    );

    let sizeName;

    thumbWidth.forEach((wides, i) => {
      if (wides == Math.max(...thumbWidth))
        sizeName = Object.keys(value.snippet.thumbnails)[i];
    });

    const videoItem = document.createElement("div");
    videoItem.className = "item";

    const videoLink = document.createElement("a");
    videoLink.href = `https://youtube.com/watch?v=${value.snippet.resourceId.videoId}`;
    videoLink.target = "_blank";
    videoLink.rel = "noopener norefferer";
    videoLink.className = "image";

    const videoThumb = document.createElement("img");
    videoThumb.src = value.snippet.thumbnails[sizeName].url;

    const videoTitle = document.createElement("h4");
    videoTitle.className = "title";
    videoTitle.innerText = value.snippet.title;

    videoLink.appendChild(videoThumb);
    videoItem.appendChild(videoLink);
    videoItem.appendChild(videoTitle);
    $("#videoList").appendChild(videoItem);
  });
};

const tubeUrl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=UUS8EPayq8U-DY3508IQ8-Ow&key=AIzaSyCSLvqlklNFu_geh4sDoUhYpF1lVw8Yqz8";

fetch(tubeUrl)
  .then((response) => response.json())
  .then((data) => {
    writeTube(data);
  });
