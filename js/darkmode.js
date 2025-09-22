const darkToggle = document.getElementById("darkModeToggle");

if (darkToggle) {
  // Load saved theme or match system preference
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
  }

  darkToggle.onclick = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      darkToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      darkToggle.textContent = "🌙";
    }
  };
}
