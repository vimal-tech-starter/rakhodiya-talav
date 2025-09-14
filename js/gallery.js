const gallery = document.getElementById("gallery");
let allImages = [];

function buildGallery(folderImages) {
  for (const folder in folderImages) {
    const section = document.createElement("div");
    section.className = "section";

    const heading = document.createElement("h3");
    heading.textContent = folder === "root" ? "Root Folder" : folder;
    section.appendChild(heading);

    const feed = document.createElement("div");
    feed.className = "feed";

    folderImages[folder].forEach((url, i) => {
      allImages.push(url);
      const imgIndex = allImages.length - 1;

      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${i * 0.1}s`;

      const img = document.createElement("img");
      img.dataset.src = url;
      img.loading = "lazy";
      img.alt = "";
      img.addEventListener("click", () => openLightbox(imgIndex));

      card.appendChild(img);
      feed.appendChild(card);
    });

    section.appendChild(feed);
    gallery.appendChild(section);
  }

  // Lazy load
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: "100px" });

  document.querySelectorAll(".card img").forEach(img => observer.observe(img));
}

// buildGallery function to make headers clickable:
function buildGallery(folderImages) {
  for (const folder in folderImages) {
    const section = document.createElement("div");
    section.className = "section collapsed"; // collapsed by default

    const heading = document.createElement("h3");
    heading.textContent = folder === "root" ? "Root Folder" : folder;

    // Toggle collapse/expand
    heading.addEventListener("click", () => {
      section.classList.toggle("collapsed");
      section.classList.toggle("expanded");
    });

    section.appendChild(heading);

    const feed = document.createElement("div");
    feed.className = "feed";

    folderImages[folder].forEach((url, i) => {
      allImages.push(url);
      const imgIndex = allImages.length - 1;

      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${i * 0.1}s`;

      const img = document.createElement("img");
      img.dataset.src = url;
      img.loading = "lazy";
      img.alt = "";
      img.addEventListener("click", () => openLightbox(imgIndex));

      card.appendChild(img);
      feed.appendChild(card);
    });

    section.appendChild(feed);
    gallery.appendChild(section);
  }

  // Lazy load
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: "100px" });

  document.querySelectorAll(".card img").forEach(img => observer.observe(img));
}
