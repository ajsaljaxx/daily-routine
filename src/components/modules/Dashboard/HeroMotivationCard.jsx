import React from 'react';
import { getGreetingAndQuote } from '../../../data/motivationalQuotes';
import { Sparkles, Compass, Flame } from 'lucide-react';

export default function HeroMotivationCard({ onAskAura }) {
  const { quote, category } = getGreetingAndQuote();

  return (
    <div className="aura-card-hero" style={{ position: 'relative' }}>
      {/* Decorative gradient overlay */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-10%',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(223, 247, 255, 0.35), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.18)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={12} />
            {quote?.category || 'Daily Motivation'}
          </span>
        </div>

        <button
          onClick={onAskAura}
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Ask AURA</span>
          <span>→</span>
        </button>
      </div>

      <h2 style={{
        fontSize: '1.45rem',
        fontWeight: 700,
        lineHeight: 1.4,
        color: '#FFFFFF',
        marginBottom: '10px',
        maxWidth: '90%'
      }}>
        "{quote?.text}"
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
        <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, fontStyle: 'italic' }}>
          — {quote?.author}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 600 }}>
            <Flame size={16} color="#F4A340" />
            <span>14 Day Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
}
