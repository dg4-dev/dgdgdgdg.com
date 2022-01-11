const writeHeader = (getData) => {
  const writeText = getData.getElementsByTagName("header")[0].innerHTML;
  $("#header").innerHTML = writeText;
};

const headerUrl = "/assets/common/header.html";

fetch(headerUrl)
  .then((response) => response.text())
  .then((data) => {
    writeHeader(new DOMParser().parseFromString(data, "text/html"));
  });

const menuOpen = () =>
  Array.from($(".header-menu")).forEach((value) =>
    value.classList.toggle("is-open")
  );
