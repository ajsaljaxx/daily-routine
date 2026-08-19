import React from 'react';
import { Flame, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function HabitAnalytics({ habits, prayers, quran }) {
  // Days of week sample data for weekly chart
  const weekDays = [
    { day: 'Mon', rate: 85, habitsDone: 5 },
    { day: 'Tue', rate: 90, habitsDone: 6 },
    { day: 'Wed', rate: 75, habitsDone: 4 },
    { day: 'Thu', rate: 100, habitsDone: 6 },
    { day: 'Fri', rate: 95, habitsDone: 6 },
    { day: 'Sat', rate: 70, habitsDone: 4 },
    { day: 'Sun', rate: 80, habitsDone: 5 }
  ];

  // 28-day sample heatmap data
  const heatmapDays = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    // higher completion for most days
    const level = (i % 7 === 5 || i % 7 === 6) ? (i % 2 === 0 ? 2 : 3) : (i % 3 === 0 ? 4 : 3);
    return { day: dayNum, level };
  });

  const getHeatmapColor = (level) => {
    switch (level) {
      case 4: return '#103FE0'; // 100% (Deep Quantum Blue)
      case 3: return '#2457FF'; // 75% (Quantum Blue)
      case 2: return '#5C95FF'; // 50% (Electric Blue)
      case 1: return '#DFF7FF'; // 25% (Ice Glass)
      default: return 'var(--bg-secondary)';
    }
  };

  const completedTodayHabits = habits.filter(h => h.completedToday).length;
  const bestHabit = habits.reduce((best, h) => (h.streak > (best?.streak || 0) ? h : best), habits[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 3 Summary Analytics Cards */}
      <div className="grid-3-col">
        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-soft)',
            color: 'var(--primary-deep)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={24} color="#F4A340" />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Top Active Streak</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {bestHabit?.streak || 14} Days
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {bestHabit?.name || 'Hydrate 2.5L'}
            </span>
          </div>
        </div>

        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--success-bg)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Weekly Average</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              85.2%
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>
              +4.8% vs last week
            </span>
          </div>
        </div>

        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 163, 64, 0.15)',
            color: '#F4A340',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Qur'an Consistency</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {quran.streak} Days
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Juz {quran.currentJuz} in progress
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Bar Chart & 30-Day Heatmap */}
      <div className="grid-2-col">
        {/* Weekly Completion Bar Chart */}
        <div className="aura-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Weekly Habit Consistency
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0 }}>
                Daily completion rates (Monday – Sunday)
              </p>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-royal)' }}>
              Avg: 85%
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '140px',
            paddingTop: '20px',
            gap: '8px'
          }}>
            {weekDays.map(item => (
              <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {item.rate}%
                </span>
                <div style={{
                  width: '100%',
                  maxWidth: '32px',
                  height: '90px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '100%',
                    height: `${item.rate}%`,
                    background: item.rate === 100 ? 'var(--grad-royal)' : 'linear-gradient(180deg, #5C95FF, #2457FF)',
                    borderRadius: 'var(--radius-xs)',
                    transition: 'height 0.8s ease-out'
                  }} />
                </div>
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Heatmap Grid */}
        <div className="aura-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                4-Week Consistency Heatmap
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0 }}>
                28-day habit streak frequency
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Less</span>
              {[1, 2, 3, 4].map(lvl => (
                <div key={lvl} style={{ width: '10px', height: '10px', borderRadius: '2px', background: getHeatmapColor(lvl) }} />
              ))}
              <span>More</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            padding: '8px 0'
          }}>
            {heatmapDays.map(item => (
              <div
                key={item.day}
                title={`Day ${item.day}: Level ${item.level}`}
                style={{
                  aspectRatio: '1',
                  borderRadius: '6px',
                  backgroundColor: getHeatmapColor(item.level),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: item.level >= 3 ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: item.level === 4 ? '0 2px 6px rgba(124, 92, 252, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {item.day}
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '12px', margin: 0 }}>
            💡 <strong>AURA Insight:</strong> Your strongest habit is Qur'an reading (12-day streak). Weekend consistency dipped slightly by 8%.
          </p>
        </div>
      </div>
    </div>
  );
}
