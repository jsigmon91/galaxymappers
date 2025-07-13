// Star count
let starCount = 0;
const starDisplay = document.getElementById("starCount");
const scanButton = document.getElementById("scanButton");

const systemsMappedDisplay = document.getElementById("systemsMapped");
const progressBarFill = document.getElementById("progressBarFill");
const progressBarText = document.getElementById("progressBarText"); // NEW line

const TOTAL_SYSTEMS = 400000000000; // 400 billion target

scanButton.addEventListener("click", () => {
  starCount++;
  starDisplay.textContent = starCount;

  // Update tracker
  systemsMappedDisplay.textContent = `Systems Mapped: ${starCount.toLocaleString()}`;

  let percent = (starCount / TOTAL_SYSTEMS) * 100;
  if (percent > 100) percent = 100;

  progressBarFill.style.width = percent + "%";

  // Update text inside the new separate element (not inside the fill div)
  progressBarText.textContent = percent.toFixed(6) + "%"; // six decimals for fun
});

// ----- Tab Switching Logic -----

const tabs = document.querySelectorAll(".tab.button");
const views = {
  earthTab: "earthView",
  explorationTab: "explorationView",
  fleetsTab: "fleetsView",
  artifactsTab: "artifactsView",
  blackholesTab: "blackholesView",
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active from all tabs
    tabs.forEach(t => t.classList.remove("active"));
    // Add active to clicked tab
    tab.classList.add("active");

    // Hide all views
    Object.values(views).forEach(viewId => {
      document.getElementById(viewId).style.display = "none";
    });

    // Show the matching view
    const viewToShow = views[tab.id];
    if (viewToShow) {
      document.getElementById(viewToShow).style.display = "block";
    }
  });
});
