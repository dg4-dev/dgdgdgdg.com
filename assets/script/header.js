const writeHeader = (getData) => {
  g$("header")[0].innerHTML = g$("header", getData)[0].innerHTML;

  g$("#menuBtn").onclick = () =>
    Array.from(g$(".header-menu")).forEach((value) =>
      value.classList.toggle("is-open")
    );
};

const headerUrl = "/assets/common/header.html";

fetch(headerUrl)
  .then((response) => response.text())
  .then((data) =>
    writeHeader(new DOMParser().parseFromString(data, "text/html"))
  );
