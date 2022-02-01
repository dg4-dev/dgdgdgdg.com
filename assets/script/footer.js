const writeFooter = (getData) =>
  ($("#footer").innerHTML = $("footer", getData)[0].innerHTML);

const footerUrl = "/assets/common/footer.html";

fetch(footerUrl)
  .then((response) => response.text())
  .then((data) =>
    writeFooter(new DOMParser().parseFromString(data, "text/html"))
  );
