window.onload = function () {
  const button = document.getElementById("menuopen");
  const menu = document.getElementById("menu");

  button.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
};
