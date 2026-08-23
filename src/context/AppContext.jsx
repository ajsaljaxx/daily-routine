import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_USER_PROFILE,
  INITIAL_PRAYERS,
  INITIAL_QURAN,
  INITIAL_HABITS,
  INITIAL_TASKS,
  INITIAL_SLEEP_DATA,
  INITIAL_MEALS,
  INITIAL_BMI_DATA,
  INITIAL_FINANCE_DATA,
  INITIAL_BOOKS,
  INITIAL_REFLECTIONS
} from '../data/initialData';
import { generateAiResponse } from '../services/aiService';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: 'aura_user_profile',
  PRAYERS: 'aura_prayers',
  QURAN: 'aura_quran',
  HABITS: 'aura_habits',
  TASKS: 'aura_tasks',
  SLEEP: 'aura_sleep',
  MEALS: 'aura_meals',
  WATER: 'aura_water',
  BMI: 'aura_bmi',
  FINANCE: 'aura_finance',
  BOOKS: 'aura_books',
  REFLECTIONS: 'aura_reflections',
  AI_CHAT: 'aura_ai_chat',
  NOTIFICATIONS: 'aura_notifications',
  ACTIVE_PAGE: 'aura_active_page',
  DAY_COUNTER: 'aura_day_counter',
  STREAK_START_DATE: 'aura_streak_start_date'
};

function loadStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for key ${key}:`, e);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing to localStorage for key ${key}:`, e);
  }
}

export function AppProvider({ children }) {
  // State Initialization with local storage fallback
  const [userProfile, setUserProfile] = useState(() => loadStorage(STORAGE_KEYS.PROFILE, INITIAL_USER_PROFILE));
  const [prayers, setPrayers] = useState(() => loadStorage(STORAGE_KEYS.PRAYERS, INITIAL_PRAYERS));
  const [quran, setQuran] = useState(() => loadStorage(STORAGE_KEYS.QURAN, INITIAL_QURAN));
  const [habits, setHabits] = useState(() => loadStorage(STORAGE_KEYS.HABITS, INITIAL_HABITS));
  const [tasks, setTasks] = useState(() => loadStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS));
  const [sleep, setSleep] = useState(() => loadStorage(STORAGE_KEYS.SLEEP, INITIAL_SLEEP_DATA));
  const [meals, setMeals] = useState(() => loadStorage(STORAGE_KEYS.MEALS, INITIAL_MEALS));
  const [waterGlasses, setWaterGlasses] = useState(() => loadStorage(STORAGE_KEYS.WATER, 6));
  const [bmiData, setBmiData] = useState(() => loadStorage(STORAGE_KEYS.BMI, INITIAL_BMI_DATA));
  const [finance, setFinance] = useState(() => loadStorage(STORAGE_KEYS.FINANCE, INITIAL_FINANCE_DATA));
  const [books, setBooks] = useState(() => loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS));
  const [reflections, setReflections] = useState(() => loadStorage(STORAGE_KEYS.REFLECTIONS, INITIAL_REFLECTIONS));
  const [activePage, setActivePage] = useState(() => loadStorage(STORAGE_KEYS.ACTIVE_PAGE, 'dashboard'));
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(() => loadStorage(STORAGE_KEYS.NOTIFICATIONS, [
    { id: 'n1', title: 'Upcoming Swalah', message: 'Maghrib prayer is at 06:45 PM', time: '10m ago', read: false },
    { id: 'n2', title: 'Urgent Task', message: 'College AI assignment submission due today', time: '1h ago', read: false }
  ]));

  // AI Chat History
  const [aiChatMessages, setAiChatMessages] = useState(() => loadStorage(STORAGE_KEYS.AI_CHAT, [
    {
      id: 'welcome',
      sender: 'aura',
      text: "Salaam & Welcome Ajsal! I'm AURA, your personal AI life assistant. I've synced your daily routine, prayer schedule, finance, reading goals, and sleep. How can I assist your productivity today?",
      cardType: 'welcome'
    }
  ]));

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiMode, setAiMode] = useState('universal'); // 'universal' | 'coding' | 'writing' | 'spiritual' | 'productivity'

  const [streakStartDate, setStreakStartDate] = useState(() => 
    loadStorage(STORAGE_KEYS.STREAK_START_DATE, new Date().toISOString().split('T')[0])
  );

  // Sync to LocalStorage
  useEffect(() => saveStorage(STORAGE_KEYS.PROFILE, userProfile), [userProfile]);
  useEffect(() => saveStorage(STORAGE_KEYS.PRAYERS, prayers), [prayers]);
  useEffect(() => saveStorage(STORAGE_KEYS.QURAN, quran), [quran]);
  useEffect(() => saveStorage(STORAGE_KEYS.HABITS, habits), [habits]);
  useEffect(() => saveStorage(STORAGE_KEYS.TASKS, tasks), [tasks]);
  useEffect(() => saveStorage(STORAGE_KEYS.SLEEP, sleep), [sleep]);
  useEffect(() => saveStorage(STORAGE_KEYS.MEALS, meals), [meals]);
  useEffect(() => saveStorage(STORAGE_KEYS.WATER, waterGlasses), [waterGlasses]);
  useEffect(() => saveStorage(STORAGE_KEYS.BMI, bmiData), [bmiData]);
  useEffect(() => saveStorage(STORAGE_KEYS.FINANCE, finance), [finance]);
  useEffect(() => saveStorage(STORAGE_KEYS.BOOKS, books), [books]);
  useEffect(() => saveStorage(STORAGE_KEYS.REFLECTIONS, reflections), [reflections]);
  useEffect(() => saveStorage(STORAGE_KEYS.AI_CHAT, aiChatMessages), [aiChatMessages]);
  useEffect(() => saveStorage(STORAGE_KEYS.NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveStorage(STORAGE_KEYS.ACTIVE_PAGE, activePage), [activePage]);
  useEffect(() => saveStorage(STORAGE_KEYS.STREAK_START_DATE, streakStartDate), [streakStartDate]);

  // Calculate current day streak automatically based on calendar days elapsed
  const calculateDayCounter = () => {
    try {
      const start = new Date(streakStartDate);
      start.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffTime = now.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, diffDays + 1);
    } catch (e) {
      return 1;
    }
  };

  const dayCounter = calculateDayCounter();

  const resetDay = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setStreakStartDate(todayStr);
    showToast('Streak reset to Day 1 starting today!', 'info');
  };

  const incrementDay = () => {
    setStreakStartDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d.toISOString().split('T')[0];
    });
    showToast('Day streak incremented!', 'success');
  };

  const decrementDay = () => {
    setStreakStartDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    });
  };

  const setDayCounter = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - (Math.max(1, days) - 1));
    setStreakStartDate(d.toISOString().split('T')[0]);
  };

  // Apply Theme
  useEffect(() => {
    const theme = userProfile?.theme || 'light';
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [userProfile?.theme]);

  // Toast Notification Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#2457FF', '#DFF7FF', '#5C95FF', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // ignore
    }
  };

  // Swalah Handlers
  const togglePrayer = (prayerId) => {
    setPrayers(prev => {
      const updated = prev.map(p => {
        if (p.id === prayerId) {
          const nextState = !p.completed;
          if (nextState) {
            showToast(`${p.name} Swalah completed! 🕌`, 'success');
          }
          return { ...p, completed: nextState };
        }
        return p;
      });

      const allDone = updated.every(p => p.completed);
      if (allDone) {
        triggerCelebration();
        showToast('SubhanAllah! All 5 daily prayers completed today! 🎉', 'success');
      }

      return updated;
    });
  };

  // Qur'an Handlers
  const updateQuranPages = (delta) => {
    setQuran(prev => {
      const newPages = Math.max(0, (prev.pagesReadToday || 0) + delta);
      const isComplete = newPages >= prev.targetPagesPerDay;
      if (isComplete && !prev.completedToday) {
        triggerCelebration();
        showToast(`Qur'an 1 Juz daily goal achieved (${newPages} pages)! 📖✨`, 'success');
      }
      return {
        ...prev,
        pagesReadToday: newPages,
        completedToday: isComplete
      };
    });
  };

  const setQuranJuz = (juzNumber) => {
    setQuran(prev => ({
      ...prev,
      currentJuz: Number(juzNumber)
    }));
    showToast(`Current Qur'an Juz updated to Juz ${juzNumber}`, 'info');
  };

  // Habits Handlers
  const toggleHabit = (habitId) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const nextState = !h.completedToday;
        const newStreak = nextState ? h.streak + 1 : Math.max(0, h.streak - 1);
        if (nextState) {
          showToast(`Habit "${h.name}" completed! 🔥 ${newStreak} day streak`, 'success');
        }
        return {
          ...h,
          completedToday: nextState,
          streak: newStreak,
          bestStreak: Math.max(h.bestStreak || 0, newStreak)
        };
      }
      return h;
    }));
  };

  const addHabit = (habit) => {
    const newHabit = {
      id: 'h-' + Date.now(),
      streak: 1,
      bestStreak: 1,
      completedToday: false,
      frequency: 'Daily',
      color: '#2457FF',
      icon: 'Activity',
      ...habit
    };
    setHabits(prev => [newHabit, ...prev]);
    showToast(`Habit "${newHabit.name}" created!`, 'success');
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    showToast('Habit removed', 'info');
  };

  const editHabit = (updatedHabit) => {
    setHabits(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
    showToast('Habit updated', 'success');
  };

  // Tasks Handlers
  const addTask = (task) => {
    const newTask = {
      id: 'task-' + Date.now(),
      completed: false,
      date: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      category: 'General',
      ...task
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" added!`, 'success');
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) {
          triggerCelebration();
          showToast(`Task completed: ${t.title} ✓`, 'success');
        }
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task deleted', 'info');
  };

  const editTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    showToast('Task updated', 'success');
  };

  // Sleep Handlers
  const logSleep = (sleepEntry) => {
    const fromTime = sleepEntry.from || "23:00";
    const toTime = sleepEntry.to || "06:30";

    const [fromH, fromM] = fromTime.split(':').map(Number);
    const [toH, toM] = toTime.split(':').map(Number);

    let diffMinutes = (toH * 60 + toM) - (fromH * 60 + fromM);
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // crossed midnight
    }

    const durationHours = Number((diffMinutes / 60).toFixed(1));

    const newRecord = {
      ...sleepEntry,
      durationHours,
      date: new Date().toISOString().split('T')[0]
    };

    setSleep(prev => {
      const filteredHistory = (prev.history || []).filter(h => h.date !== newRecord.date);
      return {
        lastNight: newRecord,
        history: [
          { date: newRecord.date, from: fromTime, to: toTime, duration: durationHours },
          ...filteredHistory
        ].slice(0, 31)
      };
    });
    showToast(`Sleep logged: ${durationHours} hours (${fromTime} → ${toTime}) 🌙`, 'success');
  };

  // Meals & Water Handlers
  const addMeal = (meal) => {
    const newMeal = {
      id: 'meal-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...meal
    };
    setMeals(prev => [...prev, newMeal]);
    showToast(`Meal logged: ${newMeal.food}`, 'success');
  };

  const deleteMeal = (mealId) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
    showToast('Meal removed', 'info');
  };

  const updateWater = (delta) => {
    setWaterGlasses(prev => {
      const nextVal = Math.max(0, prev + delta);
      if (nextVal >= (userProfile?.dailyWaterTarget || 8) && prev < (userProfile?.dailyWaterTarget || 8)) {
        triggerCelebration();
        showToast('Daily hydration target reached! 💧🎉', 'success');
      }
      return nextVal;
    });
  };

  // BMI Handlers
  const updateBmi = ({ heightCm, weightKg, age, gender }) => {
    const heightInMeters = heightCm / 100;
    const bmiVal = Number((weightKg / (heightInMeters * heightInMeters)).toFixed(1));
    const todayStr = new Date().toISOString().split('T')[0];

    setBmiData(prev => ({
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      age: Number(age),
      gender: gender || prev.gender,
      history: [
        ...(prev.history || []).filter(h => h.date !== todayStr),
        { date: todayStr, weight: Number(weightKg), bmi: bmiVal }
      ]
    }));
    showToast(`BMI updated to ${bmiVal}!`, 'success');
  };

  // Finance Handlers
  const addTransaction = (tx) => {
    const amountNum = Number(tx.amount || 0);
    const newTx = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: amountNum,
      ...tx
    };

    setFinance(prev => {
      let balanceChange = 0;
      if (tx.type === 'income') balanceChange = amountNum;
      else if (tx.type === 'expense') balanceChange = -amountNum;
      else if (tx.type === 'saving') balanceChange = -amountNum;

      return {
        ...prev,
        currentBalance: Math.max(0, prev.currentBalance + balanceChange),
        transactions: [newTx, ...(prev.transactions || [])]
      };
    });
    showToast(`Transaction recorded: ₹${amountNum.toLocaleString('en-IN')}`, 'success');
  };

  const deleteTransaction = (txId) => {
    setFinance(prev => {
      const target = prev.transactions?.find(t => t.id === txId);
      if (!target) return prev;
      let balanceChange = 0;
      if (target.type === 'income') balanceChange = -target.amount;
      else if (target.type === 'expense' || target.type === 'saving') balanceChange = target.amount;

      return {
        ...prev,
        currentBalance: Math.max(0, prev.currentBalance + balanceChange),
        transactions: prev.transactions.filter(t => t.id !== txId)
      };
    });
    showToast('Transaction removed', 'info');
  };

  const addSavingsGoal = (goal) => {
    const newGoal = {
      id: 'sg-' + Date.now(),
      currentAmount: 0,
      color: '#2457FF',
      ...goal,
      targetAmount: Number(goal.targetAmount || 10000)
    };
    setFinance(prev => ({
      ...prev,
      savingsGoals: [...(prev.savingsGoals || []), newGoal]
    }));
    showToast(`Savings goal "${newGoal.title}" created! 🎯`, 'success');
  };

  const depositToGoal = (goalId, amount) => {
    const addAmt = Number(amount);
    setFinance(prev => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map(g => {
        if (g.id === goalId) {
          const nextAmt = g.currentAmount + addAmt;
          if (nextAmt >= g.targetAmount && g.currentAmount < g.targetAmount) {
            triggerCelebration();
            showToast(`Goal Reached! Congratulations on completing "${g.title}" 🎉`, 'success');
          }
          return { ...g, currentAmount: nextAmt };
        }
        return g;
      })
    }));
    showToast(`Deposited ₹${addAmt.toLocaleString('en-IN')} towards goal`, 'success');
  };

  const updateBalance = (newBalance) => {
    const val = Math.max(0, Number(newBalance) || 0);
    setFinance(prev => ({
      ...prev,
      currentBalance: val
    }));
    showToast(`Liquid Balance updated to ₹${val.toLocaleString('en-IN')}`, 'success');
  };

  const deleteSavingsGoal = (goalId) => {
    setFinance(prev => ({
      ...prev,
      savingsGoals: (prev.savingsGoals || []).filter(g => g.id !== goalId)
    }));
    showToast('Savings goal removed', 'info');
  };

  // Books Handlers
  const addBook = (book) => {
    const newBook = {
      id: 'book-' + Date.now(),
      status: 'Want to Read',
      currentPage: 0,
      totalPages: Number(book.totalPages || 200),
      color: '#2457FF',
      ...book
    };
    setBooks(prev => [newBook, ...prev]);
    showToast(`Book "${newBook.title}" added to shelf! 📚`, 'success');
  };

  const updateBookProgress = (bookId, newPage) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        const pageNum = Math.min(b.totalPages, Math.max(0, Number(newPage)));
        const isComplete = pageNum >= b.totalPages;
        if (isComplete && b.status !== 'Completed') {
          triggerCelebration();
          showToast(`Mabrook! You completed reading "${b.title}"! 🏆📖`, 'success');
        }
        return {
          ...b,
          currentPage: pageNum,
          status: isComplete ? 'Completed' : (b.status === 'Want to Read' ? 'Reading' : b.status)
        };
      }
      return b;
    }));
  };

  const deleteBook = (bookId) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
    showToast('Book removed from library', 'info');
  };

  // Reflection Handlers
  const saveReflection = (reflection) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newRef = {
      id: 'ref-' + Date.now(),
      date: todayStr,
      ...reflection
    };

    setReflections(prev => [
      newRef,
      ...prev.filter(r => r.date !== todayStr)
    ]);
    triggerCelebration();
    showToast('Night Reflection saved! Have a peaceful, restful sleep 🌙', 'success');
  };

  // AI Chat Assistant (Universal Multi-Domain Engine)
  const sendAiMessage = async (text, customMode) => {
    if (!text.trim()) return;

    const currentMode = customMode || aiMode;
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };

    const previousHistory = [...aiChatMessages];
    setAiChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      const aiResponse = await generateAiResponse(
        text,
        {
          userProfile,
          prayers,
          quran,
          habits,
          tasks,
          finance,
          sleep,
          meals,
          books,
          reflections,
          waterGlasses
        },
        previousHistory,
        currentMode
      );
      setAiChatMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error('AI generation error:', err);
      setAiChatMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'aura',
          text: "I'm experiencing a brief connection delay. Please try asking again!",
          engine: 'System'
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const clearAiChat = () => {
    setAiChatMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'aura',
        text: `Salaam & Welcome ${userProfile?.name || 'Ajsal'}! I'm AURA Universal AI 🌐. I can write full-stack code, explain complex science, draft essays & emails, solve math problems, plan your routines, or discuss philosophy & Islamic wisdom. What would you like to work on?`,
        cardType: 'welcome'
      }
    ]);
    showToast('AI conversation reset ✨', 'info');
  };

  // Reset to seed data
  const resetToSampleData = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setPrayers(INITIAL_PRAYERS);
    setQuran(INITIAL_QURAN);
    setHabits(INITIAL_HABITS);
    setTasks(INITIAL_TASKS);
    setSleep(INITIAL_SLEEP_DATA);
    setMeals(INITIAL_MEALS);
    setWaterGlasses(6);
    setBmiData(INITIAL_BMI_DATA);
    setFinance(INITIAL_FINANCE_DATA);
    setBooks(INITIAL_BOOKS);
    setReflections(INITIAL_REFLECTIONS);
    showToast('Reset to original sample data completed', 'info');
  };

  // Export PDF Backup Report
  const exportAllDataPdf = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const currency = userProfile?.currency || '₹';

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Please allow popup permissions to generate PDF report', 'warning');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>AURA_Life_Backup_${new Date().toISOString().split('T')[0]}</title>
          <style>
            @page { size: A4; margin: 16mm; }
            body {
              font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
              color: #1e293b;
              line-height: 1.5;
              padding: 0;
              margin: 0;
              background: #ffffff;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #2457FF;
              padding-bottom: 14px;
              margin-bottom: 20px;
            }
            .brand {
              font-size: 22px;
              font-weight: 800;
              color: #2457FF;
              letter-spacing: -0.5px;
            }
            .subtitle {
              font-size: 13px;
              color: #64748b;
            }
            .report-title {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #475569;
              text-align: right;
            }
            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 15px;
              font-weight: 700;
              color: #0f172a;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 4px;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 6px;
              font-size: 12px;
            }
            th, td {
              padding: 7px 10px;
              text-align: left;
              border-bottom: 1px solid #f1f5f9;
            }
            th {
              background-color: #f8fafc;
              font-weight: 600;
              color: #475569;
            }
            .badge {
              display: inline-block;
              padding: 2px 7px;
              border-radius: 10px;
              font-size: 11px;
              font-weight: 600;
            }
            .badge-success { background: #dcfce7; color: #166534; }
            .badge-pending { background: #f1f5f9; color: #475569; }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px;
            }
            .stat-card {
              background: #f8fafc;
              border-radius: 8px;
              padding: 10px 14px;
              border: 1px solid #e2e8f0;
            }
            .stat-label { font-size: 11px; color: #64748b; font-weight: 500; }
            .stat-value { font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 2px; }
            .footer {
              margin-top: 28px;
              padding-top: 14px;
              border-top: 1px solid #e2e8f0;
              font-size: 11px;
              color: #94a3b8;
              text-align: center;
            }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">AURA Life OS</div>
              <div class="subtitle">${userProfile?.name || 'Ajsal'} — ${userProfile?.tagline || 'Personal Life Management'}</div>
            </div>
            <div class="report-title">
              Data Backup PDF Report<br/>
              <span style="font-weight: 400; text-transform: none; color: #64748b;">${dateStr}</span>
            </div>
          </div>

          <!-- 1. Profile & Schedule Summary -->
          <div class="section">
            <div class="section-title">👤 Personal Profile & Settings</div>
            <div class="grid-2">
              <div class="stat-card">
                <div class="stat-label">User Name</div>
                <div class="stat-value">${userProfile?.name || 'Ajsal'}</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Currency: ${currency} | Theme: ${userProfile?.theme || 'light'}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Daily Routine Targets</div>
                <div style="font-size: 12px; color: #0f172a; margin-top: 4px;">
                  Target Sleep: <strong>${userProfile?.targetSleepTime || '23:00'}</strong> | Wake: <strong>${userProfile?.targetWakeTime || '05:30'}</strong><br/>
                  Sleep Target: <strong>${userProfile?.dailySleepTarget || 7.5}h</strong> | Hydration: <strong>${userProfile?.dailyWaterTarget || 8} glasses</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Swalah & Spiritual Routine -->
          <div class="section">
            <div class="section-title">🕌 Daily Swalah Prayers & Qur'an Progress</div>
            <table>
              <thead>
                <tr>
                  <th>Prayer Name</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(prayers || []).map(p => `
                  <tr>
                    <td><strong>${p.name}</strong> ${p.arabicName ? `(${p.arabicName})` : ''}</td>
                    <td>${p.time}</td>
                    <td><span class="badge ${p.completed ? 'badge-success' : 'badge-pending'}">${p.completed ? 'Completed ✓' : 'Pending'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="margin-top: 10px; font-size: 12px; color: #334155;">
              <strong>Qur'an Daily Tracker:</strong> Currently reading <strong>Juz ${quran?.currentJuz || 1}</strong> (${quran?.currentSurah || 'Al-Hijr'}) — <strong>${quran?.pagesReadToday || 0}/${quran?.targetPagesPerDay || 20} pages read today</strong> (${quran?.streak || 0} day streak).
            </div>
          </div>

          <!-- 3. Habits & Streaks -->
          <div class="section">
            <div class="section-title">🔥 Habit Tracker & Streaks</div>
            <table>
              <thead>
                <tr>
                  <th>Habit Name</th>
                  <th>Frequency</th>
                  <th>Current Streak</th>
                  <th>Best Streak</th>
                  <th>Today's Status</th>
                </tr>
              </thead>
              <tbody>
                ${(habits || []).map(h => `
                  <tr>
                    <td><strong>${h.name}</strong></td>
                    <td>${h.frequency || 'Daily'}</td>
                    <td>${h.streak} days</td>
                    <td>${h.bestStreak || h.streak} days</td>
                    <td><span class="badge ${h.completedToday ? 'badge-success' : 'badge-pending'}">${h.completedToday ? 'Done ✓' : 'Pending'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- 4. Tasks Summary -->
          <div class="section">
            <div class="section-title">📋 Scheduled Tasks</div>
            <table>
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(tasks || []).slice(0, 10).map(t => `
                  <tr>
                    <td><strong>${t.title}</strong></td>
                    <td>${t.category || 'General'}</td>
                    <td>${t.priority || 'Medium'}</td>
                    <td><span class="badge ${t.completed ? 'badge-success' : 'badge-pending'}">${t.completed ? 'Completed ✓' : 'Pending'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- 5. Finance & Savings Summary -->
          <div class="section">
            <div class="section-title">💰 Financial Overview & Savings Goals</div>
            <div class="grid-2" style="margin-bottom: 10px;">
              <div class="stat-card">
                <div class="stat-label">Current Balance</div>
                <div class="stat-value">${currency}${(finance?.currentBalance || 0).toLocaleString('en-IN')}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Total Transactions</div>
                <div class="stat-value">${(finance?.transactions || []).length} Records</div>
              </div>
            </div>
            ${(finance?.savingsGoals || []).length > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Savings Goal</th>
                    <th>Saved</th>
                    <th>Target Amount</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  ${(finance.savingsGoals).map(g => {
                    const pct = Math.round((g.currentAmount / g.targetAmount) * 100);
                    return `
                      <tr>
                        <td><strong>${g.title}</strong></td>
                        <td>${currency}${g.currentAmount.toLocaleString('en-IN')}</td>
                        <td>${currency}${g.targetAmount.toLocaleString('en-IN')}</td>
                        <td><strong>${pct}%</strong></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            ` : ''}
          </div>

          <!-- 6. Books & Reading Hub -->
          ${(books || []).length > 0 ? `
            <div class="section">
              <div class="section-title">📚 Reading Hub</div>
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${(books).map(b => `
                    <tr>
                      <td><strong>${b.title}</strong></td>
                      <td>${b.author || 'N/A'}</td>
                      <td>${b.currentPage}/${b.totalPages} pages</td>
                      <td><span class="badge ${b.status === 'Completed' ? 'badge-success' : 'badge-pending'}">${b.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          <div class="footer">
            AURA Life OS — Encrypted & Stored Locally in Browser. Saved on ${dateStr}.
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    showToast('Exporting PDF backup report... 📄', 'success');
  };

  // Export JSON Backup
  const exportAllData = () => {
    const stateObj = {
      userProfile,
      prayers,
      quran,
      habits,
      tasks,
      sleep,
      meals,
      waterGlasses,
      bmiData,
      finance,
      books,
      reflections,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aura_life_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded successfully', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        prayers,
        togglePrayer,
        quran,
        updateQuranPages,
        setQuranJuz,
        habits,
        toggleHabit,
        addHabit,
        deleteHabit,
        editHabit,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        sleep,
        logSleep,
        meals,
        addMeal,
        deleteMeal,
        waterGlasses,
        updateWater,
        bmiData,
        updateBmi,
        finance,
        updateBalance,
        addTransaction,
        deleteTransaction,
        addSavingsGoal,
        depositToGoal,
        deleteSavingsGoal,
        books,
        addBook,
        updateBookProgress,
        deleteBook,
        reflections,
        saveReflection,
        aiChatMessages,
        sendAiMessage,
        clearAiChat,
        aiMode,
        setAiMode,
        isAiTyping,
        activePage,
        setActivePage,
        toasts,
        showToast,
        notifications,
        dayCounter,
        setDayCounter,
        incrementDay,
        decrementDay,
        resetDay,
        resetToSampleData,
        exportAllData,
        exportAllDataPdf
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
