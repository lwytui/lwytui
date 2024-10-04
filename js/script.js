// Function to get URL parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to load YouTube video
function loadVideo(videoId) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

// Fetch video details using YouTube Data API
async function fetchVideoDetails(videoId) {
    const apiKey = 'AIzaSyA7UD0jHGEa49d-y_3C2vyIRbeXe1629Mw';
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const video = data.items[0].snippet;
            document.getElementById('video-title').innerText = video.title;
            document.getElementById('video-author').innerText = `By ${video.channelTitle}`;
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

// Main logic
const videoId = getQueryParam('id');
if (videoId) {
    loadVideo(videoId);
    fetchVideoDetails(videoId);
} else {
    // Redirect to the main page if no video ID is present
    window.location.href = '/'; 
}

