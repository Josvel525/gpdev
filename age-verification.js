(() => {
  /**
   * Exotic Kings — Age Gate
   * Behavior:
   * - Shows ONLY on the home page (index.html or /)
   * - Shows ONLY once per browser session (sessionStorage)
   * - Does NOT inject into other pages
   */
  const OVERLAY_ID = "age-gate";
  const CONFIRM_ID = "age-confirm";
  const DENY_ID = "age-deny";
  const SESSION_KEY = "ek_age_verified";

  function isHomePage() {
    const p = (window.location.pathname || "").toLowerCase();
    return p === "/" || p.endsWith("/index.html") || p.endsWith("index.html");
  }

  function show(overlay) {
    // Tailwind: remove hidden if present
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function hide(overlay) {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!isHomePage()) return;

    if (sessionStorage.getItem(SESSION_KEY) === "true") return;

    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return; // If markup missing, fail closed (no prompt). Keep simple.

    const confirmBtn = document.getElementById(CONFIRM_ID);
    const denyBtn = document.getElementById(DENY_ID);

    // Show modal immediately
    show(overlay);

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        sessionStorage.setItem(SESSION_KEY, "true");
        hide(overlay);
      });
    }

    if (denyBtn) {
      denyBtn.addEventListener("click", () => {
        // Exit: send them offsite
        window.location.href = "https://www.google.com";
      });
    }
  });
})();
