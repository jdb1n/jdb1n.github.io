const canUseTeaCursor = () => {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hoverCapable = window.matchMedia("(hover: hover)").matches;

  return finePointer && hoverCapable;
};

const initTeaCursor = () => {
  if (!canUseTeaCursor()) {
    return;
  }

  const cursor = document.createElement("div");
  cursor.className = "tea-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = "🍵";
  document.body.appendChild(cursor);

  window.addEventListener("mousemove", (event) => {
    const x = event.clientX + 22;
    const y = event.clientY + 14;

    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    cursor.classList.add("is-visible");
  });

  window.addEventListener("mousedown", () => {
    cursor.textContent = "🫖";
    cursor.classList.add("is-active");
  });

  window.addEventListener("mouseup", () => {
    cursor.textContent = "🍵";
    cursor.classList.remove("is-active");
  });

  window.addEventListener("blur", () => {
    cursor.textContent = "🍵";
    cursor.classList.remove("is-active");
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeaCursor);
} else {
  initTeaCursor();
}
