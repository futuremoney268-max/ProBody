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

// --- State Variables ---
let isCompareModeActive = false;
let compareSelection = [];
let galleryImageData = []; // Holds {url, date, tag} for filtering
let galleryImages = []; // Holds image data for the viewer modal
let currentIndex = 0;
let imageModal;
let progressChart = null;
let deferredPrompt;

// --- DOM Elements ---
const loader = document.getElementById("loader");
const dashboard = document.getElementById("probodyDashboard");
const progressChartEl = document.getElementById("progressChart");

// --- Main function that runs when the page is ready ---
$(function () {
  loader.classList.remove("d-none");

  auth.onAuthStateChanged(user => {
    if (user) {
      loadUserData(user.uid);
    } else {
      loader.classList.add("d-none");
      window.location.href = "login.html";
    }
  });

  initializeEventListeners();
  initializeNavbarScroll();
  

// --- PWA Installation + Service Worker ---
let deferredPrompt;
const $installCard = $(".premium-card");
const $installBtn = $("#pwaInstallBtn");
const $dismissBtn = $("#pwaDismissBtn");

const isPWAInstalled = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone;

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.warn("❌ Service Worker failed:", err));
}

if (isPWAInstalled()) {
  // Already installed → hide card
  $installCard.hide();
} else {
  // Hide card until prompt is ready
  $installCard.hide();

  // Show card when install prompt is available
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    $installCard.fadeIn(400);
  });

  // Install button
  $installBtn.on("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("PWA install outcome:", outcome);
    deferredPrompt = null;
    $installCard.fadeOut(300);
  });

  // Dismiss button
  $dismissBtn.on("click", () => {
    $installCard.fadeOut(300);
  });
}

});
  let mpinsubmit = false; // global flag

// --- Authentication & Security ---
function checkMpinAndLoadData(uid) {
  if (mpinsubmit) {
    // Already checked → just load data
    loadUserImages(uid);
  } else {
    db.ref(`users/${uid}/mpin`).once("value")
      .then(snapshot => {
        const mpin = snapshot.val();
        const mpinModal = new bootstrap.Modal(
          document.getElementById("mpinModal"),
          { backdrop: "static", keyboard: false }
        );

        $("#mpinModalTitle").text(
          mpin ? "Enter Your MPIN" : "Set Your Security MPIN"
        );
        mpinModal.show();

        // ✅ mark as done so it won’t trigger again this session
        mpinsubmit = true;
      });
  }
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
        loadUserImages(user.uid);
        clearMpinInputs();
        mpinsubmit = true;
      } else {
        $("#mpinError").removeClass("d-none");
        clearMpinInputs();
        mpinsubmit = false;
      }
    } else {
      userMpinRef.set(inputMpin).then(() => {
        bootstrap.Modal.getInstance(document.getElementById('mpinModal')).hide();
        loadUserImages(user.uid);
        clearMpinInputs();
        mpinsubmit = true;
      });
    }
  });
}

function getMpinValue() {
  let mpin = "";
  document.querySelectorAll(".mpin-box").forEach(input => { mpin += input.value; });
  return mpin;
}

function clearMpinInputs() {
  document.querySelectorAll(".mpin-box").forEach(input => input.value = "");
  document.querySelector(".mpin-box").focus();
}

// --- Data Loading & UI Updates ---
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
        //loadUserImages(uid);
        initProfileEditor();
      } else {
        alert("Could not find your user profile.");
      }
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

// --- Event Listener Initialization ---
function initializeEventListeners() {
  document.querySelectorAll(".mpin-box").forEach((box, idx, arr) => {
    box.addEventListener("input", () => { if (box.value && idx < arr.length - 1) arr[idx + 1].focus(); });
    box.addEventListener("keydown", e => { if (e.key === "Backspace" && !box.value && idx > 0) arr[idx - 1].focus(); });
  });

  $("#submitMpinBtn").on("click", handleMpinSubmit);
  $("#saveMpinBtn").on("click", handleMpinSave);
  $("#logoutBtn").on("click", () => auth.signOut());
  $(".mpin-box").on("input", () => $("#mpinError").addClass("d-none"));
  
  $('#captureBtn').on('click', () => window.location.href = './capture.html');
  $('#partyBtn').on('click', () => window.location.href = './assistant/music.html');
  $('#trainerBtn').on('click', () => window.location.href = './assistant/trainer.html');
  $('#shareBtn').on('click', async () => {
  const siteLink = "https://your-site-link.com"; // 🔗 replace with your site URL

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'ProBody',
        text: 'Track your fitness journey with me on ProBody 💪',
        url: siteLink
      });
    } catch (err) {
      console.warn("Share canceled:", err);
    }
  } else {
    // Fallback for devices without native share
    navigator.clipboard.writeText(siteLink)
      .then(() => alert("Link copied to clipboard ✅"))
      .catch(() => alert("Could not copy link"));
  }
});
  $('#communityBtn').on('click', () => {
  // Replace with your community link (e.g., WhatsApp group, Discord, Telegram, Forum, etc.)
  const communityLink = "https://whatsapp.com/channel/0029VbBQ8DtLtOjInQGEu80j";
  window.open(communityLink, "_blank");
});

  $("#toggleCompareBtn").on("click", toggleCompareMode);
  initCompareSlider();

  $("#nextImg").on("click", () => { if (galleryImages.length) showImageInModal((currentIndex + 1) % galleryImages.length); });
  $("#prevImg").on("click", () => { if (galleryImages.length) showImageInModal((currentIndex - 1 + galleryImages.length) % galleryImages.length); });
  $("#deleteImg").on("click", function () {
  const img = $(this).data("img");
  if (!img) return;

  if (!confirm("Are you sure you want to delete this image?")) return;

  const uid = auth.currentUser.uid;
  const storageRef = storage.refFromURL(img.url);
  const dbRef = db.ref(`users/${uid}/gallery/${img.date}/${img.tag}`);

  // 1. Delete from Firebase Storage
  storageRef.delete()
    .then(() => {
      // 2. Delete entry from Realtime Database
      return dbRef.remove();
    })
    .then(() => {
      // 3. Decrease uploads count
      return db.ref(`users/${uid}/uploads`).transaction(n => (n || 0) - 1);
    })
    .then(() => {
      alert("Image deleted successfully ✅");
      loadUserImages(uid);
      if (imageModal) imageModal.hide();
    })
    .catch(err => {
      console.error("Error deleting image:", err);
      alert("Failed to delete image ❌. Please try again.");
    });
});
  
}

// --- Profile & Settings ---
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

function getLocalDateKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
    const today = getLocalDateKey(); // <-- Local date (YYYY-MM-DD)

    userRef.child("progressLogs").child(today).update({
      weight: updates.weight,
      updatedAt: Date.now()
    });

    updateUI(updates);
    initProfileEditor();
  });
}

// Update displayed value when slider changes
$("#weightInputRange").on("input", function() {
  $("#weightInputValue").text($(this).val());
});

// YES button: open weight input modal
$("#weightYesBtn").on("click", () => {
  const currentWeight = parseInt($("#progressWeight").text()) || 70;
  $("#weightInputRange").val(currentWeight);
  $("#weightInputValue").text(currentWeight);
  const modal = new bootstrap.Modal(document.getElementById("weightInputModal"));
  modal.show();
});

// Save button inside the modal
$("#saveWeightInputBtn").on("click", () => {
  const user = auth.currentUser;
  if (!user) return;

  const selectedWeight = parseInt($("#weightInputRange").val()) || 70;
  const todayKey = getLocalDateKey(); // YYYY-MM-DD
  const updates = {};
  updates[`users/${user.uid}/settings/weightCheckedToday`] = true;
  updates[`users/${user.uid}/progressLogs/${todayKey}`] = {
    weight: selectedWeight,
    updatedAt: Date.now()
  };

  firebase.database().ref().update(updates)
    .then(() => {
      $("#progressWeight").text(selectedWeight); // Update UI
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById("weightInputModal"));
      modalInstance.hide();
    });
});

// NO button: save current displayed weight without popup
$("#weightNoBtn").on("click", () => {
  const user = auth.currentUser;
  if (!user) return;

  const currentWeight = parseInt($("#progressWeight").text()) || 0;
  const todayKey = getLocalDateKey(); // YYYY-MM-DD

  db.ref(`users/${user.uid}/progressLogs/${todayKey}`).update({
    weight: currentWeight,
    updatedAt: Date.now()
  }).then(() => {
    // mark as NOT manually checked
    db.ref(`users/${user.uid}/settings`).update({ weightCheckedToday: false });
  });
});

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

// --- Gallery & Image Logic ---
function loadUserImages(uid) {
    
    const grid = $("#galleryGrid");
    const galleryRef = db.ref(`users/${uid}/gallery`);

    galleryRef.once("value").then(snapshot => {
        if (!snapshot.exists()) {
            $("#galleryPlaceholder").removeClass("d-none");
            return;
        }

        $("#galleryPlaceholder").addClass("d-none");
        const galleryData = snapshot.val();
        
        galleryImageData = []; 
        const sortedDates = Object.keys(galleryData).sort((a, b) => new Date(a) - new Date(b));

        sortedDates.forEach(date => {
            const tags = galleryData[date];
            Object.entries(tags).forEach(([tag, url]) => {
                galleryImageData.push({ url, date, tag });
            });
        });

        const reversedDatesForGrid = Object.keys(galleryData).sort((a, b) => new Date(b) - new Date(a));
        const imagesByDate = {};
        reversedDatesForGrid.forEach(date => { imagesByDate[date] = galleryData[date]; });
        
        grid.empty();
        renderImageBatch(grid, imagesByDate);
        $(".image-card").off("click").on("click", handleImageClick);

        if (galleryImageData.length > 1) {
            $("#generateReelBtn").removeClass("d-none");
        } else {
            $("#generateReelBtn").addClass("d-none");
        }
    });
}

function renderImageBatch(grid, imagesByDate) {
    Object.entries(imagesByDate).forEach(([date, tags]) => {
        if ($(`.date-header[data-date="${date}"]`).length === 0) {
             grid.append(`<div class="col-12 date-header" data-date="${date}"><h6 class="fw-bold mt-3 mb-2 text-gradient">${new Date(date).toLocaleString("en-US", { month: "short", day: "2-digit" })}</h6></div>`);
        }
       
        Object.entries(tags).forEach(([tag, url]) => {
            const imageId = `${date}-${tag}`;
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
}

function handleImageClick() {
    if (isCompareModeActive) {
        handleCompareSelection(this);
    } else {
        openImageViewer(this);
    }
}

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

// --- Image Comparison Logic ---
function toggleCompareMode() {
    isCompareModeActive = !isCompareModeActive;
    $("#galleryTab").toggleClass("compare-mode", isCompareModeActive);
    $("#toggleCompareBtn").toggleClass("active", isCompareModeActive);
    
    if (isCompareModeActive) {
        $("#compareIndicator").removeClass("d-none").addClass("d-flex");
    } else {
        $("#compareIndicator").addClass("d-none").removeClass("d-flex");
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
        compareSelection.splice(existingIndex, 1);
        card.removeClass("selected");
    } else {
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
    $("#sliderBar").css("left", "50%");
    $(".overlay").css("clip-path", "inset(0 50% 0 0)");
    const modal = new bootstrap.Modal(document.getElementById("compareModal"));
    modal.show();
    toggleCompareMode();
}

function initCompareSlider() {
    const slider = document.getElementById('sliderBar');
    if (!slider) return;
    const container = slider.parentElement;
    let isDragging = false;
    const startDrag = () => { isDragging = true; };
    const endDrag = () => { isDragging = false; };
    const onDrag = (e) => {
        if (!isDragging) return;
        const rect = container.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
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

window.showTab = function (tabId) {
  // If switching to gallery, check MPIN first
  if (tabId !== "progressTab" && auth.currentUser) {
    checkMpinAndLoadData(auth.currentUser.uid);
  }

  // Normal tab switching
  $('.tab-content').addClass('d-none');
  $('#' + tabId).removeClass('d-none');
  $('.navbar .btn').removeClass('active');
  $(`.navbar .btn[onclick="showTab('${tabId}')"]`).addClass('active');
};

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

function initializeNavbarScroll() {
  const navbar = document.querySelector('.navbar.fixed-bottom');
  if (!navbar) return;
  let lastScrollTop = 0;
  const scrollThreshold = 10;
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) return;
    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
}

// ==========================
// Module-level variables
// ==========================
let selectedImages = [];
let sliderTimeout;
let playInterval;
let isPlaying = false;

// Canvas preview
const canvas = document.getElementById("editorPreviewCanvas");
const ctx = canvas.getContext("2d");
const PREVIEW_WIDTH = canvas.width;
const PREVIEW_HEIGHT = canvas.height;

// ==========================
// Debug log helper
// ==========================
function logEditor(msg) {
  const log = document.getElementById("editorLog");
  const time = new Date().toLocaleTimeString();
  log.innerHTML += `[${time}] ${msg}<br>`;
  log.scrollTop = log.scrollHeight;
}

// ==========================
// Show scene by index
// ==========================
function showScene(idx) {
  if (!selectedImages.length) return;
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = selectedImages[idx].url;

  img.onload = () => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);

    const aspect = img.width / img.height;
    const targetAspect = PREVIEW_WIDTH / PREVIEW_HEIGHT;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (aspect > targetAspect) {
      drawWidth = PREVIEW_HEIGHT * aspect;
      drawHeight = PREVIEW_HEIGHT;
      offsetX = (PREVIEW_WIDTH - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = PREVIEW_WIDTH;
      drawHeight = PREVIEW_WIDTH / aspect;
      offsetX = 0;
      offsetY = (PREVIEW_HEIGHT - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    $(".timeline-scenes .scene").removeClass("active").eq(idx).addClass("active");
    updateTimeIndicator(idx, selectedImages.length);
    logEditor(`Scene ${idx + 1} displayed`);
  };

  img.onerror = () => logEditor(`Failed to load scene ${idx + 1}`);
}

// ==========================
// Update time indicator
// ==========================
function updateTimeIndicator(idx, total) {
  const duration = 1; // seconds per scene
  const format = (s) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  $(".time-indicator").text(`${format(idx*duration)} / ${format(total*duration)}`);
}

// ==========================
// Generate reel modal
// ==========================
$("#generateReelBtn").on("click", () => {
  if (!galleryImageData || !galleryImageData.length) {
    alert("No images in your gallery.");
    return;
  }

  const dates = galleryImageData.map(img => img.date).filter(Boolean);
  $("#fromDate").val(Math.min(...dates));
  $("#toDate").val(Math.max(...dates));
  $("#poseFilter").val("all");

  $("#videoEditorFilterModal").modal("show");
});

// ==========================
// Filter form submission
// ==========================
$("#videoEditorFilterForm").on("submit", function(e) {
  e.preventDefault();
  $("#videoEditorFilterModal").modal("hide");

  const from = $("#fromDate").val();
  const to = $("#toDate").val();
  const pose = $("#poseFilter").val();

  selectedImages = galleryImageData.filter(img =>
    (!from || img.date >= from) &&
    (!to || img.date <= to) &&
    (pose === "all" || img.tag === pose)
  );

  if (!selectedImages.length) {
    alert("No images match the selected filters.");
    return;
  }

  // Show modal
  new bootstrap.Modal(document.getElementById("videoEditorModal")).show();

  buildTimeline(selectedImages);
  showScene(0);
  initSlider();
  initPlayPause();
  initExport();
});

// ==========================
// Build timeline strip
// ==========================
function buildTimeline(images) {
  const strip = $(".timeline-scenes").empty();
  images.forEach((img, i) => {
    const thumb = $("<img>").attr({ src: img.url, alt: `Scene ${i+1}` })
                            .css({ objectFit:"cover", width:"100%", height:"100%" });
    $("<div>").addClass("scene").attr("data-index", i).append(thumb).appendTo(strip);
  });

  $(".timeline-scenes .scene").off("click").on("click", function() {
    const idx = $(this).data("index");
    showScene(idx);
    $("#timelineSlider").val((idx / (selectedImages.length - 1)) * 100);
  });
}

// ==========================
// Initialize slider
// ==========================
function initSlider() {
  $("#timelineSlider").off("input").on("input", function() {
    if (selectedImages.length <= 1) return;
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
      const idx = Math.floor((this.value / 100) * (selectedImages.length - 1));
      showScene(idx);
    }, 50);
  });
}

// ==========================
// Initialize play/pause
// ==========================
function initPlayPause() {
  $("#playPauseBtn").off("click").on("click", function() {
    if (!selectedImages.length) return;

    if (isPlaying) {
      clearInterval(playInterval);
      $(this).text("play_arrow");
      isPlaying = false;
      logEditor("Playback paused");
    } else {
      let idx = $(".timeline-scenes .scene.active").data("index") || 0;
      $(this).text("pause");
      isPlaying = true;
      logEditor("Playback started");

      playInterval = setInterval(() => {
        showScene(idx);
        $("#timelineSlider").val((idx / (selectedImages.length - 1)) * 100);
        idx++;
        if (idx >= selectedImages.length) {
          clearInterval(playInterval);
          $("#playPauseBtn").text("play_arrow");
          isPlaying = false;
          logEditor("Playback ended");
        }
      }, 1000);
    }
  });
}

// ==========================
// Initialize export
// ==========================
function initExport() {
  $("#exportVideoBtn").off("click").on("click", function() {
    $(this).prop("disabled", true).html('<i class="material-icons me-1">hourglass_empty</i> Exporting...');
    exportReel(selectedImages, 1, "My Progress", "The End")
      .then(() => {
        $(this).prop("disabled", false).html('<i class="material-icons me-1">download</i> Export Video');
        logEditor("Export completed");
      })
      .catch(err => {
        console.error(err);
        alert("Export failed!");
        $(this).prop("disabled", false).html('<i class="material-icons me-1">download</i> Export Video');
        logEditor("Export failed");
      });
  });
}

// ==========================
// Export reel function
// ==========================
async function exportReel(images, fps = 1, title = "My Progress", ending = "The End") {
  if (!window.MediaRecorder) {
    alert("Your browser does not support video recording.");
    return;
  }

  const exportCanvas = document.createElement("canvas");
  const exportCtx = exportCanvas.getContext("2d");
  const width = 720, height = 480;
  exportCanvas.width = width;
  exportCanvas.height = height;

  const stream = exportCanvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];
  recorder.ondataavailable = e => { if(e.data.size>0) chunks.push(e.data); };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reel-${new Date().toISOString().slice(0,10)}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      resolve(blob);
    };
    recorder.onerror = () => reject(new Error("MediaRecorder error"));
    recorder.start();

    let idx = -1;
    function drawTextCard(text) {
      exportCtx.fillStyle = "#000";
      exportCtx.fillRect(0,0,width,height);
      exportCtx.fillStyle = "#fff";
      exportCtx.font = "bold 40px Inter, sans-serif";
      exportCtx.textAlign = "center";
      exportCtx.textBaseline = "middle";
      exportCtx.fillText(text, width/2, height/2);
    }

    const drawNext = () => {
      idx++;
      if(idx===0) { drawTextCard(title); setTimeout(drawNext, 1000); return; }
      const imgIdx = idx-1;
      if(imgIdx<images.length){
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = images[imgIdx].url;
        img.onload = () => {
          exportCtx.fillStyle = "#000";
          exportCtx.fillRect(0,0,width,height);

          const aspect = img.width/img.height;
          const targetAspect = width/height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if(aspect>targetAspect){
            drawWidth = height*aspect;
            drawHeight = height;
            offsetX = (width-drawWidth)/2;
            offsetY = 0;
          } else {
            drawWidth = width;
            drawHeight = width/aspect;
            offsetX = 0;
            offsetY = (height-drawHeight)/2;
          }

          exportCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          setTimeout(drawNext, 1000/fps);
        };
        img.onerror = () => setTimeout(drawNext, 1000/fps);
      } else {
        drawTextCard(ending);
        setTimeout(()=>recorder.stop(),1000);
      }
    };

    drawNext();
  });
}