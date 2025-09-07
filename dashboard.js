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
  initializeVideoPlayer();

// In your main $(function() { ... }) block
$(document).on('click', '#generateReelBtn', () => {
      openReelFilterModal();
  });
$('#confirmGenerateBtn').on('click', () => {
    const fromDate = $('#fromDate').val();
    const toDate = $('#toDate').val();
    const tag = $('#tagFilter').val();

    const filteredImages = galleryImageData.filter(image => {
      const isDateInRange = image.date >= fromDate && image.date <= toDate;
      const isTagMatch = (tag === 'all') || (image.tag === tag);
      return isDateInRange && isTagMatch;
    });

    if (filteredImages.length < 2) {
      alert("Fewer than two images match your filter criteria. Please select a wider range.");
      return;
    }

    // --- CHANGE: Pass the entire array of filtered image objects, not just the URLs ---
    const userName = $("#progressUserName").text() || 'My';

    bootstrap.Modal.getInstance(document.getElementById('reelFilterModal')).hide();
    
    // Call the generator with the full data
    generateReelWithCanvas(filteredImages, userName);
  });
  // --- PWA Installation Logic ---
  const $installCard = $(".premium-card");
  const isPWAInstalled = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (!isPWAInstalled()) {
      $installCard.hide();
      window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          deferredPrompt = e;
          $installCard.fadeIn(400);
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
  
  $("#pwaInstallBtn").on("click", async () => {
      if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt = null;
          $(".premium-card").fadeOut(300);
      }
  });
  $("#pwaDismissBtn").on("click", () => $(".premium-card").fadeOut(300));
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

// --- Helper: render segment with real time ---
function renderSegment(durationSec, onFrame) {
    return new Promise(resolve => {
        const start = performance.now();
        function step(now) {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(1, elapsed / Math.max(0.0001, durationSec));
            try { onFrame(progress); } catch (e) { console.error(e); }
            if (progress < 1) requestAnimationFrame(step);
            else resolve();
        }
        requestAnimationFrame(step);
    });
}
function initializeVideoPlayer() {
    const container = document.getElementById('reelsPlayerContainer');
    const video = document.getElementById('reelsVideo');
    
    if (!container || !video) return; // Guard clause is still important

    const playButton = container.querySelector('.play-pause-btn');
    
    // Logic for playing the video
    const togglePlay = () => video.paused ? video.play() : video.pause();
    video.addEventListener('play', () => container.classList.add('is-playing'));
    video.addEventListener('pause', () => container.classList.remove('is-playing'));
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
}
async function generateReelWithCanvas(imagesData, userName) {
    const generateBtn = $('#generateReelBtn');
    const progressModal = new bootstrap.Modal(document.getElementById('timelapseProgressModal'));
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const modalProgressImage = document.getElementById('modalProgressImage');

    generateBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...');
    progressBar.style.width = '0%';
    progressText.textContent = 'Initializing video generator...';
    modalProgressImage.style.display = 'none';
    progressModal.show();

    const WIDTH = 1080, HEIGHT = 1920;
    const DURATION_PER_IMAGE = 2;
    const TRANSITION_DURATION = 0.5;
    const FPS = 30;

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    const stream = canvas.captureStream(FPS);
    const audioTrack = await createAudioTrack(imagesData.length * DURATION_PER_IMAGE);
    if(audioTrack) stream.addTrack(audioTrack);
    
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9,opus' });
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        
        const videoElement = document.getElementById('reelsVideo');
        const downloadButton = document.getElementById('reelsDownloadBtn');
        videoElement.src = videoUrl;
        videoElement.poster = '';
        downloadButton.href = videoUrl;
        downloadButton.download = `ProBody-Reel-${new Date().toISOString().split('T')[0]}.webm`;
        
        progressModal.hide();
        generateBtn.prop('disabled', false).html('<i class="material-icons" style="font-size: 1rem; vertical-align: text-bottom;">movie</i> Generate Reel');
        videoElement.scrollIntoView({ behavior: 'smooth' });
    };

    recorder.start();
    
    // --- CHANGE: Pre-load images from the new data structure ---
    const loadedImages = await Promise.all(imagesData.map(data => loadImage(data.url).catch(() => null)));
    
    // Main Rendering Loop
    for (let i = -1; i < imagesData.length; i++) {
        const currentImage = i >= 0 ? loadedImages[i] : null;
        // --- CHANGE: Get the date string for the current image ---
        const currentDate = i >= 0 ? imagesData[i].date : null; 
        const nextImage = i >= 0 && (i + 1) < loadedImages.length ? loadedImages[i + 1] : null;

        if (i >= 0 && !currentImage) continue; // Skip failed images

        const totalFramesInSegment = DURATION_PER_IMAGE * FPS;
        for (let frame = 0; frame < totalFramesInSegment; frame++) {
            const progressInSegment = frame / totalFramesInSegment;
            const overallProgress = (i + 1 + progressInSegment) / (imagesData.length + 1);
            progressBar.style.width = `${overallProgress * 100}%`;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            
            if (i === -1) {
                progressText.textContent = 'Creating Title Card...';
                modalProgressImage.style.display = 'none';
                drawTitleCard(ctx, userName, progressInSegment);
            } else {
                progressText.textContent = `Rendering image ${i + 1} of ${imagesData.length}...`;
                modalProgressImage.src = imagesData[i].url;
                modalProgressImage.style.display = 'block';

                const scale = 1 + progressInSegment * 0.1;
                drawKenBurns(ctx, currentImage, scale, 0, 0);

                // --- NEW: Draw the date overlay on top of the image ---
                drawDateOverlay(ctx, currentDate);

                if (nextImage && progressInSegment > (1 - TRANSITION_DURATION / DURATION_PER_IMAGE)) {
                    const transitionProgress = (progressInSegment - (1 - TRANSITION_DURATION / DURATION_PER_IMAGE)) / (TRANSITION_DURATION / DURATION_PER_IMAGE);
                    ctx.globalAlpha = transitionProgress;
                    drawKenBurns(ctx, nextImage, 1, 0, 0);
                    // Also draw the next date during the transition for a smoother effect
                    drawDateOverlay(ctx, imagesData[i + 1].date);
                    ctx.globalAlpha = 1;
                }
            }
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
    }
    
    progressText.textContent = 'Finalizing video...';
    setTimeout(() => {
        recorder.stop();
    }, 500);
}

/**
 * NEW HELPER FUNCTION
 * Draws a formatted date overlay onto the canvas for the timelapse effect.
 */
function drawDateOverlay(ctx, dateString) {
    if (!dateString) return;

    // Format the date string (e.g., "YYYY-MM-DD") into a more readable format
    // Adding UTC timezone prevents off-by-one day errors across different user timezones
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    const canvas = ctx.canvas;
    const padding = 30;
    const fontSize = 48;
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    
    const textMetrics = ctx.measureText(formattedDate);
    const rectHeight = fontSize + padding;
    const rectWidth = textMetrics.width + padding;
    
    // Draw a semi-transparent background bar for readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(padding / 2, canvas.height - rectHeight - (padding / 2), rectWidth, rectHeight);
    
    // Draw the white date text on top
    ctx.fillStyle = 'white';
    ctx.fillText(formattedDate, padding, canvas.height - padding);
}
// --- Title Card ---
function drawTitleCard(ctx, text, progress) {
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#1db954');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    const fadeIn = Math.min(1, progress * 4);
    const slideUp = (1 - progress) * 50;
    ctx.save();
    ctx.globalAlpha = fadeIn;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // big title
    const titleSize = Math.floor(Math.max(24, W * 0.088)); // responsive fallback
    ctx.font = `bold ${titleSize}px Inter, Arial, sans-serif`;
    ctx.fillText(`${text}'s`, W / 2, H / 2 - 60 + slideUp);

    // subtitle
    const subSize = Math.floor(Math.max(16, W * 0.044));
    ctx.font = `${subSize}px Inter, Arial, sans-serif`;
    ctx.fillText('Progress Journey', W / 2, H / 2 + 60 + slideUp);
    ctx.restore();
}

// --- Ken Burns Effect ---
function drawKenBurns(ctx, img, scale = 1, panX = 0, panY = 0) {
    if (!img || !img.width || !img.height) return;
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const sw = img.width * ratio * scale;
    const sh = img.height * ratio * scale;
    const x = (canvas.width - sw) / 2 + panX;
    const y = (canvas.height - sh) / 2 + panY;
    ctx.drawImage(img, x, y, sw, sh);
}

// --- Audio: returns { track, stop } or null ---
async function createAudioTrack(durationSec) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;

        const ctx = new AudioCtx();
        const res = await fetch('https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde64f172.mp3');
        const arrayBuf = await res.arrayBuffer();
        const buf = await ctx.decodeAudioData(arrayBuf);

        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        // fade out near the end
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + Math.max(0.5, durationSec - 0.5));

        src.connect(gain);
        const dest = ctx.createMediaStreamDestination();
        gain.connect(dest);

        src.start();

        // schedule stop after duration + small buffer
        let stopped = false;
        const stop = () => {
            if (stopped) return;
            stopped = true;
            try { src.stop(); } catch (e) { /* may already be stopped */ }
            try { ctx.close(); } catch (e) { /* ignore */ }
        };
        // safety: set timeout to stop if generate flow fails to call stop
        const timeoutId = setTimeout(stop, (durationSec + 5) * 1000);
        const wrappedStop = () => { clearTimeout(timeoutId); stop(); };

        const track = dest.stream.getAudioTracks()[0];
        // mark track with stop helper
        return { track, stop: wrappedStop };
    } catch (e) {
        console.warn('createAudioTrack failed', e);
        return null;
    }
}
/**
 * THIS IS THE MISSING FUNCTION
 * Populates and opens the reel filter modal with default date ranges based on the user's gallery.
 */
function openReelFilterModal() {
    // Guard clause: Do nothing if there's no image data to filter.
    if (galleryImageData.length === 0) {
        alert("Your gallery is empty. Add some images first!");
        return;
    }

    // Find the earliest and latest dates from the gallery to set as smart defaults in the form.
    const dates = galleryImageData.map(img => img.date);
    const minDate = dates.reduce((a, b) => a < b ? a : b);
    const maxDate = dates.reduce((a, b) => a > b ? a : b);

    // Populate the form fields with the calculated dates and reset the tag dropdown.
    $('#fromDate').val(minDate);
    $('#toDate').val(maxDate);
    $('#tagFilter').val('all');

    // Use Bootstrap's JavaScript API to create a new modal instance and show it.
    const modal = new bootstrap.Modal(document.getElementById('reelFilterModal'));
    modal.show();
}
// --- Load Image ---
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (ev) => reject(new Error('Failed to load image ' + url));
        img.src = url;
    });
}