export const MOTIVATIONAL_QUOTES = {
  morning: [
    { text: "Start your morning with intention. Small actions today create a completely different tomorrow.", author: "Daily Wisdom", category: "Morning motivation" },
    { text: "The secret of getting ahead is getting started. Today is your canvas.", author: "Mark Twain", category: "Morning motivation" },
    { text: "Begin with gratitude, proceed with purpose, and finish with peace.", author: "AURA Mindfulness", category: "Morning motivation" },
    { text: "Early hours are gold for those who cultivate discipline.", author: "Marcus Aurelius", category: "Discipline" },
    { text: "Win the morning, win the day. Every habit counts.", author: "Tim Ferriss", category: "Healthy habits" }
  ],
  afternoon: [
    { text: "Keep going. Your day isn't finished yet. Protect your momentum.", author: "AURA Focus", category: "Afternoon encouragement" },
    { text: "Productivity is never an accident. It is always the result of commitment to excellence.", author: "Paul J. Meyer", category: "Productivity" },
    { text: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John C. Maxwell", category: "Discipline" },
    { text: "Take a deep breath, recalibrate your focus, and conquer the afternoon.", author: "Daily Focus", category: "Personal growth" }
  ],
  evening: [
    { text: "As the sun sets, reflect on what made you stronger today.", author: "Evening Reflection", category: "Evening reflection" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", category: "Discipline" },
    { text: "A reader lives a thousand lives before he dies. Make time for your book tonight.", author: "George R.R. Martin", category: "Reading" },
    { text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey", category: "Financial discipline" }
  ],
  night: [
    { text: "Well done today. Prepare yourself for a restful sleep and a better tomorrow.", author: "AURA Nightly", category: "Night preparation" },
    { text: "Sleep is the best meditation and the greatest recovery tool.", author: "Dalai Lama", category: "Healthy habits" },
    { text: "Close the day with a grateful heart and clear thoughts.", author: "Mindful Living", category: "Night preparation" },
    { text: "You did your best today. Tomorrow is another fresh chapter.", author: "Self Growth", category: "Personal growth" }
  ]
};

export function getGreetingAndQuote() {
  const now = new Date();
  const hour = now.getHours();

  let timeOfDay = 'morning';
  let greeting = 'Good morning, Ajsal ☀️';
  let emoji = '☀️';

  if (hour >= 5 && hour < 12) {
    timeOfDay = 'morning';
    greeting = 'Good morning, Ajsal ☀️';
    emoji = '☀️';
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
    greeting = 'Good afternoon, Ajsal 🌤️';
    emoji = '🌤️';
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = 'evening';
    greeting = 'Good evening, Ajsal 🌇';
    emoji = '🌇';
  } else {
    timeOfDay = 'night';
    greeting = 'Good night, Ajsal 🌙';
    emoji = '🌙';
  }

  const quotesList = MOTIVATIONAL_QUOTES[timeOfDay] || MOTIVATIONAL_QUOTES.morning;
  const randomIndex = Math.floor(Math.random() * quotesList.length);
  const quote = quotesList[randomIndex];

  return {
    timeOfDay,
    greeting,
    emoji,
    quote
  };
}
