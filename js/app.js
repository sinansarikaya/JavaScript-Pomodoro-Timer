const countdownEl = document.getElementById("countdown");
const actionEl = document.querySelector(".actionBtn");
const modeBtns = document.querySelector("#mode-btns");
const allModes = document.querySelectorAll("button[data-mode]");
const info = document.querySelector(".info");

const circle = document.getElementById("circle2");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const length = circle.getTotalLength();
circle.style.strokeDasharray = length;
circle.style.strokeDashoffset = length;
console.log(length);
const timeData = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  cycle: 1,
  mode: "pomodoro",
  status: false,
};
let interval;
let time = timeData.pomodoro * 60;

let count = time;

const timer = (t) => {
  const minutes = Math.floor(t / 60);
  let seconds = t % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  minute.innerHTML = minutes;
  second.innerHTML = seconds;
  if (t > 0 && timeData.status === true) {
    t--;
    circle.style.strokeDashoffset = length - (t / count) * length;
    time = t;
  }

  if (time === 0) {
    switch (timeData.mode) {
      case "pomodoro":
        if (timeData.cycle % 4 === 0) {
          timeData.mode = "long";
          changeMode("long");
        } else {
          timeData.mode = "short";

          changeMode("short");
        }
        break;
      case "short":
        timeData.mode = "pomodoro";
        changeMode("pomodoro");
        break;
      case "long":
        timeData.mode = "pomodoro";
        changeMode("pomodoro");
        break;
    }
  }
  return time;
};

const start = () => {
  interval = setInterval(() => timeData.status === true && timer(time), 1000);
};

const btnControl = () => {
  timeData.status = !timeData.status;

  if (actionEl.classList == "fa-solid actionBtn fa-play") {
    actionEl.classList.remove("fa-play");
    actionEl.classList.add("fa-pause");
    console.log(actionEl);
    start();
  } else {
    actionEl.classList.remove("fa-pause");
    actionEl.classList.add("fa-play");
    console.log(actionEl);
    clearInterval(interval);
  }
};

actionEl.addEventListener("click", btnControl);

modeBtns.addEventListener("click", (e) => {
  const mode = e.target.dataset.mode;

  changeMode(mode);
});

const changeMode = (m) => {
  allModes.forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${m}"]`).classList.add("active");

  if (m === "pomodoro") {
    timeData.cycle += 1;
    timeData.mode = "pomodoro";
    time = timeData.pomodoro * 60;
    minute.innerHTML = timeData.pomodoro;
    second.innerHTML = "00";
    info.innerHTML = `
      <span>You are now in pomodoro time </span>
      <i class="fa-solid fa-book"></i>`;
  } else if (m === "short") {
    timeData.mode = "short";
    time = timeData.shortBreak * 60;
    minute.innerHTML = timeData.shortBreak;
    second.innerHTML = "00";
    info.innerHTML = `
      <span>You are now in short break </span>
      <i class="fa-solid fa-bed"></i> `;
  } else if (m === "long") {
    timeData.mode = "long";
    time = timeData.longBreak * 60;
    minute.innerHTML = timeData.longBreak;
    second.innerHTML = "00";
    info.innerHTML = `
      <span>You are now in long break </span>
      <i class="fa-solid fa-bed"></i>`;
  }
  count = time;

  return time;
};
