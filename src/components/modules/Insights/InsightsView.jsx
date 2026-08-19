import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  Moon,
  BookOpen,
  IndianRupee,
  Activity
} from 'lucide-react';

export default function InsightsView() {
  const { userProfile, habits, tasks, finance, sleep, quran, books } = useApp();
  const currency = userProfile?.currency || '₹';

  const weeklyMetrics = [
    { title: 'Habits Consistency', value: '86%', change: '+4.2%', icon: CheckCircle2, color: '#2457FF' },
    { title: 'Tasks Velocity', value: '82%', change: '+8.0%', icon: CalendarCheck, color: '#10B981' },
    { title: 'Reading Target', value: '92%', change: '+12%', icon: BookOpen, color: '#F97316' },
    { title: 'Sleep Quality', value: '7.2h', change: 'Stable', icon: Moon, color: '#0EA5E9' }
  ];

  const correlations = [
    {
      title: "Sleep Quality vs. Task Productivity",
      insight: "You completed 34% more tasks on mornings following >7 hours of sleep before 11:30 PM.",
      badge: "Strong Positive Correlation",
      color: "#10B981"
    },
    {
      title: "Spiritual Anchor Consistency",
      insight: "Maintaining Fajr prayer on time correlated directly with a 91% Qur'an 1 Juz daily completion rate.",
      badge: "High Synergy",
      color: "#2457FF"
    },
    {
      title: "Finance & Impulse Spending",
      insight: "Weekend dining out expenses were 40% higher than weekday averages. Cooking at home preserved ₹2,400 this week.",
      badge: "Budget Opportunity",
      color: "#F4A340"
    }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Executive Insights & Performance Report
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Cross-domain intelligence discovering patterns in your habits, sleep, study, and finances.
        </p>
      </div>

      {/* Weekly Scorecard Grid */}
      <div className="grid-4-col" style={{ marginBottom: '24px' }}>
        {weeklyMetrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                background: `${m.color}18`,
                color: m.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{m.title}</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{m.value}</div>
                <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Domain Correlations */}
      <div className="aura-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Sparkles size={20} color="var(--primary-royal)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            AURA Cross-Domain Insights & Correlations
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {correlations.map(c => (
            <div
              key={c.title}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {c.title}
                </h4>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: `${c.color}22`,
                  color: c.color
                }}>
                  {c.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {c.insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Breakdown Card */}
      <div className="grid-2-col">
        <div className="aura-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
            Strengths & Wins
          </h3>
          <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Swalah prayers adherence maintained at 100% across the last 4 days.</li>
            <li>Qur’an reading streak reached 12 continuous days (Juz 14).</li>
            <li>Saved ₹9,750 this month towards MacBook Pro and emergency funds.</li>
            <li>Morning exercise consistency reached 8 consecutive days.</li>
          </ul>
        </div>

        <div className="aura-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
            Suggested Focus Areas for Next Week
          </h3>
          <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Set strict 10:30 PM screen curfew to optimize deep sleep.</li>
            <li>Finish Chapter 5 & 6 of "Atomic Habits" to maintain reading momentum.</li>
            <li>Allocate 45 minutes of deep focus coding time before lunch.</li>
            <li>Track daily water intake to ensure consistent 2.5L hydration.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
