window.addEventListener("DOMContentLoaded", () => {
  // ==== STAR COUNT & PROGRESS BAR VARIABLES ====
  // Tracks how many star systems have been mapped
  let starCount = 0;

  // Elements showing star count, systems mapped, and progress bar UI
  const starDisplay = document.getElementById("starCount");
  const systemsMappedDisplay = document.getElementById("systemsMapped");
  const progressBarFill = document.getElementById("progressBarFill");
  const progressBarText = document.getElementById("progressBarText"); // Text inside progress bar

  // Total systems to map for 100% completion
  const TOTAL_SYSTEMS = 400000000000; // 400 billion target

  /*
  // This section was the old scan button listener, disabled because the button no longer exists.
  */

  // ==== TRAVEL BUTTON & PROGRESS BAR ELEMENTS ====
  // Button and progress bar for traveling to the next star system
  const travelButton = document.getElementById("travelButton");
  const travelProgressFill = document.getElementById("travelProgressFill");

  // Section containing all scanning/action buttons, hidden until travel completes
  const actionsSection = document.getElementById("actionsSection");

const lifeSupportBarFill = document.getElementById("lifeSupportBarFill");
const lifeSupportTimeDisplay = document.getElementById("lifeSupportTime");
const lifeSupportContainer = document.getElementById("lifeSupportContainer");

// Life Support timer (5 minutes = 300 seconds)
const LIFE_SUPPORT_DURATION = 300; 
let lifeSupportRemaining = LIFE_SUPPORT_DURATION;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateLifeSupportBar() {
  // Calculate percent width for bar
  const percent = (lifeSupportRemaining / LIFE_SUPPORT_DURATION) * 100;
  lifeSupportBarFill.style.width = percent + "%";
  
  // Update time display
  lifeSupportTimeDisplay.textContent = formatTime(lifeSupportRemaining);
  
  if (lifeSupportRemaining <= 0) {
    lockExploration();
    clearInterval(lifeSupportInterval);
    lifeSupportTimeDisplay.textContent = "00:00 - LIFE SUPPORT FAILED";
  }
}

// Lock all exploration buttons and travel button
function lockExploration() {
  // Disable travel button
  travelButton.disabled = true;
  
  // Disable all action buttons
  actions.forEach(({id}) => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = true;
  });
}

  updateLifeSupportBar();

  const timer = setInterval(() => {
    lifeSupportRemaining--;
    if (lifeSupportRemaining < 0) {
      clearInterval(timer);
      lifeSupportTimeDisplay.textContent = "00:00 - LIFE SUPPORT FAILED";
      // Disable buttons or trigger lock function here
      return;
    }
    updateLifeSupportBar();
  }, 1000);
  
  // ==== ACTIONS SETUP ====
  // Define each action button, its progress bar, and how long it takes (ms)
  const actions = [
    { id: "scanStarBtn", progressId: "scanStarProgress", duration: 5000 },
    { id: "deepScanBtn", progressId: "deepScanProgress", duration: 15000 },
    { id: "sendProbesBtn", progressId: "sendProbesProgress", duration: 20000 },
    { id: "soilSamplesBtn", progressId: "soilSamplesProgress", duration: 10000 },
    { id: "atmosphericReadingsBtn", progressId: "atmosphericReadingsProgress", duration: 12000 },
    { id: "logFindingsBtn", progressId: "logFindingsProgress", duration: 8000 },
  ];

  // Track which action is currently running and which are completed
  let currentAction = null;
  let completedActions = new Set();

  // Attach click listeners to each action button
  actions.forEach(({ id, progressId, duration }) => {
    const btn = document.getElementById(id);
    const progressFill = document.getElementById(progressId);

    btn.addEventListener("click", () => {
      // Prevent multiple actions running simultaneously
      if (currentAction) return;

      currentAction = id;
      btn.disabled = true;           // Disable button while running
      progressFill.style.width = "0%";

      let elapsed = 0;
      const interval = 100;           // Update progress every 100ms

      // Fill the progress bar over the specified duration
      const timer = setInterval(() => {
        elapsed += interval;
        const percent = Math.min((elapsed / duration) * 100, 100);

        // Use JS to set the width of the ::before pseudo-element:
        btn.style.setProperty('--progress', percent + '%');

        // When action completes
        if (elapsed >= duration) {
          clearInterval(timer);
          completedActions.add(id);   // Mark this action done
          currentAction = null;
          btn.disabled = true;        // Keep disabled after completion

          checkAllActionsCompleted(); // Check if all actions are done
        }
      }, interval);
    });
  });

  // ==== CHECK IF ALL ACTIONS COMPLETED ====
  // Called after each action finishes to see if the entire star system is mapped
  function checkAllActionsCompleted() {
    if (completedActions.size === actions.length) {
      // Increase the star count by 1
      starCount++;
      systemsMappedDisplay.textContent = `Systems Mapped: ${starCount.toLocaleString()}`;

      // Calculate and update progress bar percent
      let percent = (starCount / TOTAL_SYSTEMS) * 100;
      if (percent > 100) percent = 100;
      progressBarFill.style.width = percent + "%";
      progressBarText.textContent = percent.toFixed(12) + "%";

      // Reset buttons and progress bars for next system
      completedActions.clear();
      actions.forEach(({ id, progressId }) => {
        const btn = document.getElementById(id);
        const progressFill = document.getElementById(progressId);
        btn.disabled = false;        // Re-enable buttons
        progressFill.style.width = "0%";
      });

      // Hide actions section and enable travel button for next system
      actionsSection.style.display = "none";
      travelButton.disabled = false;
      travelProgressFill.style.width = "0%";
    }
  }

  // ==== TRAVEL TO NEXT SYSTEM FUNCTION ====
  // Handles progress bar fill when traveling and shows actions on completion
  function travelToNextSystem() {
    travelButton.disabled = true;   // Disable travel button during travel
    travelProgressFill.style.width = "0%";
    actionsSection.style.display = "none"; // Hide action buttons during travel

    const duration = 15000;          // Travel takes 15 seconds
    const interval = 100;            // Update every 100ms
    let elapsed = 0;

    // Fill travel progress bar over time
    const timer = setInterval(() => {
      elapsed += interval;
      const percent = Math.min((elapsed / duration) * 100, 100);
      travelProgressFill.style.width = percent + "%";

      if (elapsed >= duration) {
        clearInterval(timer);
        actionsSection.style.display = "block"; // Show action buttons after travel
      }
    }, interval);
  }

  // Listen for click on the travel button
  travelButton.addEventListener("click", travelToNextSystem);

  // ==== TAB SWITCHING LOGIC ====
  // Handles changing between different game views/tabs
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
      // Remove 'active' class from all tabs and add to clicked tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Hide all views, then show the selected one
      Object.values(views).forEach(viewId => {
        document.getElementById(viewId).style.display = "none";
      });

      const viewToShow = views[tab.id];
      if (viewToShow) {
        document.getElementById(viewToShow).style.display = "block";
      }
    });
  });
});
