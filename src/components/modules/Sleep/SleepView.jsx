import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Modal from '../../common/Modal';
import { Moon, Sunrise, Calendar, CheckCircle2, AlertTriangle, Plus, Target, Edit3 } from 'lucide-react';

export default function SleepView() {
  const { sleep, logSleep, userProfile, setUserProfile, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);

  const dailyTarget = userProfile?.dailySleepTarget || 7.5;
  const [targetInput, setTargetInput] = useState(String(dailyTarget));

  // Modal form states
  const [fromTime, setFromTime] = useState('23:00');
  const [toTime, setToTime] = useState('06:00');

  const lastNight = sleep.lastNight || { durationHours: 7.0, from: '23:15', to: '06:15' };
  const history = sleep.history || [];

  // Monthly Wise Calculation (starting with current month / today)
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth();
  const monthName = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const currentMonthPrefix = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, '0')}`;

  // Filter history for current month (or all available records)
  const monthlyRecords = history.filter(h => h.date && h.date.startsWith(currentMonthPrefix));
  const activeRecords = monthlyRecords.length > 0 ? monthlyRecords : history;

  const totalMonthlyHours = activeRecords.reduce((sum, h) => sum + (Number(h.duration) || 7.0), 0);
  const daysLogged = activeRecords.length || 1;
  const avgMonthlyHours = (totalMonthlyHours / daysLogged).toFixed(1);

  // Single rating verdict: "You're doing well" or "You're not sleeping well, you want more rest"
  const isDoingWell = Number(avgMonthlyHours) >= Number(dailyTarget || 7.0);
  const ratingVerdict = isDoingWell ? "You're doing well 🎉" : "You're not sleeping well, you want more rest ⚠️";
  const ratingDetail = isDoingWell
    ? `Your ${monthName} sleep average is ${avgMonthlyHours}h / night, achieving your ${dailyTarget}h daily target.`
    : `Your ${monthName} sleep average is ${avgMonthlyHours}h / night (target: ${dailyTarget}h). Prioritize earlier bedtimes to give your body more rest.`;

  const handleSaveSleep = (e) => {
    e.preventDefault();
    logSleep({
      from: fromTime,
      to: toTime
    });
    setIsModalOpen(false);
  };

  const handleSaveTarget = (e) => {
    e.preventDefault();
    const val = Math.max(4, Math.min(14, Number(targetInput) || 7.5));
    setUserProfile(prev => ({
      ...prev,
      dailySleepTarget: val
    }));
    showToast(`Daily sleep target updated to ${val} hours! 🎯`, 'success');
    setIsTargetModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Header & Primary Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Monthly Sleep Recovery
            </h1>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-soft)',
              color: 'var(--primary-deep)',
              textTransform: 'uppercase'
            }}>
              {monthName}
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Monthly circadian tracking and recovery assessment starting from today.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ gap: '8px' }}>
          <Plus size={18} />
          <span>Record Sleep</span>
        </button>
      </div>

      {/* SINGLE RATING VERDICT BANNER */}
      <div
        className="aura-card"
        style={{
          background: isDoingWell
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(36, 87, 255, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(239, 68, 68, 0.08) 100%)',
          border: `1px solid ${isDoingWell ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.35)'}`,
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: isDoingWell ? 'var(--success)' : '#F59E0B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDoingWell ? '0 4px 14px rgba(16, 185, 129, 0.35)' : '0 4px 14px rgba(245, 158, 11, 0.35)'
          }}>
            {isDoingWell ? <CheckCircle2 size={26} /> : <AlertTriangle size={26} />}
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Monthly Sleep Rating
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 4px', color: 'var(--text-primary)' }}>
              {ratingVerdict}
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
              {ratingDetail}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Avg</span>
            <strong style={{ fontSize: '1.5rem', fontWeight: 800, color: isDoingWell ? 'var(--success)' : '#F59E0B' }}>
              {avgMonthlyHours}h
            </strong>
          </div>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Total Logged</span>
            <strong style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalMonthlyHours.toFixed(1)}h
            </strong>
          </div>
        </div>
      </div>

      {/* 3 Monthly Overview Metric Cards (Including Daily Target Goal with Edit button) */}
      <div className="grid-3-col" style={{ marginBottom: '24px' }}>
        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-deep)'
          }}>
            <Moon size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Last Night Rest</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {lastNight.durationHours} Hours
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {lastNight.from} → {lastNight.to}
            </span>
          </div>
        </div>

        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(36, 87, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-royal)'
          }}>
            <Calendar size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Monthly Average</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {avgMonthlyHours}h / night
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {daysLogged} nights logged in {monthName.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Daily Target Goal with EDIT BUTTON */}
        <div
          className="aura-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => {
            setTargetInput(String(dailyTarget));
            setIsTargetModalOpen(true);
          }}
          title="Click to edit Daily Target Goal"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16, 185, 129, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)'
            }}>
              <Target size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Daily Target Goal</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {dailyTarget} Hours
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Circadian target
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setTargetInput(String(dailyTarget));
              setIsTargetModalOpen(true);
            }}
            style={{
              padding: '5px 10px',
              fontSize: '0.78rem',
              fontWeight: 700,
              gap: '4px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <Edit3 size={13} />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Visual Sleep Timeline Bar & Monthly Chart */}
      <div className="grid-2-col" style={{ marginBottom: '24px' }}>
        {/* Timeline representation */}
        <div className="aura-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Last Night Timeline
          </h3>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            border: '1px solid var(--border-light)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Moon size={18} color="var(--primary-royal)" />
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Bedtime</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{lastNight.from}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Wake Time</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{lastNight.to}</strong>
                  </div>
                  <Sunrise size={18} color="#F4A340" />
                </div>
              </div>
            </div>

            {/* Glowing Gradient Sleep Bar */}
            <div style={{
              height: '18px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(90deg, #020202 0%, #3A92D8 50%, #B2D5E5 100%)',
              boxShadow: '0 4px 14px rgba(58, 146, 216, 0.35)',
              position: 'relative'
            }} />

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-royal)' }}>
              Total Duration: {lastNight.durationHours} Hours
            </div>
          </div>
        </div>

        {/* Monthly Sleep Duration Chart */}
        <div className="aura-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {monthName} Daily Sleep Trend
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target: 7.0h+</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '160px',
            paddingTop: '20px',
            gap: '4px',
            overflowX: 'auto'
          }}>
            {activeRecords.map((day, i) => {
              const heightPercent = Math.min(100, (day.duration / 9) * 100);
              const isGood = day.duration >= 7.0;

              return (
                <div key={i} style={{ flex: 1, minWidth: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.64rem', fontWeight: 700, color: isGood ? 'var(--primary-royal)' : '#F59E0B', marginBottom: '4px' }}>
                    {day.duration}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '22px',
                      height: `${heightPercent}%`,
                      borderRadius: 'var(--radius-sm)',
                      background: isGood ? 'var(--grad-royal)' : '#F59E0B',
                      transition: 'height var(--transition-normal)'
                    }}
                    title={`${day.date}: ${day.duration}h (${isGood ? 'Doing well' : 'Want more rest'})`}
                  />
                  <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    {day.date.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Sleep Log History Table */}
      <div className="aura-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            {monthName} Sleep History Log
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {activeRecords.length} Entries Logged
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Date</th>
                <th style={{ padding: '10px 12px' }}>Bedtime (From)</th>
                <th style={{ padding: '10px 12px' }}>Wake-up (To)</th>
                <th style={{ padding: '10px 12px' }}>Duration</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeRecords.map((record, i) => {
                const isEntryGood = (Number(record.duration) || 0) >= 7.0;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{record.date}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{record.from}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{record.to}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary-royal)' }}>{record.duration}h</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: isEntryGood ? 'var(--success-bg)' : 'rgba(245, 158, 11, 0.15)',
                        color: isEntryGood ? 'var(--success)' : '#D97706'
                      }}>
                        {isEntryGood ? "Doing Well" : "Not Sleeping Well"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Sleep Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Sleep & Extra Rest" maxWidth="480px">
        <form onSubmit={handleSaveSleep}>
          <div className="form-row">
            <div className="form-group">
              <label>Rest From</label>
              <input type="time" value={fromTime} onChange={e => setFromTime(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Rest To</label>
              <input type="time" value={toTime} onChange={e => setToTime(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Record Sleep & Add to Today's Total
          </button>
        </form>
      </Modal>

      {/* Edit Daily Sleep Target Goal Modal */}
      <Modal isOpen={isTargetModalOpen} onClose={() => setIsTargetModalOpen(false)} title="Edit Daily Sleep Target Goal" maxWidth="420px">
        <form onSubmit={handleSaveTarget}>
          <div className="form-group">
            <label>Daily Sleep Target (Hours / Night)</label>
            <input
              type="number"
              step="0.5"
              min="4"
              max="14"
              value={targetInput}
              onChange={e => setTargetInput(e.target.value)}
              required
              autoFocus
            />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '16px' }}>
            Set your target hours of restorative sleep each night.
          </p>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Save Target Goal
          </button>
        </form>
      </Modal>
    </div>
  );
}
