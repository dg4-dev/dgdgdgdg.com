const $ = (target) => {
  const firstChar = target.charAt(0);

  if (firstChar === "#") {
    target = target.slice(1);
    const Elm = document.getElementById(`${target}`);
    return Elm;
  } else if (firstChar === ".") {
    target = target.slice(1);
    const Elm = document.getElementsByClassName(`${target}`);
    return Elm.length === 0 ? undefined : Elm;
  } else {
    const Elm = document.getElementsByTagName(`${target}`);
    return Elm.length === 0 ? undefined : Elm;
  }
};
