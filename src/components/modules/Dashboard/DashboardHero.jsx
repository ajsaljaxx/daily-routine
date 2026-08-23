import React from 'react';
import { useApp } from '../../../context/AppContext';
import { analyzeCurrentState } from '../../../data/auraIntelligence';
import { Sparkles, Flame, CheckCircle2, CalendarCheck, Plus, ArrowRight, BookOpen } from 'lucide-react';

export default function DashboardHero({ onOpenReading, onQuickLog }) {
  const state = useApp();
  const { userProfile, activePage, setActivePage, dayCounter, incrementDay, resetDay } = useApp();
  const analysis = analyzeCurrentState(state);

  const { completedPrayers, totalPrayers, completedHabits, totalHabits, completedTasks, todayTasks, overallPercentage } = analysis;
  const userName = userProfile?.name || 'Ajsal';

  // Date formatting
  const today = new Date();
  const dateFormattedDesktop = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const dayStr = String(today.getDate()).padStart(2, '0');
  const monthStr = String(today.getMonth() + 1).padStart(2, '0');
  const yearStr = today.getFullYear();
  const dateFormattedMobile = `${dayStr}/${monthStr}/${yearStr}`;

  return (
    <div
      className="aura-card-hero"
      style={{
        position: 'relative',
        background: 'var(--grad-card-hero)',
        border: '1px solid rgba(178, 213, 229, 0.25)',
        borderRadius: '24px',
        padding: '28px 30px',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Candy Blue Radial Overlays */}
      <div
        style={{
          position: 'absolute',
          top: '-40%',
          right: '-10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178, 213, 229, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '30%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58, 146, 216, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Header Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '3px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(178, 213, 229, 0.16)',
                color: '#B2D5E5',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(178, 213, 229, 0.28)'
              }}
            >
              <Sparkles size={13} />
              Daily Command Center
            </span>
            <span className="hero-date-desktop" style={{ fontSize: '0.82rem', color: 'rgba(178, 213, 229, 0.85)' }}>
              {dateFormattedDesktop}
            </span>
            <span className="hero-date-mobile" style={{ fontSize: '0.82rem', color: 'rgba(178, 213, 229, 0.85)' }}>
              {dateFormattedMobile}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Reading Hub Button */}
            <button
              onClick={onOpenReading}
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#020202',
                background: 'linear-gradient(135deg, #B2D5E5 0%, #FFFFFF 100%)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <BookOpen size={14} />
              <span>Reading Hub</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '1.9rem',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              margin: '0 0 6px',
              letterSpacing: '-0.02em'
            }}
          >
            Welcome back, {userName} 👋
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'rgba(178, 213, 229, 0.88)', margin: 0, maxWidth: '680px' }}>
            {userProfile?.tagline || 'Building discipline, spiritual consistency & lifelong growth.'}
          </p>
        </div>

        {/* Status Snapshot Badges */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* Automatic Day Streak Badge + Reset Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <Flame size={15} color="#FBBF24" />
              <span>Day {dayCounter} Streak</span>
            </div>
            <span style={{ opacity: 0.35 }}>|</span>
            <button
              onClick={resetDay}
              style={{
                padding: '2px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Reset streak to Day 1 starting today"
            >
              Reset
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#FFFFFF'
            }}
          >
            <span>🕌</span>
            <span>{completedPrayers}/5 Swalah</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#FFFFFF'
            }}
          >
            <CalendarCheck size={15} color="#60A5FA" />
            <span>{completedTasks}/{todayTasks.length} Tasks Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
