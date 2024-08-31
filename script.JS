let startTime, updatedTime, difference, tInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 1000 / 60);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    difference = 0;
    lapCounter = 0;
    laps.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}
