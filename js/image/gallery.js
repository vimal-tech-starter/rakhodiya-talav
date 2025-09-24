// App.Gallery - builds collapsible gallery sections
window.App = window.App || {};
App.Gallery = (() => {
  const gallery = document.getElementById("gallery");
  const allImages = [];
  const toggleAllBtn = document.getElementById("toggle-all");
  let allExpanded = true;

  function buildGallery(folderImages) {
    gallery.innerHTML = ""; // clear previous

    for (const folder in folderImages) {
      const imagesInFolder = folderImages[folder] || [];
      const imageCount = imagesInFolder.length;

      // Create section
      const section = document.createElement("div");
      section.classList.add("section", "collapsed"); // start collapsed/expanded

      // Heading
      const heading = document.createElement("h3");
      heading.innerHTML = `
        ${folder === "root" ? "Root Folder" : folder}
        <span class="folder-count">(${imageCount} ${imageCount === 1 ? "image" : "images"})</span>
      `;

      heading.addEventListener("click", () => {
        section.classList.toggle("collapsed");
        section.classList.toggle("expanded");
      });
      section.appendChild(heading);

      const feed = document.createElement("div");
      feed.className = "feed";

      imagesInFolder.forEach((url, i) => {
        allImages.push(url);
        const imgIndex = allImages.length - 1;

        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${i * 0.1}s`;

        const img = document.createElement("img");
        img.dataset.src = url;
        img.loading = "lazy";
        img.alt = "";
        img.addEventListener("click", () => App.Lightbox.open(imgIndex, allImages));

        card.appendChild(img);
        feed.appendChild(card);
      });

      section.appendChild(feed);
      gallery.appendChild(section);
    }

    // Lazy load images using IntersectionObserver
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

  function initToggle() {
    // Select all buttons that should toggle sections
    const toggleButtons = document.querySelectorAll(".toggle-all, #toggle-all, #toggle-all-controls");

    toggleButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const sections = document.querySelectorAll(".section");
        allExpanded = !allExpanded;

        sections.forEach(section => {
          section.classList.toggle("expanded", allExpanded);
          section.classList.toggle("collapsed", !allExpanded);
        });

        // Update all buttons’ text and arrow
        toggleButtons.forEach(b => {
          b.textContent = allExpanded ? "Collapse All" : "Expand All";
          b.classList.toggle("expanded", allExpanded); // ✅ this is what rotates the arrow
        });
      });
    });
  }

  return { buildGallery, initToggle };
})();
