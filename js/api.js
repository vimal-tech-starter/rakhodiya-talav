
// Fetch from GitHub recursively
async function fetchFolder(owner, repo, path = "", branch = "main") {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url);
  return await res.json();
}

async function fetchImagesRecursively(owner, repo, path = "", branch = "main") {
  const items = await fetchFolder(owner, repo, path, branch);
  let folders = {};

  for (const item of items) {
    if (item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
      const folder = path || "root";
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(item.download_url);
    } else if (item.type === "dir") {
      const subfolderImages = await fetchImagesRecursively(owner, repo, item.path, branch);
      folders = { ...folders, ...subfolderImages };
    }
  }
  return folders;
}
