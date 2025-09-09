
// --- CONSTANTS & GLOBAL STATE ---
const CATEGORIES = [
  // 1. CHEST
  { 
    id: 'chest', 
    name: 'Chest', 
    icon: 'fitness_center', 
    exercises: [
      { name: 'Push-Ups', level: 'Beginner', sets: 4, reps: 15, unit: 'reps', image: 'https://i.imgur.com/ODQ7M49.gif', description: 'Start in a plank position. Lower your body until your chest nearly touches the floor, then push back up.' },
      { name: 'Bench Press', level: 'Beginner', sets: 4, reps: 12, unit: 'reps', image: 'https://i.imgur.com/5s2bJ4m.gif', description: 'Lie on a flat bench, lower a barbell to your chest, and press it back up until your arms are fully extended.' },
      { name: 'Incline Dumbbell Press', level: 'Intermediate', sets: 4, reps: 10, unit: 'reps', image: 'https://i.imgur.com/j4oZB6g.gif', description: 'Lie on an incline bench holding dumbbells at shoulder height. Press the dumbbells up until your arms are extended.' },
      { name: 'Cable Crossover', level: 'Pro', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/v1u3tV7.gif', description: 'Stand between two high pulleys. Grab the handles and bring your hands together in a wide arc in front of your body.' }
    ]
  },
  // 2. BACK
  { 
    id: 'back', 
    name: 'Back', 
    icon: 'sports_gymnastics', 
    exercises: [
      { name: 'Lat Pulldown', level: 'Beginner', sets: 4, reps: 12, unit: 'reps', image: 'https://www.inspireusafoundation.org/file/2022/08/wide-grip-lat-pulldown.gif', description: 'Sit at a lat pulldown machine and grab the bar with a wide grip. Pull the bar down to your upper chest.' },
      { name: 'Pull-Ups', level: 'Intermediate', sets: 4, reps: 8, unit: 'reps', image: 'https://hips.hearstapps.com/hmg-prod/images/pull-up-647dd51506791.gif?resize=980:*', description: 'Hang from a pull-up bar with an overhand grip. Pull your body up until your chin is over the bar.' },
      { name: 'Bent Over Row', level: 'Intermediate', sets: 3, reps: 10, unit: 'reps', image: 'https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Bent_Over_Row.gif?v=1689836376', description: 'Bend at your hips and knees and grab a barbell with an overhand grip. Pull the bar towards your stomach.' },
      { name: 'Deadlift', level: 'Pro', sets: 4, reps: 5, unit: 'reps', image: 'https://www.kettlebellkings.com/cdn/shop/articles/barbell-deadlift-movement_1200x1200_crop_center.gif?v=1692228918', description: 'Stand with your mid-foot under a barbell. Lift the bar by straightening your hips and knees until you are standing upright.' }
    ]
  },
  // 3. TRICEPS
  { 
    id: 'triceps', 
    name: 'Triceps', 
    icon: 'straighten', 
    exercises: [
      { name: 'Tricep Pushdown', level: 'Beginner', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/b7a2d4M.gif', description: 'Attach a straight bar to a high pulley. Push the bar down until your arms are fully extended.' },
      { name: 'Tricep Dips', level: 'Intermediate', sets: 4, reps: 15, unit: 'reps', image: 'https://i.imgur.com/7b3T1hF.gif', description: 'Use parallel bars or a bench. Lower your body by bending your elbows, then push back up.' },
      { name: 'Skull Crushers', level: 'Pro', sets: 3, reps: 12, unit: 'reps', image: 'https://i.imgur.com/c6b2O1g.gif', description: 'Lie on a bench holding a barbell. Lower the weight towards your forehead by bending your elbows, then extend your arms back up.' }
    ]
  },
  // 4. BICEPS
  {
    id: 'biceps',
    name: 'Biceps',
    icon: 'sports_martial_arts',
    exercises: [
        { name: 'Bicep Curls', level: 'Beginner', sets: 3, reps: 12, unit: 'reps', image: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellcurl-1457043876.gif', description: 'Stand holding dumbbells with an underhand grip. Curl the weights up towards your shoulders, squeezing your biceps.' },
        { name: 'EZ Bar Curls', level: 'Beginner', sets: 3, reps: 12, unit: 'reps', image: 'https://burnfit.io/wp-content/uploads/2023/11/EZB_CURL.gif', description: 'Stand holding dumbbells with an underhand grip. Curl the weights up towards your shoulders, squeezing your biceps.' },
        { name: 'Hammer Curls', level: 'Intermediate', sets: 4, reps: 12, unit: 'reps', image: 'https://burnfit.io/wp-content/uploads/2023/11/DB_HAM_CURL.gif', description: 'Stand holding dumbbells with palms facing each other. Curl the weights up towards your shoulders.' },
        { name: 'Preacher Curl', level: 'Pro', sets: 3, reps: 15, unit: 'reps', image: 'https://www.inspireusafoundation.org/file/2022/03/ez-bar-preacher-curl.gif', description: 'Hang from a pull-up bar with an underhand grip. Pull your body up until your chin is over the bar.' }
    ]
  },
  // 5. LEGS
  {
    id: 'legs',
    name: 'Legs',
    icon: 'airline_seat_legroom_normal',
    exercises: [
        { name: 'Squats', level: 'Beginner', sets: 4, reps: 12, unit: 'reps', image: 'https://i.imgur.com/sJ7eP5F.gif', description: 'Stand with feet shoulder-width apart. Lower your hips as if sitting in a chair, keeping your chest up.' },
        { name: 'Lunges', level: 'Beginner', sets: 3, reps: 10, unit: 'per leg', image: 'https://i.imgur.com/3f7dJ4K.gif', description: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle.' },
        { name: 'Leg Press', level: 'Intermediate', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/Y1f4sT4.gif', description: 'Sit in a leg press machine with your feet on the platform. Push the platform away by extending your knees.' },
        { name: 'Bulgarian Split Squat', level: 'Pro', sets: 3, reps: 10, unit: 'per leg', image: 'https://i.imgur.com/a4f0S9J.gif', description: 'Place the top of one foot on a bench behind you. Lower your hips until your front thigh is parallel to the floor.' }
    ]
  },
  // 6. SHOULDERS
  {
    id: 'shoulders',
    name: 'Shoulders',
    icon: 'accessibility_new',
    exercises: [
        { name: 'Lateral Raises', level: 'Beginner', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/3f0QJ8d.gif', description: 'Stand holding dumbbells at your sides. Raise your arms out to the sides until they are at shoulder height.' },
        { name: 'Overhead Press', level: 'Intermediate', sets: 4, reps: 10, unit: 'reps', image: 'https://i.imgur.com/6q3S1Xm.gif', description: 'Stand with a barbell at your shoulders. Press the bar overhead until your arms are fully extended.' },
        { name: 'Face Pulls', level: 'Pro', sets: 4, reps: 15, unit: 'reps', image: 'https://i.imgur.com/2b3bJ9e.gif', description: 'Use a rope attachment on a cable machine. Pull the rope towards your face, keeping your elbows high and wide.' }
    ]
  },
  // 7. ABS
  {
    id: 'abs',
    name: 'Abs',
    icon: 'self_improvement',
    exercises: [
        { name: 'Crunches', level: 'Beginner', sets: 3, reps: 20, unit: 'reps', image: 'https://i.imgur.com/C5nJ4Q8.gif', description: 'Lie on your back with knees bent. Lift your upper body towards your knees, contracting your abs.' },
        { name: 'Leg Raises', level: 'Intermediate', sets: 4, reps: 15, unit: 'reps', image: 'https://i.imgur.com/sV5L3D3.gif', description: 'Lie on your back and lift your legs up towards the ceiling until your butt is off the floor.' },
        { name: 'Plank', level: 'Beginner', sets: 3, reps: 60, unit: 'seconds', image: 'https://i.imgur.com/sV5L3D3.gif', description: 'Hold a push-up position, resting on your forearms. Keep your body in a straight line for the duration.' }
    ]
  },
  // 8. FOREARMS
  {
    id: 'forearms',
    name: 'Forearms',
    icon: 'front_hand',
    exercises: [
        { name: 'Wrist Curls', level: 'Beginner', sets: 3, reps: 20, unit: 'reps', image: 'https://i.imgur.com/kS9Z4pS.gif', description: 'Sit and rest your forearms on your thighs, holding dumbbells. Curl your wrists upwards.' },
        { name: 'Reverse Wrist Curls', level: 'Intermediate', sets: 3, reps: 20, unit: 'reps', image: 'https://i.imgur.com/kS9Z4pS.gif', description: 'Sit and rest your forearms on your thighs with palms down. Curl your wrists upwards.' },
        { name: 'Farmers Walk', level: 'Pro', sets: 3, reps: 60, unit: 'seconds', image: 'https://i.imgur.com/2b3bJ9e.gif', description: 'Hold a heavy dumbbell in each hand and walk for a set distance or time to build grip strength.' }
    ]
  },
  // 9. LOWER BACK (UPDATED)
  {
    id: 'lower_back',
    name: 'Lower Back',
    icon: 'accessibility',
    exercises: [
        { name: 'Supermans', level: 'Beginner', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/C5nJ4Q8.gif', description: 'Lie on your stomach and simultaneously raise your arms and legs off the floor.' },
        { name: 'Back Extensions', level: 'Intermediate', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/3f0QJ8d.gif', description: 'Use a hyperextension bench to bend at the waist and lift your upper body using your lower back muscles.' },
        { name: 'Good Mornings', level: 'Pro', sets: 4, reps: 10, unit: 'reps', image: 'https://i.imgur.com/fL8aD4g.gif', description: 'Place a barbell on your shoulders. Hinge at the hips with a straight back and slightly bent knees until your torso is parallel to the floor.' }
    ]
  },
  // 10. CARDIO
  {
    id: 'cardio',
    name: 'Cardio',
    icon: 'directions_run',
    exercises: [
        { name: 'Jumping Jacks', level: 'Beginner', sets: 3, reps: 60, unit: 'seconds', image: 'https://i.imgur.com/sJ7eP5F.gif', description: 'A full body exercise that can be done anywhere. Jump while spreading your legs and bringing arms overhead.' },
        { name: 'Treadmill Run', level: 'Intermediate', sets: 1, reps: 20, unit: 'minutes', image: 'https://i.imgur.com/Y1f4sT4.gif', description: 'Run at a steady pace on a treadmill to improve cardiovascular health.' },
        { name: 'Burpees', level: 'Pro', sets: 3, reps: 15, unit: 'reps', image: 'https://i.imgur.com/a4f0S9J.gif', description: 'A high-intensity exercise combining a squat, push-up, and jump.' }
    ]
  },
  // 11. FULL BODY (UPDATED)
  {
    id: 'full_body',
    name: 'Full Body',
    icon: 'bolt',
    exercises: [
        { name: 'Kettlebell Swings', level: 'Intermediate', sets: 4, reps: 20, unit: 'reps', image: 'https://i.imgur.com/Eni15n5.gif', description: 'Swing a kettlebell from between your knees up to shoulder height using hip power.' },
        { name: 'Dumbbell Clean and Press', level: 'Pro', sets: 3, reps: 8, unit: 'reps', image: 'https://i.imgur.com/6q3S1Xm.gif', description: 'Lift dumbbells to your shoulders, then press them overhead until your arms are fully extended.' },
        { name: 'Thrusters', level: 'Pro', sets: 4, reps: 12, unit: 'reps', image: 'https://i.imgur.com/wVb9S3B.gif', description: 'A combination of a front squat and an overhead press, performed in one fluid motion.' }
    ]
  }
];

let chartInstance = null;
let currentUser = null;
let userProfile = {};
let userPlan = {};

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
// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (e) {
      console.error("Firebase initialization error:", e);
      showError("Critical Error: Could not initialize the application.");
      return;
    }
  }
  
  const auth = firebase.auth();
  document.getElementById('app-container').style.display = 'block';

  // ***** THIS IS THE FIXED LINE *****
  document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  auth.onAuthStateChanged(user => {
    if (user) {
      currentUser = user;
      loadAndInitializeApp();
    } else {
      window.location.href = 'login.html';
    }
  });
});

// --- FIREBASE DATA HANDLING ---
async function loadAndInitializeApp() {
  const db = firebase.database();
  const userRef = db.ref(`users/${currentUser.uid}`);
  try {
    const snapshot = await withTimeout(userRef.once('value'), 8000);
    const userData = snapshot.val() || {};

    userProfile = {
      name: currentUser.displayName || userData.displayName || 'User',
      weight: userData.weight || 0,
      age: userData.age || 0,
      joiningday: userData.joiningDate ? new Date(userData.joiningDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      photoURL: currentUser.photoURL || userData.photoURL || '../Logo.png'
    };
    userPlan = userData.plan || {};

    initializeApp();
  } catch (error) {
    console.error("Firebase Read Error:", error);
    showError(error.message.includes('timeout') ? "Network timeout. Please check connection." : "Could not load your data.");
  } finally {
    document.getElementById('loader').style.display = 'none';
  }
}

function saveDayPlanToFirebase(dayKey, dayPlan) {
  firebase.database().ref(`users/${currentUser.uid}/plan/${dayKey}`).set(dayPlan)
    .catch(err => showError("Failed to save day plan."));
}

function resetPlanInFirebase() {
  firebase.database().ref(`users/${currentUser.uid}/plan`).remove()
    .catch(err => showError("Failed to reset plan."));
}

// --- MAIN APP LOGIC ---
function initializeApp() {
  renderProfile();
  renderCalendar();
  renderCategoryModal();
  bindEventListeners();

  if (Object.keys(userPlan).length >= 7) {
    renderDashboard();
    renderTimelineChart();
    showDashboard();
  } else {
    showCalendar();
  }
}

function determineUserLevel() {
  const joinDate = new Date(userProfile.joiningday);
  const daysSinceJoined = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
  if (daysSinceJoined <= 30) return 'Beginner';
  if (daysSinceJoined <= 90) return 'Intermediate';
  return 'Pro';
}

// --- UI RENDERING ---
function renderProfile() {
  document.getElementById('userName').textContent = userProfile.name;
  document.getElementById('userWeightStat').textContent = `${userProfile.weight || '--'} kg`;
  document.getElementById('userAgeStat').textContent = `${userProfile.age || '--'} yrs`;
  document.getElementById('userAvatar').src = userProfile.photoURL;

  const totalDays = Math.max(1, Math.floor((new Date() - new Date(userProfile.joiningday)) / (1000 * 60 * 60 * 24)) + 1);
  document.getElementById('gymDayCount').textContent = `${totalDays} days`;

  const workoutDays = Object.values(userPlan).filter(d => d && !d.rest && d.cats?.length > 0).length;
  const progress = (workoutDays / 7) * 100;
  document.getElementById('trainingProgress').style.width = `${progress}%`;
  document.getElementById('gymStatus').textContent = workoutDays > 0 ? `Your week is ${Math.round(progress)}% planned!` : 'Plan your week to begin!';
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) {
    console.error("Calendar grid element not found.");
    showError("UI Error: Calendar component failed to load.");
    return;
  }
  
  grid.innerHTML = '';

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay();
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 7; i++) {
    const dayKey = `day${i}`;
    const dayPlan = userPlan[dayKey] || {};
    
    const isWorkoutDay = dayPlan.cats?.length > 0 && !dayPlan.rest;
    const isRestDay = dayPlan.rest;
    const isActive = isWorkoutDay || isRestDay;
    const isCurrentDay = i === currentDayIndex;

    // --- NEW & IMPROVED ICON LOGIC ---
    let iconsHtml = '';
    if (isRestDay) {
      // Case 1: It's a rest day. Show the hotel icon.
      iconsHtml = '<i class="material-icons text-danger">hotel</i>';
    } else if (isWorkoutDay) {
      // Case 2: It's a workout day.
      const categoryIcons = (dayPlan.cats || []).map(catId => {
        const category = CATEGORIES.find(c => c.id === catId);
        return category ? `<i class="material-icons">${category.icon}</i>` : '';
      }).join('');

      if (dayPlan.cats.length === 1) {
        // Sub-case: ONLY ONE category is selected. Show the category icon and one placeholder plus icon.
        iconsHtml = categoryIcons + '<i class="material-icons text-muted placeholder-icon">add_circle_outline</i>';
      } else {
        // Sub-case: Two categories are selected. Show both category icons.
        iconsHtml = categoryIcons;
      }
    } else {
      // Case 3: It's a completely empty day. Show two placeholder plus icons.
      iconsHtml = `
        <i class="material-icons text-muted placeholder-icon">add_circle_outline</i>
        <i class="material-icons text-muted placeholder-icon">add_circle_outline</i>
      `;
    }

    const tile = document.createElement('div');
    tile.className = 'col day-tile';
    tile.dataset.date = dayKey;

    if (isActive) tile.classList.add('active');
    if (isCurrentDay) tile.classList.add('current-day');
    
    tile.innerHTML = `
      <div class="day-name fw-bold mb-2">${daysOfWeek[i]}</div>
      <div class="day-icons d-flex justify-content-center gap-1 flex-wrap">${iconsHtml}</div>
    `;

    fragment.appendChild(tile);
  }

  grid.appendChild(fragment);
}

function renderDashboard() {
  const todayKey = `day${new Date().getDay()}`;
  const todayPlan = userPlan[todayKey] || {};
  const cards = document.getElementById('todayCards');
  cards.innerHTML = '';

  const renderCard = (content) => cards.innerHTML = `<div class="col-12">${content}</div>`;

  if (todayPlan.rest) {
    renderCard(`<div class="card glass p-4 text-center text-danger"><i class="material-icons fs-1">hotel</i><h5 class="mt-2">Rest Day</h5></div>`);
    return;
  }
  if (!todayPlan.cats?.length) {
    renderCard(`<div class="card glass p-4 text-center"><h5 class="mt-2">No Workout Planned</h5></div>`);
    return;
  }

  // This part is NOT needed anymore as we are showing all exercises
  // const userLevel = determineUserLevel();
  // const levelHierarchy = { 'Beginner': 1, 'Intermediate': 2, 'Pro': 3 };
  
  let dashboardHtml = '';

  todayPlan.cats.forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    
    // --- FIX IS HERE: ---
    // The filter has been removed. We now assign all exercises directly.
    const exercises = cat.exercises; 
    
    const exercisesHtml = exercises.map(e => `
      <li class="d-flex align-items-center gap-3">
        <img src="${e.image}" alt="${e.name}" class="exercise-img">
        <div class="flex-grow-1">
          <strong>${e.name}</strong>
          <div class="text-white-50">${e.sets}x${e.reps} ${e.unit}</div>
        </div>
        <button class="btn-icon info-btn" data-bs-toggle="modal" data-bs-target="#exerciseDescriptionModal" data-name="${e.name}" data-description="${e.description}" data-image="${e.image}">
          <i class="material-icons">info_outline</i>
        </button>
      </li>`).join('');

    dashboardHtml += `
      <div class="col-12 col-md-6">
        <div class="card glass p-3 h-100">
          <div class="d-flex align-items-center mb-3"><i class="material-icons me-2 text-gradient">${cat.icon}</i><h5 class="mb-0 fw-bold">${cat.name}</h5></div>
          <ul class="exercise-list">${exercisesHtml}</ul>
        </div>
      </div>`;
  });
  cards.innerHTML = dashboardHtml;
}

function renderTimelineChart() {
  const canvas = document.getElementById('timelineChart');
  if (!canvas || !window.Chart) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workoutData = days.map((_, i) => {
    const dayPlan = userPlan[`day${i}`] || {};
    return dayPlan.rest ? 0 : (dayPlan.cats || []).length;
  });

  chartInstance = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Muscle Groups per Day',
        data: workoutData,
        backgroundColor: 'rgba(255, 126, 95, 0.5)',
        borderColor: 'rgba(255, 126, 95, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 2,
          ticks: { stepSize: 1 }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderCategoryModal() {
  const grid = document.getElementById('modalCategoryGrid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    grid.innerHTML += `<div class="cat-btn" data-id="${cat.id}"><i class="material-icons">${cat.icon}</i>${cat.name}</div>`;
  });
}

function renderRecommendations() {
  const list = document.getElementById('recommendationsList');
  list.innerHTML = '';
  const userLevel = determineUserLevel();
  const recommendations = {
    Beginner: [
      'Focus on full-body workouts 2-3 times a week.',
      'Prioritize learning correct form over lifting heavy.',
      'Incorporate 15-20 minutes of light cardio after each session.',
    ],
    Intermediate: [
      'Move to a 4-day split routine (e.g., upper/lower body).',
      'Start tracking your lifts to ensure progressive overload.',
      'Incorporate compound movements like squats and deadlifts.',
    ],
    Pro: [
      'Consider a 5-6 day push/pull/legs (PPL) split for targeted growth.',
      'Integrate advanced techniques like drop sets or supersets.',
      'Pay close attention to nutrition and recovery for optimal results.',
    ]
  };

  (recommendations[userLevel] || []).forEach(rec => {
    list.innerHTML += `<li class="d-flex align-items-start mb-2"><i class="material-icons text-gradient me-2">check</i><span>${rec}</span></li>`;
  });
}

// --- EVENT BINDING ---
function bindEventListeners() {
  let selectedDateKey = null;

  document.getElementById('calendarGrid').addEventListener('click', e => {
    const tile = e.target.closest('.day-tile');
    if (!tile) return;
    selectedDateKey = tile.dataset.date;
    const dayPlan = userPlan[selectedDateKey] || {};
    
    document.querySelectorAll('#modalCategoryGrid .cat-btn').forEach(btn => btn.classList.remove('active'));
    (dayPlan.cats || []).forEach(catId => document.querySelector(`.cat-btn[data-id="${catId}"]`)?.classList.add('active'));
    document.querySelector('.btn-rest').classList.toggle('active', !!dayPlan.rest);
    
    new bootstrap.Modal(document.getElementById('categoryModal')).show();
  });

  document.getElementById('modalSaveBtn').addEventListener('click', () => {
    const selectedCats = Array.from(document.querySelectorAll('#modalCategoryGrid .cat-btn.active')).map(el => el.dataset.id);
    const isRest = document.querySelector('.btn-rest').classList.contains('active');
    userPlan[selectedDateKey] = { cats: selectedCats, rest: isRest };
    
    saveDayPlanToFirebase(selectedDateKey, userPlan[selectedDateKey]);
    renderCalendar();
    renderProfile();
    
    if (Object.keys(userPlan).length >= 7) {
      document.getElementById('goTrainingContainer').style.display = 'block';
    }
    bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
  });

  document.getElementById('modalCategoryGrid').addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    if (!btn.classList.contains('active') && document.querySelectorAll('#modalCategoryGrid .cat-btn.active').length >= 2) {
      return showError("You can select a maximum of 2 muscle groups.");
    }
    btn.classList.toggle('active');
    document.querySelector('.btn-rest').classList.remove('active');
  });

  document.querySelector('.btn-rest').addEventListener('click', e => {
    e.target.classList.add('active');
    document.querySelectorAll('#modalCategoryGrid .cat-btn').forEach(btn => btn.classList.remove('active'));
  });

  document.getElementById('goTrainingBtn').addEventListener('click', () => {
    renderDashboard();
    renderTimelineChart();
    showDashboard();
  });

  document.getElementById('editBtn').addEventListener('click', showCalendar);
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset your entire weekly plan?")) {
      userPlan = {};
      resetPlanInFirebase();
      initializeApp();
    }
  });
  
  document.getElementById('todayCards').addEventListener('click', e => {
      const btn = e.target.closest('.info-btn');
      if(!btn) return;
      document.getElementById('exerciseDescriptionModalLabel').textContent = btn.dataset.name;
      document.getElementById('exerciseDescription').textContent = btn.dataset.description;
      document.getElementById('exerciseImage').src = btn.dataset.image;
  });

  document.getElementById('recommendationsModal').addEventListener('show.bs.modal', renderRecommendations);
}

// --- UTILITY FUNCTIONS ---
function showError(message) {
  const el = document.getElementById('errorMessage');
  el.textContent = message;
  el.classList.remove('d-none');
  setTimeout(() => el.classList.add('d-none'), 5000);
}
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Operation timed out')), ms);
    promise.then(
      value => { clearTimeout(timer); resolve(value); },
      error => { clearTimeout(timer); reject(error); }
    );
  });
}
function showCalendar() { document.getElementById('dashboardSection').style.display = 'none'; document.getElementById('calendarSection').style.display = 'block'; }
function showDashboard() { document.getElementById('calendarSection').style.display = 'none'; document.getElementById('dashboardSection').style.display = 'block'; }