const displayClock = document.getElementById("displayClock");
const btns = document.querySelectorAll(".btn");

//initialize values
let startTime = 0;
let elapseTime = 0;
let intervalId;
let [hrs, mins, secs] = [0, 0, 0];

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetBtn = e.currentTarget.dataset.id;
    if (targetBtn === "Start") {
      startTime = Date.now() - elapseTime;
      intervalId = setInterval(updateTime, 100);
    } else if (targetBtn === "Pause") {
      elapseTime = Date.now() - startTime;
      clearInterval(intervalId);
    } else {
      [hrs, mins, secs, elapseTime, startTime] = [0, 0, 0, 0, 0];
      clearInterval(intervalId);
      displayClock.innerText = "00:00:00";
    }
  });
});
//updateTime function
function updateTime() {
  elapseTime = Date.now() - startTime;
  secs = Math.floor((elapseTime / 1000) % 60);
  mins = Math.floor((elapseTime / 1000 / 60) % 60);
  hrs = Math.floor(elapseTime / 1000 / 60 / 60);

  [hrs, mins, secs] = [hrs, mins, secs].map(formatTime);

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }
  displayClock.innerHTML = `${hrs}:${mins}:${secs}`;
}

console.log(new Date().getTime());
console.log(Date.now());

//method1
//const displayClock = document.getElementById("displayClock");
// const startBtn = document.getElementById("startBtn");
// const pauseBtn = document.getElementById("pauseBtn");
// const resetBtn = document.getElementById("resetBtn");
// //initialize values
// let startTime = 0;
// let elapseTime = 0;
// let intervalId;
// let [hrs, mins, secs] = [0, 0, 0];

// //addEventListener to the variable
// startBtn.addEventListener("click", () => {
//   startTime = Date.now() - elapseTime;
//   intervalId = setInterval(updateTime, 100);
// });

// pauseBtn.addEventListener("click", () => {
//   elapseTime = Date.now() - startTime;
//   clearInterval(intervalId);
// });

// resetBtn.addEventListener("click", () => {
//   [hrs, mins, secs, elapseTime, startTime] = [0, 0, 0, 0, 0];
//   clearInterval(intervalId);
//   displayClock.innerText = "00:00:00";
// });

// //updateTime function
// function updateTime() {
//   elapseTime = Date.now() - startTime;
//   secs = Math.floor((elapseTime / 1000) % 60);
//   mins = Math.floor((elapseTime / (1000 * 60)) % 60);
//   hrs = Math.floor(elapseTime / (1000 * 3600));

//   [hrs, mins, secs] = [hrs, mins, secs].map(formatTime);

//   function formatTime(time) {
//     return time < 10 ? "0" + time : time;
//   }
//   displayClock.innerHTML = `${hrs}:${mins}:${secs}`;
// }
