/* --------------------- */
/* ---- Play sounds ---- */
/* --------------------- */
export function playSound(selector, delay) {
  const HTMLaudioElement = document.querySelector(selector);
  HTMLaudioElement.currentTime = 0;

  if (delay) {
    setTimeout(() => HTMLaudioElement.play(), delay);
  } else {
    HTMLaudioElement.play();
  }
}
