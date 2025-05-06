const container = document.querySelector(".container");
const albumImage = document.querySelector(".album-image");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const audioSource = document.querySelector("#song");
const songInfo = document.querySelector(".song-info");
const btnPlayPause = document.querySelector(".btn-play-pause");
const btnPrev = document.querySelector(".btn-previous");
const btnNext = document.querySelector(".btn-next");
const btnLoop = document.querySelector(".btn-loop");
const btnShuffle = document.querySelector(".btn-shuffle");
const btnLike = document.querySelector(".btn-like");
const progressContainer = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const currentYear = document.querySelector("#year");

let songIndex = 0;
let hasLiked = false;
let isLooping = false;
let isShuffling = false;
let currentVolume = volumeBar.value;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

function loadSong(songs) {
  songName.innerText = musicPlayer[songs].songName;
  artistName.innerText = musicPlayer[songs].artistName;
  albumImage.src = `assets/images/album/${musicPlayer[songs].img}.jpg`;
  audioSource.src = `assets/songs/${musicPlayer[songs].src}.mp3`;
}

function playSong() {
  container.classList.add("play");
  btnPlayPause.querySelector("i.fas").classList.remove("fa-play");
  btnPlayPause.querySelector("i.fas").classList.add("fa-pause");
  audioSource.play();
  tuneVolume();
}

function pauseSong() {
  container.classList.remove("play");
  btnPlayPause.querySelector("i.fas").classList.remove("fa-pause");
  btnPlayPause.querySelector("i.fas").classList.add("fa-play");
  audioSource.pause();
}

function prevSong() {
  if (isShuffling === true) {
    shuffleSong();
    playSong();
  } else if (isLooping === true) {
    repeatSong();
    playSong();
  } else {
    songIndex--;
    songIndex < 0 ? (songIndex = 0) : (songIndex = songIndex);
    loadSong(songIndex);
    playSong();
  }
}

function nextSong() {
  if (isShuffling === true) {
    shuffleSong();
    playSong();
  } else if (isLooping === true) {
    repeatSong();
    playSong();
  } else {
    songIndex++;
    songIndex > musicPlayer.length - 1 ? (songIndex = 0) : (songIndex = songIndex);
    loadSong(songIndex);
    playSong();
  }
}

function shuffleSong() {
  let randSong = Math.floor(Math.random() * musicPlayer.length + 1);
  songIndex = randSong;
  loadSong(songIndex);
}

function repeatSong() {
  let currentTrack = songIndex;
  loadSong(currentTrack);
}

function updateProgressBar(evt) {
  const currentTime = evt.target.currentTime;
  const duration = evt.target.duration;
  let currentProgress = (currentTime / duration) * 100;
  progressBar.style.width = `${currentProgress}%`;

  let currentPlaying = document.querySelector(".current-time");
  let totalDuration = document.querySelector(".total-duration");

  audioSource.addEventListener("loadeddata", () => {
    // Duration
    let audioDuration = audioSource.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    totalDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // Current Time
  let audioPlaying = audioSource.currentTime;
  let currentMin = Math.floor(audioPlaying / 60);
  let currentSec = Math.floor(audioPlaying % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  currentPlaying.innerText = `${currentMin}:${currentSec}`;
}

function setProgressBar(evt) {
  const width = this.clientWidth;
  const clickX = evt.offsetX;
  const duration = audioSource.duration;

  audioSource.currentTime = (clickX / width) * duration;
}

function tuneVolume() {
  audioSource.volume = volumeBar.value;
  currentVolume = volumeBar.value;
}

function likedSong() {
  btnLike.classList.add("active");
  hasLiked = true;
  modalPopUp();
}

function unLikedSong() {
  btnLike.classList.remove("active");
  hasLiked = false;
  modalPopUp();
}

function modalPopUp() {
  if (hasLiked === true) {
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalContent.innerText = `Added to Liked Songs.`;
  } else {
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalContent.innerText = `Removed from Liked Songs.`;
  }

  setTimeout(() => {
    modal.style.opacity = 0;
  }, 2000);
}

btnPlayPause.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);

btnLoop.addEventListener("click", () => {
  if (!btnLoop.classList.contains("active")) {
    btnLoop.classList.add("active");
    isLooping = true;
  } else {
    btnLoop.classList.remove("active");
    isLooping = false;
  }
});

btnShuffle.addEventListener("click", () => {
  if (!btnShuffle.classList.contains("active")) {
    btnShuffle.classList.add("active");
    isShuffling = true;
  } else {
    btnShuffle.classList.remove("active");
    isShuffling = false;
  }
});

audioSource.addEventListener("timeupdate", updateProgressBar);
audioSource.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgressBar);

btnLike.addEventListener("click", () => {
  const hasLiked = !btnLike.classList.contains("active");
  hasLiked ? likedSong() : unLikedSong();
});

volumeBar.addEventListener('input', tuneVolume);

//current year
currentYear.innerText = new Date().getFullYear();
