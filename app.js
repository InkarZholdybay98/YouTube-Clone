/**
 * !get htmls
 */
const videoCardContainer = document.querySelector(".video-container");
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const toggle = document.querySelector(".bi-list");
const sideBar = document.querySelector(".side-bar");

console.log(toggle);

/**
 * !api , links
 */

let api_key = "AIzaSyBYyyPDeXZB0wcexsgpzWVZhsn2xAc8wAg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let searchLink = "https://www.youtube.com/results?search_query=";

/**
 * !fetch
 */

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 54,
      regionCode: "US",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

/**
 * !GET CHANNEL ICON
 */

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;

      makeVideoCard(video_data);
    });
};
/**
 * !DISPLAY HTML
 */
const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
  <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
          <img src="${data.channelThumbnail}" class="channel-icon" alt="">
          <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
  `;
};

/**
 * !search
 */

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
    searchInput.value = "";
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    location.href = searchLink + searchInput.value;
    searchInput.value = "";
  }
});

/**
 * !toggle button
 */

toggle.addEventListener("click", () => {
  if (!sideBar.classList.contains("hidden")) {
    sideBar.classList.add("hidden");
  } else if (sideBar.classList.contains("hidden")) {
    sideBar.classList.remove("hidden");
  }
});
