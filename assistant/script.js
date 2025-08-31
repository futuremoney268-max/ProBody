const CATEGORIES = [
 
  {
    "id": "chest",
    "name": "Chest",
    "icon": "fitness_center",
    "level": "Pro",
    "exercises": [
      {
        "name": "Push-Up",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPRHNS1p8x2/giphy.gif",
        "description": "Start in a plank position with hands directly under shoulders, fingers spread for stability. Keep your body in a straight line from head to heels, engaging your core and glutes. Lower your chest to just above the floor, keeping elbows at a 45-degree angle to reduce shoulder stress. Push back up to the starting position, fully extending your arms without locking elbows. Maintain a steady breathing pattern, exhaling on the push-up. Primary muscles: pectoralis major, triceps, core. Modify with knees on the floor for beginners."
      },
      {
        "name": "Incline Dumbbell Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXB5c2s3d2F0ZXJ2Z3J6c3Voa2k0c2ZhYzN2c3Fayana2c3F5c3B1aG5uM2R2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Set an incline bench to a 30-45-degree angle. Sit back, holding a dumbbell in each hand at chest level, palms facing forward. Keep feet flat and core braced. Press the dumbbells upward until arms are fully extended, aligning the weights over your shoulders. Lower them slowly until they’re level with your chest, keeping elbows at a 45-degree angle to protect shoulder joints. Focus on controlled movement to maximize upper chest activation. Primary muscles: upper pectoralis major, anterior deltoids, triceps. Avoid locking elbows at the top to maintain tension."
      },
      {
        "name": "Chest Fly",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWZrcnN5a3N0c2d6a3J0YzM5c3F5YzN2c3F5YzN2c3F5YzN2c3F5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie on a flat bench, holding dumbbells above your chest with palms facing each other and a slight bend in your elbows. Engage your core and keep feet flat. Slowly open your arms in a wide arc, lowering the weights until you feel a gentle stretch in your chest, keeping elbows slightly bent to avoid joint stress. Bring the dumbbells back together over your chest in a controlled hugging motion. Focus on squeezing the chest muscles during the contraction. Primary muscles: pectoralis major, anterior deltoids. Use moderate weights to prevent shoulder strain."
      },
      {
        "name": "Barbell Bench Press",
        "sets": 4,
        "reps": 8,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW1sazB5c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie flat on a bench with feet firmly planted on the floor. Grip the barbell slightly wider than shoulder-width, ensuring wrists are straight. Unrack the bar and lower it slowly to mid-chest, keeping elbows at a 45-degree angle to avoid shoulder strain. Press the bar upward until arms are fully extended, squeezing the chest at the top. Maintain a neutral spine and engaged core throughout to prevent lower back arching. Primary muscles: pectoralis major, anterior deltoids, triceps. Use a spotter for heavy loads to ensure safety."
      },
      {
        "name": "Incline Dumbbell Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXB5c2s3d2F0ZXJ2Z3J6c3Voa2k0c2ZhYzN2c3Fayana2c3F5c3B1aG5uM2R2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Set an incline bench to a 30-45-degree angle. Sit back, holding a dumbbell in each hand at chest level, palms facing forward. Keep feet flat and core braced. Press the dumbbells upward until arms are fully extended, aligning the weights over your shoulders. Lower them slowly until they’re level with your chest, keeping elbows at a 45-degree angle to protect shoulder joints. Focus on controlled movement to maximize upper chest activation. Primary muscles: upper pectoralis major, anterior deltoids, triceps. Avoid locking elbows at the top to maintain tension."
      },
      {
        "name": "Chest Fly",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWZrcnN5a3N0c2d6a3J0YzM5c3F5YzN2c3F5YzN2c3F5YzN2c3F5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie on a flat bench, holding dumbbells above your chest with palms facing each other and a slight bend in your elbows. Engage your core and keep feet flat. Slowly open your arms in a wide arc, lowering the weights until you feel a gentle stretch in your chest, keeping elbows slightly bent to avoid joint stress. Bring the dumbbells back together over your chest in a controlled hugging motion. Focus on squeezing the chest muscles during the contraction. Primary muscles: pectoralis major, anterior deltoids. Use moderate weights to prevent shoulder strain."
      },
      {
        "name": "Decline Bench Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie on a decline bench with feet secured under the pads. Grip the barbell slightly wider than shoulder-width, wrists straight. Unrack the bar and lower it to the lower chest, keeping elbows at a 45-degree angle to minimize shoulder strain. Press the bar upward until arms are extended, focusing on lower chest activation. Keep your core tight and avoid bouncing the bar off your chest. Primary muscles: lower pectoralis major, triceps, anterior deltoids. Use a spotter for heavy weights to ensure safety."
      },
      {
        "name": "Cable Crossover",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand centered between two cable pulleys set at shoulder height or above, holding a handle in each hand with palms facing down. Step forward slightly, keeping a slight bend in your elbows and chest up. Pull the handles down and across your body in a smooth, hugging motion, crossing one hand over the other to maximize chest contraction. Slowly return to the starting position, maintaining control to keep tension on the chest. Primary muscles: pectoralis major, anterior deltoids. Adjust cable height to target upper or lower chest."
      },
      {
        "name": "Dumbbell Pullover",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie perpendicular on a flat bench with only your upper back and shoulders supported, feet flat on the floor. Hold a dumbbell with both hands, cupping one end, and raise it above your chest with slightly bent elbows. Slowly lower the dumbbell in an arc over your head until you feel a stretch in your chest and lats, keeping your core engaged to protect your lower back. Pull the dumbbell back to the starting position, contracting your chest. Primary muscles: pectoralis major, latissimus dorsi, triceps. Avoid excessive weight to prevent shoulder strain."
      }
    ]
  },

{
  "id": "triceps",
  "name": "Triceps",
  "icon": "sports_handball",
  "level": "Beginner",
  "exercises": [
    {
      "name": "Tricep Dips",
      "sets": 3,
      "reps": 12,
      "unit": "reps",
      "level": "Intermediate",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Position yourself on parallel bars or a sturdy bench, hands gripping the edges, body suspended. Keep feet together and core engaged. Bend elbows to lower your body until shoulders are near elbow level, keeping elbows pointing straight back to target triceps. Push back up to full arm extension without locking elbows. Maintain an upright torso to avoid shoulder strain. Primary muscles: triceps brachii, anterior deltoids, chest. Use a bench for beginners or add weight for advanced variations."
    },
    {
      "name": "Cable Pushdown",
      "sets": 4,
      "reps": 10,
      "unit": "reps",
      "level": "Beginner",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Stand facing a cable machine with a straight bar or rope attachment at chest height. Grip the bar palms-down, hands shoulder-width apart. Keep elbows tucked at your sides and core braced. Push the bar down until arms are fully extended, focusing on triceps contraction. Slowly release back to elbow-height, maintaining control to keep tension. Avoid leaning forward or flaring elbows. Primary muscles: triceps brachii. Use a rope for varied grip or lighter weight for beginners."
    },
    {
      "name": "Overhead Tricep Extension",
      "sets": 3,
      "reps": 12,
      "unit": "reps",
      "level": "Intermediate",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Stand or sit, holding a single dumbbell with both hands, cupping one end, and raise it overhead with arms extended. Keep core engaged and feet shoulder-width apart. Lower the dumbbell behind your head by bending elbows, keeping upper arms stationary and close to your head. Extend arms back to the starting position, squeezing triceps at the top. Avoid arching your back or flaring elbows. Primary muscles: triceps brachii (long head), deltoids. Use a lighter weight to ensure proper form."
    },
    {
      "name": "Bench Dips",
      "sets": 3,
      "reps": 15,
      "unit": "reps",
      "level": "Beginner",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Sit on the edge of a sturdy bench, hands gripping the edge beside hips, fingers forward. Slide off the bench, keeping legs extended or knees bent for beginners, and lower your body by bending elbows, keeping them pointing straight back. Lower until shoulders are near elbow level, then push back up to full arm extension. Keep torso close to the bench and core tight. Primary muscles: triceps brachii, anterior deltoids. Elevate feet for added difficulty."
    },
    {
      "name": "Close-Grip Bench Press",
      "sets": 3,
      "reps": 10,
      "unit": "reps",
      "level": "Pro",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Lie flat on a bench, feet planted. Grip a barbell with hands closer than shoulder-width, wrists straight. Unrack the bar and lower it to mid-chest, keeping elbows tucked close to the body to emphasize triceps. Press the bar upward until arms are fully extended, avoiding elbow lockout. Maintain a neutral spine and engaged core. Primary muscles: triceps brachii, pectoralis major, anterior deltoids. Use a spotter for heavy weights to ensure safety."
    },
    {
      "name": "Skull Crushers",
      "sets": 3,
      "reps": 12,
      "unit": "reps",
      "level": "Intermediate",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Lie on a flat bench, holding a barbell or EZ-bar above your chest with arms extended, hands shoulder-width apart. Keep upper arms perpendicular to the floor. Lower the bar toward your forehead by bending elbows, keeping upper arms stationary. Extend arms back to the starting position, squeezing triceps. Maintain control to avoid hitting your head. Primary muscles: triceps brachii (long head). Use a lighter weight or dumbbells for beginners to ensure safety."
    },
    {
      "name": "Diamond Push-Ups",
      "sets": 3,
      "reps": 12,
      "unit": "reps",
      "level": "Intermediate",
      "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
      "description": "Start in a plank position, hands close together forming a diamond shape with thumbs and index fingers under your chest. Keep body straight, core tight, and feet together. Lower your chest toward your hands, keeping elbows slightly flared but controlled to emphasize triceps. Push back up to full arm extension without locking elbows. Primary muscles: triceps brachii, pectoralis major, anterior deltoids. Modify with knees on the floor for beginners."
    }
  ]
},

  {
    "id": "back",
    "name": "Back",
    "icon": "self_improvement",
    "level": "Expert",
    "exercises": [
      {
        "name": "Deadlift",
        "sets": 3,
        "reps": 5,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet hip-width apart, barbell over mid-foot, and grip it just outside your knees. Bend at hips and knees, keeping your back straight and chest up. Engage your core and pull the bar by driving hips forward and standing tall, keeping the bar close to your body. Lower the bar back to the ground with control, maintaining a neutral spine. Primary muscles: latissimus dorsi, erector spinae, glutes, hamstrings. Use a spotter or lighter weight for beginners to ensure proper form and avoid lower back strain."
      },
      {
        "name": "Lat Pulldown",
        "sets": 4,
        "reps": 8,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit at a lat pulldown machine, adjusting the thigh pads for stability. Grip the bar with a wide, overhand grip, hands slightly wider than shoulder-width. Pull the bar down to your upper chest, squeezing your shoulder blades together and keeping elbows pointed downward. Slowly release the bar back to the starting position with arms extended, maintaining control. Keep your torso upright and avoid leaning back excessively. Primary muscles: latissimus dorsi, biceps, rhomboids. Use a lighter weight to focus on form for beginners."
      },
      {
        "name": "Seated Row",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit at a cable row machine with feet braced on the platform. Grip the handle (V-bar or straight bar) with both hands, keeping a neutral spine. Pull the handle toward your lower chest or upper abdomen, squeezing your shoulder blades together and keeping elbows close to your body. Slowly extend your arms back to the starting position, maintaining control. Avoid rounding your back or jerking the weight. Primary muscles: latissimus dorsi, rhomboids, traps, biceps. Adjust weight for smooth, controlled reps."
      },
      {
        "name": "Pull-Up",
        "sets": 3,
        "reps": 8,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hang from a pull-up bar with an overhand grip, hands shoulder-width or slightly wider. Engage your core and pull your body upward until your chin is above the bar, keeping elbows pointed downward. Lower yourself slowly back to a full hang without swinging. Maintain a straight body line and avoid shrugging shoulders. Primary muscles: latissimus dorsi, biceps, traps, rhomboids. Use resistance bands or an assisted pull-up machine for beginners to build strength."
      },
      {
        "name": "Bent-Over Row",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a barbell with an overhand grip. Bend at the hips to a 45-degree angle, keeping your back flat and core engaged. Pull the barbell to your lower chest or upper abdomen, squeezing your shoulder blades together and keeping elbows close to your body. Lower the bar back to the starting position with control. Avoid rounding your back or using momentum. Primary muscles: latissimus dorsi, rhomboids, traps, biceps. Use lighter weights to master form."
      },
      {
        "name": "Single-Arm Dumbbell Row",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Place one hand and knee on a bench for support, holding a dumbbell in the opposite hand with a neutral grip. Keep your back flat and core engaged. Row the dumbbell toward your hip, squeezing your shoulder blade at the top, keeping your elbow close to your body. Lower the weight with control to a full stretch. Switch sides after completing reps. Primary muscles: latissimus dorsi, rhomboids, biceps. Maintain a neutral spine to avoid strain."
      },
      {
        "name": "T-Bar Row",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Straddle a T-bar machine or landmine setup, feet hip-width apart. Grip the handles with both hands, keeping your back straight and core tight. Bend slightly at the hips, then pull the bar toward your chest, squeezing your shoulder blades together. Lower the bar back to the starting position with control, maintaining a neutral spine. Avoid jerking or rounding your back. Primary muscles: latissimus dorsi, traps, rhomboids, biceps. Ensure proper setup to avoid lower back strain."
      }
    ]
  },
  {
    "id": "biceps",
    "name": "Biceps",
    "icon": "accessibility_new",
    "level": "Pro",
    "exercises": [
      {
        "name": "Barbell Curl",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a barbell with an underhand grip, hands shoulder-width apart. Keep elbows tucked at your sides and core engaged. Curl the barbell up to chest level, squeezing your biceps at the top. Lower the bar slowly back to the starting position, maintaining control to avoid swinging. Keep your torso upright and avoid using momentum. Primary muscles: biceps brachii, brachialis. Use a lighter weight to ensure proper form and avoid elbow strain."
      },
      {
        "name": "Hammer Curl",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a dumbbell in each hand with a neutral grip (palms facing inward). Keep elbows close to your body and core braced. Curl the dumbbells toward your shoulders, keeping your palms facing inward throughout the movement. Lower the weights slowly with control. Avoid swinging or leaning back. Primary muscles: biceps brachii, brachialis, brachioradialis. Use moderate weights to maintain form and maximize forearm engagement."
      },
      {
        "name": "Preacher Curl",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit or stand at a preacher bench, resting your upper arms on the pad, holding a barbell or dumbbell with an underhand grip. Curl the weight upward, focusing on biceps contraction, until your forearms are nearly vertical. Lower the weight slowly to full arm extension, keeping your arms in contact with the pad. Avoid lifting your arms off the pad or using momentum. Primary muscles: biceps brachii, brachialis. Use controlled movements to isolate the biceps effectively."
      },
      {
        "name": "Dumbbell Bicep Curl",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a dumbbell in each hand with palms facing up. Keep elbows tucked at your sides and core engaged. Curl the dumbbells toward your shoulders, rotating your wrists so palms face your chest at the top. Lower the weights slowly, maintaining control and avoiding swinging. Keep your torso stationary to isolate the biceps. Primary muscles: biceps brachii, brachialis. Alternate arms or curl simultaneously based on preference."
      },
      {
        "name": "Concentration Curl",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit on a bench, feet flat, holding a dumbbell in one hand. Rest your elbow on the inside of your thigh, near the knee. Curl the dumbbell toward your shoulder, focusing on biceps contraction, keeping your upper arm stationary. Lower the weight slowly to full extension. Switch sides after completing reps. Avoid leaning back or using your shoulder to lift. Primary muscles: biceps brachii, brachialis. Use controlled movements to maximize isolation."
      },
      {
        "name": "EZ-Bar Curl",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, gripping an EZ-bar with an underhand grip, hands shoulder-width apart. Keep elbows tucked at your sides and core braced. Curl the bar toward your chest, squeezing your biceps at the top. Lower the bar slowly to the starting position, maintaining control to avoid swinging. Keep your torso upright and avoid using momentum. Primary muscles: biceps brachii, brachialis. The EZ-bar reduces wrist strain compared to a straight barbell."
      },
      {
        "name": "Chin-Up",
        "sets": 3,
        "reps": 8,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hang from a pull-up bar with an underhand grip, hands shoulder-width apart. Engage your core and pull your body upward until your chin is above the bar, emphasizing biceps contraction. Lower yourself slowly to a full hang, avoiding swinging or kipping. Keep your shoulders down and chest up throughout. Primary muscles: biceps brachii, latissimus dorsi, traps. Use resistance bands or an assisted machine for beginners to build strength."
      }
    ]
  },
  {
    "id": "legs",
    "name": "Legs",
    "icon": "directions_run",
    "level": "Expert",
    "exercises": [
      {
        "name": "Back Squat",
        "sets": 4,
        "reps": 6,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Position a barbell on your upper back, resting on your traps, with feet shoulder-width apart. Grip the bar wider than shoulders, keeping elbows down. Engage your core, keep chest up, and squat down by bending knees and hips until thighs are at least parallel to the ground. Drive through your heels to stand back up, maintaining a neutral spine. Avoid leaning forward or rounding your back. Primary muscles: quadriceps, glutes, hamstrings, core. Use a spotter or safety bars for heavy weights."
      },
      {
        "name": "Walking Lunges",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold a dumbbell in each hand or use body weight, standing with feet together. Step forward with one leg, lowering your back knee until it’s just above the ground, keeping your front knee over your ankle. Push through your front heel to step forward into the next lunge, alternating legs. Maintain an upright torso and engaged core. Avoid letting your front knee collapse inward. Primary muscles: quadriceps, glutes, hamstrings, core. Perform in a clear space for continuous steps."
      },
      {
        "name": "Leg Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit in a leg press machine with feet shoulder-width apart on the platform. Adjust the seat so knees are at a 90-degree angle. Release the safety locks, then push the platform away by extending your legs, stopping short of locking knees. Lower the platform slowly until knees are bent at about 90 degrees. Keep your back flat against the seat and core engaged. Primary muscles: quadriceps, glutes, hamstrings. Avoid rounding your lower back or locking knees at the top."
      },
      {
        "name": "Bodyweight Squat",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, toes slightly outward. Engage your core, keep chest up, and squat by bending knees and hips, lowering until thighs are parallel to the ground. Keep knees tracking over toes and weight in your heels. Push through heels to stand back up, maintaining a neutral spine. Avoid letting knees collapse inward or rounding your back. Primary muscles: quadriceps, glutes, hamstrings, core. Add a pause at the bottom for increased difficulty."
      },
      {
        "name": "Romanian Deadlift",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold a barbell or dumbbells with an overhand grip, standing with feet hip-width apart. Keep a slight bend in knees and hinge at hips, lowering the weight toward your shins while keeping your back straight and chest up. Feel a stretch in your hamstrings, then drive hips forward to return to standing, squeezing glutes at the top. Avoid rounding your back or overextending at the top. Primary muscles: hamstrings, glutes, lower back. Use lighter weights to master form."
      },
      {
        "name": "Bulgarian Split Squat",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand a few feet in front of a bench, placing one foot on it behind you, laces down. Hold dumbbells or use body weight. Lower your body by bending the front knee until it’s over your ankle and the back knee nears the ground. Push through the front heel to return to standing, keeping your torso upright. Switch sides after reps. Primary muscles: quadriceps, glutes, hamstrings. Maintain balance and avoid leaning forward."
      },
      {
        "name": "Leg Extension",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit in a leg extension machine, adjusting the pad to rest above your ankles. Grip the handles and engage your core. Extend your legs until straight, squeezing your quadriceps at the top, then lower slowly to the starting position without letting the weight stack touch down. Avoid locking knees or using momentum. Primary muscles: quadriceps. Use controlled movements and moderate weight to protect knees and maximize isolation."
      }
    ]
  },
  {
    "id": "shoulders",
    "name": "Shoulders",
    "icon": "fitness_center",
    "level": "Pro",
    "exercises": [
      {
        "name": "Overhead Press",
        "sets": 4,
        "reps": 8,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand or sit with feet shoulder-width apart, holding a barbell or dumbbells at shoulder height, palms forward. Engage your core and press the weight overhead until arms are fully extended, keeping elbows slightly forward. Lower back to shoulder level with control. Avoid arching your back or locking elbows at the top. Primary muscles: deltoids, triceps, upper traps. Use a spotter for heavy barbell lifts and maintain a neutral spine."
      },
      {
        "name": "Lateral Raise",
        "sets": 4,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a dumbbell in each hand, palms facing inward. Keep a slight bend in elbows and raise arms out to the sides until they reach shoulder height, forming a T-shape. Lower the weights slowly with control. Avoid swinging or shrugging shoulders. Primary muscles: medial deltoids, traps. Use lighter weights to maintain form and prevent shoulder strain."
      },
      {
        "name": "Front Raise",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding dumbbells in front of thighs, palms facing down. Keep a slight bend in elbows and raise arms forward to shoulder height, keeping arms straight. Lower the weights slowly with control. Avoid using momentum or leaning back. Primary muscles: anterior deltoids, upper pectorals. Alternate arms or raise both simultaneously, using moderate weights to avoid shoulder strain."
      },
      {
        "name": "Arnold Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit or stand, holding dumbbells at chest level, palms facing your body. As you press the weights overhead, rotate your wrists so palms face forward at the top, fully extending arms. Reverse the motion, rotating wrists back and lowering dumbbells to chest level. Keep core engaged and avoid arching your back. Primary muscles: deltoids (all heads), triceps. Use controlled movements to maximize shoulder engagement and protect joints."
      },
      {
        "name": "Face Pull",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand facing a cable machine with a rope attachment set at face height. Grip the rope with both hands, palms facing inward. Pull the rope toward your face, keeping elbows high and flaring outward, aiming for your ears. Squeeze your rear delts and upper traps, then return slowly to the starting position. Avoid leaning back or using heavy weights. Primary muscles: rear deltoids, traps, rhomboids. Focus on form for shoulder health."
      },
      {
        "name": "Upright Row",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a barbell or dumbbells with an overhand grip, hands closer than shoulder-width. Pull the weight up to chin level, leading with elbows flaring outward and keeping the bar close to your body. Lower slowly with control. Avoid excessive shoulder shrugging or wrist strain. Primary muscles: lateral deltoids, traps, biceps. Use moderate weights to prevent shoulder impingement."
      },
      {
        "name": "Dumbbell Shrug",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a dumbbell in each hand, arms relaxed by your sides. Shrug your shoulders upward toward your ears, squeezing your traps at the top. Hold briefly, then lower slowly without rolling shoulders. Keep arms straight and avoid bending elbows. Primary muscles: upper trapezius, levator scapulae. Use moderate weights to avoid neck strain and maintain controlled movement."
      }
    ]
  },

  {
    "id": "abs",
    "name": "Abs",
    "icon": "accessibility",
    "level": "Beginner",
    "exercises": [
      {
        "name": "Hanging Leg Raise",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hang from a pull-up bar with an overhand grip, hands shoulder-width apart, and body straight. Engage your core and raise your legs to a 90-degree angle, keeping them straight or slightly bent for beginners. Lower legs slowly with control to avoid swinging. Keep shoulders active and avoid shrugging. Primary muscles: rectus abdominis, obliques, hip flexors. Use a captain’s chair or elbow straps for easier variations, and maintain steady breathing to maximize core engagement."
      },
      {
        "name": "Plank",
        "sets": 3,
        "reps": 60,
        "unit": "seconds",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Rest on your forearms and toes, elbows directly under shoulders, and body in a straight line from head to heels. Engage your core, glutes, and quads to maintain a neutral spine. Hold the position, breathing steadily, without letting your hips sag or pike up. Primary muscles: rectus abdominis, transverse abdominis, obliques, core stabilizers. Modify by dropping to knees for beginners or add side-to-side hip dips for advanced variations."
      },
      {
        "name": "Crunches",
        "sets": 3,
        "reps": 20,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie on your back with knees bent, feet flat on the floor, and hands behind your head or crossed over your chest. Engage your core and curl your shoulders toward your knees, lifting your upper back off the ground. Lower back down with control, keeping your neck relaxed and chin slightly tucked. Avoid pulling on your neck or using momentum. Primary muscles: rectus abdominis, obliques. Focus on slow, controlled movements for maximum engagement."
      },
      {
        "name": "Bicycle Crunch",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Lie on your back with hands behind your head, legs lifted, and knees bent at 90 degrees. Engage your core and bring one elbow toward the opposite knee while extending the other leg out, keeping it elevated. Alternate sides in a pedaling motion, twisting your torso to engage obliques. Keep movements controlled and avoid pulling on your neck. Primary muscles: rectus abdominis, obliques, transverse abdominis. Maintain steady breathing and avoid letting legs touch the ground."
      },
      {
        "name": "Russian Twist",
        "sets": 3,
        "reps": 20,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit on the floor with knees bent, feet flat or slightly lifted for advanced versions, and lean back at a 45-degree angle. Hold a weight or clasp hands together, engaging your core. Twist your torso side to side, moving the weight or hands toward the floor on each side. Keep your back straight and avoid rounding your spine. Primary muscles: obliques, rectus abdominis, transverse abdominis. Use a lighter weight or no weight for beginners to focus on form."
      },
      {
        "name": "Ab Rollout",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Kneel on the floor, holding an ab wheel or barbell with both hands. Engage your core and roll the wheel forward, extending your body into a straight line close to the ground without letting your hips sag. Pull the wheel back toward your knees, maintaining control and a neutral spine. Avoid arching your back or using momentum. Primary muscles: rectus abdominis, transverse abdominis, obliques. Limit range of motion for beginners to build strength."
      },
      {
        "name": "Mountain Climbers",
        "sets": 3,
        "reps": 20,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Start in a plank position with hands under shoulders and body in a straight line. Engage your core and quickly alternate driving each knee toward your chest, as if running in place horizontally. Keep hips low and maintain a steady rhythm, breathing consistently. Avoid bouncing or letting hips pike up. Primary muscles: rectus abdominis, obliques, hip flexors, core stabilizers. Slow the pace for beginners to maintain form."
      }
    ]
  },
  {
    "id": "forearms",
    "name": "Forearms",
    "icon": "pan_tool",
    "level": "Pro",
    "exercises": [
      {
        "name": "Wrist Curl",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit on a bench, resting forearms on thighs with palms facing up, holding a barbell or dumbbells, hands extending past knees. Curl the weight upward by flexing your wrists, squeezing forearm muscles at the top. Lower slowly with control, allowing a full stretch. Keep forearms stable and avoid using shoulders. Primary muscles: flexor muscles of the forearm. Use lighter weights to prevent wrist strain and focus on controlled movements."
      },
      {
        "name": "Farmer's Walk",
        "sets": 3,
        "reps": 45,
        "unit": "seconds",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold heavy dumbbells or kettlebells in each hand, standing tall with shoulders back and core engaged. Walk forward with a steady pace, keeping arms relaxed and maintaining a firm grip on the weights. Avoid leaning or swinging the weights. Walk for the specified time or distance, keeping posture upright. Primary muscles: forearm flexors, grip strength, traps, core. Start with moderate weights and ensure a clear path for safety."
      },
      {
        "name": "Reverse Curl",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a barbell or dumbbells with an overhand grip (palms down), hands shoulder-width apart. Keep elbows tucked at your sides and curl the weight toward your chest, focusing on forearm and brachioradialis engagement. Lower the weight slowly with control, avoiding swinging. Maintain an upright posture and engaged core. Primary muscles: brachioradialis, forearm extensors, biceps. Use moderate weights to prevent elbow or wrist strain."
      },
      {
        "name": "Wrist Roller",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold a wrist roller with both hands, arms extended at shoulder height, with a weight attached to a rope. Roll the weight up by twisting your wrists in an alternating motion, keeping arms steady. Once the weight reaches the top, reverse the motion to lower it slowly. Maintain a firm grip and avoid using shoulders or bending elbows. Primary muscles: forearm flexors and extensors. Use a lighter weight for beginners to master the technique."
      },
      {
        "name": "Grip Squeeze",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold a grip trainer, stress ball, or spring-loaded gripper in one hand. Squeeze the device as hard as possible, holding the contraction for 1-2 seconds before releasing. Repeat for the specified reps, then switch hands. Keep movements controlled and avoid rushing. Primary muscles: forearm flexors, hand muscles. Adjust resistance for appropriate challenge and ensure consistent pressure for grip strength development."
      },
      {
        "name": "Reverse Wrist Curl",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit on a bench, resting forearms on thighs with palms facing down, holding a barbell or dumbbells, hands extending past knees. Curl the weight upward by extending your wrists, contracting forearm extensors. Lower slowly with control, allowing a full stretch. Keep forearms stable and avoid shoulder movement. Primary muscles: extensor muscles of the forearm. Use lighter weights to prevent wrist strain and focus on controlled motion."
      },
      {
        "name": "Plate Pinch",
        "sets": 3,
        "reps": 30,
        "unit": "seconds",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold two weight plates together (smooth sides out) between your thumb and fingers, one hand at a time. Pinch the plates tightly and hold for the specified time, keeping arms relaxed by your sides. Switch hands after each set. Avoid dropping the plates or bending wrists excessively. Primary muscles: forearm flexors, thumb muscles, grip strength. Start with lighter plates (e.g., 5-10 lbs) and progress to heavier ones for increased challenge."
      }
    ]
  },
  {
    "id": "cardio",
    "name": "Cardio",
    "icon": "favorite",
    "level": "Beginner",
    "exercises": [
      {
        "name": "Treadmill Run",
        "sets": 1,
        "reps": 30,
        "unit": "minutes",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Set the treadmill to a moderate pace (e.g., 5-7 mph for most individuals) suitable for your fitness level. Maintain a steady running form with arms bent at 90 degrees, swinging naturally. Adjust incline (1-3%) to simulate outdoor running and increase intensity. Keep your core engaged, land mid-foot, and breathe rhythmically. Primary muscles: quadriceps, hamstrings, calves, core. Beginners can alternate between running and walking intervals, while advanced runners can add sprints or higher inclines."
      },
      {
        "name": "Jump Rope",
        "sets": 3,
        "reps": 100,
        "unit": "jumps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold a jump rope with handles at hip height, standing with feet together. Swing the rope over your head and jump lightly on the balls of your feet as it passes under, maintaining a steady rhythm. Keep elbows close to your body and wrists relaxed, using minimal arm movement. Land softly to reduce impact. Primary muscles: calves, quadriceps, shoulders, core. Beginners can start with single jumps, while advanced users can try double-unders or high knees."
      },
      {
        "name": "Cycling",
        "sets": 1,
        "reps": 20,
        "unit": "minutes",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Use a stationary bike, adjusting the seat so knees have a slight bend at the bottom of the pedal stroke. Cycle at a moderate pace (e.g., 70-90 RPM), maintaining a smooth pedaling motion. Adjust resistance to mimic a light hill for added challenge. Keep your core engaged, back straight, and hands lightly on the handlebars. Primary muscles: quadriceps, hamstrings, glutes, calves. Vary resistance or incorporate intervals for increased intensity."
      },
      {
        "name": "Brisk Walking",
        "sets": 1,
        "reps": 30,
        "unit": "minutes",
        "level": "Beginner",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Walk at a fast pace (e.g., 3.5-4.5 mph) that elevates your heart rate while allowing conversation. Swing arms naturally, keep posture upright, and land heel-to-toe for efficient strides. Engage your core and maintain steady breathing. Use a treadmill or outdoor path, adding inclines for intensity. Primary muscles: quadriceps, hamstrings, calves, core. Beginners can start with shorter durations, while advanced walkers can incorporate hills or speed intervals."
      },
      {
        "name": "Stair Climbing",
        "sets": 1,
        "reps": 15,
        "unit": "minutes",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Use a stair machine or actual stairs, climbing at a steady pace. Step fully onto each stair, driving through your heel, and engage your glutes and quads. Hold handrails lightly for balance if needed, keeping your core tight and posture upright. Maintain a consistent rhythm and breathe steadily. Primary muscles: quadriceps, glutes, hamstrings, calves. Beginners can slow the pace or use fewer stairs, while advanced users can skip steps or add speed."
      },
      {
        "name": "Rowing Machine",
        "sets": 1,
        "reps": 20,
        "unit": "minutes",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Sit on a rowing machine, securing feet in straps and gripping the handle with an overhand grip. Push through your legs first, then lean back slightly and pull the handle to your lower chest, keeping elbows close. Extend arms and bend knees to return to the starting position. Maintain a smooth, controlled motion and avoid rounding your back. Primary muscles: quadriceps, hamstrings, glutes, lats, biceps. Adjust resistance for intensity and focus on form."
      },
      {
        "name": "Sprint Intervals",
        "sets": 4,
        "reps": 30,
        "unit": "seconds",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "On a track, treadmill, or open space, sprint at maximum effort for 30 seconds, pushing through your legs and pumping arms. Rest for 30 seconds by walking or standing still. Repeat for the specified sets. Maintain an upright posture, land mid-foot, and breathe deeply. Primary muscles: quadriceps, hamstrings, glutes, calves, core. Warm up thoroughly and start with fewer intervals for beginners to avoid strain."
      }
    ]
  },
  {
    "id": "fullbody",
    "name": "Full Body",
    "icon": "emoji_people",
    "level": "Expert",
    "exercises": [
      {
        "name": "Burpees",
        "sets": 3,
        "reps": 15,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Start standing, then squat and place hands on the ground. Jump back into a plank, perform a push-up, then jump feet back to hands. Explode upward into a jump, reaching arms overhead. Land softly and repeat in a fluid motion. Keep core engaged and maintain a steady pace. Primary muscles: quadriceps, hamstrings, glutes, chest, shoulders, core. Modify by stepping back instead of jumping for beginners."
      },
      {
        "name": "Kettlebell Swing",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a kettlebell with both hands. Hinge at hips, swinging the kettlebell back between your legs, then thrust hips forward to swing it to chest height. Let the kettlebell swing back down naturally, maintaining a neutral spine. Keep arms relaxed and use hip power, not arms, to drive the movement. Primary muscles: glutes, hamstrings, core, shoulders. Use a lighter kettlebell to master form and avoid lower back strain."
      },
      {
        "name": "Mountain Climbers",
        "sets": 3,
        "reps": 30,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Start in a plank position with hands under shoulders and body straight. Engage your core and alternate driving each knee toward your chest in a rapid, running-like motion. Keep hips low and maintain a steady rhythm, breathing consistently. Avoid bouncing or letting hips pike up. Primary muscles: rectus abdominis, obliques, hip flexors, shoulders, core. Slow the pace for beginners to maintain proper form."
      },
      {
        "name": "Push-Up to Plank",
        "sets": 3,
        "reps": 12,
        "unit": "reps",
        "level": "Intermediate",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Begin in a push-up position with hands under shoulders. Perform a push-up, lowering your chest to just above the ground, then push back up. Shift to a forearm plank by placing one forearm down at a time, then return to push-up position by extending arms one at a time. Keep body straight and core tight. Primary muscles: chest, triceps, shoulders, core. Modify with knees on the ground for beginners."
      },
      {
        "name": "Thruster",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold dumbbells or a barbell at shoulder height, standing with feet shoulder-width apart. Squat down until thighs are parallel to the ground, keeping chest up and core engaged. As you stand, press the weights overhead in one fluid motion, fully extending arms. Lower the weights back to shoulders and repeat. Avoid arching your back or locking knees. Primary muscles: quadriceps, glutes, shoulders, triceps, core. Use lighter weights to ensure smooth transitions."
      },
      {
        "name": "Clean and Press",
        "sets": 3,
        "reps": 8,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Stand with feet shoulder-width apart, holding a barbell or dumbbells at ground level. Pull the weight to your shoulders in a clean motion, bending knees and using hip drive. From the shoulder rack position, press the weight overhead until arms are fully extended. Lower the weight back to the ground with control. Keep core tight and back straight throughout. Primary muscles: glutes, hamstrings, shoulders, triceps, core. Practice with lighter weights to master technique."
      },
      {
        "name": "Squat to Overhead Press",
        "sets": 3,
        "reps": 10,
        "unit": "reps",
        "level": "Pro",
        "image": "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5qNWJ3c3Fjd2h5ZXZhMTR5a2E2ZWR3c3Fyc3Z0anB6N3B2a2I5cCZlcD12MV9pbnRlcm5hbF9naWZfYnl_faWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
        "description": "Hold dumbbells at shoulder height, palms facing inward, with feet shoulder-width apart. Squat down until thighs are parallel to the ground, keeping chest up and core engaged. As you stand, press the dumbbells overhead, fully extending arms. Lower the weights back to shoulders and repeat in a fluid motion. Avoid leaning back or locking knees. Primary muscles: quadriceps, glutes, shoulders, triceps, core. Use controlled movements to maintain balance and form."
      }
    ]
  }

];

const STORAGE_KEY = "gymPlanByDate";
const USER_KEY = "gymUserData";
let selectedDate = null;
let chartInstance = null;

$(function () {
  // ---------------- User Data ----------------
  let user = getUserData();

  // If no user or joining date missing, initialize and show modal
  if (!user || !user.joiningday) {
    user = { 
      usertype: 'Beginner', 
      joiningday: '' // Keep empty so modal forces user to input
    };
    saveUserData(user);

    // Pre-fill modal inputs with defaults
    const profile = getProfile() || { name: '', weight: 70, age: 30 };
    $('#editName').val(profile.name);
    $('#editWeight').val(profile.weight);
    $('#editAge').val(profile.age);

    // Show modal
    new bootstrap.Modal(document.getElementById('editProfileModal')).show();
  }

  // ---------------- Calendar & Plan ----------------
  renderCalendar();
  updateCalendarIcons();
  renderCategoryModal();
  bindEvents();

  const plan = getPlan();
  if (Object.keys(plan).length > 0) {
    showDashboardToday();
  } else {
    showCalendar();
  }

  // ---------------- Profile & Recommendations ----------------
  initProfile();
  generateRecommendations();
});

// ---------------- LocalStorage Helpers ----------------
function getPlan() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    console.error('Error parsing plan:', e);
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}
function savePlan(plan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

function getUserData() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); }
  catch(e){ return null; }
}
function saveUserData(user) { localStorage.setItem(USER_KEY, JSON.stringify(user)); }

function getProfile() {
  try { return JSON.parse(localStorage.getItem('userProfile')) || {name:'John Doe', weight:70, age:30}; }
  catch(e){ return {name:'John Doe', weight:70, age:30}; }
}
function saveProfile(profile) { localStorage.setItem('userProfile', JSON.stringify(profile)); }

// ---------------- UI Helpers ----------------
function showCalendar() {
  $("#dashboardSection").hide();
  $("#calendarSection").show();
}
function showDashboard() {
  $("#calendarSection").hide();
  $("#dashboardSection").show();
}

// ---------------- Calendar & Modal ----------------
function renderCalendar() {
  const $grid = $("#calendarGrid");
  $grid.empty();
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for(let i=0;i<7;i++){
    const dayKey = `day${i}`;
    $grid.append(`
      <div class="col-12 col-md day-tile p-3 mb-2" data-date="${dayKey}" role="button" aria-label="Select ${days[i]} workout plan">
        <div class="day-name fw-bold mb-2">${days[i]}</div>
        <div class="day-icons d-flex justify-content-center gap-1 flex-wrap" aria-live="polite"></div>
      </div>
    `);
  }
}
function renderCategoryModal() {
  const $grid = $("#modalCategoryGrid");
  $grid.empty();
  CATEGORIES.forEach(cat => {
    $grid.append(`
      <div class="cat-btn" data-id="${cat.id}" role="button" aria-label="Select ${cat.name}" aria-pressed="false">
        <i class="material-icons">${cat.icon}</i>${cat.name}
      </div>
    `);
  });
  // toggle aria-pressed
  $grid.on('click','.cat-btn',function(){
    const $this=$(this);
    const active=!$this.hasClass('active');
    $this.attr('aria-pressed',active);
  });
}

function bindEvents(){
  // Calendar click
  $("#calendarGrid").on("click", ".day-tile", function () {
    selectedDate = $(this).data("date");
    const plan = getPlan()[selectedDate] || { cats: [], rest: false };
    $("#modalCategoryGrid .cat-btn").removeClass("active");
    plan.cats.forEach(c => $(`#modalCategoryGrid .cat-btn[data-id="${c}"]`).addClass("active"));
    $(".btn-rest").toggleClass("active", plan.rest);
    new bootstrap.Modal(document.getElementById('categoryModal')).show();
  });

  // Category selection
  $("#modalCategoryGrid").on("click",".cat-btn",function(){
    if($(this).hasClass("active")) $(this).removeClass("active");
    else{
      if($("#modalCategoryGrid .cat-btn.active").length>=2){ alert("Max 2 categories"); return; }
      $(this).addClass("active");
    }
    $(".btn-rest").removeClass("active");
  });

  $(".btn-rest").on("click",function(){
    $(".btn-rest").addClass("active");
    $("#modalCategoryGrid .cat-btn").removeClass("active");
  });

  // Save modal
  $("#modalSaveBtn").on("click",function(){
    const plan=getPlan();
    const selectedCats=[];
    $("#modalCategoryGrid .cat-btn.active").each(function(){ selectedCats.push($(this).data("id")); });
    const isRest=$(".btn-rest").hasClass("active");
    plan[selectedDate]={cats:selectedCats,rest:isRest};
    savePlan(plan);
    bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
    updateCalendarIcons();
    checkAllDaysSelected();
  });

  // Reset
  $("#resetBtn").on("click",function(){
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  // Edit calendar
  $("#editBtn").on("click",function(){
    showCalendar();
    const todayKey=`day${new Date().getDay()}`;
    selectedDate=todayKey;
    const plan=getPlan()[todayKey] || {cats:[],rest:false};
    $("#modalCategoryGrid .cat-btn").removeClass("active");
    plan.cats.forEach(c => $(`#modalCategoryGrid .cat-btn[data-id="${c}"]`).addClass("active"));
    $(".btn-rest").toggleClass("active", plan.rest);
  });

  // Go training
  $("#goTrainingBtn").on("click",function(){
    const plan=getPlan();
    if(Object.keys(plan).length<7){ alert("Select all 7 days before training"); return; }
    showDashboardToday();
  });
}

function updateCalendarIcons(){
  const plan=getPlan();
  $('.day-tile').each(function(){
    const $tile=$(this);
    const date=$tile.data('date');
    const $icons=$tile.find(".day-icons");
    $icons.empty();
    if(plan[date]){
      if(plan[date].rest){ $icons.append('<i class="material-icons text-danger">hotel</i>'); $tile.addClass('active'); }
      else{
        plan[date].cats.forEach(catId=>{
          const cat=CATEGORIES.find(c=>c.id===catId);
          if(cat) $icons.append(`<i class="material-icons text-primary">${cat.icon}</i>`);
        });
        $tile.toggleClass('active',plan[date].cats.length>0);
      }
    } else { $tile.removeClass("active"); }
  });
}

function checkAllDaysSelected(){
  const plan=getPlan();
  const allSelected=$(".day-tile").length===Object.keys(plan).length;
  $("#goTrainingContainer").toggle(allSelected);
}

function showDashboardToday() {
    const plan = getPlan();
    const user = getUserData();
    const todayKey = `day${new Date().getDay()}`;
    const todayPlan = plan[todayKey] || { cats: [], rest: false };
    const $todayCards = $("#todayCards");
    $todayCards.empty();

    // Calculate total days worked (count only days with completed workouts)
    const workoutDays = Object.values(user.workoutLog || {}).filter(day => day.completed).length;

    // Determine user type based on actual workouts
    const updatedUserType = workoutDays <= 14 ? "Beginner" :
                            workoutDays <= 60 ? "Intermediate" : "Pro";
    const typeHierarchy = { Beginner: 1, Intermediate: 2, Pro: 3 };

    // Display
    if (todayPlan.rest) {
        $todayCards.append(`
            <div class="col-12">
                <div class="card glass p-3 text-center text-danger">
                    <i class="material-icons" style="font-size:48px;">hotel</i>
                    <h5 class="mt-2">Rest Day</h5>
                </div>
            </div>
        `);
    } else if (!todayPlan.cats.length) {
        $todayCards.append(`
            <div class="col-12">
                <div class="card glass p-3 text-center text-muted">
                    <h5 class="mt-2">No Workout Planned</h5>
                </div>
            </div>
        `);
    } else {
        todayPlan.cats.forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;

    let exercisesToShow;

    switch (updatedUserType) {
        case "Beginner":
            exercisesToShow = cat.exercises.slice(0, 3);
            break;
        case "Intermediate":
            exercisesToShow = cat.exercises.slice(0, 6);
            break;
        case "Pro":
            exercisesToShow = [...cat.exercises]; // all exercises
            break;
        default:
            exercisesToShow = [...cat.exercises];
    }

    // Force minimum 3 sets for Beginner
    exercisesToShow = exercisesToShow.map(e => {
        const sets = updatedUserType === "Beginner" && e.sets < 3 ? 3 : e.sets;
        return { ...e, sets };
    });

    const exercisesHtml = exercisesToShow.map(e => `
        <li class="d-flex align-items-start gap-2">
            <img src="${e.image}" alt="${e.name} demo" class="exercise-img" style="width:50px;height:50px;object-fit:cover;border-radius:5px;">
            <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2">
                    <strong>${e.name}</strong>
                    <button class="info-btn btn btn-sm btn-outline-secondary" 
                            data-name="${e.name}" data-description="${e.description}" data-image="${e.image}" 
                            aria-label="View ${e.name} description">
                        <i class="material-icons">info</i>
                    </button>
                </div>
                <span>${e.sets} sets x ${e.reps} ${e.unit}</span>
            </div>
        </li>
    `).join('');

    $todayCards.append(`
        <div class="col-12 col-sm-6 col-md-4">
            <div class="card glass p-3">
                <div class="d-flex align-items-center mb-2">
                    <i class="material-icons me-2">${cat.icon}</i>
                    <h5 class="mb-0">${cat.name}</h5>
                </div>
                <ul class="exercise-list">${exercisesHtml}</ul>
            </div>
        </div>
    `);
});
    }

    showDashboard();

    // Info button
    $todayCards.off('click', '.info-btn').on('click', '.info-btn', function () {
        $('#exerciseDescriptionModalLabel').text($(this).data('name'));
        $('#exerciseDescription').text($(this).data('description'));
        $('#exerciseImage').attr({ src: $(this).data('image'), alt: `${$(this).data('name')} demo` });
        new bootstrap.Modal('#exerciseDescriptionModal').show();
    });

    // Chart
    renderTimelineChart(todayPlan);
}

// ---------------- Chart ----------------
function renderTimelineChart(plan) {
    const ctx = document.getElementById('timelineChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    if (plan.rest || plan.cats.length === 0) {
        ctx.canvas.style.display = 'none';
        return;
    }
    ctx.canvas.style.display = 'block';

    const labels = plan.cats.map(cId => {
        const cat = CATEGORIES.find(c => c.id === cId);
        return cat ? cat.name : '';
    });

    const totalRepsData = plan.cats.map(cId => {
        const cat = CATEGORIES.find(c => c.id === cId);
        return cat ? cat.exercises.reduce((sum, e) => sum + e.reps, 0) : 0;
    });

    const totalSetsData = plan.cats.map(cId => {
        const cat = CATEGORIES.find(c => c.id === cId);
        return cat ? cat.exercises.reduce((sum, e) => sum + e.sets, 0) : 0;
    });

    const totalExercisesData = plan.cats.map(cId => {
        const cat = CATEGORIES.find(c => c.id === cId);
        return cat ? cat.exercises.length : 0;
    });

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Total Reps',
                    data: totalRepsData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                },
                {
                    label: 'Total Sets',
                    data: totalSetsData,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)'
                },
                {
                    label: 'Total Exercises',
                    data: totalExercisesData,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: { 
                y: { beginAtZero: true },
                x: { stacked: false },
            }
        }
    });
}

// ---------------- Profile ----------------
// ---------------- Profile ----------------
function initProfile() {
    const profile = getProfile();
    const user = getUserData() || {};

    $('#userName').text(profile.name);
    $('#userStats').text(`Weight: ${profile.weight} kg, Age: ${profile.age}`);
    $('#editName').val(profile.name);
    $('#editWeight').val(profile.weight);
    $('#editAge').val(profile.age);

    // Ensure joining date exists
    if (!user.joiningday) {
        user.joiningday = new Date().toISOString().split('T')[0];
        saveUserData(user);
    }

    // Calculate total gym days since joining
    const joinDate = new Date(user.joiningday);
    const today = new Date();
    const totalDays = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24)) + 1; // Today counts as day 1
    $('#gymDayCount').text(totalDays);

    // Optional: show weekly progress for the current week
    const plan = getPlan();
    const gymDayCount = Object.values(plan).filter(d => !d.rest && d.cats.length > 0).length;
    $('#trainingProgress').css('width', `${(gymDayCount / 7) * 100}%`);
    $('#gymStatus').text(gymDayCount > 0
        ? `You've trained ${gymDayCount} day${gymDayCount > 1 ? 's' : ''} this week!`
        : 'Plan your workouts to start training!'
    );

    // Update level badge based on joining date
    updateLevelBadge(user.joiningday);
    
updateTrainingProgress(user.joiningday);

    // Save profile button
    $('#saveProfileBtn').off('click').on('click', function () {
        const name = $('#editName').val().trim();
        const weight = parseFloat($('#editWeight').val());
        const age = parseInt($('#editAge').val(), 10);

        if (!name || name.length < 2) { alert('Enter valid name'); return; }
        if (isNaN(weight) || weight < 30 || weight > 200) { alert('Enter valid weight'); return; }
        if (isNaN(age) || age < 16 || age > 100) { alert('Enter valid age'); return; }

        // Save profile
        const profileData = { ...profile, name, weight, age };
        saveProfile(profileData);

        $('#userName').text(name);
        $('#userStats').text(`Weight: ${weight} kg, Age: ${age}`);

        // Update level badge
        updateLevelBadge(user.joiningday);

        // Generate recommendations
        generateRecommendations();

        bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
    });

    // Generate recommendations on load
    generateRecommendations();
}

// ---------------- Level Badge ----------------
function updateLevelBadge(joiningday) {
    if (!joiningday) return;

    const joinDate = new Date(joiningday);
    const today = new Date();
    const totalDays = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24)) + 1;

    // Set color based on total days (example thresholds)
    let color = '#28a745'; // Beginner: green
    if (totalDays > 30 && totalDays <= 90) color = '#ffc107'; // Intermediate: yellow
    else if (totalDays > 90) color = '#dc3545'; // Pro: red

    $('#levelBadge').text(`${totalDays} days`).css({
        'background-color': color,
        'color': '#fff',
        'border-radius': '50%',
        'width': '60px',
        'height': '60px',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-weight': 'bold',
        'font-size': '0.9rem',
        'margin': 'auto'
    });
}

// ---------------- Recommendations ----------------
function generateRecommendations() {
    const { weight, age } = getProfile();
    const plan = getPlan();
    const gymDayCount = Object.values(plan).filter(d => !d.rest && d.cats.length > 0).length;
    const recommendations = [];

    // Age-based
    if (age < 25) recommendations.push('Focus on compound lifts for muscle growth.', 'Do HIIT 1-2x/week.');
    else if (age <= 40) recommendations.push('Balance strength with flexibility.', '3-4 gym sessions/week including cardio.');
    else recommendations.push('Low-impact exercises.', 'Include recovery days with stretching.');

    // Weight-based
    if (weight < 60) recommendations.push('Increase protein intake.', 'Start with light weights.');
    else if (weight <= 85) recommendations.push('Balanced diet with 1.6-2.2g protein/kg.', 'Progressive overload weekly.');
    else recommendations.push('Strength + cardio for fat loss.', 'Monitor portions & focus on lean proteins.');

    // Gym day count-based
    if (gymDayCount < 3) recommendations.push('Schedule at least 3 days/week.', 'Start with full-body workouts.');
    else if (gymDayCount <= 5) recommendations.push('Mix in rest days.', 'Focus on specific muscle groups.');
    else recommendations.push('Ensure nutrition & sleep.', 'Deload every 6-8 weeks.');

    const $recList = $('#recommendationsList');
    $recList.empty();
    recommendations.forEach(r => $recList.append(`<li>${r}</li>`));
}

function updateTrainingProgress(joiningday) {
    if (!joiningday) return;

    const joinDate = new Date(joiningday);
    const today = new Date();

    // Calculate total days since joining
    const totalDays = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24)) + 1;

    // Optional: cap for weekly progress (0-7 days) or use total days / goal
    const progressPercent = Math.min((totalDays / 7) * 100, 100);

    $('#trainingProgress').css('width', `${progressPercent}%`)
        .attr('aria-valuenow', progressPercent);

    $('#gymStatus').text(`You've trained for ${totalDays} day${totalDays > 1 ? 's' : ''} since joining!`);
}

const fab = document.getElementById('musicFab');
const sheetWrapper = document.getElementById('musicSheetWrapper');
const sheet = document.getElementById('musicSheet');
const frame = document.getElementById('musicFrame');
const closeBtn = document.getElementById('closeSheetBtn');

const PEAK_HEIGHT = 80; // bottom peek height
const EXPANDED_HEIGHT = 0; // fully expanded (top)

let startY = 0;
let currentY = 0;
let isDragging = false;
let isExpanded = false;

// Open bottom sheet (on first click)
fab.addEventListener('click', () => {
  frame.src = "music.html";
  sheetWrapper.classList.add('active');
  sheet.style.transform = `translateY(calc(100% - ${PEAK_HEIGHT}px))`;
});

// Optional: hide overlay but keep sheet visible
closeBtn.addEventListener('click', () => {
  sheetWrapper.style.opacity = '0';
  setTimeout(() => { sheetWrapper.style.visibility = 'hidden'; }, 300);
});

// --- Drag & slide behavior ---
sheet.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
  sheet.style.transition = 'none';
});

sheet.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentY = e.touches[0].clientY;
  let deltaY = currentY - startY;

  let sheetHeight = isExpanded ? EXPANDED_HEIGHT : window.innerHeight - PEAK_HEIGHT;
  let translate = Math.min(Math.max(deltaY + sheetHeight, EXPANDED_HEIGHT), window.innerHeight - PEAK_HEIGHT);
  sheet.style.transform = `translateY(${translate}px)`;
});

sheet.addEventListener('touchend', () => {
  isDragging = false;
  sheet.style.transition = 'transform 0.3s ease';

  let deltaY = currentY - startY;
  // Determine final state: expand if dragged up, collapse to peek if dragged down
  if (deltaY < -50) {
    sheet.style.transform = `translateY(${EXPANDED_HEIGHT}px)`;
    isExpanded = true;
  } else if (deltaY > 50) {
    sheet.style.transform = `translateY(calc(100% - ${PEAK_HEIGHT}px))`;
    isExpanded = false;
  } else {
    // small drag, snap back to previous state
    sheet.style.transform = isExpanded ? `translateY(${EXPANDED_HEIGHT}px)` : `translateY(calc(100% - ${PEAK_HEIGHT}px))`;
  }
});