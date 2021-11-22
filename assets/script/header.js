const xhr = new XMLHttpRequest(),
  Hmethod = "GET",
  Hurl = "/assets/common/header.html";
const Hbox = document.getElementById("header");

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

function menuOpen() {
  const toggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < toggle.length; i++) {
    toggle[i].classList.toggle("is-open");
  }
}
