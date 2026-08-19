import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { generateDailyAuraInsight } from '../../../data/auraIntelligence';

export function AuraInsightBanner({ onOpenChat }) {
  const state = useApp();
  const insight = generateDailyAuraInsight(state);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(36, 87, 255, 0.12) 0%, rgba(223, 247, 255, 0.06) 100%)',
        border: '1px solid rgba(36, 87, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--grad-royal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0,
            boxShadow: 'var(--shadow-primary)'
          }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              AURA Daily Intelligence
            </h4>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-soft)',
                color: 'var(--primary-deep)',
                textTransform: 'uppercase'
              }}
            >
              {insight.tag}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            {insight.message}
          </p>
        </div>
      </div>

      <button
        onClick={onOpenChat}
        className="btn btn-primary btn-sm"
        style={{ flexShrink: 0, gap: '6px' }}
      >
        <span>{insight.actionLabel}</span>
      </button>
    </div>
  );
}

export function NightReflectionPreview() {
  const { reflections, setActivePage } = useApp();
  const latestReflection = reflections[0];

  return (
    <div className="aura-card" style={{ background: 'var(--grad-card-warm)', marginTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartHandshake size={18} color="#F97316" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Night Reflection & Tomorrow's Focus Anchors
          </h3>
        </div>
        <button
          onClick={() => setActivePage('reflection')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-royal)' }}
        >
          <span>Open Journal</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {latestReflection ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Yesterday's Wins & Gratitude
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
              "{latestReflection.wentWell?.slice(0, 160)}..."
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Tomorrow's Priorities:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              {(latestReflection.tomorrowFocus || []).slice(0, 3).map((focus, i) => (
                <li key={i} style={{ marginBottom: '2px' }}>{focus}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
          Take 3 minutes before sleeping to log your daily wins and prepare tomorrow's 3 priority anchors.
        </p>
      )}
    </div>
  );
}
