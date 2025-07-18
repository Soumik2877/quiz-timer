const timerEl = document.getElementById("timer");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const circle = document.querySelector(".progress-ring-circle");
const container = document.querySelector(".circle-container");
const tickingSound = new Audio('ticking.mp3');
const alarmSound = new Audio('buzz.mp3');

let totalTime = 30 * 60; // 30 mins in seconds
let timeLeft = totalTime;
let timerInterval = null;
let isPaused = false;

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer() {
  if (!isPaused) {
    timeLeft--;

    if (timeLeft === 300) {
        tickingSound.play();
      }

    if (timeLeft <= 300) {
      container.classList.add("warning");
      
    }

    if(timeLeft <= 0.8){
        tickingSound.pause(); // Stop ticking
      tickingSound.currentTime = 0;

      alarmSound.play();    // Play final alert
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "Time's Up!";
      setProgress(100);

      

      return;
    }

    timerEl.textContent = formatTime(timeLeft);
    const percentElapsed = ((totalTime - timeLeft) / totalTime) * 100;
    setProgress(percentElapsed);
  }
}

function startTimer() {
  timerEl.textContent = formatTime(timeLeft);
  setProgress(0);
  timerInterval = setInterval(updateTimer, 1000);
}

pauseBtn.onclick = () => {
  isPaused = true;
};

resumeBtn.onclick = () => {
  isPaused = false;
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  timeLeft = totalTime;
  isPaused = true;
  timerEl.textContent = formatTime(timeLeft);
  setProgress(0);
  container.classList.remove("warning");
  startTimer();
};

startTimer(); // initial start
