(() => {
  /**
   * Exotic Kings — Age Gate (always prompts)
   * Requirements:
   * - Must prompt every page load (even returning visitors, even private windows)
   * - Must block site interaction until answered
   * - Works across all pages (injects markup if missing)
   */
  const OVERLAY_ID = "age-gate";
  const CONFIRM_ID = "age-confirm";
  const DENY_ID = "age-deny";
  const BODY_LOCK_CLASS = "overflow-hidden";

  function ensureModal() {
    let overlay = document.getElementById(OVERLAY_ID);

    // If markup doesn't exist on the page, inject it.
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = OVERLAY_ID;
      overlay.className = "fixed inset-0 bg-black/80 backdrop-blur-lg z-[9999] hidden";
      overlay.innerHTML = `
        <div class="max-w-lg mx-auto mt-24 bg-gray-900 border-2 border-primary rounded-2xl shadow-2xl p-8 text-center">
          <p class="text-sm uppercase tracking-[0.35em] text-primary mb-3">Welcome</p>
          <h1 class="text-3xl font-black text-secondary text-neon">Are you 21 years or older?</h1>
          <p class="text-lg text-gray-200 mt-3 mb-6">You must be at least 21 to enter Exotic Kings Smoke Shop online experience.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button id="${CONFIRM_ID}" class="flex-1 px-6 py-3 rounded-full bg-primary text-gray-900 font-bold shadow-lg hover:bg-primary/80">Yes, I am 21+</button>
            <button id="${DENY_ID}" class="flex-1 px-6 py-3 rounded-full border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-background-dark">No, Exit</button>
          </div>
          <p class="text-xs text-gray-400 mt-4">By entering, you confirm that you are of legal age in your area.</p>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    // Make sure it sits on top of everything, always.
    overlay.style.zIndex = "9999";
    return overlay;
  }

  function lockBody() {
    document.documentElement.classList.add(BODY_LOCK_CLASS);
    document.body.classList.add(BODY_LOCK_CLASS);
  }

  function unlockBody() {
    document.documentElement.classList.remove(BODY_LOCK_CLASS);
    document.body.classList.remove(BODY_LOCK_CLASS);
  }

  function show(overlay) {
    // Always prompt on every load.
    overlay.classList.remove("hidden");
    lockBody();

    // Basic focus management: move focus to the confirm button.
    const btn = document.getElementById(CONFIRM_ID);
    if (btn) btn.focus({ preventScroll: true });
  }

  function hide(overlay) {
    overlay.classList.add("hidden");
    unlockBody();
  }

  function deny() {
    // Replace page with a hard stop message.
    unlockBody();
    document.body.innerHTML = `
      <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:black;color:white;text-align:center;padding:2rem">
        <div>
          <h1 style="font-size:2rem;margin-bottom:1rem">You must be 21 or older to enter.</h1>
          <p style="opacity:0.8">Please close this tab or return when you meet the legal age requirement.</p>
        </div>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = ensureModal();

    const confirmBtn = document.getElementById(CONFIRM_ID);
    const denyBtn = document.getElementById(DENY_ID);

    if (confirmBtn) confirmBtn.addEventListener("click", () => hide(overlay));
    if (denyBtn) denyBtn.addEventListener("click", deny);

    // Don't allow backdrop clicks to dismiss the gate.
    overlay.addEventListener("click", (e) => e.stopPropagation());

    show(overlay);
  });
})();