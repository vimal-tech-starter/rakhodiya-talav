const repoOwner = "vimal-tech-starter"; // GitHub username
const repoName = "ganesha-images-2025";      // Repository
const folderPath = "images";        // Start folder
const branch = "main";        // Branch

(async () => {
    const folderImages = await fetchImagesRecursively(repoOwner, repoName, folderPath, branch);
    buildGallery(folderImages);
})();
