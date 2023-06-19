//variables
const timeDom = document.querySelector(".time");
const dateDom = document.querySelector(".date");
// const dateNow = new Date();

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

//update date
function updateDate() {
  const dateNow = new Date();

  let date = dateNow.getDate();
  let day = days[dateNow.getDay()];
  let month = months[dateNow.getMonth()];
  let year = dateNow.getFullYear();
  date <= 10 ? "0" + date : date;

  if (date === 1 || date === 21 || date === 31) {
    date = date + "st";
  } else if (date === 2 || date === 22) {
    date = date + "nd";
  } else if (date === 3 || date === 23) {
    date = date + "rd";
  } else {
    date = date + "th";
  }

  dateDom.innerHTML = `${day} ${date} ${month}, ${year}`;
}
updateDate();

function updateTime() {
  const dateNow = new Date();

  let hrs = dateNow.getHours();
  let mins = dateNow.getMinutes();
  let secs = dateNow.getSeconds();
  const amOrPm = hrs >= 12 ? "pm" : "am";

  hrs = hrs % 12 || 12;

  [hrs, mins, secs] = [hrs, mins, secs].map(formatTime);

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  timeDom.innerHTML = `${hrs}:${mins}:${secs}${amOrPm}`;
}

updateTime();
updateDate();

setInterval(updateTime, 1000);
setInterval(updateDate, 1000);
