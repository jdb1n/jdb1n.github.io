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
  const defaultEmoji = "🍵";
  let hoverEmoji = defaultEmoji;

  const syncCursorEmoji = () => {
    cursor.textContent = hoverEmoji;
  };

  window.addEventListener("mousemove", (event) => {
    const x = event.clientX + 22;
    const y = event.clientY + 14;

    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    cursor.classList.add("is-visible");
  });

  window.addEventListener("mousedown", () => {
    cursor.classList.add("is-active");
    syncCursorEmoji();
  });

  window.addEventListener("mouseup", () => {
    cursor.classList.remove("is-active");
    syncCursorEmoji();
  });

  window.addEventListener("blur", () => {
    hoverEmoji = defaultEmoji;
    cursor.classList.remove("is-active");
    syncCursorEmoji();
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseover", (event) => {
    const target = event.target.closest("[data-cursor-emoji]");
    hoverEmoji = target ? target.dataset.cursorEmoji || defaultEmoji : defaultEmoji;
    syncCursorEmoji();
  });

  document.addEventListener("mouseout", (event) => {
    const relatedTarget = event.relatedTarget;

    if (relatedTarget && relatedTarget.closest("[data-cursor-emoji]")) {
      return;
    }

    const nextTarget = document.querySelector(":hover[data-cursor-emoji], [data-cursor-emoji]:hover");
    hoverEmoji = nextTarget ? nextTarget.dataset.cursorEmoji || defaultEmoji : defaultEmoji;
    syncCursorEmoji();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeaCursor);
} else {
  initTeaCursor();
}
