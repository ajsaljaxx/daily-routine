import React from 'react';
import { useApp } from '../../../context/AppContext';
import { CheckCircle2, Circle, Flame, BookOpen } from 'lucide-react';

export function PrayerQuickTracker() {
  const { prayers, togglePrayer } = useApp();
  const completedCount = prayers.filter(p => p.completed).length;
  const progressPercent = Math.round((completedCount / (prayers.length || 5)) * 100);

  return (
    <div className="aura-card" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Swalah Prayers
            </h3>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              background: completedCount === 5 ? 'var(--success-bg)' : 'var(--primary-soft)',
              color: completedCount === 5 ? 'var(--success)' : 'var(--primary-deep)',
              textTransform: 'uppercase'
            }}>
              {completedCount === 5 ? 'All Done ✓' : `${completedCount}/5 Complete`}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Daily spiritual mindfulness & obligatory prayers
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: completedCount === 5 ? 'var(--success)' : 'var(--primary-royal)' }}>
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="progress-track" style={{ height: '4px', marginBottom: '14px' }}>
        <div
          className="progress-fill"
          style={{
            width: `${progressPercent}%`,
            background: completedCount === 5
              ? 'linear-gradient(90deg, #10B981, #059669)'
              : 'var(--grad-royal)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* 5 Prayers Interactive Modern Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: '8px'
      }}>
        {prayers.map(prayer => {
          const isDone = prayer.completed;

          return (
            <button
              key={prayer.id}
              onClick={() => togglePrayer(prayer.id)}
              style={{
                padding: '12px 6px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: isDone
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'var(--bg-secondary)',
                color: isDone ? '#FFFFFF' : 'var(--text-primary)',
                border: isDone
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid var(--border-light)',
                boxShadow: isDone
                  ? '0 4px 12px rgba(16, 185, 129, 0.28)'
                  : '0 1px 3px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                if (!isDone) {
                  e.currentTarget.style.borderColor = 'var(--primary-royal)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(36, 87, 255, 0.12)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (!isDone) {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                }
              }}
            >
              {/* Status Indicator Icon */}
              <div style={{ marginBottom: '2px' }}>
                {isDone ? (
                  <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <Circle size={18} color="var(--text-muted)" strokeWidth={1.8} />
                )}
              </div>

              {/* Prayer Name (English) */}
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                color: isDone ? '#FFFFFF' : 'var(--text-primary)'
              }}>
                {prayer.name}
              </span>

              {/* Arabic Subtitle */}
              {prayer.arabicName && (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  opacity: isDone ? 0.9 : 0.6,
                  color: isDone ? '#FFFFFF' : 'var(--text-secondary)'
                }}>
                  {prayer.arabicName}
                </span>
              )}

              {/* Time Pill */}
              <span style={{
                fontSize: '0.66rem',
                fontWeight: 700,
                marginTop: '4px',
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                background: isDone ? 'rgba(255, 255, 255, 0.22)' : 'var(--bg-surface)',
                color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                border: isDone ? 'none' : '1px solid var(--border-light)'
              }}>
                {prayer.time.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function QuranQuickTracker() {
  const { quran, updateQuranPages } = useApp();

  return (
    <div className="aura-card" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-secondary) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-deep)'
          }}>
            <BookOpen size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Daily Qur'an Reading
            </h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Target: 1 Juz ({quran.targetPagesPerDay} Pages / Day)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: '#F4A340' }}>
          <Flame size={15} />
          <span>{quran.streak}d streak</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
        <div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Current Reading</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-royal)' }}>
            Juz {quran.currentJuz}
          </span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginLeft: '6px' }}>
            ({quran.currentSurah || 'Al-Hijr'})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => updateQuranPages(-1)}
            className="btn btn-secondary btn-icon"
            style={{ width: '28px', height: '28px', borderRadius: '50%' }}
          >
            -
          </button>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {quran.pagesReadToday}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              /{quran.targetPagesPerDay} p.
            </span>
          </div>
          <button
            onClick={() => updateQuranPages(1)}
            className="btn btn-primary btn-icon"
            style={{ width: '28px', height: '28px', borderRadius: '50%' }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
