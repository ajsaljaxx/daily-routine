import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { HeartHandshake, Sparkles, Star, Calendar, Check, Save } from 'lucide-react';

export default function ReflectionView() {
  const { reflections, saveReflection } = useApp();

  const [wentWell, setWentWell] = useState('');
  const [couldImprove, setCouldImprove] = useState('');
  const [gratefulFor, setGratefulFor] = useState('');
  const [energyRating, setEnergyRating] = useState(4);
  const [focus1, setFocus1] = useState('');
  const [focus2, setFocus2] = useState('');
  const [focus3, setFocus3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wentWell.trim() && !gratefulFor.trim()) return;

    saveReflection({
      wentWell,
      couldImprove,
      gratefulFor,
      energyRating: Number(energyRating),
      tomorrowFocus: [focus1, focus2, focus3].filter(Boolean)
    });

    setWentWell('');
    setCouldImprove('');
    setGratefulFor('');
    setFocus1('');
    setFocus2('');
    setFocus3('');
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Night Reflection & Evening Journal
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Wind down with gratitude, honest self-review, and 3 anchor priorities for tomorrow.
        </p>
      </div>

      <div className="grid-2-col" style={{ alignItems: 'flex-start' }}>
        {/* Reflection Form */}
        <div className="aura-card" style={{ background: 'var(--grad-card-warm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
            Tonight's Reflection Entry
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>1. What went well today? (Daily Wins & Highlights)</label>
              <textarea
                rows={2}
                placeholder="e.g. Completed all 5 prayers on time, stayed focused during AI study session..."
                value={wentWell}
                onChange={e => setWentWell(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>2. What could you improve tomorrow? (Constructive Review)</label>
              <textarea
                rows={2}
                placeholder="e.g. Reduce afternoon phone scrolling, drink more water before 4 PM..."
                value={couldImprove}
                onChange={e => setCouldImprove(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>3. What are you grateful for today? (Gratitude)</label>
              <textarea
                rows={2}
                placeholder="e.g. Family peace, good health, continuous learning..."
                value={gratefulFor}
                onChange={e => setGratefulFor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>4. How was your energy & focus today?</label>
              <select value={energyRating} onChange={e => setEnergyRating(e.target.value)}>
                <option value={5}>⭐⭐⭐⭐⭐ 5/5 — Peak Energy & Flow</option>
                <option value={4}>⭐⭐⭐⭐ 4/5 — High Energy & Good Discipline</option>
                <option value={3}>⭐⭐⭐ 3/5 — Moderate Energy</option>
                <option value={2}>⭐⭐ 2/5 — Low Energy / Sluggish</option>
                <option value={1}>⭐ 1/5 — Drained</option>
              </select>
            </div>

            {/* Tomorrow's Focus */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(244, 163, 64, 0.25)' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                🎯 Tomorrow's 3 Priority Anchors
              </label>
              <input
                type="text"
                placeholder="Priority 1: e.g. Finish College AI assignment submission"
                value={focus1}
                onChange={e => setFocus1(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <input
                type="text"
                placeholder="Priority 2: e.g. Read 25 pages of Atomic Habits"
                value={focus2}
                onChange={e => setFocus2(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <input
                type="text"
                placeholder="Priority 3: e.g. Gym workout session at 6 PM"
                value={focus3}
                onChange={e => setFocus3(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '8px' }}>
              <Save size={16} />
              <span>Save Reflection & Set Intentions</span>
            </button>
          </form>
        </div>

        {/* Past Reflections Archive */}
        <div className="aura-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
            Reflection Archive ({reflections.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '600px', overflowY: 'auto' }}>
            {reflections.map((ref, idx) => (
              <div
                key={ref.id || idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary-royal)' }}>
                    {ref.date}
                  </span>
                  <span>{'⭐'.repeat(ref.energyRating || 4)}</span>
                </div>

                <div style={{ fontSize: '0.84rem', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Wins: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{ref.wentWell}</span>
                </div>

                {ref.couldImprove && (
                  <div style={{ fontSize: '0.84rem', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Improvements: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{ref.couldImprove}</span>
                  </div>
                )}

                <div style={{ fontSize: '0.84rem', marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Grateful For: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{ref.gratefulFor}</span>
                </div>

                {ref.tomorrowFocus && ref.tomorrowFocus.length > 0 && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                      Priorities Set:
                    </span>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {ref.tomorrowFocus.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
