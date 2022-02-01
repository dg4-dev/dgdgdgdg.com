const writeHeader = (getData) =>
  ($("#header").innerHTML = $("header", getData)[0].innerHTML);

const headerUrl = "/assets/common/header.html";

fetch(headerUrl)
  .then((response) => response.text())
  .then((data) =>
    writeHeader(new DOMParser().parseFromString(data, "text/html"))
  );

const menuOpen = () =>
  Array.from($(".header-menu")).forEach((value) =>
    value.classList.toggle("is-open")
  );
