const writeFooter = (getData) => {
  const writeText = getData.getElementsByTagName("footer")[0].innerHTML;
  $("#footer").innerHTML = writeText;
};

const footerUrl = "/assets/common/footer.html";

fetch(footerUrl)
  .then((response) => response.text())
  .then((data) => {
    writeFooter(new DOMParser().parseFromString(data, "text/html"));
  });
