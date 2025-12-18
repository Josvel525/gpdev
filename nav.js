// Exotic Kings — Navigation toggle (mobile sidebar)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("nav-menu");

  if (!hamburger || !menu) return;

  const CLOSED_RIGHT = "-280px";
  const OPEN_RIGHT = "0px";

  function isOpen() {
    const r = (menu.style.right || "").trim();
    if (r) return r === OPEN_RIGHT;
    // If no inline style, infer from class (tailwind right-[-280px])
    return !menu.className.includes("right-[-280px]");
  }

  function openMenu() {
    menu.style.right = OPEN_RIGHT;
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    menu.style.right = CLOSED_RIGHT;
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  }

  function toggleMenu() {
    if (isOpen()) closeMenu();
    else openMenu();
  }

  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("tabindex", "0");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "nav-menu");

  hamburger.addEventListener("click", toggleMenu);
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
    if (e.key === "Escape") closeMenu();
  });

  // Close when a menu link is clicked
  menu.addEventListener("click", (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (a) closeMenu();
  });

  // Close on Escape globally
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Ensure closed state at load
  menu.style.right = CLOSED_RIGHT;
});
