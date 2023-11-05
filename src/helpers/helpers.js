export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getImgUrl(pic) {
    return require("../assets/images/" + pic + ".jpg");
  }