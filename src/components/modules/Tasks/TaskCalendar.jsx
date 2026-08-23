import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Check,
  Calendar as CalendarIcon
} from 'lucide-react';

export default function TaskCalendar({ tasks, toggleTask, onAddTaskForDate, onEditTask }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 18)); // August 18, 2026
  const [selectedDate, setSelectedDate] = useState('2026-08-18');
  const [calendarView, setCalendarView] = useState('month'); // 'month', 'week', 'day'

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Navigation handlers
  const handlePrev = () => {
    if (calendarView === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (calendarView === 'week') {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setCurrentDate(prevWeek);
    } else {
      const prevDay = new Date(currentDate);
      prevDay.setDate(prevDay.getDate() - 1);
      setCurrentDate(prevDay);
      setSelectedDate(prevDay.toISOString().split('T')[0]);
    }
  };

  const handleNext = () => {
    if (calendarView === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (calendarView === 'week') {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentDate(nextWeek);
    } else {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCurrentDate(nextDay);
      setSelectedDate(nextDay.toISOString().split('T')[0]);
    }
  };

  // Month grid generation
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const formattedD = d < 10 ? `0${d}` : `${d}`;
    const formattedM = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
    calendarDays.push({
      dayNum: d,
      dateStr: `${year}-${formattedM}-${formattedD}`
    });
  }

  // Get tasks for a given date
  const getTasksForDate = (dateStr) => {
    return tasks.filter(t => t.date === dateStr);
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className="aura-card" style={{ padding: '24px' }}>
      {/* Calendar Header Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            {monthNames[month]} {year}
          </h3>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={handlePrev} className="btn-icon btn-secondary" style={{ width: '32px', height: '32px' }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={handleNext} className="btn-icon btn-secondary" style={{ width: '32px', height: '32px' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* View Switcher: Month / Week / Day */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
          {['month', 'week', 'day'].map(view => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: calendarView === view ? 700 : 500,
                backgroundColor: calendarView === view ? 'var(--primary-royal)' : 'transparent',
                color: calendarView === view ? '#FFFFFF' : 'var(--text-secondary)',
                textTransform: 'capitalize'
              }}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* 1. MONTH VIEW */}
      {calendarView === 'month' && (
        <div>
          {/* Day Names Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '8px' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <span key={d} style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {calendarDays.map((cell, idx) => {
              if (!cell) {
                return <div key={`empty-${idx}`} style={{ minHeight: '76px', borderRadius: 'var(--radius-sm)' }} />;
              }

              const dayTasks = getTasksForDate(cell.dateStr);
              const isSelected = selectedDate === cell.dateStr;
              const isToday = cell.dateStr === '2026-08-18';

              return (
                <div
                  key={cell.dateStr}
                  onClick={() => setSelectedDate(cell.dateStr)}
                  style={{
                    minHeight: '76px',
                    padding: '8px 6px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--bg-secondary)',
                    border: `1px solid ${isSelected ? 'var(--primary-royal)' : isToday ? 'var(--primary-lavender)' : 'var(--border-light)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: isSelected || isToday ? 800 : 600,
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isToday ? 'var(--primary-lavender)' : 'transparent',
                      color: isToday ? '#FFFFFF' : isSelected ? 'var(--primary-royal)' : 'var(--text-primary)'
                    }}>
                      {cell.dayNum}
                    </span>
                    {dayTasks.length > 0 && (
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--grad-royal)',
                        color: '#FFFFFF'
                      }}>
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  {/* Task preview dots */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                    {dayTasks.slice(0, 2).map(t => {
                      const p = t.priority || 'Medium';
                      let pBg = 'rgba(36, 87, 255, 0.15)';
                      let pColor = '#2457FF';
                      if (p === 'Urgent') {
                        pBg = 'rgba(239, 68, 68, 0.18)';
                        pColor = '#EF4444';
                      } else if (p === 'High') {
                        pBg = 'rgba(245, 158, 11, 0.18)';
                        pColor = '#F59E0B';
                      }

                      return (
                        <div
                          key={t.id}
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '3px',
                            backgroundColor: t.completed ? 'var(--bg-surface)' : pBg,
                            color: t.completed ? 'var(--text-muted)' : pColor,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textDecoration: t.completed ? 'line-through' : 'none'
                          }}
                        >
                          {t.title}
                        </div>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        +{dayTasks.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tasks below selected date */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Scheduled for {selectedDate}
              </h4>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onAddTaskForDate(selectedDate)}
                style={{ gap: '4px' }}
              >
                <Plus size={14} />
                <span>Add Task to Day</span>
              </button>
            </div>

            {selectedDateTasks.length === 0 ? (
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', padding: '12px 0' }}>
                No tasks scheduled for this day. Click "+ Add Task to Day" to schedule.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDateTasks.map(t => {
                  const p = t.priority || 'Medium';
                  let pBg = 'rgba(36, 87, 255, 0.14)';
                  let pColor = '#2457FF';
                  if (p === 'Urgent') {
                    pBg = 'rgba(239, 68, 68, 0.15)';
                    pColor = '#EF4444';
                  } else if (p === 'High') {
                    pBg = 'rgba(245, 158, 11, 0.15)';
                    pColor = '#F59E0B';
                  }

                  return (
                    <div
                      key={t.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderLeft: `4px solid ${pColor}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => toggleTask(t.id)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '6px',
                            border: `2px solid ${t.completed ? 'var(--success)' : 'var(--border-medium)'}`,
                            backgroundColor: t.completed ? 'var(--success)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {t.completed && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
                        </button>
                        <div>
                          <span style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            textDecoration: t.completed ? 'line-through' : 'none'
                          }}>
                            {t.title}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            <span>{t.time}</span>
                            <span style={{
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: 'var(--radius-full)',
                              background: pBg,
                              color: pColor
                            }}>
                              {p}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onEditTask(t)}
                        className="btn-ghost btn-sm"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Edit
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. WEEK VIEW */}
      {calendarView === 'week' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', overflowX: 'auto', minWidth: '700px' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, idx) => {
            const dateNum = 17 + idx; // Aug 17 - 23
            const dateStr = `2026-08-${dateNum < 10 ? '0' + dateNum : dateNum}`;
            const dayTasks = getTasksForDate(dateStr);

            return (
              <div
                key={dayName}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 10px',
                  minHeight: '260px',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{dayName}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{dateNum}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dayTasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        backgroundColor: t.completed ? 'var(--bg-surface)' : 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {t.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. DAY VIEW */}
      {calendarView === 'day' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-royal)', marginBottom: '8px' }}>
            Agenda for {selectedDate}
          </div>
          {selectedDateTasks.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No scheduled events for this single day view.</p>
          ) : (
            selectedDateTasks.map(t => (
              <div
                key={t.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Scheduled: {t.time} • Priority: {t.priority} • Category: {t.category}
                  </div>
                  {t.notes && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>{t.notes}</p>}
                </div>
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`btn ${t.completed ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                >
                  {t.completed ? 'Completed ✓' : 'Mark Done'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
