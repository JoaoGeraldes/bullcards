/* ---------------- */
/* ---- sounds ---- */
/* ---------------- */
/* export function playStartGameSound() {
  const tingSound = document.querySelector("#audio-ting");
  tingSound.play();
}
export function playGameOverSound() {
  const endSound = document.querySelector("#audio-endGame");
  setTimeout(() => endSound.play(), 600);
}
export function playCardMatchSound() {
  const foundMatchSound = document.querySelector("#audio-cardmatch");
  foundMatchSound.currentTime = 0;
  setTimeout(() => foundMatchSound.play(), 300);
}

export function playMouseOverSound() {
  const overSound = document.querySelector("#audio-switch");
  overSound.currentTime = 0;
  overSound.play();
} */

export function playSound(selector, delay) {
  const HTMLaudioElement = document.querySelector(selector);
  HTMLaudioElement.currentTime = 0;

  if (delay) {
    setTimeout(() => HTMLaudioElement.play(), delay);
  } else {
    HTMLaudioElement.play();
  }
}
