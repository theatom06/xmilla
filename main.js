import "./style.css";

navigator.serviceWorker.register("/service-worker.js");

const heading = document.querySelector("h1");

setInterval(() => {
  const time = new Date()

  heading.innerText = time.getHours().toString().padStart(2, "0") + ":" +  time.getMinutes().toString().padStart(2, "0") + ":" + time.getSeconds().toString().padStart(2, "0")
}, 1000);

(() => {
  const gradients = [
     // Blue shades
    "#1849ff", "#006fff", "#008cff", "#00a5ff", "#36bbff",
    "#7b18ff", "#7fffd4", "#00e6f1","#00c7ff", "#27a0ff",
    "#40e0d0", "#0041ff",

    // Red shades
    "#fd008f", "#ff005e", "#ff3636", "#ff00f7", "#ff00ff",
    "#ff0080", "#ff6347",

    //Yellow shades
    "#ffff00",
    "#F8FF00",

    // Green shades
    "#00ff00",
    "#00cba6",
    "#14d692"
  ];

  const getRandomNumber = max => Math.floor(Math.random() * max);

  for (let i = 0; i < 50; i++) {
    const blob = document.createElement("div");
    blob.id = "blob";
    blob.style.backgroundColor = gradients[getRandomNumber(gradients.length)];

    document.body.append(blob);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    setInterval(() => {
      blob.animate({
        left: `${getRandomNumber(screenWidth)}px`,
        top: `${getRandomNumber(screenHeight)}px`
      }, {
        duration: 5000,
        fill: "forwards"
      });
    }, 4000);
  }
})();