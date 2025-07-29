console.log("JavaScript File is linked");

// variables
const audioItems = document.querySelectorAll(".audio-item");
const targetZones = document.querySelectorAll(".target-zone");
const audioBox = document.querySelector("#audio-box");
const resetBtn = document.querySelector("#resetButton");
const playBtn = document.querySelector("#playButton");
const pauseBtn = document.querySelector("#pauseButton");
const volumeControl = document.querySelector("#volumeControl");
let currentDraggedElement = null;

// functions

function dragStart() {
    console.log("Drag Start Called");
    currentDraggedElement = this;
    console.log(currentDraggedElement);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (this.children.length > 0) return;
    this.appendChild(currentDraggedElement);
    restartAllAudioInZones(); 
    currentDraggedElement = null;
}

function restartAllAudioInZones() {
    targetZones.forEach(zone => {
        const audioItem = zone.querySelector(".audio-item");
        if (audioItem) {
            const audio = audioItem.querySelector("audio");
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = volumeControl.value / 100;
                audio.play();
            }
        }
    });
}

function resetTheMixer() {
    audioItems.forEach(item => {
        const audio = item.querySelector("audio");
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        audioBox.appendChild(item);
    });
}

function playAllAudioInZones() {
    targetZones.forEach(zone => {
        const audioItem = zone.querySelector(".audio-item");
        if (audioItem) {
            const audio = audioItem.querySelector("audio");
            if (audio) {
                audio.volume = volumeControl.value / 100;
                audio.currentTime = 0;
                audio.play();
            }
        }
    });
}

function pauseAllAudioInZones() {
    targetZones.forEach(zone => {
        const audioItem = zone.querySelector(".audio-item");
        if (audioItem) {
            const audio = audioItem.querySelector("audio");
            if (audio) {
                audio.pause();
            }
        }
    });
}

function updateVolumeForAll() {
    const volume = volumeControl.value / 100;
    targetZones.forEach(zone => {
        const audioItem = zone.querySelector(".audio-item");
        if (audioItem) {
            const audio = audioItem.querySelector("audio");
            if (audio) {
                audio.volume = volume;
            }
        }
    });
}

// Event Listeners

audioItems.forEach(item => {
    item.addEventListener("dragstart", dragStart);
});

targetZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
});

resetBtn.addEventListener("click", resetTheMixer);
playBtn.addEventListener("click", playAllAudioInZones);
pauseBtn.addEventListener("click", pauseAllAudioInZones);
volumeControl.addEventListener("input", updateVolumeForAll);