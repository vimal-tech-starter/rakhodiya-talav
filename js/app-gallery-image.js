const repoOwner = "vimal-tech-starter";    // 👈 your GitHub username
const repoName = "ganesha-images-2025";         // 👈 your repository name
const folderPath = "images/grid-gallery-1";     // 👈 folder containing images
const branch = "main";           // 👈 branch name

const gallery = document.getElementById("gallery");
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?ref=${branch}`;

let images = [];
let currentIndex = 0;

// Fetch image list from GitHub API
fetch(apiUrl)
  .then(res => res.json())
  .then(files => {
    files.forEach((file, index) => {
      if (file.type === "file" && file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const imgUrl = file.download_url; // Direct raw URL
        images.push(imgUrl);

        const imgEl = document.createElement("img");
        imgEl.src = imgUrl;
        imgEl.alt = file.name;
        imgEl.onclick = () => openLightbox(index);
        gallery.appendChild(imgEl);
      }
    });
  })
  .catch(err => console.error("Error loading images:", err));

// Lightbox functions
function openLightbox(index) {
  currentIndex = index;
  document.getElementById("lightbox-img").src = images[currentIndex];
  document.getElementById("lightbox").style.display = "flex";
}
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
function changeSlide(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex];
}

// Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "ArrowLeft") changeSlide(-1);
});