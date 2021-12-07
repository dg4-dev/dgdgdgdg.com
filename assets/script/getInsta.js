const getData = () => {
  var f =
    "https://graph.facebook.com/v3.0/17841445773642608?fields=name%2Cmedia.limit(15)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cusername%7D&access_token=EABFZByCZAxiGABAIRfTq7Ed6i1aSv29Ybhfa9gZCa5eDy7OQlMDjyYKznYicaChlUJMRmD3Lb7hOFDRhsv0pryvZBTHZAjZAUUZCZC1Xgbb20mJIHpge1Gvp7P0I7kwvqZCt0xyfvwwGjVuJ7Y1ZAfyZAWgUf0Xg9ZAcNaZBhVUtAExWYp2LqkZCPrlYAV";
  var retJson;

  var obj = new XMLHttpRequest();

  obj.open("get", f, false);
  obj.onload = function () {
    try {
      retJson = JSON.parse(this.responseText);
    } finally {
    }
  };
  obj.send(null);
  return retJson;
};

const instaData = getData();

instaData.media.data.forEach((elm) => {
  $("#postList").insertAdjacentHTML(
    "beforeend",
    `
    <div class="post-photo">
      <a
        href="${elm.permalink}"
        target="_blank"
        rel="noopener norefferer"
      >
        <img src="${elm.media_url}" alt="" />
      </a>
    </div>
    `
  );
});
