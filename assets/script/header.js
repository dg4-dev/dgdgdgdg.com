const xhr = new XMLHttpRequest(),
  Hmethod = "GET",
  Hurl = "/assets/common/header.html";
const Hbox = $("#header");

xhr.responseType = "document";
xhr.open(Hmethod, Hurl, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const restxt = xhr.responseXML;
    const int = restxt.getElementsByTagName("header")[0];
    Hbox.innerHTML = int.innerHTML;
  }
};
xhr.send();

const menuOpen = () =>
  Array.from($(".toggle")).forEach((value) =>
    value.classList.toggle("is-open")
  );
