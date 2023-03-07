import "./style.css"

navigator.serviceWorker.register("/service-worker.js")

let h1 = document.querySelector("h1");
let subtitle = document.querySelector("p");

let isRunning = false;
let stopwatch = 0;

const isTouchDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);;

if (isTouchDevice) {
  subtitle.innerText = "Press Start"
  h1.onclick = startWatch
}

function convertSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${hours}h ${minutes}m ${seconds}s`
}

function startWatch() {
  if (!isRunning) {
    const watch = setInterval(() => {
      stopwatch++;
      h1.innerText = convertSeconds(stopwatch);
    }, 1000);

    isRunning = true;
    subtitle.innerText = "Press again to stop";

    document.onkeydown = (event) => {
      if (event.key === " " && isRunning) {
        clearInterval(watch);
        h1.classList.add("blink");
        subtitle.innerText = "The Stopwatch Stopped"
      }
    };

    if (isTouchDevice) {
      h1.onclick = () => {
        if (isRunning) {
          clearInterval(watch);
          h1.classList.add("blink");
          subtitle.innerText = "To start again reload"
        }
      }
    }

  }
}

document.onkeydown = event => {
  if (event.key === " ") startWatch()

  if (event.key === "r") document.location.reload()
};

function makeBlob() {

  const gradients = [
    "#1849ff", "#006fff", "#008cff", "#00a5ff", "#36bbff",
    "#7b18ff", "#d700c8", "#fd008f", "#ff005e", "#ff3636",
    "#7fffd4", "#00e6f1", "#00c7ff", "#27a0ff", "#9370d8",
    "#8cff40", "#efce00", "#ff9948", "#ff7485", "#d870b0"
  ]

  var r = (max) => Math.floor(Math.random() * max)

  var blob = document.createElement("div");
  blob.id = "blob";
  blob.style.backgroundColor = gradients[r(gradients.length)];

  document.body.append(blob)

  const screenWidth = window.innerWidth - 100;
  const screenHeight = window.innerHeight - 100;

  setInterval(() => {
    blob.animate({
      left: `${Math.floor(Math.random() * screenWidth)}px`,
      top: `${Math.floor(Math.random() * screenHeight)}px`
    }, {
      duration: 1500,
      fill: "forwards"
    });
  }, 1500);
}

makeBlob()
makeBlob()
makeBlob()
makeBlob()
makeBlob()
makeBlob()