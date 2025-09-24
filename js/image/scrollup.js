// App.ScrollUp - scroll to top button
window.App = window.App || {};
App.ScrollUp = (() => {
    function init() {
        const scrollBtn = document.createElement("button");
        scrollBtn.id = "scrollTopBtn";
        scrollBtn.innerHTML = "⬆️";
        document.body.appendChild(scrollBtn);

        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) scrollBtn.classList.add("show");
            else scrollBtn.classList.remove("show");
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    return { init };
})();
document.addEventListener("DOMContentLoaded", App.ScrollUp.init);
