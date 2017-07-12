// addEventlistener to video elements
window.addEventListener('load', function() {
    video = document.getElementById('video');
    screenButton = document.getElementById('screenPlayIcon');
    screenReplayButton = document.getElementById('screenReplayIcon');
    progressBarContainer = document.getElementById('progressBarContainer');
    progressBar = document.getElementById('progressBar')
    playButton = document.getElementById('playButton');

    timeField = document.getElementById('timeField');
    soundButton = document.getElementById('soundButton');
    soundBarContainer = document.getElementById('soundBarContainer');
    soundBar = document.getElementById('soundbar');
    fullScreenButton = document.getElementById('fullScreenButton');



    // make sure video is loaded before we can click play/pause controls
    video.load();
    video.addEventListener('canplay', function() {
        playButton.addEventListener('click', playOrPause, false);
        progressBarContainer.addEventListener('click', skip, false);
        updatePlayer();
        soundButton.addEventListener('click', muteOrUnmute, false);
        soundBarContainer.addEventListener('click', changeVolume, false);
        fullScreenButton.addEventListener('click', fullscreen, false);
        screenButton.addEventListener('click', playOrPause, false);
        screenReplayButton.addEventListener('click', playOrPause, false);
    }, false);
}, false);

// add and remove play/pause buttons
function playOrPause() {
    if (video.paused) {
        video.play();
        document.getElementById("pauseIcon").style.display = "block";
        document.getElementById("playIcon").style.display = "none";
        document.getElementById("replayIcon").style.display = "none";
        update = setInterval(updatePlayer, 30);
        document.getElementById("screen").style.display = "none";
        document.getElementById("screenReplayIcon").style.display = "none";
        document.getElementById("screenPlayIcon").style.display = "block";


    } else {
        video.pause();
        document.getElementById("pauseIcon").style.display = "none";
        document.getElementById("playIcon").style.display = "block";
        document.getElementById("replayIcon").style.display = "none";
        window.clearInterval(update);
        document.getElementById("screen").style.display = "block";
        document.getElementById("screenReplayIcon").style.display = "none";
        document.getElementById("screenPlayIcon").style.display = "block";

    }
}

// progress bar interactivity
function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime();
    if (video.ended) {
        window.clearInterval(update);
        document.getElementById("replayIcon").style.display = "block";
        document.getElementById("pauseIcon").style.display = "none";
        document.getElementById("playIcon").style.display = "none";
        document.getElementById("screen").style.display = "block";
        document.getElementById("screenPlayIcon").style.display = "none";
        document.getElementById("screenReplayIcon").style.display = "block";
    } else if (video.paused) {
        document.getElementById("screenPlayIcon").style.display = "block";
        document.getElementById("screenReplayIcon").style.display = "none";
    }

}

// skip to certain section of video in progress bar and time counter
function skip(ev) {
    var mouseX = ev.pageX - progressBarContainer.offsetLeft;
    var width = window.getComputedStyle(progressBarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));
    video.currentTime = (mouseX / width) * video.duration;
    updatePlayer();

}

function getFormattedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);
    if (minutes > 0) seconds -= minutes * 60;
    if (seconds.toString().length === 1) seconds = '0' + seconds;

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;
    if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;


    return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    if (!video.muted) {
        video.muted = true;
        document.getElementById("muteIcon").style.display = "block";
        document.getElementById("volumeIcon").style.display = "none";
        document.getElementById("soundBar").style.display = 'none';
    } else {
        video.muted = false;
        document.getElementById("muteIcon").style.display = "none";
        document.getElementById("volumeIcon").style.display = "block";
        document.getElementById("soundBar").style.display = 'block';
    }
}

function changeVolume(ev) {
    var mouseX = ev.pageX - soundBarContainer.offsetLeft;
    var width = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));

    video.volume = (mouseX / width);
    document.getElementById("soundBar").style.width = (mouseX / width) * 100 + '%';
    video.muted = false;
    document.getElementById("muteIcon").style.display = "none";
    document.getElementById("volumeIcon").style.display = "block";
    document.getElementById("soundBar").style.display = 'block';
}

function fullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();

    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.mozRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.msRequestFullscreen();
    }
}