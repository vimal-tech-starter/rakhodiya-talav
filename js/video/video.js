const accessToken = "fc4fd88fc9eaf8fcd1887b9be59ddf49"; // 🔑 Your Vimeo access token
const userId = "user247310431";                          // Your Vimeo user ID
const container = document.getElementById("video-gallery");

let currentPage = 1;
const perPage = 10;
let totalPages = Infinity;
let isLoading = false;
let observer = null;

async function loadVideos(page = 1) {
  if (isLoading) return;
  isLoading = true;
  console.log(`Loading page ${page}...`);

  try {
    const response = await fetch(
      `https://api.vimeo.com/users/${userId}/videos?page=${page}&per_page=${perPage}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!response.ok) {
      throw new Error(`Vimeo API error ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Append video reels
    data.data.forEach(video => {
      const videoId = video.uri.split("/").pop();
      const reel = document.createElement("div");
      reel.className = "ratio ratio-9x16 mb-4";

      reel.innerHTML = `
        <iframe
          src="https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&autoplay=0&muted=0"
          allow="autoplay; fullscreen; picture-in-picture"
          style="border:0;">
        </iframe>
      `;

      container.appendChild(reel);
    });

    // Update paging info
    if (typeof data.total === 'number') {
      totalPages = Math.ceil(data.total / perPage);
    } else if (data.paging && data.paging.last) {
      try {
        const lastPage = new URL(data.paging.last).searchParams.get('page');
        totalPages = lastPage ? parseInt(lastPage, 10) : totalPages;
      } catch (e) {
        console.warn('Could not parse paging.last:', e);
      }
    } else if (data.paging && data.paging.next == null) {
      totalPages = page;
    }

    // Ensure sentinel exists
    let sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'scroll-sentinel';
      sentinel.style.width = '100%';
      sentinel.style.height = '1px';
      sentinel.style.marginTop = '10px';
      container.appendChild(sentinel);
    } else {
      container.appendChild(sentinel);
    }

    if (!observer) {
      setupSentinelObserver();
    }

    console.log(`Page ${page} loaded. currentPage=${currentPage}, totalPages=${totalPages}`);
  } catch (err) {
    console.error('Error fetching videos:', err);
    container.insertAdjacentHTML('beforeend', `<p class="text-danger">⚠️ Failed to load videos: ${err.message}</p>`);
  } finally {
    isLoading = false;
  }
}

function setupSentinelObserver() {
  const sentinel = document.getElementById('scroll-sentinel');
  const options = {
    root: container,
    rootMargin: '400px 0px',
    threshold: 0.01
  };

  observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !isLoading && currentPage < totalPages) {
        currentPage++;
        await loadVideos(currentPage);
      }
    }
  }, options);

  observer.observe(sentinel);
}

// initial load
loadVideos(currentPage);