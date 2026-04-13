// Ripple effect
document.addEventListener("click", function (e) {
  createRipple(e.clientX, e.clientY);
});

document.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  createRipple(touch.clientX, touch.clientY);
});

function createRipple(x, y) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = ripple.style.height = "20px";

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}