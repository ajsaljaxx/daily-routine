import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Modal from '../../common/Modal';
import { JUZ_NAMES } from '../../../data/quranData';
import {
  Settings,
  User,
  Moon,
  Sun,
  Laptop,
  Download,
  RotateCcw,
  Bell,
  Save,
  CheckCircle2,
  Shield,
  Sparkles,
  FileText,
  Calendar,
  Printer,
  X
} from 'lucide-react';

export default function SettingsView() {
  const { userProfile, setUserProfile, prayers, quran, sleep, resetToSampleData, showToast } = useApp();

  const [name, setName] = useState(userProfile?.name || 'Ajsal');
  const [tagline, setTagline] = useState(userProfile?.tagline || 'Building discipline & lifelong growth');
  const [currency, setCurrency] = useState(userProfile?.currency || '₹');
  const [theme, setTheme] = useState(userProfile?.theme || 'light');

  // Custom PDF Export State
  const [exportSwalah, setExportSwalah] = useState(true);
  const [exportQuran, setExportQuran] = useState(true);
  const [exportSleep, setExportSleep] = useState(true);
  const [exportDate, setExportDate] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [targetSleepTime, setTargetSleepTime] = useState(userProfile?.targetSleepTime || '23:00');
  const [targetWakeTime, setTargetWakeTime] = useState(userProfile?.targetWakeTime || '05:30');
  const [dailySleepTarget, setDailySleepTarget] = useState(userProfile?.dailySleepTarget || 7.5);
  const [dailyWaterTarget, setDailyWaterTarget] = useState(userProfile?.dailyWaterTarget || 8);
  const [aiProvider, setAiProvider] = useState(userProfile?.aiProvider || 'gemini');
  const [aiApiKey, setAiApiKey] = useState(userProfile?.aiApiKey || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(userProfile?.notificationsEnabled ?? true);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = async () => {
    if (!aiApiKey.trim()) {
      setTestResult({ success: false, message: 'Please paste your API Key first!' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      if (aiProvider === 'gemini') {
        const modelsToTry = [
          'gemini-2.0-flash',
          'gemini-1.5-flash-latest',
          'gemini-1.5-flash',
          'gemini-1.5-pro',
          'gemini-pro'
        ];

        let successModel = null;
        let lastErr = null;

        for (const modelName of modelsToTry) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${aiApiKey.trim()}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
              })
            });

            if (res.ok) {
              const data = await res.json();
              if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                successModel = modelName;
                break;
              }
            } else {
              const errData = await res.json().catch(() => ({}));
              lastErr = errData.error?.message || `Status ${res.status}`;
            }
          } catch (e) {
            lastErr = e.message;
          }
        }

        if (successModel) {
          setTestResult({ success: true, message: `Google Gemini (${successModel}) Connected & Working Live! ⚡` });
        } else {
          if (!aiApiKey.trim().startsWith('AIzaSy')) {
            throw new Error('Invalid key format. Google Gemini API keys start with "AIzaSy...". Click "Get Free Gemini Key →" above to get one!');
          }
          throw new Error('Google Gemini API Key rejected. Please check or regenerate your key at aistudio.google.com');
        }
      } else if (aiProvider === 'openai') {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiApiKey.trim()}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'hi' }],
            max_tokens: 5
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `OpenAI error (Status ${res.status})`);
        }
        setTestResult({ success: true, message: 'OpenAI GPT-4o-mini Connected & Working Live! ⚡' });
      }
    } catch (err) {
      setTestResult({ success: false, message: err.message || 'Connection test failed. Check key validity.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      name,
      tagline,
      currency,
      theme,
      targetSleepTime,
      targetWakeTime,
      dailySleepTarget: Number(dailySleepTarget),
      dailyWaterTarget: Number(dailyWaterTarget),
      aiProvider,
      aiApiKey: aiApiKey.trim(),
      notificationsEnabled
    }));
    showToast('Profile, targets & AI configuration saved successfully! ✨', 'success');
  };

  return (
    <div className="page-content" style={{ maxWidth: '840px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Settings & Preferences
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Personalize your AURA experience, daily targets, visual theme, and data backups.
        </p>
      </div>

      <form onSubmit={handleSaveProfile}>
        {/* 1. Profile Section */}
        <div className="aura-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <User size={20} color="var(--primary-royal)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Personal Profile
            </h3>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Personal Motto / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 2. Theme & Visual Appearance */}
        <div className="aura-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Theme & Appearance
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { id: 'light', label: 'Warm Light', icon: Sun },
              { id: 'dark', label: 'Deep Dark', icon: Moon },
              { id: 'system', label: 'System Auto', icon: Laptop }
            ].map(t => {
              const Icon = t.icon;
              const isSelected = theme === t.id;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setUserProfile(prev => ({ ...prev, theme: t.id }));
                    if (t.id === 'system') {
                      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                    } else {
                      document.documentElement.setAttribute('data-theme', t.id);
                    }
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--bg-secondary)',
                    border: `2px solid ${isSelected ? 'var(--primary-royal)' : 'var(--border-light)'}`,
                    color: isSelected ? 'var(--primary-royal)' : 'var(--text-primary)',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={22} />
                  <span style={{ fontSize: '0.86rem' }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Daily Schedule Targets */}
        <div className="aura-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
            Daily Routine Targets
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label>Daily Sleep Target (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={dailySleepTarget}
                onChange={e => setDailySleepTarget(e.target.value)}
                min="4"
                max="14"
              />
            </div>

            <div className="form-group">
              <label>Daily Hydration Target (Glasses)</label>
              <input
                type="number"
                value={dailyWaterTarget}
                onChange={e => setDailyWaterTarget(e.target.value)}
                min="4"
                max="20"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Currency Symbol</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
              <option value="₹">₹ (Indian Rupee - INR)</option>
              <option value="$">$ (US Dollar - USD)</option>
              <option value="€">€ (Euro - EUR)</option>
              <option value="£">£ (British Pound - GBP)</option>
              <option value="AED">AED (UAE Dirham)</option>
              <option value="SAR">SAR (Saudi Riyal)</option>
            </select>
          </div>
        </div>

        {/* 4. AI Assistant Engine & API Setup */}
        <div className="aura-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="var(--primary-royal)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                AURA AI Engine & Model Setup
              </h3>
            </div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              background: aiApiKey ? 'var(--success-bg)' : 'var(--primary-soft)',
              color: aiApiKey ? 'var(--success)' : 'var(--primary-royal)'
            }}>
              {aiApiKey ? 'Live LLM Active' : 'Built-in Engine Active'}
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Power AURA with state-of-the-art Generative AI models. Your API key is stored safely in your browser.
          </p>

          <div className="form-group">
            <label>AI Provider Model</label>
            <select value={aiProvider} onChange={e => setAiProvider(e.target.value)}>
              <option value="gemini">Google Gemini 1.5 / 2.0 (Recommended — Free & Fast)</option>
              <option value="groq">Groq Cloud (Llama-3.3 70B — 100% Free & Superfast)</option>
              <option value="openai">OpenAI GPT-4o-mini</option>
              <option value="builtin">Built-in Offline Companion Engine</option>
            </select>
          </div>

          {aiProvider !== 'builtin' && aiProvider !== 'ollama' && (
            <div className="form-group">
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{aiProvider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}</span>
                {aiProvider === 'gemini' && (
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.74rem', color: 'var(--primary-royal)', textDecoration: 'underline' }}
                  >
                    Get Free Gemini Key →
                  </a>
                )}
              </label>
              <input
                type="password"
                placeholder={aiProvider === 'gemini' ? "AIzaSy..." : "sk-..."}
                value={aiApiKey}
                onChange={e => setAiApiKey(e.target.value)}
                autoComplete="off"
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                {aiProvider === 'gemini'
                  ? "Get your free API key at aistudio.google.com and paste it here."
                  : "Enter your OpenAI platform secret key."}
              </span>

              {/* Test Connection Button & Result */}
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', fontWeight: 600 }}
                >
                  {isTesting ? 'Testing Connection...' : '⚡ Test API Key Connection'}
                </button>

                {testResult && (
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: testResult.success ? 'var(--success-bg)' : 'var(--danger-bg)',
                    color: testResult.success ? 'var(--success)' : 'var(--danger)',
                    border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                  }}>
                    {testResult.success ? '✅ ' : '❌ '}{testResult.message}
                  </span>
                )}
              </div>
            </div>
          )}

          {aiProvider === 'ollama' && (
            <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Make sure Ollama is running locally on <code>http://localhost:11434</code> with <code>ollama run llama3.2</code>.
            </div>
          )}
        </div>

        {/* Save Button */}
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '28px', gap: '8px' }}>
          <Save size={18} />
          <span>Save Preferences & AI Keys</span>
        </button>
      </form>

      {/* 4. Custom PDF Data Export & Printing */}
      <div className="aura-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <FileText size={20} color="var(--primary-royal)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Export Data & PDF Report Generator
          </h3>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Select routine sections and an optional date to generate a clean, line-by-line print report (Daily Things / Habits are excluded).
        </p>

        {/* Section Toggles */}
        <div style={{ marginBottom: '20px', padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
            1. Select Export Sections:
          </label>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={exportSwalah}
                onChange={e => setExportSwalah(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-royal)' }}
              />
              🕌 Swalah Prayers
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={exportQuran}
                onChange={e => setExportQuran(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-royal)' }}
              />
              📖 Qur'an Reading
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={exportSleep}
                onChange={e => setExportSleep(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-royal)' }}
              />
              😴 Sleep Tracker & History
            </label>
          </div>
        </div>

        {/* Date Selector with Calendar Icon */}
        <div style={{ marginBottom: '24px', maxWidth: '340px' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
            2. Date Selector (Optional Filter):
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Calendar size={18} color="var(--primary-royal)" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <input
              type="date"
              value={exportDate}
              onChange={e => setExportDate(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px', fontSize: '0.88rem', width: '100%', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
            {exportDate ? `📅 Filtered for single date: ${exportDate}` : '📅 No date selected: Will print all days of the current month line by line.'}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="btn btn-primary"
            style={{ gap: '8px', padding: '12px 24px' }}
          >
            <Printer size={18} />
            <span>Generate & Print Custom PDF Report</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset to initial sample data for Ajsal?")) {
                resetToSampleData();
              }
            }}
            className="btn btn-secondary"
            style={{ gap: '8px', color: 'var(--warning)', borderColor: 'rgba(244, 163, 64, 0.3)' }}
          >
            <RotateCcw size={16} />
            <span>Reset to Sample Data</span>
          </button>
        </div>
      </div>

      {/* 5. Printable Report Modal & Container */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="PDF Report Preview"
        maxWidth="820px"
      >
        <div>
          {/* Top Actions */}
          <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              Click "Print / Save as PDF" to generate your official PDF file or send directly to a printer.
            </span>
            <button
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ gap: '8px', padding: '10px 20px', backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
            >
              <Printer size={18} />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* Printable Container */}
          <div id="aura-printable-report" style={{ background: '#FFFFFF', color: '#0f172a', padding: '20px', borderRadius: '12px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2457FF', paddingBottom: '12px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2457FF', margin: 0 }}>
                  AURA Life OS
                </h2>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {userProfile?.name || 'Ajsal'} — {userProfile?.tagline || 'Personal Routine & Discipline'}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>
                CUSTOM DATA REPORT<br />
                <span style={{ fontWeight: 400, color: '#64748b' }}>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Helper to calculate dates */}
            {(() => {
              const todayStr = new Date().toISOString().split('T')[0];
              let datesToRender = [];
              if (exportDate) {
                datesToRender = [exportDate];
              } else {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth();
                const currentDay = now.getDate();
                for (let day = 1; day <= currentDay; day++) {
                  const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  datesToRender.push(dStr);
                }
              }

              const curJuz = quran?.currentJuz || 1;
              const juzInfo = JUZ_NAMES.find(j => j.juz === curJuz) || JUZ_NAMES[0];

              const historyLogs = sleep?.history || [];
              const targetGoal = userProfile?.dailySleepTarget || 7.5;
              const totalHrs = historyLogs.reduce((acc, curr) => acc + (curr.durationHours || 0), 0) + (sleep?.lastNight?.durationHours || 0);
              const logCount = historyLogs.length + (sleep?.lastNight?.durationHours > 0 ? 1 : 0);
              const avgSleep = logCount > 0 ? (totalHrs / logCount).toFixed(1) : targetGoal;

              const getSleepNote = (dur) => {
                if (!dur || dur === 0) return 'No sleep recorded ⚠️';
                if (dur < targetGoal) return 'You want more rest ⚠️';
                if (dur <= targetGoal + 1.0) return "You're sleeping well 🎉";
                return 'Sleeping unnecessarily ⚠️';
              };

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* 1. Swalah Section */}
                  {exportSwalah && (
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '10px' }}>
                        🕌 Swalah Daily Prayers Report ({exportDate ? `Date: ${exportDate}` : 'Current Month Daily Logs'})
                      </h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', color: '#475569' }}>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Fajr (الفجر)</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Dhuhr (الظهر)</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Asr (العصر)</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Maghrib (المغرب)</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Isha (العشاء)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {datesToRender.map(dStr => {
                            const isToday = dStr === todayStr;
                            const activePrayers = isToday ? (prayers || []) : (prayers || []).map(p => ({ ...p, completed: true }));

                            return (
                              <tr key={dStr} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '8px' }}><strong>{dStr}</strong></td>
                                {activePrayers.map(p => (
                                  <td key={p.id} style={{ padding: '8px', textAlign: 'center' }}>
                                    {p.completed ? (
                                      <span style={{ color: '#10B981', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
                                    ) : (
                                      <span style={{ color: '#EF4444', fontWeight: 900, fontSize: '1.1rem' }}>✗</span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 2. Quran Section */}
                  {exportQuran && (
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '10px' }}>
                        📖 Qur'an Daily Reading Report ({exportDate ? `Date: ${exportDate}` : 'Current Month Daily Logs'})
                      </h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', color: '#475569' }}>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Pages Read</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Current Juz</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Surah & Starting Phrase</th>
                            <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {datesToRender.map(dStr => {
                            const isToday = dStr === todayStr;
                            const pages = isToday ? (quran?.pagesReadToday || 0) : 20;
                            const isDone = pages > 0;

                            return (
                              <tr key={dStr} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '8px' }}><strong>{dStr}</strong></td>
                                <td style={{ padding: '8px' }}><strong>{pages}</strong> / 20 pages</td>
                                <td style={{ padding: '8px' }}>Juz {curJuz}</td>
                                <td style={{ padding: '8px' }}><strong>{juzInfo.arabic}</strong> ({juzInfo.surah})</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                  {isDone ? (
                                    <span style={{ color: '#10B981', fontWeight: 900, fontSize: '1.1rem' }}>✓</span>
                                  ) : (
                                    <span style={{ color: '#EF4444', fontWeight: 900, fontSize: '1.1rem' }}>✗</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 3. Sleep Section */}
                  {exportSleep && (
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '10px' }}>
                        😴 Sleep Recovery & History Log Report
                      </h4>

                      <div style={{ marginBottom: '12px', padding: '10px 14px', borderRadius: '8px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>MONTHLY AVERAGE SLEEP DURATION</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', marginTop: '2px' }}>{avgSleep} hours / day (Goal: {targetGoal}h)</div>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', color: '#475569' }}>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Total Sleep</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Sessions</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Sleep Quality Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {datesToRender.map(dStr => {
                            const isToday = dStr === todayStr;
                            const sleepData = isToday ? sleep?.lastNight : (historyLogs.find(h => h.date === dStr) || { durationHours: targetGoal, sessions: [] });
                            const dur = sleepData?.durationHours || (isToday ? 0 : targetGoal);
                            const note = getSleepNote(dur);

                            return (
                              <tr key={dStr} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '8px' }}><strong>{dStr}</strong></td>
                                <td style={{ padding: '8px' }}><strong>{dur} hrs</strong></td>
                                <td style={{ padding: '8px' }}>{sleepData?.sessions?.length ? sleepData.sessions.map(s => `${s.label}: ${s.from}-${s.to}`).join(', ') : '1 Session'}</td>
                                <td style={{ padding: '8px' }}>
                                  <strong style={{ color: dur >= targetGoal && dur <= targetGoal + 1 ? '#10B981' : '#F59E0B' }}>
                                    {note}
                                  </strong>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </Modal>
    </div>
  );
}
