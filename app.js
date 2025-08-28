async function loadFeed() {
  const res = await fetch("feed.json");
  const items = await res.json();

  const feedEl = document.getElementById("feed");
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="Post image">
      <div class="content">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
      <!-- <div class="actions">
        <button onclick="likePost(this)">👍 Like</button>
        <button>💬 Comment</button>
        <button>↗️ Share</button>
      </div> -->
    `;
    feedEl.appendChild(card);
  });
}

function likePost(button) {
  button.innerText = "❤️ Liked";
  button.style.color = "red";
}

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const btn = document.getElementById("darkModeToggle");
  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "☀️"; // Switch to light mode
  } else {
    btn.innerText = "🌙"; // Switch to dark mode
  }
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

loadFeed();
