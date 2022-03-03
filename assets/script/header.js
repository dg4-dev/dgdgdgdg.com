const writeHeader = (getData) => {
  $("header")[0].innerHTML = $("header", getData)[0].innerHTML;

  $("#menuBtn").onclick = () =>
    Array.from($(".header-menu")).forEach((value) =>
      value.classList.toggle("is-open")
    );
};

const headerUrl = "/assets/common/header.html";

fetch(headerUrl)
  .then((response) => response.text())
  .then((data) =>
    writeHeader(new DOMParser().parseFromString(data, "text/html"))
  );
