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

// --- NEW: Image Comparison State ---
let isCompareModeActive = false;
let compareSelection = []; // Will store {id, url} of selected images

// DOM Elements
const loader = document.getElementById("loader");
const dashboard = document.getElementById("probodyDashboard");
const progressChartEl = document.getElementById("progressChart");

// Main function that runs when the page is ready
$(function () {
  loader.classList.remove("d-none");

  auth.onAuthStateChanged(user => {
    if (user) {
      checkMpinAndLoadData(user.uid);
    } else {
      loader.classList.add("d-none");
      window.location.href = "login.html";
    }
  });

  // --- REFACTORED AND NEW EVENT BINDINGS ---
  initializeEventListeners();
  initializeNavbarScroll();
});

function getMpinValue() {
  let mpin = "";
  document.querySelectorAll(".mpin-box").forEach(input => { mpin += input.value; });
  return mpin;
}

function clearMpinInputs() {
  document.querySelectorAll(".mpin-box").forEach(input => input.value = "");
  document.querySelector(".mpin-box").focus();
}

function checkMpinAndLoadData(uid) {
  db.ref(`users/${uid}/mpin`).once("value")
    .then(snapshot => {
      const mpin = snapshot.val();
      const mpinModal = new bootstrap.Modal(document.getElementById('mpinModal'), { backdrop: 'static', keyboard: false });
      $("#mpinModalTitle").text(mpin ? 'Enter Your MPIN' : 'Set Your Security MPIN');
      mpinModal.show();
    })
    .catch(error => {
      console.error("Firebase Error checking MPIN:", error);
      alert("Could not verify your security settings.");
      loader.classList.add("d-none");
    });
}

function loadUserData(uid) {
  const userRef = db.ref(`users/${uid}`);
  userRef.once("value")
    .then(snapshot => {
      loader.classList.add("d-none");
      if (snapshot.exists()) {
        const data = snapshot.val();
        updateUI(data);
        dashboard.style.display = "block";
        showTab("progressTab");
        initProgressChart();
        loadUserImages(uid);
        initProfileEditor();
      } else {
        alert("Could not find your user profile.");
      }
    })
    .catch(error => {
      console.error("Firebase Read Error:", error);
      alert("An error occurred while fetching your data.");
      loader.classList.add("d-none");
    });
}

function updateUI(data) {
  const { displayName = "-", weight = "-", height = "-", age = "-", photoURL = "Logo.png", uploads = 0, uploadslimit = 20 } = data;
  
  $("#progressUserImg").attr("src", photoURL);
  $("#progressUserName").text(displayName);
  $("#progressEmail").text(auth.currentUser.email || "-");
  $("#progressWeight").text(weight);
  $("#progressHeight").text(height);
  $("#progressAge").text(age);

  $("#settingsName").text(displayName);
  $("#settingsWeight").text(weight ? `${weight} kg` : "-");
  $("#settingsHeight").text(height ? `${height} cm` : "-");
  $("#settingsAge").text(age);
  
  // Upload progress
  const progressCircle = document.getElementById("upl-progress");
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (uploads / uploadslimit) * circumference;
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = offset;
  $("#upl-ratio").text(`${uploads}/${uploadslimit}`);

  if (uploads >= uploadslimit) {
    $("#captureBtn").hide();
    $("#upgradeBtn").css("display", "inline-flex");
  } else {
    $("#captureBtn").css("display", "inline-flex");
    $("#upgradeBtn").hide();
  }
}

function initializeEventListeners() {
  // MPIN Logic
  document.querySelectorAll(".mpin-box").forEach((box, idx, arr) => {
    box.addEventListener("input", () => { if (box.value && idx < arr.length - 1) arr[idx + 1].focus(); });
    box.addEventListener("keydown", e => { if (e.key === "Backspace" && !box.value && idx > 0) arr[idx - 1].focus(); });
  });

  $("#submitMpinBtn").on("click", handleMpinSubmit);
  $("#saveMpinBtn").on("click", handleMpinSave);
  $("#logoutBtn").on("click", () => auth.signOut());
  $(".mpin-box").on("input", () => $("#mpinError").addClass("d-none"));
  
  // Navigation
  $('#captureBtn').on('click', () => window.location.href = './capture.html');
  $('#partyBtn').on('click', () => window.location.href = './assistant/music.html');
  $('#trainerBtn').on('click', () => window.location.href = './assistant/trainer.html');

  // --- NEW: Compare Mode Toggle ---
  $("#toggleCompareBtn").on("click", toggleCompareMode);
  
  // --- NEW: Compare Slider Interactivity ---
  initCompareSlider();
}

function handleMpinSubmit() {
  const inputMpin = getMpinValue();
  const user = auth.currentUser;
  if (!user || !/^\d{4,6}$/.test(inputMpin)) return;

  const userMpinRef = db.ref(`users/${user.uid}/mpin`);
  userMpinRef.once("value").then(snapshot => {
    const savedMpin = snapshot.val();
    if (savedMpin) {
      if (inputMpin === savedMpin) {
        bootstrap.Modal.getInstance(document.getElementById('mpinModal')).hide();
        loadUserData(user.uid);
      } else {
        $("#mpinError").removeClass("d-none");
        clearMpinInputs();
      }
    } else {
      userMpinRef.set(inputMpin).then(() => {
        bootstrap.Modal.getInstance(document.getElementById('mpinModal')).hide();
        loadUserData(user.uid);
      });
    }
  });
}

function handleMpinSave() {
    const newMpin = $("#newMpin").val();
    const confirmMpin = $("#confirmNewMpin").val();
    const user = auth.currentUser;
    if (!user || !/^\d{4,6}$/.test(newMpin) || newMpin !== confirmMpin) {
        alert("Invalid input. Please ensure MPINs are 4-6 digits and match.");
        return;
    }
    db.ref(`users/${user.uid}/mpin`).set(newMpin).then(() => {
        alert("MPIN updated successfully.");
        $("#newMpin, #confirmNewMpin").val("");
    });
}

window.showTab = function (tabId) {
  $('.tab-content').addClass('d-none');
  $('#' + tabId).removeClass('d-none');
  $('.navbar .btn').removeClass('active');
  $(`.navbar .btn[onclick="showTab('${tabId}')"]`).addClass('active');
};

let progressChart = null;
function initProgressChart() {
  if (!progressChartEl) return;
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  db.ref(`users/${uid}/progressLogs`).on("value", snapshot => {
    const logs = snapshot.val();
    if (!logs) return;
    const dates = Object.keys(logs).sort();
    const weights = dates.map(dateKey => parseFloat(logs[dateKey].weight));
    if (progressChart) progressChart.destroy();
    progressChart = new Chart(progressChartEl.getContext("2d"), {
      type: "line", data: { labels: dates, datasets: [{ label: "Weight (kg)", data: weights, borderColor: "#ff4b2b", backgroundColor: "rgba(255, 65, 108, 0.2)", tension: 0.4, fill: true }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: "Date" } }, y: { title: { display: true, text: "Weight (kg)" } } } }
    });
  });
}

function initProfileEditor() {
  $("#editBtnContainer").html('<button id="editBtn" class="btn btn-primary btn-sm"><i class="material-icons">edit</i> Edit</button>');
  $("#editBtn").on("click", makeProfileEditable);
}

function makeProfileEditable() {
  const original = {
    name: $("#settingsName").text(),
    weight: $("#settingsWeight").text(),
    height: $("#settingsHeight").text(),
    age: $("#settingsAge").text()
  };
  $("#settingsName").html(`<input id="edit-name" type="text" class="form-control form-control-sm text-end" value="${original.name}">`);
  $("#settingsWeight").html(`<input id="edit-weight" type="number" class="form-control form-control-sm text-end" value="${parseInt(original.weight) || ''}">`);
  $("#settingsHeight").html(`<input id="edit-height" type="number" class="form-control form-control-sm text-end" value="${parseInt(original.height) || ''}">`);
  $("#settingsAge").html(`<input id="edit-age" type="number" class="form-control form-control-sm text-end" value="${parseInt(original.age) || ''}">`);
  $("#editBtnContainer").html(`
    <button id="saveBtn" class="btn btn-success btn-sm me-2"><i class="material-icons">check</i> Save</button>
    <button id="cancelBtn" class="btn btn-secondary btn-sm"><i class="material-icons">close</i> Cancel</button>
  `);
  $("#saveBtn").on("click", () => saveProfileChanges());
  $("#cancelBtn").on("click", () => {
    $("#settingsName").text(original.name);
    $("#settingsWeight").text(original.weight);
    $("#settingsHeight").text(original.height);
    $("#settingsAge").text(original.age);
    initProfileEditor();
  });
}

function saveProfileChanges() {
  const updates = {
    displayName: $("#edit-name").val(),
    weight: parseInt($("#edit-weight").val()) || 0,
    height: parseInt($("#edit-height").val()) || 0,
    age: parseInt($("#edit-age").val()) || 0
  };
  const uid = auth.currentUser.uid;
  const userRef = db.ref(`users/${uid}`);
  userRef.update(updates).then(() => {
    const today = new Date().toISOString().split("T")[0];
    userRef.child("progressLogs").child(today).set({ weight: updates.weight });
    updateUI(updates); // Update UI immediately
    initProfileEditor();
  });
}

function loadUserImages(uid) {
  const grid = $("#galleryGrid");
  grid.empty();
  db.ref(`users/${uid}/gallery`).once("value").then(snapshot => {
    const gallery = snapshot.val();
    if (!gallery) {
      $("#galleryPlaceholder").removeClass("d-none");
      return;
    }
    $("#galleryPlaceholder").addClass("d-none");
    const sortedDates = Object.keys(gallery).sort((a, b) => new Date(b) - new Date(a));
    sortedDates.forEach(date => {
      grid.append(`<div class="col-12"><h6 class="fw-bold mt-3 mb-2 text-gradient">${new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</h6></div>`);
      Object.entries(gallery[date]).forEach(([tag, url]) => {
        const imageId = `${date}-${tag}`; // Create a unique ID
        const badge = { front: "F", back: "B", side: "S" }[tag.toLowerCase()] || tag[0].toUpperCase();
        const card = $(`
          <div class="col-4 mb-3">
            <div class="card glass text-center p-0 image-card position-relative" data-id="${imageId}" data-url="${url}" data-date="${date}" data-tag="${tag}">
              <img src="${url}" class="img-fluid rounded" alt="${tag}">
              <span class="badge bg-gradient position-absolute top-0 start-0 m-2">${badge}</span>
              <div class="check-overlay"><i class="material-icons">check</i></div>
            </div>
          </div>
        `);
        grid.append(card);
      });
    });
    // Re-bind click event for newly created cards
    $(".image-card").on("click", handleImageClick);
  });
}

// --- NEW: Universal image click handler ---
function handleImageClick() {
    if (isCompareModeActive) {
        handleCompareSelection(this);
    } else {
        openImageViewer(this);
    }
}

let galleryImages = [];
let currentIndex = 0;
let imageModal;

function openImageViewer(cardElement) {
    const url = $(cardElement).data("url");
    galleryImages = $(".image-card").map((_, el) => ({
      url: $(el).data("url"), date: $(el).data("date"), tag: $(el).data("tag")
    })).get();
    currentIndex = galleryImages.findIndex(img => img.url === url);
    showImageInModal(currentIndex);
}

function showImageInModal(index) {
    if (!galleryImages.length) return;
    currentIndex = index;
    const img = galleryImages[index];
    $("#modalImage").attr("src", img.url);
    $("#deleteImg").data("img", img);
    if (!imageModal) imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
    imageModal.show();
}

$("#nextImg").on("click", () => { if (galleryImages.length) showImageInModal((currentIndex + 1) % galleryImages.length); });
$("#prevImg").on("click", () => { if (galleryImages.length) showImageInModal((currentIndex - 1 + galleryImages.length) % galleryImages.length); });

$("#deleteImg").on("click", function () {
    const img = $(this).data("img");
    if (!img || !confirm("Delete this image?")) return;
    storage.refFromURL(img.url).delete()
        .then(() => db.ref(`users/${auth.currentUser.uid}/gallery/${img.date}/${img.tag}`).remove())
        .then(() => db.ref(`users/${auth.currentUser.uid}/uploads`).transaction(n => (n || 0) - 1))
        .then(() => {
            alert("Deleted successfully ✅");
            loadUserImages(auth.currentUser.uid);
            if (imageModal) imageModal.hide();
        });
});

// --- NEW: Compare Mode Functions ---
function toggleCompareMode() {
    isCompareModeActive = !isCompareModeActive;
    $("#galleryTab").toggleClass("compare-mode", isCompareModeActive);
    $("#toggleCompareBtn").toggleClass("active", isCompareModeActive);
    
    if (isCompareModeActive) {
        $("#compareIndicator").removeClass("d-none").addClass("d-flex");
    } else {
        $("#compareIndicator").addClass("d-none").removeClass("d-flex");
        // Reset selection when exiting mode
        compareSelection = [];
        $(".image-card.selected").removeClass("selected");
        updateCompareIndicator();
    }
}

function handleCompareSelection(cardElement) {
    const card = $(cardElement);
    const id = card.data("id");
    const url = card.data("url");

    const existingIndex = compareSelection.findIndex(item => item.id === id);

    if (existingIndex > -1) {
        // Deselect
        compareSelection.splice(existingIndex, 1);
        card.removeClass("selected");
    } else {
        // Select
        if (compareSelection.length < 2) {
            compareSelection.push({ id, url });
            card.addClass("selected");
        }
    }
    
    updateCompareIndicator();

    if (compareSelection.length === 2) {
        openCompareModal();
    }
}

function updateCompareIndicator() {
    const [slot1, slot2] = [$("#compareSlot1"), $("#compareSlot2")];
    slot1.html(compareSelection[0] ? `<img src="${compareSelection[0].url}">` : '<small class="text-muted">Select First Image</small>');
    slot2.html(compareSelection[1] ? `<img src="${compareSelection[1].url}">` : '<small class="text-muted">Select Second Image</small>');
}

function openCompareModal() {
    $("#compareImg1").attr("src", compareSelection[0].url);
    $("#compareImg2").attr("src", compareSelection[1].url);

    // Reset slider position
    $("#sliderBar").css("left", "50%");
    $(".overlay").css("clip-path", "inset(0 50% 0 0)");

    const modal = new bootstrap.Modal(document.getElementById("compareModal"));
    modal.show();
    
    // Exit compare mode after opening modal for a clean state
    toggleCompareMode();
}

function initCompareSlider() {
    const slider = document.getElementById('sliderBar');
    const container = slider.parentElement;
    let isDragging = false;

    const startDrag = (e) => { isDragging = true; };
    const endDrag = () => { isDragging = false; };
    const onDrag = (e) => {
        if (!isDragging) return;
        const rect = container.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        x = Math.max(0, Math.min(x, rect.width)); // Clamp within bounds
        const percent = (x / rect.width) * 100;
        slider.style.left = `${percent}%`;
        container.querySelector('.overlay').style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    };

    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', onDrag);
    slider.addEventListener('touchstart', startDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchmove', onDrag);
}

// PWA Installation Logic
let deferredPrompt;
$(document).ready(function() {
    const $installCard = $(".premium-card");
    const isPWAInstalled = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (!isPWAInstalled()) {
        $installCard.hide();
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            $installCard.fadeIn(400);
        });
        $("#pwaInstallBtn").on("click", async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt = null;
                $installCard.fadeOut(300);
            }
        });
        $("#pwaDismissBtn").on("click", () => $installCard.fadeOut(300));
    }
});


// --- 2. ADD this ENTIRE new function at the bottom of the file ---
function initializeNavbarScroll() {
  const navbar = document.querySelector('.navbar.fixed-bottom');
  if (!navbar) return; // Exit if navbar isn't found

  let lastScrollTop = 0;
  const scrollThreshold = 10; // Don't trigger on minor scrolls

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Makes sure the user has scrolled more than the threshold
    if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
      return;
    }

    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
      // Scrolling Down: hide the navbar
      navbar.classList.add('navbar-hidden');
    } else {
      // Scrolling Up: show the navbar
      navbar.classList.remove('navbar-hidden');
    }

    // Update the last scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true }); // Use a passive listener for better scroll performance
}