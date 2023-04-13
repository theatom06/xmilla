import "./style.css";

console.log("Made by atom06")
console.log("sign: ", "0/7OKNVc0oQYtnq/J4n2ELJWM1v8oKqjEMgTIH5PlM2qGq1+6mp4hbGBc5bV8AEvapkvqrY9fRRHnG4aFPaP4XoATqewBDvGPNz1Te2yMrdOFrs41nklRZsgj4GP9AmgJnIITMnwSFuM0SAP9Rf8tsm3giLyGssnVBtyAot3hCoWfyyu1xlH0JO8/gj6yRrU0e670a7DJaxRH7TVXKUjLExVl+dZ5JhHs+u/pTgiPjsPTj0FP2i3FOrWhMFE2ugq4KD/H24ZHvFIYX5aOaOg+vwvNVUniRubGdG/VMnDY4esovyQXQQtIYSzgBJVZ2rGgxeWUyGmEm19V3JB/wzJ3A==")
console.log("https://gist.github.com/atom06/ddfc20476fdaa51d9b42913419021b88")

navigator.serviceWorker.register("/service-worker.js");

const heading = document.querySelector("h1");
const subtitle = document.querySelector("p");

let isRunning = false;
let stopwatch = 0;
let stopwatchInterval;

const isTouchDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isTouchDevice) {
  subtitle.innerText = "Press Start";
  heading.onclick = startStopwatch;
}

function convertTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

document.onkeydown = event => {
  if (event.key === " ") startStopwatch();

  console.log(event.key);
};

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatch++;
    heading.innerText = convertTime(stopwatch);
    heading.classList.remove("blink");
  }, 1000);

  isRunning = true;
  subtitle.innerText = "Press Space to Stop";

  document.onkeydown = event => {
    if (event.key === " " && isRunning) {
      clearInterval(stopwatchInterval);
      heading.classList.add("blink");
      subtitle.innerText = "The Stopwatch Stopped";
      isRunning = false;
      stopwatch = 0;
    } else startStopwatch();
  };

  if (isTouchDevice) {
    heading.onclick = () => {
      if (isRunning) {
        clearInterval(stopwatchInterval);
        heading.classList.add("blink");
        subtitle.innerText = "Press start";
        isRunning = false;
        stopwatch = 0;
      } else startStopwatch();
    };
  }
}

(() => {
  const gradients = [
    "#1849ff", "#006fff", "#008cff", "#00a5ff", "#36bbff",
    "#7b18ff", "#d700c8", "#fd008f", "#ff005e", "#ff3636",
    "#7fffd4", "#00e6f1", "#00c7ff", "#27a0ff", "#9370d8",
    "#8cff40", "#efce00", "#ff9948", "#ff7485", "#d870b0"
  ];

  const getRandomNumber = max => Math.floor(Math.random() * max);

  for (let i = 0; i < 6; i++) {
    const blob = document.createElement("div");
    blob.id = "blob";
    blob.style.backgroundColor = gradients[getRandomNumber(gradients.length)];

    document.body.append(blob);

    const screenWidth = window.innerWidth - 100;
    const screenHeight = window.innerHeight - 100;

    setInterval(() => {
      blob.animate({
        left: `${getRandomNumber(screenWidth)}px`,
        top: `${getRandomNumber(screenHeight)}px`
      }, {
        duration: 1400,
        fill: "forwards"
      });
    }, 1300);
  }
})();