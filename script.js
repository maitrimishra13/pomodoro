function toggleDropdown() {
  const content = document.getElementById("dropdownContent");
  const arrow = document.getElementById("arrow");
  content.classList.toggle("open");
  arrow.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#dropdownContent img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      document.body.style.backgroundImage = `url('${img.src}')`;
      document.getElementById("dropdownContent").classList.remove("open");
      document.getElementById("arrow").classList.remove("open");
    });
  });

  resetTimer();
});







const timerDisplay = document.getElementById("timerDisplay");
const sessionLabel = document.getElementById("sessionLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const studyInput = document.getElementById("studyInput");
const restInput = document.getElementById("restInput");

let studyDuration = 0;
let restDuration = 0;
let remainingTime = 0;
let timerInterval = null;
isStudySession = true;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
  sessionLabel.textContent = isStudySession ? "Study Time 📘" : "Rest Time ☕";
}

function switchSession() {
  isStudySession = !isStudySession;
  remainingTime = isStudySession ? studyDuration : restDuration;
  updateDisplay();
  alert(isStudySession ? "Time to study! 📘" : "Take a break! ☕");
}

function startTimer() {
  const studyVal = parseInt(studyInput.value);
  const restVal = parseInt(restInput.value);

  if (isNaN(studyVal) || studyVal <= 0 || isNaN(restVal) || restVal <= 0) {
    alert("Please enter valid positive values.");
    return;
  }

  studyDuration = studyVal * 60;
  restDuration = restVal * 60;

  if (!timerInterval && remainingTime <= 0) {
    remainingTime = isStudySession ? studyDuration : restDuration;
    updateDisplay();
  }

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  studyInput.disabled = true;
  restInput.disabled = true;

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      switchSession();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  pauseTimer();
  isStudySession = true;
  const studyVal = parseInt(studyInput.value) || 25;
  const restVal = parseInt(restInput.value) || 5;
  studyDuration = studyVal * 60;
  restDuration = restVal * 60;
  remainingTime = studyDuration;
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  studyInput.disabled = false;
  restInput.disabled = false;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);







updateDisplay();

const musicSelect = document.getElementById('musicSelect');
const audioPlayer = document.getElementById('audioPlayer');

musicSelect.addEventListener('change', () => {
  audioPlayer.src = musicSelect.value;
  audioPlayer.play();
});