const $ = (target, doc = document) => {
  if (target[0] === "#") {
    const Elm = doc.getElementById(`${target.slice(1)}`);
    return Elm ? Elm : undefined;
  } else if (target[0] === ".") {
    const Elm = doc.getElementsByClassName(`${target.slice(1)}`);
    return Elm ? Elm : undefined;
  } else {
    const Elm = doc.getElementsByTagName(`${target}`);
    return Elm ? Elm : undefined;
  }
};
