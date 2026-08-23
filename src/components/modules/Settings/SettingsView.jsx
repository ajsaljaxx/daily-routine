import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
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
  Printer
} from 'lucide-react';

export default function SettingsView() {
  const { userProfile, setUserProfile, exportCustomDataPdf, resetToSampleData, showToast } = useApp();

  const [name, setName] = useState(userProfile?.name || 'Ajsal');
  const [tagline, setTagline] = useState(userProfile?.tagline || 'Building discipline & lifelong growth');
  const [currency, setCurrency] = useState(userProfile?.currency || '₹');
  const [theme, setTheme] = useState(userProfile?.theme || 'light');

  // Custom PDF Export State
  const [exportSwalah, setExportSwalah] = useState(true);
  const [exportQuran, setExportQuran] = useState(true);
  const [exportSleep, setExportSleep] = useState(true);
  const [exportDate, setExportDate] = useState('');
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
            onClick={() => exportCustomDataPdf({
              includeSwalah: exportSwalah,
              includeQuran: exportQuran,
              includeSleep: exportSleep,
              selectedDate: exportDate
            })}
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
    </div>
  );
}
