export let mouseDown = false;

export default function init() {
  window.addEventListener("mousedown", () => {
    mouseDown = 1;
  });

  window.addEventListener("mouseup", () => {
    mouseDown = 0;
  });
}
