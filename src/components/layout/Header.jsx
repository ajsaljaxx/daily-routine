import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getGreetingAndQuote } from '../../data/motivationalQuotes';
import {
  Sun,
  Moon,
  Bell,
  Plus,
  BookOpen,
  RotateCcw,
  Sparkles,
  Bot
} from 'lucide-react';

export default function Header({ onOpenQuickAction }) {
  const { userProfile, setUserProfile, notifications, setActivePage, isAiChatOpen, toggleAiChat } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const { greeting } = getGreetingAndQuote();

  const toggleTheme = () => {
    const currentTheme = userProfile?.theme || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setUserProfile(prev => ({ ...prev, theme: nextTheme }));
  };

  const isDark = userProfile?.theme === 'dark';

  return (
    <header className="app-header">
      {/* Left: Greeting */}
      <div className="header-left">
        <h2 className="header-greeting">
          {greeting}
        </h2>
      </div>

      {/* Right Controls */}
      <div className="header-right">

        {/* Quick Add Button */}
        <button
          className="btn btn-primary btn-sm header-quick-btn"
          onClick={onOpenQuickAction}
          title="Quick Log"
        >
          <Plus size={16} />
          <span className="quick-btn-label">Quick Log</span>
        </button>

        {/* Reading Hub Quick Trigger (Desktop Only - Mobile has it in bottom nav) */}
        <button
          className="btn btn-secondary btn-sm desktop-only-btn"
          onClick={() => setActivePage('reading')}
          style={{ gap: '6px', color: 'var(--primary-royal)', borderColor: 'var(--border-medium)' }}
        >
          <BookOpen size={16} />
          <span>Reading Hub</span>
        </button>

        {/* Upper Right Circular AURA AI Chatbot Button */}
        <button
          onClick={toggleAiChat}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--grad-royal)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(255, 255, 255, 0.4)',
            boxShadow: isAiChatOpen ? '0 0 0 3px rgba(36, 87, 255, 0.35)' : '0 4px 14px rgba(36, 87, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          title="Open AURA AI Chatbot Assistant"
          aria-label="AURA AI Assistant"
        >
          <Sparkles size={18} color="#FFFFFF" />
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '1.5px solid var(--bg-surface)'
            }}
          />
        </button>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-icon btn-ghost header-icon-btn"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-full)',
              background: showNotifications ? 'var(--bg-secondary)' : 'transparent'
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-royal)',
                boxShadow: '0 0 0 2px var(--bg-surface)'
              }} />
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  Notifications
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-royal)', fontWeight: 600 }}>
                  {notifications.length} Active
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {n.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn-icon btn-ghost header-icon-btn"
          style={{ borderRadius: 'var(--radius-full)' }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} color="#F4A340" /> : <Moon size={18} color="var(--primary-royal)" />}
        </button>
      </div>
    </header>
  );
}
