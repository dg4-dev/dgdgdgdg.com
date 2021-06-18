window.onload = function () {
  const mailbutton = document.getElementById("sendmail");

  mailbutton.addEventListener("click", function () {
    const result = window.confirm("メールを作成しますか？");

    if (result) {
      location.href = "mailto:info@dgdgdgdg.com";
    }
  });

  const button = document.getElementById("menuopen");
  const menu = document.getElementById("menu");

  button.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
};
