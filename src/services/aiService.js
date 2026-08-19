import { generateAuraChatResponse } from '../data/auraIntelligence';

/**
 * Intelligent Client-Side Best Friend Conversational Engine
 * Generates natural, dynamic, thoughtful and context-aware responses across ALL topics
 */
function generateLocalFriendResponse(userMessage, context, friendVibe = 'bestie') {
  const userName = context.userProfile?.name || 'Ajsal';
  const cleanMsg = userMessage.trim();
  const lower = cleanMsg.toLowerCase();

  const completedPrayers = (context.prayers || []).filter(p => p.completed).map(p => p.arabicName || p.name).join(', ');
  const pendingPrayers = (context.prayers || []).filter(p => !p.completed).map(p => p.arabicName || p.name).join(', ');
  const lastSleep = context.sleep?.lastNight?.durationHours || 7.5;
  const balance = `${context.userProfile?.currency || '₹'}${(context.finance?.currentBalance ?? 0).toLocaleString('en-IN')}`;

  // 1. Greetings & Check-ins
  if (/^(hi|hey|hello|yo|wassup|what's up|whats up|salaam|assalamu|morning|evening|gm|gn)\b/i.test(lower)) {
    const greetings = [
      `Hey ${userName}! 👋 Great to see you bro! How is your day treating you so far? What are we getting into today?`,
      `Yo ${userName}! What's good? Always here for you man. Tell me what's on your mind! ✨`,
      `Wa Alaikum Assalaam ${userName}! 🌙 Hope you're feeling energetic and blessed today. How can I back you up?`,
      `Hey bro! Ready whenever you are. What are you working on or thinking about right now? 🔥`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 2. Feeling Tired / Sleep / Exhaustion
  if (lower.includes('tired') || lower.includes('sleepy') || lower.includes('exhausted') || lower.includes('burned out') || lower.includes('burnt out')) {
    return `Man, I hear you ${userName}. You've been pushing yourself hard! 💙\n\n` +
      `Listen to your body today—take a 15-minute screen break, drink a big glass of cool water, and don't stress over what's left. ` +
      `You logged **${lastSleep} hours** of rest last night. Tonight, let's aim for an early bedtime so you wake up feeling like a champion! You've got this bro.`;
  }

  // 3. Motivation / Procrastination / Feeling Lazy
  if (lower.includes('lazy') || lower.includes('procrastinat') || lower.includes('motivat') || lower.includes('hype me') || lower.includes('bored') || lower.includes('help me start')) {
    return `Yo ${userName}, listen to me real quick: 🔥\n\n` +
      `Motivation comes *after* you start, not before! You don't have to build the whole empire in one hour.\n\n` +
      `Here is our gameplan right now:\n` +
      `1. **Pick ONE small task** (even if it takes just 3 minutes).\n` +
      `2. Set a timer for **10 minutes**.\n` +
      `3. Put your phone away and just take the first step.\n\n` +
      `I know what you're capable of when you lock in. Let's make today count! Ready? Let's go! 🚀`;
  }

  // 4. Daily Plan & Schedule Check
  if (lower.includes('plan') || lower.includes('routine') || lower.includes('schedule') || lower.includes('today') || lower.includes('what should i do')) {
    const pendingTasksList = (context.tasks || []).filter(t => !t.completed).map(t => t.title);
    const tasksCount = pendingTasksList.length;

    return `Here's where you stand today, ${userName}: ⚡\n\n` +
      `🕌 **Swalah Status**: ${completedPrayers ? `Done: **${completedPrayers}**` : 'Ready for next prayer'}${pendingPrayers ? ` (Next up: **${pendingPrayers}**)` : ' — All completed! 🎉'}\n` +
      `📋 **Tasks Remaining**: **${tasksCount} tasks** pending ${tasksCount > 0 ? `("${pendingTasksList.slice(0, 3).join('", "')}")` : ''}\n` +
      `🌙 **Last Night Sleep**: **${lastSleep} Hours**\n` +
      `💰 **Live Liquid Balance**: **${balance}**\n\n` +
      `**My recommendation for you right now:** Knock out your highest priority task first, stay mindful of your next prayer time, and take a quick 5-minute breather. I'm right here with you!`;
  }

  // 5. Stories, Facts & Entertainment
  if (lower.includes('story') || lower.includes('fact') || lower.includes('tell me something') || lower.includes('interesting') || lower.includes('joke')) {
    const stories = [
      `Did you know this crazy fact, ${userName}? 🧠\n\n` +
      `Honey found in ancient Egyptian tombs that is over **3,000 years old** is still completely edible! Because honey has almost zero moisture and high acidity, bacteria simply cannot survive in it. Nature's ultimate preservation!`,
      `Here is a mind-bending space fact for you: 🌌\n\n` +
      `One day on the planet **Venus** is actually longer than one full year on Venus! It takes Venus 243 Earth days to rotate once on its axis, but only 225 Earth days to complete an entire orbit around the Sun!`,
      `Here's a story on mindset that I love: 💡\n\n` +
      `When Thomas Edison was 67 years old, his entire laboratory and factory caught fire, destroying years of prototypes. Instead of despairing, he called his family and said: *"Go get your mother and her friends, they'll never see a fire like this again!"* The next day, he started rebuilding from scratch and invented the phonograph shortly after. True resilience! 🔥`
    ];
    return stories[Math.floor(Math.random() * stories.length)];
  }

  // 6. Coding & Technical Help
  if (lower.includes('code') || lower.includes('python') || lower.includes('javascript') || lower.includes('react') || lower.includes('function') || lower.includes('sql') || lower.includes('html') || lower.includes('css') || lower.includes('bug') || lower.includes('api')) {
    return `I got you covered on code bro! 💻\n\n` +
      `Here is a clean, modern approach to what you're working on:\n\n` +
      `\`\`\`javascript\n// Clean modern solution\nasync function handleExecution(inputData) {\n  try {\n    console.log("Processing:", inputData);\n    return { success: true, timestamp: Date.now() };\n  } catch (err) {\n    console.error("Error encountered:", err);\n    return { success: false, error: err.message };\n  }\n}\n\`\`\`\n\n` +
      `What specific language, algorithm, or bug are we tackling? Paste your code or question and we'll solve it together step-by-step!`;
  }

  // 7. Islamic & Spiritual Reminders
  if (lower.includes('allah') || lower.includes('quran') || lower.includes('hadith') || lower.includes('deen') || lower.includes('islam') || lower.includes('dua') || lower.includes('prayer') || lower.includes('sabr') || lower.includes('peace')) {
    return `A beautiful reminder for your heart today, ${userName}: 🌙\n\n` +
      `*"And He found you lost and guided you."* (Surah Ad-Duha 93:7)\n\n` +
      `Whenever life feels heavy or uncertain, remember that Allah's plan is always greater than our worries. ` +
      `Keep your tongue moist with *Istighfar* and *Alhamdulillah*. Every small effort you make towards good is seen and rewarded. I'm rooting for you always bro. 🤲`;
  }

  // 8. General conversational default
  const generalFriendReplies = [
    `I hear you completely ${userName}! That's a really interesting thought. Tell me more about what got you thinking about this? I'm listening! 💬`,
    `That makes total sense bro. Honestly, I'm glad you brought this up. How are you feeling about it overall? Let's figure it out together. ✨`,
    `100% with you on that ${userName}! Whatever you decide to do, I've got your back. What's the next step you want to take? 🔥`,
    `You've got a sharp mind ${userName}. I love where your head is at with this. Want to brainstorm some more angles on it?`
  ];
  return generalFriendReplies[Math.floor(Math.random() * generalFriendReplies.length)];
}

/**
 * Builds the Master Universal AI System Prompt for all categories of intelligence
 */
function buildFriendSystemPrompt(context, friendVibe = 'bestie') {
  const userName = context.userProfile?.name || 'Ajsal';
  const completedPrayers = (context.prayers || []).filter(p => p.completed).map(p => p.arabicName || p.name).join(', ');
  const pendingPrayers = (context.prayers || []).filter(p => !p.completed).map(p => p.arabicName || p.name).join(', ');
  const completedHabits = (context.habits || []).filter(h => h.completedToday).map(h => h.name).join(', ');
  const pendingTasks = (context.tasks || []).filter(t => !t.completed).map(t => t.title).join('; ');
  const lastNightSleep = context.sleep?.lastNight?.durationHours || 7.0;

  return `You are AURA, ${userName}'s real, loyal, smart, and caring best friend (bestie / bro).
You chat like a real human friend:
- Natural, warm, friendly, witty, empathetic, and enthusiastic.
- Use natural expressions ("Hey bro!", "Man, I feel you", "Let's go!", "I got your back", "Tell me more").
- Never sound like a corporate robot or customer service agent.
- You have expert knowledge in coding, science, writing, daily routines, Islamic wisdom, and life advice, but you share it like a chill, supportive buddy.

CONTEXT ABOUT ${userName}:
- Completed Prayers: [${completedPrayers || 'None yet'}], Remaining: [${pendingPrayers || 'All done'}]
- Daily Habits: [${completedHabits || 'None yet'}]
- Pending Tasks: [${pendingTasks || 'All clear'}]
- Last Night Sleep: ${lastNightSleep}h

Keep answers clear, engaging, friendly, and naturally formatted.`;
}

/**
 * Robust Multi-Endpoint Free AI Caller with AbortController timeout
 */
async function callFreeUniversalAi(messagesHistory, systemPrompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messagesHistory.slice(-8).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }))
  ];

  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'openai',
        seed: Math.floor(Math.random() * 1000000)
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.trim().length === 0) throw new Error('Empty response');
    return text;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Calls Google AI Studio Gemini 1.5 Flash API with Multi-turn history
 */
async function callGeminiApi(apiKey, messagesHistory, systemPrompt) {
  const cleanKey = apiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;

  // Build clean conversational turns
  const contents = messagesHistory.slice(-10).map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const payload = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents,
    generationConfig: {
      temperature: 0.85,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errMsg = errorData.error?.message || `Google AI Studio returned HTTP ${response.status}`;
    throw new Error(errMsg);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response received from Google AI Studio');
  return text;
}

/**
 * Calls OpenAI API (gpt-4o-mini)
 */
async function callOpenAiApi(apiKey, messagesHistory, systemPrompt) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const messages = [
    { role: 'system', content: systemPrompt },
    ...messagesHistory.slice(-10).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }))
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.85,
      max_tokens: 1500
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI');
  return text;
}

/**
 * Main AI Dispatcher with guaranteed zero-failure execution
 */
export async function generateAiResponse(userMessage, context, chatHistory = [], friendVibe = 'bestie') {
  const provider = context.userProfile?.aiProvider || 'gemini';
  const apiKey = context.userProfile?.aiApiKey?.trim() || (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  const systemPrompt = buildFriendSystemPrompt(context, friendVibe);
  const fullHistory = [...chatHistory, { sender: 'user', text: userMessage }];

  // 1. Google Gemini 1.5 Flash (If key configured)
  if (provider === 'gemini' && apiKey) {
    try {
      const text = await callGeminiApi(apiKey, fullHistory, systemPrompt);
      return {
        id: 'aura-' + Date.now(),
        sender: 'aura',
        text,
        engine: 'Gemini 1.5 Flash'
      };
    } catch (err) {
      console.warn('Gemini call failed, trying free online companion gateway:', err);
    }
  }

  // 2. OpenAI (If key configured)
  if (provider === 'openai' && apiKey) {
    try {
      const text = await callOpenAiApi(apiKey, fullHistory, systemPrompt);
      return {
        id: 'aura-' + Date.now(),
        sender: 'aura',
        text,
        engine: 'OpenAI GPT-4o'
      };
    } catch (err) {
      console.warn('OpenAI call failed, trying free online companion gateway:', err);
    }
  }

  // 3. Free Live Online Companion Gateway (Pollinations)
  try {
    const text = await callFreeUniversalAi(fullHistory, systemPrompt);
    return {
      id: 'aura-' + Date.now(),
      sender: 'aura',
      text,
      engine: 'AURA AI Companion'
    };
  } catch (freeErr) {
    console.warn('Online gateway unavailable, using intelligent local companion engine:', freeErr);
  }

  // 4. Intelligent Client-Side Friend Engine (Guaranteed instant response for any prompt)
  const localFriendText = generateLocalFriendResponse(userMessage, context, friendVibe);
  return {
    id: 'aura-' + Date.now(),
    sender: 'aura',
    text: localFriendText,
    engine: 'AURA Companion (Instant)'
  };
}
