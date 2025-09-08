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
      checkMpinAndLoadData(user.uid);
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

// --- Authentication & Security ---
function checkMpinAndLoadData(uid) {
  db.ref(`users/${uid}/mpin`).once("value")
    .then(snapshot => {
      const mpin = snapshot.val();
      const mpinModal = new bootstrap.Modal(document.getElementById('mpinModal'), { backdrop: 'static', keyboard: false });
      $("#mpinModalTitle").text(mpin ? 'Enter Your MPIN' : 'Set Your Security MPIN');
      mpinModal.show();
    });
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
        loadUserImages(uid);
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

  $("#toggleCompareBtn").on("click", toggleCompareMode);
  initCompareSlider();

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

// --- General UI & Chart Logic ---
window.showTab = function (tabId) {
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

// When user clicks Generate button → open filter modal
$("#generateReelBtn").on("click", function () {
  // Check if galleryImageData exists and has images
  if (!galleryImageData || !Array.isArray(galleryImageData) || galleryImageData.length === 0) {
    alert("No images in your gallery. Please add images to create a reel.");
    return;
  }

  // Prefill date filters
  const dates = galleryImageData.map(img => img.date).filter(date => date);
  if (dates.length === 0) {
    alert("No valid dates found in gallery images.");
    return;
  }
  const minDate = dates.reduce((a, b) => (a < b ? a : b));
  const maxDate = dates.reduce((a, b) => (a > b ? a : b));
  $("#fromDate").val(minDate);
  $("#toDate").val(maxDate);
  $("#poseFilter").val("all");

  // Show filter modal
  $("#videoEditorFilterModal").modal("show");
});

// After filter submission → gather images → open editor modal
$("#videoEditorFilterForm").on("submit", function (e) {
  e.preventDefault();
  $("#videoEditorFilterModal").modal("hide");

  const from = $("#fromDate").val();
  const to = $("#toDate").val();
  const pose = $("#poseFilter").val();

  // Validate date inputs
  if (from && to && new Date(from) > new Date(to)) {
    alert("The 'From' date cannot be later than the 'To' date.");
    return;
  }

  // Filter images
  const selectedImages = galleryImageData.filter(img => {
    return (!from || img.date >= from) &&
           (!to || img.date <= to) &&
           (pose === "all" || img.tag === pose);
  });

  if (selectedImages.length === 0) {
    alert("No images match the selected filters. Please adjust your criteria.");
    return;
  }

  // Open video editor modal
  const videoModal = new bootstrap.Modal(document.getElementById("videoEditorModal"));
  videoModal.show();

  // Build scenes strip with thumbnails
  const sceneStrip = $(".timeline-scenes").empty();
  selectedImages.forEach((img, i) => {
    const thumb = $("<img>")
      .attr("src", img.url)
      .attr("alt", `Scene ${i + 1}`)
      .css({ "object-fit": "cover", width: "100%", height: "100%" });

    $("<div>")
      .addClass("scene")
      .attr("data-index", i)
      .append(thumb)
      .append(`<div class="scene-label">Scene ${i + 1}</div>`)
      .appendTo(sceneStrip);
  });

  // Load first preview
  $("#editorPreviewImg").attr("src", selectedImages[0].url);
  $(".timeline-scenes .scene").removeClass("active").first().addClass("active");

  // Update time indicator
  updateTimeIndicator(0, selectedImages.length);

  // Slider → update preview + highlight (debounced for performance)
  let sliderTimeout;
  $("#timelineSlider").off("input").on("input", function () {
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
      const idx = Math.floor((this.value / 100) * (selectedImages.length - 1));
      $("#editorPreviewImg").attr("src", selectedImages[idx].url);
      $(".timeline-scenes .scene").removeClass("active").eq(idx).addClass("active");
      updateTimeIndicator(idx, selectedImages.length);
    }, 50); // Debounce to reduce DOM thrashing
  });

  // Scene click → update preview + slider
  $(".timeline-scenes .scene").off("click").on("click", function () {
    const idx = $(this).data("index");
    $("#editorPreviewImg").attr("src", selectedImages[idx].url);
    $("#timelineSlider").val((idx / (selectedImages.length - 1)) * 100);
    $(".timeline-scenes .scene").removeClass("active");
    $(this).addClass("active");
    updateTimeIndicator(idx, selectedImages.length);
  });

  // Update time indicator based on current scene
  function updateTimeIndicator(index, totalScenes) {
    const durationPerScene = 1; // 1 second per scene (matches 1 fps export)
    const currentTime = index * durationPerScene;
    const totalTime = (totalScenes - 1) * durationPerScene;
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    $(".time-indicator").text(`${formatTime(currentTime)} / ${formatTime(totalTime)}`);
  }



function convertImageToBase64(url, callback) {
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // Attempt to handle CORS
  img.src = url;

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      ctx.drawImage(img, 0, 0);
      const base64String = canvas.toDataURL('image/png');
      callback(null, base64String);
    } catch (error) {
      callback(error, null);
    }
  };

  img.onerror = () => {
    callback(new Error('Failed to load image'), null);
  };
}
const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/probody-deec4.firebasestorage.app/o/photos%2FJtqgbNeM0OT3brgTeGgJgSfkaBb2%2F2025-09-07%2Ffront-1757288416513.png?alt=media&token=190910b7-13a4-4488-9aa6-f21c92444821';


async function exportReel(selectedImages, fps = 1) {
  if (!window.MediaRecorder) {
    alert("Your browser does not support video recording. Please use a modern browser like Chrome or Firefox.");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = 720, height = 480;
  canvas.width = width;
  canvas.height = height;

  // Create MediaRecorder from canvas stream
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];

  recorder.ondataavailable = e => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Download automatically
      const a = document.createElement("a");
      a.href = url;
      a.download = `reel-${new Date().toISOString().slice(0, 10)}.webm`;
      a.click();
      URL.revokeObjectURL(url); // Clean up

      resolve(blob);
    };

    recorder.onerror = () => {
      reject(new Error("MediaRecorder encountered an error"));
    };

    recorder.start();

    // Draw frames sequentially using image URLs directly
    let idx = 0;
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle CORS

    function drawNext() {
      if (idx >= selectedImages.length) {
        recorder.stop();
        return;
      }

      img.src = selectedImages[idx].url;
      img.onload = () => {
        try {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, width, height);
          const aspect = img.width / img.height;
          const targetAspect = width / height;
          let drawWidth, drawHeight, offsetX, offsetY;
          if (aspect > targetAspect) {
            drawWidth = height * aspect;
            drawHeight = height;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = width;
            drawHeight = width / aspect;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
          }
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          idx++;
          setTimeout(drawNext, 1000 / fps);
        } catch (error) {
          console.error(`Failed to draw image at index ${idx}:`, error);
          idx++;
          setTimeout(drawNext, 1000 / fps);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image at index ${idx}: ${selectedImages[idx].url}`);
        idx++;
        setTimeout(drawNext, 1000 / fps);
      };
    }

    drawNext();
  });
}

// [Rest of the code remains unchanged]
  // Hook export button
  $("#exportVideoBtn").off("click").on("click", function () {
    const $btn = $(this);
    $btn
      .addClass("loading")
      .html('<i class="material-icons" style="font-size:1rem;vertical-align:text-bottom;">hourglass_empty</i> Exporting...')
      .prop("disabled", true);

    exportReel(selectedImages, 1).then(() => {
      $btn
        .removeClass("loading")
        .html('<i class="material-icons" style="font-size:1rem;vertical-align:text-bottom;">download</i> Export Video')
        .prop("disabled", false);
    }).catch(err => {
      console.error("Export failed:", err);
      alert("Failed to export video. Please try again.");
      $btn
        .removeClass("loading")
        .html('<i class="material-icons" style="font-size:1rem;vertical-align:text-bottom;">download</i> Export Video')
        .prop("disabled", false);
    });
  });
});