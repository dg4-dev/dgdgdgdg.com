const writeTube = (getData) => {
  console.log(getData);
};

const tubeUrl = "https://ev2-prod-node-red-a05cdf0d-831.herokuapp.com/id";

fetch(tubeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
