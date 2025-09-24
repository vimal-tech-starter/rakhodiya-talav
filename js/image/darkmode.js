// App.DarkMode - toggle dark/light theme
window.App = window.App || {};
App.DarkMode = (() => {
  let darkToggleButtons;

  function init() {
    // Support multiple toggle buttons anywhere
    darkToggleButtons = document.querySelectorAll(".dark-mode-toggle, #darkModeToggle");

    if (!darkToggleButtons.length) return;

    // Load saved theme or system preference
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark-mode");
      updateButtons("dark");
    } else {
      updateButtons("light");
    }

    // Add click events to all buttons
    darkToggleButtons.forEach(btn => {
      btn.addEventListener("click", toggle);
    });
  }

  function toggle() {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
    updateButtons(mode);
  }

  function updateButtons(mode) {
    darkToggleButtons.forEach(btn => {
      btn.textContent = mode === "dark" ? "☀️" : "🌙";
    });
  }

  return { init };
})();
