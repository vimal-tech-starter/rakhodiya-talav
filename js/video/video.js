const accessToken = "7b42a1049b94172b6b9ebd46d2493118"; // 🔑 Add your Vimeo API token
const userId = "user247310431";           // 👤 Replace with your Vimeo user ID
const container = document.getElementById("video-gallery");

async function loadVideos() {
  try {
    const response = await fetch(`https://api.vimeo.com/users/${userId}/videos`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data = await response.json();

    data.data.forEach(video => {
      const videoId = video.uri.split("/").pop(); // extract ID
      const title = video.name;

      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card shadow">
          <div class="ratio ratio-16x9">
            <iframe src="https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0"
                    width="640" height="360"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen></iframe>
          </div>
          <div class="card-body">
            <!--<h5 class="card-title">${title}</h5>-->
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  } catch (err) {
    console.error("Error fetching videos:", err);
    container.innerHTML = `<p class="text-danger">⚠️ Failed to load videos.</p>`;
  }
}

loadVideos();
