let starCount = 0;

const starDisplay = document.getElementById("starCount");
const scanButton = document.getElementById("scanButton");

scanButton.addEventListener("click", () => {
  starCount++;
  starDisplay.textContent = starCount;
});
