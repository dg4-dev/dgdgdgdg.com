const $ = (target) => {
  if (target[0] === "#") document.getElementById(`${target.slice(1)}`);
  else if (target[0] === ".")
    document.getElementsByClassName(`${target.slice(1)}`);
  else document.getElementsByTagName(`${target}`);
};
