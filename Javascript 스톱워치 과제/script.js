let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const timeWrapper = document.querySelector(".timeWrapper");
const recordWrapper = document.querySelector(".recordWrapper");
const recordTopCheckIcon = document.querySelector(
  ".recordTop > span:nth-child(1) img"
);

const formatTime = (time) => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);

  return `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
    2,
    "0"
  )}`;
};

const updateDisplay = () => {
  timeWrapper.textContent = formatTime(elapsedTime);
};

const startTimer = () => {
  if (isRunning) return;
  isRunning = true;
  const startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
  addRecord();
};

const resetTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
};

const addRecord = () => {
  const record = document.createElement("div");
  record.className = "recordItem";
  record.innerHTML = `
    <span><img src="./free-icon-circle-3962612.png" class="circle-icon" /></span>
    <span>${formatTime(elapsedTime)}</span>
  `;
  record.style.display = "flex";
  record.style.alignItems = "center";
  record.style.width = "100%";
  record.style.fontSize = "1.6rem";
  record.style.padding = "5px";
  record.style.marginLeft = "9.1rem";

  recordWrapper.appendChild(record);

  const circleIcon = record.querySelector(".circle-icon");
  circleIcon.addEventListener("click", () => {
    if (circleIcon.src.includes("free-icon-circle-3962612.png")) {
      circleIcon.src = "./free-icon-check-mark-66936.png";
      record.classList.add("checked");
    } else {
      circleIcon.src = "./free-icon-circle-3962612.png";
      record.classList.remove("checked");
    }
  });
  recordTopCheckIcon.src = "./free-icon-circle-3962612.png";
};

const deleteSelectedRecords = () => {
  const checkedRecords = document.querySelectorAll(".recordItem.checked");
  checkedRecords.forEach((record) => record.remove());
};

const deleteAllRecords = () => {
  const records = document.querySelectorAll(".recordItem");
  records.forEach((record) => record.remove());
};

const toggleSelectAll = () => {
  const records = document.querySelectorAll(".recordItem");
  const allChecked = Array.from(records).every((record) =>
    record.classList.contains("checked")
  );
  records.forEach((record) => {
    const circleIcon = record.querySelector(".circle-icon");
    if (!allChecked) {
      circleIcon.src = "./free-icon-check-mark-66936.png";
      record.classList.add("checked");
    } else {
      circleIcon.src = "./free-icon-circle-3962612.png";
      record.classList.remove("checked");
    }
  });

  if (allChecked) {
    recordTopCheckIcon.src = "./free-icon-circle-3962612.png";
  } else {
    recordTopCheckIcon.src = "./free-icon-check-mark-66936.png";
  }
};

recordTopCheckIcon.addEventListener("click", () => {
  toggleSelectAll();

  if (recordTopCheckIcon.src.includes("free-icon-circle-3962612.png")) {
    recordTopCheckIcon.src = "./free-icon-check-mark-66936.png";
  } else {
    recordTopCheckIcon.src = "./free-icon-circle-3962612.png";
  }
});

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

document
  .querySelector(".recordTop > span:nth-child(3) img")
  .addEventListener("click", deleteSelectedRecords);

timeWrapper.addEventListener("dblclick", addRecord);
