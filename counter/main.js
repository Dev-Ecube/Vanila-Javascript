//set initial count
/* 
let count = 0;

//select value and button
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const styles = evt.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }
    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = " hsl(209, 61%, 16%)";
    }
    value.innerHTML = count;
  });
}); */
const value = document.querySelector("#value");
const increaseBtn = document.querySelector("#increase");
const resetBtn = document.querySelector("#reset");
const decreaseBtn = document.querySelector("#decrease");

let count = 0;
let intervalId;

increaseBtn.addEventListener("click", () => {
  intervalId = setInterval(function () {
    count++;
    value.style.color = "green";
    value.textContent = count;
  }, 1000);
});

decreaseBtn.addEventListener("click", () => {
  intervalId = setInterval(() => {
    count--;
    value.style.color = "red";
    value.textContent = count;
  }, 1000);
});
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  count = 0;
  value.style.color = "black";
  value.textContent = count;
});
