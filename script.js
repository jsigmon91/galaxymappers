// Star count
let starCount = 0;
const starDisplay = document.getElementById("starCount");
const scanButton = document.getElementById("scanButton");

scanButton.addEventListener("click", () => {
  starCount++;
  starDisplay.textContent = starCount;
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
