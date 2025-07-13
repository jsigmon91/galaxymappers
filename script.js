let starCount = 0;

const starDisplay = document.getElementById("starCount");
const scanButton = document.getElementById("scanButton");
scanButton.addEventListener("click", () => {
  starCount++;
  starDisplay.textContent = starCount;
});

// Tab switching setup (only Exploration is active for now)
const explorationTab = document.getElementById("explorationTab");
const explorationView = document.getElementById("explorationView");

explorationTab.addEventListener("click", () => {
  // For now, only one view — later we’ll toggle others here
  explorationView.style.display = "block";
});
