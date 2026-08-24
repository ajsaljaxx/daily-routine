export const INITIAL_USER_PROFILE = {
  name: "Ajsal",
  tagline: "Building discipline & lifelong growth",
  avatarUrl: "",
  currency: "₹",
  theme: "light",
  targetSleepTime: "23:00",
  targetWakeTime: "05:30",
  dailySleepTarget: 7.5, // in hours
  dailyWaterTarget: 8, // in glasses (250ml each)
  dailyResetTime: "12:00", // 12:00 PM daily reset time
  appLayoutMode: 'auto', // 'auto' | 'app' | 'website'
  aiProvider: 'gemini', // 'gemini' | 'openai' | 'ollama' | 'builtin'
  aiApiKey: (import.meta.env.VITE_GEMINI_API_KEY || '').trim(),
  notificationsEnabled: true
};

export const INITIAL_PRAYERS = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', time: '05:15 AM', completed: false },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', time: '12:35 PM', completed: false },
  { id: 'asr', name: 'Asr', arabicName: 'العصر', time: '04:15 PM', completed: false },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', time: '06:45 PM', completed: false },
  { id: 'isha', name: 'Isha', arabicName: 'العشاء', time: '08:15 PM', completed: false }
];

export const INITIAL_QURAN = {
  currentJuz: 14,
  pagesReadToday: 0,
  targetPagesPerDay: 20,
  completedToday: false,
  totalJuzCompleted: 13,
  currentSurah: 'Al-Hijr',
  streak: 12
};

export const INITIAL_HABITS = [
  {
    id: 'h1',
    name: 'Morning Routine & Exercise',
    category: 'Fitness',
    frequency: 'Daily',
    streak: 8,
    bestStreak: 21,
    completedToday: false,
    icon: 'Activity',
    color: '#36A269'
  },
  {
    id: 'h2',
    name: 'Hydrate 2.5 Liters Water',
    category: 'Health',
    frequency: 'Daily',
    streak: 14,
    bestStreak: 30,
    completedToday: false,
    currentProgress: 0,
    targetProgress: 8,
    unit: 'glasses',
    icon: 'Droplets',
    color: '#5B8DEF'
  },
  {
    id: 'h3',
    name: 'Deep Study & Skill Building',
    category: 'Education',
    frequency: 'Daily',
    streak: 6,
    bestStreak: 15,
    completedToday: false,
    icon: 'Code',
    color: '#2457FF'
  },
  {
    id: 'h4',
    name: 'Evening Brisk Walk (30 min)',
    category: 'Health',
    frequency: 'Daily',
    streak: 5,
    bestStreak: 12,
    completedToday: false,
    icon: 'Footprints',
    color: '#F59E0B'
  },
  {
    id: 'h5',
    name: 'Phone Detox Before Bed',
    category: 'Mindfulness',
    frequency: 'Daily',
    streak: 9,
    bestStreak: 18,
    completedToday: false,
    icon: 'Moon',
    color: '#EF4444'
  },
  {
    id: 'h6',
    name: 'Night Journal & Gratitude',
    category: 'Mindfulness',
    frequency: 'Daily',
    streak: 11,
    bestStreak: 25,
    completedToday: false,
    icon: 'Moon',
    color: '#103FE0'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Submit College Artificial Intelligence Assignment',
    category: 'Education',
    priority: 'Urgent',
    date: '2026-08-18',
    time: '11:30 AM',
    notes: 'Include clean diagrams and comparative neural network accuracy table.',
    completed: false,
    recurring: 'None'
  },
  {
    id: 'task-2',
    title: 'Review React & Vite Codebase Architecture',
    category: 'Study',
    priority: 'High',
    date: '2026-08-18',
    time: '02:30 PM',
    notes: 'Verify component reusability and CSS custom properties token integration.',
    completed: false,
    recurring: 'None'
  },
  {
    id: 'task-3',
    title: 'Gym Workout: Chest & Triceps Hypertrophy',
    category: 'Fitness',
    priority: 'Medium',
    date: '2026-08-18',
    time: '06:00 PM',
    notes: '4 sets bench press, 3 sets dumbbell incline flyes, dips.',
    completed: false,
    recurring: 'Daily'
  },
  {
    id: 'task-4',
    title: 'Read 25 Pages of Atomic Habits (Chapter 5)',
    category: 'Personal',
    priority: 'Medium',
    date: '2026-08-18',
    time: '09:00 PM',
    notes: 'Make notes on environment design and habit stacking.',
    completed: false,
    recurring: 'Daily'
  },
  {
    id: 'task-5',
    title: 'Review Weekly Expenses & Update Savings Goal',
    category: 'Finance',
    priority: 'Low',
    date: '2026-08-19',
    time: '07:00 PM',
    notes: 'Check food and utility outlays against monthly allocation.',
    completed: false,
    recurring: 'Weekly'
  }
];

export const INITIAL_SLEEP_DATA = {
  lastNight: {
    durationHours: 0,
    date: new Date().toISOString().split('T')[0],
    sessions: []
  },
  history: [
    { date: "2026-08-01", from: "23:00", to: "06:30", duration: 7.5 },
    { date: "2026-08-02", from: "23:15", to: "06:15", duration: 7.0 },
    { date: "2026-08-03", from: "23:30", to: "06:00", duration: 6.5 },
    { date: "2026-08-04", from: "23:00", to: "06:30", duration: 7.5 },
    { date: "2026-08-05", from: "22:45", to: "06:15", duration: 7.5 },
    { date: "2026-08-06", from: "23:30", to: "06:30", duration: 7.0 },
    { date: "2026-08-07", from: "00:00", to: "06:30", duration: 6.5 },
    { date: "2026-08-08", from: "23:00", to: "06:00", duration: 7.0 },
    { date: "2026-08-09", from: "23:15", to: "06:45", duration: 7.5 },
    { date: "2026-08-10", from: "23:00", to: "06:30", duration: 7.5 },
    { date: "2026-08-11", from: "23:45", to: "06:15", duration: 6.5 },
    { date: "2026-08-12", from: "23:30", to: "06:30", duration: 7.0 },
    { date: "2026-08-13", from: "23:00", to: "06:00", duration: 7.0 },
    { date: "2026-08-14", from: "00:15", to: "06:45", duration: 6.5 },
    { date: "2026-08-15", from: "23:10", to: "06:40", duration: 7.5 },
    { date: "2026-08-16", from: "23:45", to: "06:15", duration: 6.5 },
    { date: "2026-08-17", from: "23:00", to: "06:30", duration: 7.5 },
    { date: "2026-08-18", from: "23:15", to: "06:15", duration: 7.0 }
  ]
};

export const INITIAL_MEALS = [
  {
    id: 'm1',
    category: 'Early Morning',
    time: '06:00 AM',
    food: 'Warm Lemon Water + 5 Almonds & 2 Dates',
    calories: 120,
    notes: 'Pre-workout hydration and energy'
  },
  {
    id: 'm2',
    category: 'Breakfast / Morning',
    time: '08:30 AM',
    food: '2 Boiled Eggs + 2 Whole Wheat Chapatis + Mint Tea',
    calories: 440,
    notes: 'High protein breakfast'
  },
  {
    id: 'm3',
    category: 'Afternoon / Lunch',
    time: '01:30 PM',
    food: 'Brown Rice + Grilled Chicken Breast + Mixed Vegetable Curry',
    calories: 680,
    notes: 'Well balanced clean meal'
  },
  {
    id: 'm4',
    category: 'Evening',
    time: '05:30 PM',
    food: 'Green Tea + Roasted Chickpeas',
    calories: 150,
    notes: 'Light snack before evening activity'
  },
  {
    id: 'm5',
    category: 'Night / Dinner',
    time: '08:45 PM',
    food: 'Lentil Soup (Dal) + Grilled Paneer & Green Salad',
    calories: 390,
    notes: 'Low carb evening dinner'
  }
];

export const INITIAL_BMI_DATA = {
  heightCm: 175,
  weightKg: 68.5,
  age: 23,
  gender: 'Male',
  history: [
    { date: '2026-03-01', weight: 72.0, bmi: 23.5 },
    { date: '2026-04-15', weight: 71.0, bmi: 23.2 },
    { date: '2026-06-01', weight: 69.8, bmi: 22.8 },
    { date: '2026-07-15', weight: 69.0, bmi: 22.5 },
    { date: '2026-08-18', weight: 68.5, bmi: 22.4 }
  ]
};

export const INITIAL_FINANCE_DATA = {
  currentBalance: 0,
  monthlyIncome: 45000,
  monthlyBudget: 22000,
  transactions: [
    { id: 'tx-1', title: 'Organic Groceries & Fruits', amount: 840, type: 'expense', category: 'Food', date: '2026-08-18', note: 'Weekly produce' },
    { id: 'tx-2', title: 'Metro Transit Card Recharge', amount: 300, type: 'expense', category: 'Travel', date: '2026-08-18', note: 'Public transport' },
    { id: 'tx-3', title: 'Client Web Design Payout', amount: 15000, type: 'income', category: 'Work', date: '2026-08-16', note: 'Portfolio freelance project' },
    { id: 'tx-4', title: 'Tech Book — Deep Work Paperback', amount: 499, type: 'expense', category: 'Education', date: '2026-08-15', note: 'Study material' },
    { id: 'tx-5', title: 'Monthly Allocation to Savings', amount: 5000, type: 'saving', category: 'Savings', date: '2026-08-14', note: 'Automated transfer' },
    { id: 'tx-6', title: 'Broadband High Speed Internet', amount: 999, type: 'expense', category: 'Bills', date: '2026-08-10', note: 'Monthly fiber plan' },
    { id: 'tx-7', title: 'Cafe Work Session with Colleagues', amount: 380, type: 'expense', category: 'Entertainment', date: '2026-08-08', note: 'Cold brew & snack' }
  ],
  savingsGoals: [
    {
      id: 'sg-1',
      title: 'New High-Performance Laptop',
      targetAmount: 95000,
      currentAmount: 42000,
      category: 'Tech & Work',
      deadline: '2026-12-31',
      color: '#2457FF'
    },
    {
      id: 'sg-2',
      title: 'Emergency Rainy Day Fund',
      targetAmount: 60000,
      currentAmount: 38500,
      category: 'Security',
      deadline: '2026-10-31',
      color: '#10B981'
    },
    {
      id: 'sg-3',
      title: 'Annual Professional Certifications',
      targetAmount: 25000,
      currentAmount: 18000,
      category: 'Education',
      deadline: '2026-11-15',
      color: '#0EA5E9'
    }
  ]
};

export const INITIAL_BOOKS = [
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    totalPages: 320,
    currentPage: 148,
    status: 'Reading',
    startDate: '2026-08-01',
    targetDate: '2026-08-25',
    category: 'Personal Growth',
    color: '#F97316',
    notes: 'Focus on 1% daily improvements and systems over goals.'
  },
  {
    id: 'book-2',
    title: 'Deep Work',
    author: 'Cal Newport',
    totalPages: 296,
    currentPage: 296,
    status: 'Completed',
    startDate: '2026-07-10',
    targetDate: '2026-07-31',
    category: 'Productivity',
    color: '#0EA5E9',
    notes: 'The ability to perform deep work is becoming increasingly rare and valuable.'
  },
  {
    id: 'book-3',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    totalPages: 252,
    currentPage: 72,
    status: 'Reading',
    startDate: '2026-08-10',
    targetDate: '2026-08-30',
    category: 'Finance & Mindset',
    color: '#10B981',
    notes: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.'
  },
  {
    id: 'book-4',
    title: 'Show Your Work!',
    author: 'Austin Kleon',
    totalPages: 224,
    currentPage: 0,
    status: 'Want to Read',
    startDate: '',
    targetDate: '2026-09-15',
    category: 'Creativity',
    color: '#5C95FF',
    notes: '10 ways to share your creativity and get discovered.'
  }
];

export const INITIAL_REFLECTIONS = [
  {
    id: 'ref-1',
    date: '2026-08-17',
    wentWell: 'Completed all 5 Swalah on time, read 22 pages of Atomic Habits, finished the database schema design.',
    couldImprove: 'Spent 25 minutes scrolling social media in the afternoon. Need tighter pomodoro boundaries.',
    gratefulFor: 'Good health, supportive family, and clarity of purpose.',
    energyRating: 4,
    tomorrowFocus: [
      'Submit College AI Assignment before noon',
      'Maintain Qur’an 1 Juz daily consistency',
      'Hit gym for chest & triceps workout'
    ]
  }
];
