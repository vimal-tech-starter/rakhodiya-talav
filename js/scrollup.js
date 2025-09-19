// scrollup.js
document.addEventListener("DOMContentLoaded", () => {
    // Create button
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.innerHTML = "⬆️";
    document.body.appendChild(scrollBtn);

    // Show button when scrolling down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.pointerEvents = "auto";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.pointerEvents = "none";
        }
    });

    // Smooth scroll to top
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
