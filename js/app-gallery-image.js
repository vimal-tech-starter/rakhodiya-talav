
const images = [
  "https://raw.githubusercontent.com/vimal-tech-starter/ganesha-images-2025/refs/heads/main/images/grid-gallery-1/Rakhodiya-Talav%20(1).jpg",
  "https://raw.githubusercontent.com/vimal-tech-starter/ganesha-images-2025/refs/heads/main/images/grid-gallery-1/Rakhodiya-Talav%20(2).jpg"
];

let currentIndex = 0;

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

// Optional: close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "ArrowLeft") changeSlide(-1);
});