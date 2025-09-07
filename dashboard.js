// Ensure you have your correct Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyCpOy4pqmtIsvJMtgoCzbQkLYTwR61cExk",
  authDomain: "probody-deec4.firebaseapp.com",
  databaseURL: "https://probody-deec4-default-rtdb.firebaseio.com",
  projectId: "probody-deec4",
  storageBucket: "probody-deec4.firebasestorage.app",
  messagingSenderId: "704731000262",
  appId: "1:704731000262:web:4b3f4c4b8a0c4e71a8d6c7",
  measurementId: "G-PNXEC12ZX4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

// DOM Elements
const loader = document.getElementById("loader");
const dashboard = document.getElementById("probodyDashboard");
const progressChartEl = document.getElementById("progressChart");

// Main function that runs when the page is ready
$(function () {
  // Show loader immediately while checking auth state
  loader.classList.remove("d-none"); // Update: Show loader at start

  // Wait for Firebase to confirm the user's login status
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      console.log("Auth state changed: User is logged in.", user.uid);
      checkMpinAndLoadData(user.uid);
    } else {
      // User is not signed in
      console.log("Auth state changed: User is logged out.");
      loader.classList.add("d-none"); // Update: Hide loader on redirect
      window.location.href = "login.html"; // Redirect to login page
    }
  });

// Collect MPIN from 4 separate boxes
function getMpinValue() {
  let mpin = "";
  document.querySelectorAll(".mpin-box").forEach(input => {
    mpin += input.value; 
  });
  return mpin;
}

// Clear all MPIN boxes
function clearMpinInputs() {
  document.querySelectorAll(".mpin-box").forEach(input => input.value = "");
  document.querySelector(".mpin-box").focus(); // focus back on first box
}

// Attach input behavior
document.querySelectorAll(".mpin-box").forEach((box, idx, arr) => {
  box.addEventListener("input", e => {
    if (box.value && idx < arr.length - 1) {
      arr[idx + 1].focus();
    }
    // Auto-submit if all 4 filled
    if (getMpinValue().length === arr.length) {
      $("#submitMpinBtn").click();
    }
  });

  box.addEventListener("keydown", e => {
    if (e.key === "Backspace" && !box.value && idx > 0) {
      arr[idx - 1].focus();
    }
  });
});
  // Check MPIN and load dashboard data
  function checkMpinAndLoadData(uid) {
    const userMpinRef = db.ref(`users/${uid}/mpin`);

    userMpinRef.once("value")
      .then(snapshot => {
        const mpin = snapshot.val();
        const mpinModal = new bootstrap.Modal(document.getElementById('mpinModal'), {
          backdrop: 'static', // Prevents closing by clicking outside
          keyboard: false     // Prevents closing with the escape key
        });

        if (mpin !== null) {
          $("#mpinModalTitle").text('Enter Your MPIN');
        } else {
          $("#mpinModalTitle").text('Set Your Security MPIN');
        }
        mpinModal.show(); // Show the modal
      })
      .catch(error => {
        console.error("Firebase Error checking MPIN:", error);
        alert("Could not verify your security settings. Please try again.");
        loader.classList.add("d-none"); // Update: Hide loader on error
      });
  }
// Handle MPIN submission
$("#submitMpinBtn").click(function () {
  const inputMpin = getMpinValue();
  const user = auth.currentUser;

  if (!user) {
    alert("You are not logged in.");
    loader.classList.add("d-none");
    return;
  }
  if (!/^\d{4,6}$/.test(inputMpin)) {
    alert("MPIN must be 4-6 digits.");
    clearMpinInputs();
    return;
  }

  const userMpinRef = db.ref(`users/${user.uid}/mpin`);
  userMpinRef.once("value").then(snapshot => {
    const savedMpin = snapshot.val();

    if (savedMpin !== null) {
      if (inputMpin === savedMpin) {
        const mpinModal = bootstrap.Modal.getInstance(document.getElementById('mpinModal'));
        mpinModal.hide();
        loadUserData(user.uid);
      } else {
        $("#mpinError").removeClass("d-none");
        clearMpinInputs();
      }
    } else {
      // Set new MPIN
      userMpinRef.set(inputMpin).then(() => {
        const mpinModal = bootstrap.Modal.getInstance(document.getElementById('mpinModal'));
        mpinModal.hide();
        loadUserData(user.uid);
      }).catch(error => {
        console.error("Firebase Error setting MPIN:", error);
        alert("Failed to set MPIN. Please try again.");
        loader.classList.add("d-none");
      });
    }
  }).catch(error => {
    console.error("Firebase Error reading MPIN:", error);
    alert("Failed to verify MPIN. Please try again.");
    loader.classList.add("d-none");
  });
});

// Reset error on typing
$(".mpin-box").on("input", () => $("#mpinError").addClass("d-none"));

  // Update: Handle Change MPIN button
  $("#saveMpinBtn").click(function () {
    const newMpin = $("#newMpin").val();
const confirmMpin = $("#confirmNewMpin").val();
const user = auth.currentUser;

    if (!user) {
      alert("You are not logged in.");
      return;
    }
    if (!/^\d{4,6}$/.test(newMpin)) {
      alert("New MPIN must be 4-6 digits.");
      return;
    }
    if (newMpin !== confirmMpin) {
      alert("MPINs do not match.");
      return;
    }

    const userMpinRef = db.ref(`users/${user.uid}/mpin`);
    userMpinRef.set(newMpin).then(() => {
      alert("MPIN updated successfully.");
      $("#newMpin").val(""); // Clear input
      $("#confirmNewMpin").val(""); // Clear confirmation
    }).catch(error => {
      console.error("Firebase Error updating MPIN:", error);
      alert("Failed to update MPIN. Please try again.");
    });
  });

  $("#mpinInput").on("input", () => $("#mpinError").addClass("d-none"));
  $("#logoutBtn").click(() => auth.signOut());

  // Main data loading function
  function loadUserData(uid) {
    const userRef = db.ref(`users/${uid}`);
    console.log("Fetching data from path:", userRef.toString());

    userRef.once("value")
      .then(snapshot => {
        loader.classList.add("d-none"); // Update: Ensure loader is hidden
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data successfully fetched:", data);

          // Populate Progress Tab
          $("#progressUserImg").attr("src", data.photoURL || "Logo.png");
          $("#progressUserName").text(data.displayName || "-");
          $("#progressEmail").text(auth.currentUser.email || "-");
          $("#progressWeight").text(data.weight ?? "-");
          $("#progressHeight").text(data.height ?? "-");
          $("#progressAge").text(data.age ?? "-");

          // Populate Settings Tab
          $("#settingsName").text(data.displayName || "-");
          $("#settingsWeight").text(data.weight ? `${data.weight} kg` : "-");
          $("#settingsHeight").text(data.height ? `${data.height} cm` : "-");
          $("#settingsAge").text(data.age ?? "-");
          // Assuming your Firebase stores 'uploads' and 'uploadLimit'
const uploads = data.uploads ?? 0;
const uploadLimit = data.uploadslimit ?? 20;

// Update the text
$("#upl-ratio").text(`${uploads}/${uploadLimit}`);

// Assuming you have these elements
const upgradeBtn = document.getElementById("upgradeBtn"); // Your upgrade button


// Update the circular progress
const progressCircle = document.getElementById("upl-progress");
const circumference = 2 * Math.PI * 45; // 2 * PI * r (r=45)
const offset = circumference - (uploads / uploadLimit) * circumference;
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = offset;

// Update ratio text
$("#upl-ratio").text(`${uploads}/${uploadLimit}`);

// --- NEW: Show/hide buttons based on uploads ---
if (uploads >= uploadLimit) {
  captureBtn.style.display = "none";   // hide capture
  upgradeBtn.style.display = "inline-flex"; // show upgrade
} else {
  captureBtn.style.display = "inline-flex"; // show capture
  upgradeBtn.style.display = "none";        // hide upgrade
}

          // Show the dashboard
          dashboard.style.display = "block";

          // Initialize other components
          showTab("progressTab");
          initProgressChart();
          loadUserImages(uid); // Uncomment when implemented
         // makeProfileEditable();
         initProfileEditor();
        } else {
          console.error("No data found for this user in the database.");
          alert("Could not find your user profile. Please contact support.");
        }
      })
      .catch(error => {
        console.error("Firebase Read Error:", error);
        alert("An error occurred while fetching your data.");
        loader.classList.add("d-none"); // Update: Hide loader on error
      });
  }

  window.showTab = function (tabId) {
  // Hide all tab content
  $('.tab-content').addClass('d-none');
  // Show the selected tab content
  $('#' + tabId).removeClass('d-none');
  // Remove active class from all buttons
  $('.navbar .btn').removeClass('active');
  // Add active class to the clicked button
  $(`.navbar .btn[onclick="showTab('${tabId}')"]`).addClass('active');
};


let progressChart = null; // keep global reference

function initProgressChart() {
  if (!progressChartEl) return;
  const ctx = progressChartEl.getContext("2d");

  const uid = firebase.auth().currentUser?.uid;
  if (!uid) return;

  const logsRef = firebase.database().ref("users/" + uid + "/progressLogs");

  logsRef.on("value", snapshot => {
    const logs = snapshot.val();
    if (!logs) return;

    // Convert logs into arrays
    const dates = [];
    const weights = [];

    Object.keys(logs).sort().forEach(dateKey => {
      dates.push(dateKey); // YYYY-MM-DD
      weights.push(parseFloat(logs[dateKey].weight));
    });

    // Destroy old chart safely
    if (progressChart instanceof Chart) {
      progressChart.destroy();
    }

    // Build chart
    progressChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: "Weight (kg)",
          data: weights,
          borderColor: "#ff4b2b",
          backgroundColor: "rgba(255, 65, 108, 0.2)",
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Weight (kg)" }, beginAtZero: false }
        }
      }
    });
  });
}
  
// === Initial binding ===
function initProfileEditor() {
  const btnContainer = document.getElementById("editBtnContainer");
  btnContainer.innerHTML = `
    <button id="editBtn" class="btn btn-primary btn-sm">
      <i class="material-icons">edit</i> Edit
    </button>
  `;
  document.getElementById("editBtn").onclick = makeProfileEditable;
}

function makeProfileEditable() {
  const fields = {
    settingsName: "Name",
    settingsWeight: "Weight",
    settingsHeight: "Height",
    settingsAge: "Age"
  };

  // Store original values
  const original = {};
  Object.keys(fields).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return; // skip if element not found

    original[id] = el.textContent || "";

    let val = original[id]
      .replace("kg", "")
      .replace("cm", "");

    const inputType = id === "settingsName" ? "text" : "number";
    el.innerHTML = `<input id="edit-${id}" type="${inputType}" class="form-control form-control-sm text-end" value="${val}">`;
  });

  const btnContainer = document.getElementById("editBtnContainer");
  if (!btnContainer) return;

  btnContainer.innerHTML = `
    <button id="saveBtn" class="btn btn-success btn-sm me-2">
      <i class="material-icons">check</i> Save
    </button>
    <button id="cancelBtn" class="btn btn-secondary btn-sm">
      <i class="material-icons">close</i> Cancel
    </button>
  `;

  // === Save handler ===
  document.getElementById("saveBtn").onclick = () => {
    const updates = {
      displayName: document.getElementById("edit-settingsName").value,
      weight: parseInt(document.getElementById("edit-settingsWeight").value) || 0,
      height: parseInt(document.getElementById("edit-settingsHeight").value) || 0,
      age: parseInt(document.getElementById("edit-settingsAge").value) || 0
    };

    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("users/" + uid);

    // Update profile fields
    userRef.update(updates)
      .then(() => {
        // Log weight progress (append)
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const logRef = userRef.child("progressLogs").child(today);

        logRef.transaction(current => {
          return {
            weight: updates.weight,
            date: new Date().toISOString()
          };
        });

        // Update UI
        document.getElementById("settingsName").textContent = updates.displayName;
        document.getElementById("settingsWeight").textContent = updates.weight + " kg";
        document.getElementById("settingsHeight").textContent = updates.height + " cm";
        document.getElementById("settingsAge").textContent = updates.age;

        resetEditButtons();
      })
      .catch(err => alert("Update failed: " + err.message));
  };

  // === Cancel handler ===
  document.getElementById("cancelBtn").onclick = () => {
    Object.keys(fields).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = original[id];
    });
    resetEditButtons();
  };
}

// === Reset buttons back to Edit ===
function resetEditButtons() {
  const btnContainer = document.getElementById("editBtnContainer");
  btnContainer.innerHTML = `
    <button id="editBtn" class="btn btn-primary btn-sm">
      <i class="material-icons">edit</i> Edit
    </button>
  `;
  document.getElementById("editBtn").onclick = makeProfileEditable;
}

$('#captureBtn').on('click', function() {
        console.log('Capture button clicked');
        // Add your capture logic here
        window.location.href = './capture.html'; 
    });

    // Party button click
    $('#partyBtn').on('click', function() {
        console.log('Party button clicked');
        // Add your party logic here
        window.location.href = './assistant/music.html';
    });
    $('#trainerBtn').on('click', function() {
        console.log('Party button clicked');
        // Add your party logic here
        window.location.href = './assistant/trainer.html';
    });

 function loadUserImages(uid) {
  const grid = $("#galleryGrid");
  grid.empty();

  db.ref(`users/${uid}/gallery`).once("value")
    .then(snapshot => {
      const gallery = snapshot.val();

      if (!gallery) {
        grid.append(`
          <div class="col-12 text-center text-muted py-3">
            No progress images found.
          </div>
        `);
        return;
      }

      // Sort dates descending
      const sortedDates = Object.keys(gallery).sort((a, b) => new Date(b) - new Date(a));

      sortedDates.forEach(date => {
        const tags = gallery[date];
        const d = new Date(date);
        const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

        // Section header
        grid.append(`
          <div class="col-12">
            <h6 class="fw-bold mt-3 mb-2 text-gradient">${formattedDate}</h6>
          </div>
        `);

        // Loop tags (F,B,S)
        Object.entries(tags).forEach(([tag, url]) => {
          const badgeMap = { front: "F", back: "B", side: "S" };
          const badge = badgeMap[tag.toLowerCase()] || tag[0].toUpperCase();

          const card = $(`
            <div class="col-4 mb-3">
              <div class="card glass text-center p-0 image-card position-relative" 
                   data-url="${url}" data-date="${date}" data-tag="${tag}">
                <img src="${url}" class="img-fluid rounded" alt="${tag}">
                <span class="badge bg-gradient position-absolute top-0 start-0 m-2">${badge}</span>
              </div>
            </div>
          `);
          grid.append(card);
        });
      });

      // === Image click → open gallery viewer ===
      $(".image-card").on("click", function () {
        const url = $(this).data("url");
        const date = $(this).data("date");
        const tag = $(this).data("tag");

        // collect all images into gallery list
        galleryImages = $(".image-card").map(function () {
          return {
            url: $(this).data("url"),
            date: $(this).data("date"),
            tag: $(this).data("tag")
          };
        }).get();

        currentIndex = galleryImages.findIndex(img => img.url === url);

        showImageInModal(currentIndex);
      });
    })
    .catch(err => {
      console.error("Error loading images:", err);
      grid.append(`
        <div class="col-12 text-center text-danger py-3">
          Could not load images. Please try again later.
        </div>
      `);
    });
}
  
  let galleryImages = [];
let currentIndex = 0;
let imageModal; // single modal instance

// === Show image in existing modal ===
function showImageInModal(index) {
  if (galleryImages.length === 0) return;
  currentIndex = index; // update tracker

  const img = galleryImages[index];
  $("#modalImage").attr("src", img.url);
  $("#deleteImg").data("img", img);
  $("#compareImg").data("img", img);

  // Open modal only once
  if (!imageModal) {
    imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
  }
  imageModal.show();
}

// === Navigation ===
$("#nextImg").on("click", () => {
  if (galleryImages.length > 0) {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImageInModal(currentIndex);
  }
});
$("#prevImg").on("click", () => {
  if (galleryImages.length > 0) {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImageInModal(currentIndex);
  }
});

// === Delete Action ===
$("#deleteImg").on("click", function () {
  const img = $(this).data("img");
  if (!img) return;

  if (confirm("Delete this image?")) {
    // 1. Remove from Storage
    const storageRef = storage.refFromURL(img.url);
    storageRef.delete()
      .then(() => {
        // 2. Remove from DB
        return db.ref(`users/${auth.currentUser.uid}/gallery/${img.date}/${img.tag}`).remove();
      })
      .then(() => {
        // 3. Reduce uploads counter
        return db.ref(`users/${auth.currentUser.uid}/uploads`).transaction(n => (n || 0) - 1);
      })
      .then(() => {
        alert("Deleted successfully ✅");
        loadUserImages(auth.currentUser.uid);

        if (imageModal) imageModal.hide();
      })
      .catch(err => alert("Error deleting: " + err.message));
  }
});

// === Compare Action ===
$("#compareImg").on("click", function () {
  const img = $(this).data("img");
  if (!img) return;

  // Retrieve current selection from localStorage
  let selectedImages = JSON.parse(localStorage.getItem("compareSelection")) || [];

  // Add or remove this image from selection
  const imgId = img.id || img.date; // unique identifier
  if (!selectedImages.includes(imgId)) {
    if (selectedImages.length >= 2) selectedImages.shift(); // Keep only 2
    selectedImages.push(imgId);
  } else {
    selectedImages = selectedImages.filter(i => i !== imgId); // deselect
  }

  // Save updated selection
  localStorage.setItem("compareSelection", JSON.stringify(selectedImages));

  // Show modal only if 2 images are selected
  if (selectedImages.length === 2) {
    const [img1Id, img2Id] = selectedImages;

    const img1Src = $(`.selectable-img`).filter(function () {
      const d = $(this).data("img");
      return d && (d.id === img1Id || d.date === img1Id);
    }).attr("src");

    const img2Src = $(`.selectable-img`).filter(function () {
      const d = $(this).data("img");
      return d && (d.id === img2Id || d.date === img2Id);
    }).attr("src");

    if (!img1Src || !img2Src) return;

    // Set images in modal
    $("#compareImg1").attr("src", img1Src);
    $("#compareImg2").attr("src", img2Src);

    // Reset slider to middle
    $(".overlay").css("clip-path", "inset(0 50% 0 0)");
    $("#sliderBar").css("left", "50%");

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("compareModal"));
    modal.show();
  }
});

function updateUploadProgress(current, limit) {
  const circle = document.getElementById("upl-progress");
  const ratio = document.getElementById("upl-ratio");

  const circumference = 2 * Math.PI * 45; // r=45
  const percent = Math.min(current / limit, 1);
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference * (1 - percent);

  ratio.textContent = `${current}/${limit}`;
}

let deferredPrompt;

$(document).ready(function() {
    const $installCard = $(".premium-card"); // The premium card container

    // Check if app is already installed
    function isPWAInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    }

    if (!isPWAInstalled()) {
        $installCard.hide(); // hide initially

        // Listen for beforeinstallprompt
        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            deferredPrompt = e;
            $installCard.fadeIn(400); // show premium card
        });

        // Install button click
        $("#pwaInstallBtn").on("click", async function() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                console.log('User choice:', choiceResult.outcome);
                deferredPrompt = null;
                $installCard.fadeOut(300);
            }
        });

        // Dismiss button click
        $("#pwaDismissBtn").on("click", function() {
            $installCard.fadeOut(300);
        });
    }
});

});