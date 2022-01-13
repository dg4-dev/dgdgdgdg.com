const writeTube = (getData) => {
  getData.items.forEach((value) => {
    console.log(value.snippet.title);
  });
};

const tubeUrl =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCS8EPayq8U-DY3508IQ8-Ow";

fetch(tubeUrl)
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  });
