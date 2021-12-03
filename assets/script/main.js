const $ = (target) => {
  const firstChar = target.charAt(0);

  if (firstChar === "#") {
    target = target.slice(1);
    const Elm = document.getElementById(`${target}`);
    return Elm;
  } else if (firstChar === ".") {
    target = target.slice(1);
    const Elm = document.getElementsByClassName(`${target}`);

    if (Elm.length === 0) {
      return null;
    } else {
      return Elm;
    }
  } else {
    const Elm = document.getElementsByTagName(`${target}`);

    if (Elm.length === 0) {
      return null;
    } else {
      return Elm;
    }
  }
};
