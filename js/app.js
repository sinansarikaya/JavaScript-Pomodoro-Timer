const countdownEl = document.getElementById("countdown");
const actionEl = document.querySelector(".actionBtn");
const modeBtns = document.querySelector("#mode-btns");
// const modeBtns = document.querySelectorAll(".test");

const timeData = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  status: false,
};

let time = timeData.shortBreak * 60;

const timer = (t) => {
  const minutes = Math.floor(t / 60);
  let seconds = t % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;
  if (t > 0 && timeData.status === true) {
    t--;
    time = t;
  }
  return time;
};

actionEl.addEventListener("click", () => {
  timeData.status = !timeData.status;
  actionEl.value = actionEl.value == "Start" ? "Stop" : "Start";
});
modeBtns.addEventListener("click", (e) => {
  const mode = e.target.dataset.mode;
  if (mode === "pomodoro") {
    time = timeData.pomodoro * 60;
    checkTime(setTime);
  } else if (mode === "short") {
    time = timeData.shortBreak * 60;
    checkTime(setTime);
  } else if (mode === "long") {
    time = timeData.longBreak * 60;
  }
  return time;
});

setInterval(() => timer(time), 1000);
