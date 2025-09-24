(async () => {
    const repoOwner = "vimal-tech-starter";
    const repoName = "ganesha-images-2025";
    const folderPath = "images";
    const branch = "main";

    const folderImages = await App.API.fetchImagesRecursively(repoOwner, repoName, folderPath, branch);
    App.Gallery.buildGallery(folderImages);
    App.Gallery.initToggle();
    App.DarkMode.init();
    App.Lightbox.init(); // ✅ initialize here
})();
