let timer;
let startTime;
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        toggleButtons(true);
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    toggleButtons(false);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    toggleButtons(false);
    displayTime(0);
    document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
    const lapTime = calculateElapsedTime();
    const lapList = document.getElementById('lapList');
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}

function updateDisplay() {
    const elapsedTime = calculateElapsedTime();
    displayTime(elapsedTime);
}

function displayTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsDisplay = milliseconds % 1000;
    
    document.getElementById('display-minutes').textContent = padZero(minutes);
    document.getElementById('display-seconds').textContent = padZero(seconds);
    document.getElementById('display-milliseconds').textContent = padZero(millisecondsDisplay);
}

function calculateElapsedTime() {
    const currentTime = Date.now();
    const elapsedTime = isRunning ? currentTime - startTime : 0;
    return elapsedTime;
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsDisplay = milliseconds % 1000;
    return `${padZero(minutes)}:${padZero(seconds)}.${padZero(millisecondsDisplay)}`;
}

function padZero(value) {
    return value.toString().padStart(2, '0');
}

function toggleButtons(isRunning) {
    document.getElementById('startBtn').disabled = isRunning;
    document.getElementById('pauseBtn').disabled = !isRunning;
    document.getElementById('resetBtn').disabled = isRunning;
    document.getElementById('lapBtn').disabled = !isRunning;
}
