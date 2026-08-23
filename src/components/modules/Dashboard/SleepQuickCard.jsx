import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Moon, ArrowUpRight } from 'lucide-react';

export function SleepQuickCard() {
  const { sleep, setActivePage } = useApp();
  const lastNight = sleep.lastNight || { durationHours: 7.0, from: '23:15', to: '06:15' };
  const history = sleep.history || [];

  // Monthly calculation starting with current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth();
  const monthName = now.toLocaleString('en-US', { month: 'short' });
  const currentMonthPrefix = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, '0')}`;

  const monthlyRecords = history.filter(h => h.date && h.date.startsWith(currentMonthPrefix));
  const activeRecords = monthlyRecords.length > 0 ? monthlyRecords : history;

  const totalMonthlyHours = activeRecords.reduce((sum, h) => sum + (Number(h.duration) || 7.0), 0);
  const avgMonthlyHours = (totalMonthlyHours / (activeRecords.length || 1)).toFixed(1);

  // Single Rating: "You're doing well" or "You're not sleeping well, you want more rest"
  const isDoingWell = Number(avgMonthlyHours) >= 7.0;
  const ratingText = isDoingWell ? "You're doing well 🎉" : "You're not sleeping well, you want more rest ⚠️";

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
            {lastNight.durationHours}h
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Last night
          </span>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {monthName} Avg: <strong style={{ color: isDoingWell ? 'var(--success)' : '#F59E0B' }}>{avgMonthlyHours}h</strong>
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

      {/* Single Rating Status Badge */}
      <div style={{
        padding: '7px 10px',
        borderRadius: 'var(--radius-sm)',
        background: isDoingWell ? 'var(--success-bg)' : 'rgba(245, 158, 11, 0.12)',
        border: `1px solid ${isDoingWell ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.3)'}`,
        fontSize: '0.78rem',
        fontWeight: 700,
        color: isDoingWell ? 'var(--success)' : '#D97706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        {ratingText}
      </div>
    </div>
  );
}
