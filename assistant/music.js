// =================================================================================
//  ProBody Music Party - Final Script
//  Architecture: Hybrid Sync (Firebase for State, WebRTC for Low-Latency Data)
// =================================================================================

// --- 1. CONFIGURATION & INITIALIZATION ---

const firebaseConfig = {
  apiKey: "AIzaSyCpOy4pqmtIsvJMtgoCzbQkLYTwR61cExk",
  authDomain: "probody-deec4.firebaseapp.com",
  databaseURL: "https://probody-deec4-default-rtdb.firebaseio.com",
  projectId: "probody-deec4",
  storageBucket: "probody-deec4.firebasestorage.app",
  messagingSenderId: "704731000262",
  appId: "1:704731000262:web:4b3f4c4b8a0c4e71a8d6c7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

// --- Global State Variables ---
let isHost = false;
let partyRef, libraryRef, currentStateRef;
let currentTrackIndex = 0;
let userInteracted = false;
let playlistItems = [];
let peers = {}; // For WebRTC connections
let guestPings = {};
let currentUser, userData = { displayName: 'Guest' }, deviceId;
let scanner; // For QR code scanning
const SESSION_KEY = 'musicPartySession';

// --- DOM Element Cache ---
const welcomeScreen = document.getElementById("welcome-screen");
const playerScreen = document.getElementById("player-screen");
const audio = document.getElementById("audioPlayer");
const footerAlbumArt = document.getElementById('footer-album-art');
const footerSongTitle = document.getElementById('footer-song-title');
const footerSongArtist = document.getElementById('footer-song-artist');
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const userDisplayNameEl = document.getElementById('user-display-name');
const guestCountEl = document.getElementById('guest-count');
const partyIdInput = document.getElementById('partyIdInput');
const playPauseBtnCollapsed = document.getElementById('playPauseBtn-collapsed');
const nextBtnCollapsed = document.getElementById('nextBtn-collapsed');
const qrVideo = document.getElementById('qr-video');
const qrModalEl = document.getElementById('qrScannerModal');

// --- Main Application Entry Point ---
$(function () {
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            deviceId = user.uid;
            listenToUserData(deviceId);
            startAppFromState();
        } else {
            window.location.href = '../login.html';
        }
    });

    initializeEventListeners();
});


// --- 2. SESSION & STATE MANAGEMENT ---

function startAppFromState() {
    const urlParams = new URLSearchParams(window.location.search);
    const partyIdFromUrl = urlParams.get('party');
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    const savedPartyId = localStorage.getItem('lastPartyId');

    if (partyIdFromUrl) {
        partyIdInput.value = partyIdFromUrl;
        startGuest(partyIdFromUrl);
    } else if (session?.partyId) {
        session.isHost ? startHost() : startGuest(session.partyId);
    } else if (savedPartyId) {
        partyIdInput.value = savedPartyId;
    }
}

function listenToUserData(userId) {
    db.ref(`users/${userId}`).on('value', s => {
        userData = s.val() || { displayName: 'Guest' };
        if (playerScreen.classList.contains('active')) {
            userDisplayNameEl.textContent = getProcessedDisplayName(userData.displayName);
        }
    });
}

async function disconnect() {
    try {
        if (currentStateRef) currentStateRef.off();
        if (partyRef) partyRef.off();
        if (libraryRef) libraryRef.off();

        Object.values(peers).forEach(p => { p.dc?.close(); p.pc?.close(); });
        peers = {};

        // --- NEW: Clean up signaling data ---
        if (!isHost && partyRef) {
            // Guest removes their data
            await partyRef.child(`guests/${deviceId}`).remove();
            await partyRef.child(`signaling/${deviceId}`).remove(); 
        }
        if (isHost && partyRef) {
            // Host removes the entire party, including all signaling
            await partyRef.remove();
        }
        
        audio.pause();
        audio.src = '';
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem('lastPartyId');
        
        if (document.fullscreenElement) await document.exitFullscreen();
        
        show('welcome');
        isHost = false;
        partyRef = null;
        libraryRef = null;
        currentStateRef = null;

    } catch (err) {
        console.error('Error during disconnect:', err);
        show('welcome');
    }
}


// --- 3. CORE PARTY LOGIC (HYBRID SYNC MODEL) ---

async function startHost() {
    isHost = true;
    const partyId = deviceId;
    partyRef = db.ref(`parties/${partyId}`);
    libraryRef = db.ref(`libraries/${deviceId}`);
    currentStateRef = partyRef.child('currentState');

    await partyRef.set({
        hostId: deviceId,
        hostName: userData.displayName,
        guests: {},
        songsPlayed: 0,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "Active"
    });
    
    await currentStateRef.set({
        trackIndex: 0,
        isPaused: true,
        seekTime: 0,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    show("player");
    playerScreen.classList.add('is-host');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ partyId, isHost: true }));
    loadPartyInfo(partyId);

    partyRef.child('guests').on('child_added', snap => {
        if (!peers[snap.key]) createPeerForGuest(snap.key, snap.val());
    });
    
    libraryRef.on('value', snap => {
        const newPlaylist = snap.exists() ? Object.values(snap.val()) : [];
        updatePlaylist(newPlaylist);
    });

    currentStateRef.on('value', snap => handleStateSync(snap.val()));
}

async function startGuest(partyId) {
    isHost = false;
    partyRef = db.ref(`parties/${partyId}`);
    currentStateRef = partyRef.child('currentState');

    const partyExists = (await partyRef.once('value')).exists();
    if (!partyExists) {
        alert('Party not found!');
        return;
    }

    await partyRef.child(`guests/${deviceId}`).set({ name: userData.displayName });

    show("player");
    playerScreen.classList.add('is-guest');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ partyId, isHost: false }));
    localStorage.setItem('lastPartyId', partyId);
    loadPartyInfo(partyId);

    currentStateRef.on('value', snap => handleStateSync(snap.val()));
    createPeerForHost(partyId);
}

function broadcastState(isAction = false) {
    if (!isHost || !currentStateRef) return;
    
    const state = {
        trackIndex: currentTrackIndex,
        isPaused: audio.paused,
        seekTime: audio.currentTime,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    currentStateRef.set(state);

    if (isAction) {
        Object.values(peers).forEach(p => {
            if (p.dc?.readyState === 'open') {
                p.dc.send(JSON.stringify({ type: 'state', payload: state }));
            }
        });
    }
}

function handleStateSync(state) {
    if (!state || playlistItems.length === 0) return;

    const { trackIndex, isPaused, seekTime, timestamp } = state;
    
    if (currentTrackIndex !== trackIndex) {
        playTrack(trackIndex, false);
    }

    const timeElapsed = (Date.now() - timestamp) / 1000.0;
    const trueCurrentTime = seekTime + timeElapsed;

    if (Math.abs(audio.currentTime - trueCurrentTime) > 1.5) {
        audio.currentTime = trueCurrentTime;
    }

    if (isPaused && !audio.paused) {
        audio.pause();
    } else if (!isPaused && audio.paused && userInteracted) {
        audio.play().catch(e => console.warn("Autoplay was prevented by browser."));
    }
}


// --- 4. MUSIC & PLAYLIST MANAGEMENT ---

function playTrack(index, isHostAction) {
    if (index >= playlistItems.length || index < 0) return;
    
    currentTrackIndex = index;
    const track = playlistItems[index];

    if (!track || !track.url) {
        logToUI(`Skipping invalid track at index ${index}.`, 'error');
        if (isHost) nextBtn.click();
        return;
    }

    if (audio.src !== track.url) {
        audio.src = track.url;
        audio.load();
    }
    
    if (isHostAction) {
        audio.play();
        partyRef.child('songsPlayed').set(firebase.database.ServerValue.increment(1));
        broadcastState(true);
    }
    
    updateSongTitle(track.title || 'Untitled');
    footerSongArtist.textContent = track.artist || 'Unknown Artist';
    
    const art = generateArtForSong(track.title || 'Untitled');
    footerAlbumArt.classList.add('generated-art');
    footerAlbumArt.style.backgroundImage = art.gradient;
    footerAlbumArt.textContent = art.initials;

    document.querySelectorAll('#library-list .list-group-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
}

function updatePlaylist(newPlaylist) {
    const wasEmpty = playlistItems.length === 0;
    playlistItems = newPlaylist;

    const libraryListEl = document.getElementById('library-list');
    libraryListEl.innerHTML = playlistItems.length > 0 ? playlistItems.map((item, idx) => `
        <li class="list-group-item d-flex justify-content-between align-items-center ${idx === currentTrackIndex ? 'active' : ''}">
            <div><div class="fw-bold">${item.title}</div><small class="text-white-50">${item.artist}</small></div>
            ${isHost ? `<button class="btn btn-sm btn-outline-danger" onclick="deleteSong('${item.songId}', '${item.storagePath || ''}')">&times;</button>` : ''}
        </li>`).join('') : '<li class="list-group-item text-center text-white-50">Your library is empty.</li>';
    
    if (isHost && wasEmpty && playlistItems.length > 0) {
        playTrack(0, true);
    }
}

function deleteSong(songId, storagePath) {
    if (!isHost || !songId || !libraryRef) return;
    libraryRef.child(songId).remove();
    if (storagePath) {
        storage.ref(storagePath).delete().catch(err => console.error("Storage delete failed:", err));
    }
}


// --- 5. UI & DOM MANIPULATION ---

function show(screen) {
    welcomeScreen.classList.toggle('active', screen === 'welcome');
    playerScreen.classList.toggle('active', screen === 'player');
}

function loadPartyInfo(partyId) {
  if (!partyId) return;
  partyIdInput.value = partyId;
  const partyInfoRef = db.ref(`parties/${partyId}`);

  partyInfoRef.on("value", (snap) => {
    const data = snap.val();
    if (!data && !isHost) {
        alert("The party has ended.");
        disconnect();
        return;
    }
    if (!data) return;

    const { hostName = "Unknown", guests = {}, status = "Active", songsPlayed = 0, startTime = "--:--" } = data;
    const guestCount = Object.keys(guests).length;
    
    $('#modal-host-name').text(hostName);
    $('#modal-guest-count').text(guestCount);
    $('#guest-count').text(guestCount);
    
    const guestListEl = $('#modal-guest-list');
    guestListEl.empty();
    if (guestCount > 0) {
        Object.values(guests).forEach(guest => guestListEl.append(`<li><span>${guest.name || "Guest"}</span></li>`));
    } else {
        guestListEl.append("<li>No guests have joined yet.</li>");
    }

    $('#party-status').text(status).removeClass('bg-success bg-danger').addClass(status === "Active" ? "bg-success" : "bg-danger");
    $('#songs-played').text(songsPlayed);
    $('#party-start-time').text(startTime);
  });
}

function formatTime(s) { const m = Math.floor((s||0)/60); return `${m}:${(Math.floor((s||0)%60))<10?'0':''}${Math.floor((s||0)%60)}`; }
function getProcessedDisplayName(name) { return name ? name.split(' ')[0] : 'Guest'; }
function logToUI(message, type = 'info') { console.log(`[${type.toUpperCase()}] ${message}`); }

function updateSongTitle(title) {
    const container = document.querySelector('.song-title-container');
    const el = document.getElementById("footer-song-title");
    if (!container || !el) return;
    el.textContent = title;
    requestAnimationFrame(() => {
        el.classList.toggle("animate-scroll", el.scrollWidth > container.clientWidth);
    });
}

function generateArtForSong(title) {
    const colorPalette = [['#00c6ff', '#0072ff'], ['#ff6e7f', '#bfe9ff'], ['#f7971e', '#ffd200'], ['#8e2de2', '#4a00e0'], ['#11998e', '#38ef7d']];
    let hash = 0;
    for (let i = 0; i < title.length; i++) { hash = ((hash << 5) - hash) + title.charCodeAt(i); hash |= 0; }
    const colors = colorPalette[Math.abs(hash) % colorPalette.length];
    const initials = title.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    return { gradient: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, initials: initials || '?' };
}


// --- 6. EVENT LISTENERS & USER INTERACTIONS ---

function initializeEventListeners() {
    $('#hostBtn').on('click', startHost);
    $('#joinBtn').on('click', () => { if (partyIdInput.value.trim()) startGuest(partyIdInput.value.trim()); });
    $('#leaveBtn').on('click', disconnect);
    $('#playPauseBtn, #playPauseBtn-collapsed').on('click', () => { if (isHost) audio.paused ? audio.play() : audio.pause(); });
    $('#prevBtn').on('click', () => isHost && playTrack((currentTrackIndex - 1 + playlistItems.length) % playlistItems.length, true));
    $('#nextBtn, #nextBtn-collapsed').on('click', () => isHost && playTrack((currentTrackIndex + 1) % playlistItems.length, true));
    $('#songFileInput').on('change', e => { if (e.target.files[0]) handleFileUpload(e.target.files[0]); });
    $('#addCustomUrlBtn').on('click', handleAddCustomUrl);
    $('#browsePartiesBtn').on('click', () => {
        new bootstrap.Modal(document.getElementById('partyListModal')).show();
        loadActivePartiesVertical();
    });
    $('#scanQrBtn').on('click', () => new bootstrap.Modal(qrModalEl).show());

    // Audio element listeners
    audio.onplay = () => {
        playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
        playPauseBtnCollapsed.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
        if (isHost) broadcastState(true);
    };
    audio.onpause = () => {
        playPauseBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        playPauseBtnCollapsed.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        if (isHost) broadcastState(true);
    };
    audio.onended = () => { if (isHost) nextBtn.click(); };
    audio.ontimeupdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        seekBar.style.setProperty('--seek-progress', `${progress}%`);
        seekBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    };
    seekBar.onchange = () => {
        if (isHost) {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
            broadcastState(true);
        }
    };
    audio.onloadedmetadata = () => { durationEl.textContent = formatTime(audio.duration); };
    document.body.addEventListener('click', () => { userInteracted = true; }, { once: true });
}


// --- 7. FILE HANDLING & UPLOADS ---

function handleFileUpload(file) {
    if (!isHost || !file) return;
    const songId = libraryRef.push().key;
    const storageRef = storage.ref(`uploads/${deviceId}/${songId}.mp3`);
    const uploadTask = storageRef.put(file);
    const progressContainer = $('#upload-progress-container');
    const progressBar = $('#upload-progress-bar');
    progressContainer.removeClass('d-none');

    uploadTask.on('state_changed',
        snapshot => { progressBar.css('width', (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%'); },
        error => { console.error('Upload failed:', error); progressContainer.addClass('d-none'); },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                const songInfo = parseSongInfo(file.name);
                libraryRef.child(songId).set({ ...songInfo, url, storagePath: uploadTask.snapshot.ref.fullPath, songId });
                progressContainer.addClass('d-none');
            });
        }
    );
}

function handleAddCustomUrl() {
    const url = $('#customSongUrlInput').val().trim();
    if (!isHost || !url) return;
    const filename = decodeURIComponent(url.split("/").pop().split("?")[0]);
    const meta = parseSongInfo(filename);
    const songId = libraryRef.push().key;
    libraryRef.child(songId).set({ ...meta, url, songId });
}

function parseSongInfo(filename) {
    const cleaned = filename.replace(/\.[^/.]+$/, "");
    return cleaned.includes(' - ') ? { artist: cleaned.split(' - ')[0].trim(), title: cleaned.split(' - ').slice(1).join(' - ').trim() } : { artist: 'Unknown Artist', title: cleaned };
}


// --- 8. QR CODE & PARTY DISCOVERY ---

async function fetchAllParties() {
    const snapshot = await db.ref('parties').once('value');
    const parties = snapshot.val();
    if (!parties) return [];
    return Object.entries(parties).map(([partyId, data]) => ({
        partyId,
        hostName: data.hostName,
        memberCount: data.guests ? Object.keys(data.guests).length + 1 : 1
    }));
}

async function loadActivePartiesVertical() {
    const parties = await fetchAllParties();
    const container = $('#activePartiesList');
    container.empty();
    if (parties.length === 0) {
        container.html('<p class="text-white-50 mb-0">No active parties found.</p>');
        return;
    }
    parties.forEach(party => {
        const card = $(`<div class="party-card"><div class="party-info"><div class="party-icon"><i class="bi bi-music-note-beamed"></i></div><div><div class="host-name">${party.hostName}</div><div class="text-white-50 small">Party ID: ${party.partyId}</div></div></div><div class="member-count">${party.memberCount}</div></div>`);
        card.on('click', () => {
            partyIdInput.value = party.partyId;
            bootstrap.Modal.getInstance(document.getElementById('partyListModal')).hide();
        });
        container.append(card);
    });
}

function stopScanner() {
    if (scanner) {
        scanner.stop().catch(() => {});
        scanner = null;
    }
}

qrModalEl.addEventListener('shown.bs.modal', () => {
    stopScanner();
    scanner = new Instascan.Scanner({ video: qrVideo, mirror: false });
    scanner.addListener('scan', content => {
        if (content) {
            partyIdInput.value = content.trim();
            stopScanner();
            bootstrap.Modal.getInstance(qrModalEl)?.hide();
            startGuest(content.trim());
        }
    });
    Instascan.Camera.getCameras().then(cameras => {
        if (cameras.length > 0) {
            scanner.start(cameras.find(c => c.name.toLowerCase().includes('back')) || cameras[0]);
        }
    }).catch(err => console.error(err));
});

qrModalEl.addEventListener('hidden.bs.modal', stopScanner);

infoModal.addEventListener('show.bs.modal', () => {
    if (isHost) {
        new QRious({
            element: document.getElementById('qr-code-canvas'),
            value: deviceId,
            size: 200,
            background: 'white',
            foreground: '#0c0c0c'
        });
    }
});


// --- 9. WEBRTC COMMUNICATION (FOR NON-CRITICAL DATA) ---

/**
 * Creates and manages a WebRTC peer connection for a new guest. (Called by the Host)
 * @param {string} guestId - The unique ID of the guest to connect to.
 * @param {object} guestInfo - Information about the guest (e.g., name).
 */
function createPeerForGuest(guestId, guestInfo) {
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    // The Data Channel is where messages are sent.
    const dc = pc.createDataChannel("partyData");
    peers[guestId] = { pc, dc };

    // 1. When the host finds a network path (ICE candidate), send it to the guest via Firebase.
    pc.onicecandidate = event => {
        if (event.candidate) {
            partyRef.child(`signaling/${guestId}/hostCandidates`).push(event.candidate.toJSON());
        }
    };

    // 2. Define what happens when the direct connection is successfully established.
    dc.onopen = () => {
        logToUI(`WebRTC connection established with ${guestInfo.name || 'guest'}!`, 'success');
        // You can send a welcome message or initial state here if needed.
    };
    
    dc.onclose = () => {
        logToUI(`${guestInfo.name || 'guest'} has disconnected.`, 'info');
    };
    
    // Host listens for pings from guests to measure latency.
    dc.onmessage = event => {
        const data = JSON.parse(event.data);
        if (data.type === 'pong') {
            guestPings[guestId] = Date.now() - data.payload;
        }
    };

    // 3. The host now creates an "offer" to start the connection.
    pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
            // 4. Place the offer in Firebase for the guest to find.
            const offerPayload = { sdp: pc.localDescription.sdp, type: pc.localDescription.type };
            partyRef.child(`signaling/${guestId}/offer`).set(offerPayload);
        });

    // 5. The host listens for the guest's "answer".
    partyRef.child(`signaling/${guestId}/answer`).on('value', snapshot => {
        if (snapshot.exists() && !pc.currentRemoteDescription) {
            pc.setRemoteDescription(new RTCSessionDescription(snapshot.val()));
        }
    });

    // 6. The host listens for ICE candidates from the guest.
    partyRef.child(`signaling/${guestId}/guestCandidates`).on('child_added', snapshot => {
        if (snapshot.exists()) {
            pc.addIceCandidate(new RTCIceCandidate(snapshot.val()));
        }
    });
}


/**
 * Creates a WebRTC peer connection to the host. (Called by the Guest)
 * @param {string} partyId - The ID of the party, which is the host's UID.
 */
async function createPeerForHost(partyId) {
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // The guest's peer connection will be stored here for access.
    // Note: The original file had a `peerConnection` global variable, this is where it's used.
    let peerConnection = pc; 

    // 1. When the guest finds a network path, send it to the host via Firebase.
    pc.onicecandidate = event => {
        if (event.candidate) {
            partyRef.child(`signaling/${deviceId}/guestCandidates`).push(event.candidate.toJSON());
        }
    };

    // 2. The guest doesn't create a data channel; it waits to receive one from the host.
    pc.ondatachannel = event => {
        const dataChannel = event.channel;
        
        dataChannel.onopen = () => {
            logToUI('WebRTC connection to host is open!', 'success');
            // Start sending pings to the host to measure latency.
            setInterval(() => {
                if(dataChannel.readyState === 'open') {
                    dataChannel.send(JSON.stringify({ type: 'ping', payload: Date.now() }));
                }
            }, 3000);
        };
        
        dataChannel.onmessage = event => {
            // The guest can receive messages from the host here (e.g., reactions, etc.)
        };
    };

    // 3. The guest listens for the host's offer.
    partyRef.child(`signaling/${deviceId}/offer`).on('value', async (snapshot) => {
        if (snapshot.exists() && !pc.remoteDescription) {
            await pc.setRemoteDescription(new RTCSessionDescription(snapshot.val()));
            
            // 4. Once the offer is received, the guest creates an "answer".
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            // 5. The guest places the answer in Firebase for the host to find.
            const answerPayload = { sdp: pc.localDescription.sdp, type: pc.localDescription.type };
            await partyRef.child(`signaling/${deviceId}/answer`).set(answerPayload);
        }
    });

    // 6. The guest listens for ICE candidates from the host.
    partyRef.child(`signaling/${deviceId}/hostCandidates`).on('child_added', snapshot => {
        if (snapshot.exists()) {
            pc.addIceCandidate(new RTCIceCandidate(snapshot.val()));
        }
    });
}

