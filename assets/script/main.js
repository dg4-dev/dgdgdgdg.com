const $ = (target) => {
  if (target[0] === "#") {
    const Elm = document.getElementById(`${target.slice(1)}`);
    return Elm ? Elm : undefined;
  } else if (target[0] === ".") {
    const Elm = document.getElementsByClassName(`${target.slice(1)}`);
    return Elm ? Elm : undefined;
  } else {
    const Elm = document.getElementsByTagName(`${target}`);
    return Elm ? Elm : undefined;
  }
};
