const gallery = document.getElementById("gallery");
let allImages = [];

// buildGallery function to make headers clickable:
function buildGallery(folderImages) {
  for (const folder in folderImages) {

    const imagesInFolder = folderImages[folder] || [];
    const imageCount = imagesInFolder.length;

    // Section wrapper
    const section = document.createElement("div");
    section.className = "section collapsed"; // collapsed by default
    // section.className = "section expanded"; // expanded by default

    // Heading with folder name and count
    const heading = document.createElement("h3");
    heading.innerHTML = `
  ${folder === "root" ? "Root Folder" : folder}
  <span class="folder-count">(${imageCount} ${imageCount === 1 ? "image" : "images"})</span>
`;

    // Toggle expand/collapse
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

// Toggle all button
const toggleAllBtn = document.getElementById("toggle-all");
let allExpanded = true;

toggleAllBtn.addEventListener("click", () => {
  const sections = document.querySelectorAll(".section");
  allExpanded = !allExpanded;

  sections.forEach(section => {
    section.classList.toggle("expanded", allExpanded);
    section.classList.toggle("collapsed", !allExpanded);
  });

  toggleAllBtn.textContent = allExpanded ? "Collapse All" : "Expand All";
});

