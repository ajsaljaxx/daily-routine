import React from 'react';
import { useApp } from '../../../context/AppContext';
import { UtensilsCrossed, Droplets, Plus, Minus, ArrowUpRight, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { generateDailyAuraInsight } from '../../../data/auraIntelligence';

export function MealsQuickCard() {
  const { meals, waterGlasses, updateWater, userProfile, setActivePage } = useApp();
  const targetWater = userProfile?.dailyWaterTarget || 8;

  return (
    <div className="aura-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UtensilsCrossed size={18} color="#36A269" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Nutrition & Hydration
          </h3>
        </div>
        <button
          onClick={() => setActivePage('food')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <span>Meal Plan</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Water Tracker Mini Bar */}
      <div style={{
        background: 'rgba(91, 141, 239, 0.08)',
        border: '1px solid rgba(91, 141, 239, 0.2)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplets size={20} color="#5B8DEF" />
          <div>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {waterGlasses} of {targetWater} Glasses
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>
              {(waterGlasses * 0.25).toFixed(1)}L Hydrated today
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => updateWater(-1)}
            className="btn btn-secondary btn-icon"
            style={{ width: '26px', height: '26px', borderRadius: '50%' }}
          >
            <Minus size={12} />
          </button>
          <button
            onClick={() => updateWater(1)}
            className="btn btn-primary btn-icon"
            style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#5B8DEF' }}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Today's Meals Snippet */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {meals.slice(0, 3).map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.category.split('/')[0]}</span>
            <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
              {m.food}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuraInsightBanner({ onOpenChat }) {
  const state = useApp();
  const insight = generateDailyAuraInsight(state);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(124, 92, 252, 0.12) 0%, rgba(167, 139, 250, 0.08) 100%)',
      border: '1px solid rgba(124, 92, 252, 0.25)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--grad-royal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          flexShrink: 0,
          boxShadow: 'var(--shadow-purple)'
        }}>
          <Sparkles size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              AURA Daily Intelligence
            </h4>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-soft)',
              color: 'var(--primary-deep)',
              textTransform: 'uppercase'
            }}>
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
    <div className="aura-card" style={{ background: 'var(--grad-card-warm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartHandshake size={18} color="#FD7E50" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Night Reflection & Tomorrow's Focus
          </h3>
        </div>
        <button
          onClick={() => setActivePage('reflection')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <span>Write Journal</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {latestReflection ? (
        <div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '10px' }}>
            "{latestReflection.wentWell?.slice(0, 120)}..."
          </p>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Tomorrow's Key Priorities:
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {(latestReflection.tomorrowFocus || []).slice(0, 2).map((focus, i) => (
              <li key={i} style={{ marginBottom: '2px' }}>{focus}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Take 3 minutes before sleeping to log your daily wins and prepare tomorrow's 3 priority anchors.
        </p>
      )}
    </div>
  );
}
