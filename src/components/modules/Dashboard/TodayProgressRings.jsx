import React from 'react';
import CircularProgress from '../../common/CircularProgress';
import { useApp } from '../../../context/AppContext';
import { analyzeCurrentState } from '../../../data/auraIntelligence';
import { CheckCircle2, CalendarCheck, BookOpen, Moon } from 'lucide-react';

export default function TodayProgressRings() {
  const state = useApp();
  const analysis = analyzeCurrentState(state);

  const {
    completedPrayers,
    totalPrayers,
    completedHabits,
    totalHabits,
    completedTasks,
    todayTasks,
    overallPercentage
  } = analysis;

  const readingGoal = state.userProfile?.dailyReadingTarget || 25;
  const pagesToday = state.quran?.pagesReadToday || 0;

  return (
    <div className="aura-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Today's Progress
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Holistic Life Balance Score
          </p>
        </div>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-soft)',
          color: 'var(--primary-deep)'
        }}>
          {overallPercentage >= 80 ? '🔥 On Fire' : overallPercentage >= 50 ? '⚡ Steady' : '🌱 Starting'}
        </span>
      </div>

      {/* Main Dial & Metrics Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <CircularProgress
          percentage={overallPercentage}
          size={110}
          strokeWidth={10}
          color="#2457FF"
          sublabel="Done"
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Habits Mini Row */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '3px' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} color="var(--primary-royal)" />
                Habits
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {completedHabits}/{totalHabits}
              </span>
            </div>
            <div className="progress-track" style={{ height: '5px' }}>
              <div
                className="progress-fill"
                style={{ width: `${totalHabits ? (completedHabits / totalHabits) * 100 : 0}%`, background: 'var(--grad-royal)' }}
              />
            </div>
          </div>

          {/* Tasks Mini Row */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '3px' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CalendarCheck size={13} color="var(--success)" />
                Tasks
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {completedTasks}/{todayTasks.length}
              </span>
            </div>
            <div className="progress-track" style={{ height: '5px' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${todayTasks.length ? (completedTasks / todayTasks.length) * 100 : 0}%`,
                  background: 'var(--grad-emerald)'
                }}
              />
            </div>
          </div>

          {/* Swalah Mini Row */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '3px' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>🕌</span>
                Swalah
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {completedPrayers}/{totalPrayers}
              </span>
            </div>
            <div className="progress-track" style={{ height: '5px' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${(completedPrayers / totalPrayers) * 100}%`,
                  background: 'linear-gradient(135deg, #5C95FF, #2457FF)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
