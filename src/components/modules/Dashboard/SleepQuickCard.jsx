import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Moon, ArrowUpRight } from 'lucide-react';

export function SleepQuickCard() {
  const { sleep, userProfile, setActivePage } = useApp();
  const lastNight = sleep.lastNight || { durationHours: 0, from: '23:00', to: '05:30' };
  const history = sleep.history || [];
  const targetGoal = Number(userProfile?.dailySleepTarget) || 7.5;
  const currentDuration = Number(lastNight.durationHours) || 0;

  // Monthly calculation starting with current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth();
  const monthName = now.toLocaleString('en-US', { month: 'short' });
  const currentMonthPrefix = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, '0')}`;

  const monthlyRecords = history.filter(h => h.date && h.date.startsWith(currentMonthPrefix));
  const activeRecords = monthlyRecords.length > 0 ? monthlyRecords : history;

  const totalMonthlyHours = activeRecords.reduce((sum, h) => sum + (Number(h.duration) || 0), 0);
  const avgMonthlyHours = (totalMonthlyHours / (activeRecords.length || 1)).toFixed(1);

  // Exact 3-condition Status Evaluator based on daily target goal
  let statusBadge = {
    text: "You're sleeping well 🎉",
    color: "var(--success)",
    bg: "var(--success-bg)",
    border: "rgba(16, 185, 129, 0.25)"
  };

  if (currentDuration < targetGoal) {
    statusBadge = {
      text: "You want more rest ⚠️",
      color: "#D97706",
      bg: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.3)"
    };
  } else if (currentDuration > targetGoal + 1.0) {
    statusBadge = {
      text: "Sleeping unnecessarily ⚠️",
      color: "#2563EB",
      bg: "rgba(37, 99, 235, 0.12)",
      border: "rgba(37, 99, 235, 0.3)"
    };
  } else {
    statusBadge = {
      text: "You're sleeping well 🎉",
      color: "var(--success)",
      bg: "var(--success-bg)",
      border: "rgba(16, 185, 129, 0.25)"
    };
  }

  return (
    <div className="aura-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Moon size={18} color="var(--primary-lavender)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Sleep Recovery
          </h3>
        </div>
        <button
          onClick={() => setActivePage('sleep')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <span>Monthly View</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {currentDuration}h
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Last night
          </span>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {monthName} Avg: <strong style={{ color: Number(avgMonthlyHours) >= targetGoal ? 'var(--success)' : '#F59E0B' }}>{avgMonthlyHours}h</strong>
        </div>
      </div>

      {/* Visual sleep timeline bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '9px 12px',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          Bedtime: <strong style={{ color: 'var(--text-primary)' }}>{lastNight.from}</strong>
        </div>
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          Wake: <strong style={{ color: 'var(--text-primary)' }}>{lastNight.to}</strong>
        </div>
      </div>

      {/* 3-Condition Status Badge */}
      <div style={{
        padding: '7px 10px',
        borderRadius: 'var(--radius-sm)',
        background: statusBadge.bg,
        border: `1px solid ${statusBadge.border}`,
        fontSize: '0.78rem',
        fontWeight: 700,
        color: statusBadge.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        {statusBadge.text}
      </div>
    </div>
  );
}
