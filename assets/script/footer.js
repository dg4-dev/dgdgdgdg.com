const xfr = new XMLHttpRequest(),
  Fmethod = "GET",
  Furl = "/assets/common/footer.html";
const Fbox = document.getElementById("footer");

xfr.responseType = "document";
xfr.open(Fmethod, Furl, true);
xfr.onreadystatechange = () => {
  if (xfr.readyState === 4 && xfr.status === 200) {
    const restxt = xfr.responseXML;
    const int = restxt.getElementsByTagName("footer")[0];
    Fbox.innerHTML = int.innerHTML;
  }
};
xfr.send();
