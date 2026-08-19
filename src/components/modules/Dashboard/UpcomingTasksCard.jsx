import React from 'react';
import { useApp } from '../../../context/AppContext';
import { CalendarCheck, Check, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';

export function UpcomingTasksCard() {
  const { tasks, toggleTask, setActivePage } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr || !t.date).slice(0, 4);

  return (
    <div className="aura-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarCheck size={19} color="var(--primary-royal)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Upcoming Tasks
          </h3>
        </div>
        <button
          onClick={() => setActivePage('tasks')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <span>View All</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {todayTasks.length === 0 ? (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
          No tasks scheduled for today. Enjoy the free space! ✨
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {todayTasks.map(task => {
            const isUrgent = task.priority === 'Urgent';
            const isHigh = task.priority === 'High';

            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: task.completed ? 'var(--bg-secondary)' : 'var(--bg-surface-elevated)',
                  border: `1px solid ${task.completed ? 'transparent' : 'var(--border-light)'}`,
                  cursor: 'pointer',
                  opacity: task.completed ? 0.6 : 1,
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Custom Checkbox */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: `2px solid ${task.completed ? 'var(--success)' : 'var(--border-medium)'}`,
                  backgroundColor: task.completed ? 'var(--success)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {task.completed && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    {task.time && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} />
                        {task.time}
                      </span>
                    )}
                    {task.category && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        • {task.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Priority Chip */}
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isUrgent ? 'var(--danger-bg)' : isHigh ? 'var(--warning-bg)' : 'var(--bg-secondary)',
                  color: isUrgent ? 'var(--danger)' : isHigh ? 'var(--warning)' : 'var(--text-muted)'
                }}>
                  {task.priority}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FinanceQuickCard() {
  const { finance, userProfile, setActivePage } = useApp();
  const currency = userProfile?.currency || '₹';

  const todayStr = new Date().toISOString().split('T')[0];
  const spentToday = (finance.transactions || [])
    .filter(t => t.date === todayStr && t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const spentMonth = (finance.transactions || [])
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const topGoal = finance.savingsGoals?.[0];
  const goalProgress = topGoal ? Math.round((topGoal.currentAmount / topGoal.targetAmount) * 100) : 0;

  return (
    <div className="aura-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
          Money & Savings
        </h3>
        <button
          onClick={() => setActivePage('finance')}
          className="btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <span>Details</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Balance</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {currency}{finance.currentBalance?.toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Spent Today</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: spentToday > 0 ? 'var(--warning)' : 'var(--text-primary)' }}>
            {currency}{spentToday.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {topGoal && (
        <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Goal: {topGoal.title}</span>
            <span style={{ fontWeight: 700, color: 'var(--primary-royal)' }}>{goalProgress}%</span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className="progress-fill" style={{ width: `${goalProgress}%`, background: 'var(--grad-royal)' }} />
          </div>
        </div>
      )}
    </div>
  );
}
