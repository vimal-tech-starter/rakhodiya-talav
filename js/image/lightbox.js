// App.Lightbox - image viewer with navigation, zoom, pan & swipe
window.App = window.App || {};
App.Lightbox = (() => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const btnClose = document.querySelector(".close-btn");
    const btnPrev = document.querySelector(".prev-btn");
    const btnNext = document.querySelector(".next-btn");
    const controls = [btnClose, btnPrev, btnNext];

    let allImages = [];
    let currentIndex = 0;
    let hideControlsTimer;

    // Zoom & pan state
    let isZoomed = false, isDragging = false;
    let startX, startY, offsetX = 0, offsetY = 0, currentScale = 1;
    let initialDistance = 0, initialScale = 1;

    /** ---------- Core ---------- */
    function open(index, images) {
        allImages = images;
        currentIndex = index;
        updateImage();
        lightbox.style.display = "flex";
        requestAnimationFrame(() => lightbox.classList.add("show"));
        resetHideControlsTimer();
    }

    function close() {
        lightbox.classList.remove("show");
        setTimeout(() => (lightbox.style.display = "none"), 300);
        resetZoom();
    }

    function changeImage(direction) {
        resetZoom();
        lightboxImg.classList.remove("slide-left", "slide-right");

        if (direction === "next") lightboxImg.classList.add("slide-left");
        else lightboxImg.classList.add("slide-right");

        setTimeout(() => {
            if (direction === "next") currentIndex = (currentIndex + 1) % allImages.length;
            else currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            updateImage();
            lightboxImg.classList.remove("slide-left", "slide-right");
        }, 300);

        resetHideControlsTimer();
    }

    function updateImage() {
        lightboxImg.src = allImages[currentIndex];
    }

    /** ---------- Controls ---------- */
    function hideControls() { controls.forEach(b => b.classList.add("hidden")); }
    function showControls() { controls.forEach(b => b.classList.remove("hidden")); }
    function resetHideControlsTimer() {
        showControls();
        clearTimeout(hideControlsTimer);
        hideControlsTimer = setTimeout(hideControls, 3000);
    }

    /** ---------- Zoom & Pan ---------- */
    function resetZoom() {
        isZoomed = false;
        isDragging = false;
        offsetX = 0; offsetY = 0; currentScale = 1;
        lightboxImg.classList.remove("zoomed");
        lightboxImg.style.transform = "";
    }

    function toggleZoom() {
        if (!isZoomed) {
            isZoomed = true;
            currentScale = 2;
            lightboxImg.classList.add("zoomed");
            applyTransform();
        } else {
            resetZoom();
        }
    }

    function applyTransform() {
        lightboxImg.style.transform = `scale(${currentScale}) translate(${offsetX}px, ${offsetY}px)`;
    }

    /** ---------- Desktop Drag ---------- */
    function startDrag(e) {
        if (!isZoomed) return;
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        lightboxImg.style.cursor = "grabbing";
    }

    function duringDrag(e) {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        applyTransform();
    }

    function endDrag() {
        if (isZoomed) lightboxImg.style.cursor = "grab";
        isDragging = false;
    }

    /** ---------- Touch (Mobile) ---------- */
    function getDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function handleTouchStart(e) {
        if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches);
            initialScale = currentScale;
        } else if (e.touches.length === 1 && isZoomed) {
            isDragging = true;
            startX = e.touches[0].clientX - offsetX;
            startY = e.touches[0].clientY - offsetY;
        }
    }

    function handleTouchMove(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const newDistance = getDistance(e.touches);
            currentScale = Math.min(Math.max((newDistance / initialDistance) * initialScale, 1), 3);
            isZoomed = currentScale > 1;
            applyTransform();
        } else if (e.touches.length === 1 && isDragging) {
            const t = e.touches[0];
            offsetX = t.clientX - startX;
            offsetY = t.clientY - startY;
            applyTransform();
        }
    }

    function handleTouchEnd(e) {
        if (e.touches.length < 2) isDragging = false;
    }

    /** ---------- Swipe ---------- */
    let touchStartX = 0, touchStartY = 0;
    function handleSwipeStart(e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }
    function handleSwipeEnd(e) {
        if (e.changedTouches.length === 1) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 50) changeImage("prev");
                if (dx < -50) changeImage("next");
            } else {
                if (dy > 50) close();
            }
        }
    }

    /** ---------- Init Event Listeners ---------- */
    function init() {
        // Buttons
        btnClose.addEventListener("click", close);
        btnNext.addEventListener("click", () => changeImage("next"));
        btnPrev.addEventListener("click", () => changeImage("prev"));

        // Auto-hide controls
        lightbox.addEventListener("mousemove", resetHideControlsTimer);
        lightbox.addEventListener("click", resetHideControlsTimer);
        lightbox.addEventListener("touchstart", resetHideControlsTimer);

        // Zoom
        lightboxImg.addEventListener("click", toggleZoom);

        // Drag desktop
        lightboxImg.addEventListener("mousedown", startDrag);
        window.addEventListener("mousemove", duringDrag);
        window.addEventListener("mouseup", endDrag);

        // Touch zoom + drag
        lightboxImg.addEventListener("touchstart", handleTouchStart, { passive: false });
        lightboxImg.addEventListener("touchmove", handleTouchMove, { passive: false });
        lightboxImg.addEventListener("touchend", handleTouchEnd);

        // Swipe
        lightbox.addEventListener("touchstart", handleSwipeStart);
        lightbox.addEventListener("touchend", handleSwipeEnd);

        // Keyboard
        document.addEventListener("keydown", e => {
            if (!lightbox.classList.contains("show")) return;
            if (e.key === "ArrowRight") changeImage("next");
            if (e.key === "ArrowLeft") changeImage("prev");
            if (e.key === "Escape") close();
        });

        // Close on background click
        lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
    }

    return { open, close, init };
})();
