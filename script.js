const API_KEY = 'C1a77iU5ZWsKK65e5q7BBJoBk0C1HrsmD1TsIJtJIRqv7oa3dXZ14C4m'; 
const baseURL = 'https://api.pexels.com/v1/videos/search';
const videoElements = document.querySelectorAll('.video-item source'); // Select all video source elements
let currentPage = 1;

document.getElementById('submitButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('userInput').value.trim();
    const URL = `${baseURL}?query=${encodeURIComponent(searchTerm)}&page=${currentPage}&per_page=10`;

    try {
        const response = await fetch(URL, {
            headers: { Authorization: API_KEY }
        });
        
        const data = await response.json();
        const videos = data.videos || [];

        // Update all video source elements with the videos
        videos.forEach((video, index) => {
            if (index < videoElements.length) {
                videoElements[index].src = video.video_files[0].link;
                videoElements[index].parentElement.load(); // Refresh the video element to apply the new source
            }
        });

        // No code to clear remaining videos if fewer than 5 videos

        // Increment the page number for the next request
        currentPage++;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
});
