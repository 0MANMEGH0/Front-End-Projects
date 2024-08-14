const photos = [
  "🐶",
  "🐶",
  "🐼",
  "🐼",
  "🐰",
  "🐰",
  "🐻",
  "🐻",
  "🦁",
  "🦁",
  "🐵",
  "🐵",
  "🐷",
  "🐷",
  "🐮",
  "🐮",
  "🐺",
  "🐺",
  "🦊",
  "🦊",
  "🦝",
  "🦝",
  "🐹",
  "🐹",
];

let shuf_photos = photos.sort(() => (Math.random() > 0.5 ? 1 : -1));
let time = 0;
let timerInterval;
var audio1 = new Audio("click.mp3");
var audio2 = new Audio("win.mp3");

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

for (let i = 0; i < photos.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuf_photos[i];

  box.onclick = function () {
    audio1.play();
    if (document.querySelectorAll(".boxOpen").length < 2) {
      this.classList.add("boxOpen");

      if (document.querySelectorAll(".boxOpen").length === 1 && time === 0) {
        startTimer();
      }

      setTimeout(function () {
        if (document.querySelectorAll(".boxOpen").length > 1) {
          if (
            document.querySelectorAll(".boxOpen")[0].innerHTML ==
            document.querySelectorAll(".boxOpen")[1].innerHTML
          ) {
            document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch");
            document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch");

            document
              .querySelectorAll(".boxOpen")[1]
              .classList.remove("boxOpen");
            document
              .querySelectorAll(".boxOpen")[0]
              .classList.remove("boxOpen");

            if (
              document.querySelectorAll(".boxMatch").length == photos.length
            ) {
              stopTimer();
              audio2.play();
              Swal.fire({
                title: "Congratulations!",
                text: `You completed the game in ${time} seconds.`,
                imageUrl:
                  "https://em-content.zobj.net/source/animated-noto-color-emoji/356/partying-face_1f973.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
              });
            }
          } else {
            document
              .querySelectorAll(".boxOpen")[1]
              .classList.remove("boxOpen");
            document
              .querySelectorAll(".boxOpen")[0]
              .classList.remove("boxOpen");
          }
        }
      }, 500);
    }
  };

  document.querySelector(".game").appendChild(box);
}
