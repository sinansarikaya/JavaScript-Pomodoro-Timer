const timeData = {
  pomodoro: 25,
  shortBreak: 1,
  longBreak: 15,
  status: false,
};

let time = timeData.shortBreak * 60;

const countdownEl = document.getElementById("countdown");
const actionEl = document.querySelector(".actionBtn");

const timer = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;
  if (time > 0 && timeData.status === true) {
    time--;
    time = time;
  }
  return time;
};

actionEl.addEventListener("click", () => {
  timeData.status = !timeData.status;
  actionEl.value = actionEl.value == "Start" ? "Stop" : "Start";
});

setInterval(timer, 1000);
