import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PrayerQuickTracker, QuranQuickTracker } from '../Dashboard/PrayerQuickTracker';
import HabitAnalytics from './HabitAnalytics';
import HabitModal from './HabitModal';
import {
  Plus,
  Flame,
  Check,
  MoreVertical,
  Trash2,
  Edit2,
  Filter,
  Sparkles,
  Award
} from 'lucide-react';

export default function HabitsView() {
  const {
    habits,
    toggleHabit,
    addHabit,
    editHabit,
    deleteHabit,
    prayers,
    quran,
    dayCounter,
    incrementDay,
    resetDay
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'swalah', 'quran', 'analytics'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const categories = ['All', 'Fitness', 'Mindfulness', 'Education', 'Health', 'Reflection'];

  const filteredHabits = habits.filter(h => {
    if (selectedCategory === 'All') return true;
    return h.category === selectedCategory;
  });

  const completedCount = habits.filter(h => h.completedToday).length;
  const progressPercent = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  const handleOpenAdd = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleSaveHabit = (habitData) => {
    if (editingHabit) {
      editHabit(habitData);
    } else {
      addHabit(habitData);
    }
  };

  return (
    <div className="page-content">
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Daily Habits & Routine
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Build unshakable discipline with small, consistent daily actions.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Automatic Day Counter & Reset Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-soft)',
              border: '1px solid var(--border-medium)',
              fontSize: '0.86rem',
              fontWeight: 700,
              color: 'var(--primary-deep)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} color="var(--primary-royal)" />
              <span>Day {dayCounter} Streak</span>
            </div>
            <span style={{ color: 'var(--border-medium)' }}>|</span>
            <button
              onClick={resetDay}
              style={{
                padding: '3px 10px',
                fontSize: '0.74rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
              title="Reset streak to Day 1 starting today"
            >
              Reset
            </button>
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd} style={{ gap: '8px' }}>
            <Plus size={18} />
            <span>New Habit</span>
          </button>
        </div>
      </div>

      {/* Habit Progress Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        background: 'var(--bg-surface)',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)'
      }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Daily Habits Tracker
        </span>
        <div style={{ fontSize: '0.88rem', color: 'var(--primary-royal)', fontWeight: 700 }}>
          {completedCount} of {habits.length} Habits Completed ({progressPercent}%)
        </div>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid-2-col">
        {habits.map(habit => (
              <div
                key={habit.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${habit.completedToday ? 'rgba(54, 162, 105, 0.3)' : 'var(--border-subtle)'}`,
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  boxShadow: habit.completedToday ? '0 4px 14px rgba(54, 162, 105, 0.08)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Checkbox & Habit Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      border: `2px solid ${habit.completedToday ? 'var(--success)' : 'var(--border-medium)'}`,
                      backgroundColor: habit.completedToday ? 'var(--success)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    aria-label={`Toggle habit ${habit.name}`}
                  >
                    {habit.completedToday && <Check size={18} strokeWidth={3} color="#FFFFFF" />}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      textDecoration: habit.completedToday ? 'line-through' : 'none',
                      opacity: habit.completedToday ? 0.75 : 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {habit.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)'
                      }}>
                        {habit.category}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {habit.frequency || 'Daily'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Streak & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(244, 163, 64, 0.12)',
                    color: '#F4A340',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    <Flame size={15} />
                    <span>{habit.streak}d</span>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(habit)}
                    className="btn-icon btn-ghost"
                    style={{ width: '30px', height: '30px' }}
                    title="Edit habit"
                  >
                    <Edit2 size={15} />
                  </button>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="btn-icon btn-ghost"
                    style={{ width: '30px', height: '30px', color: 'var(--danger)' }}
                    title="Delete habit"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

      {/* Habit Modal */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHabit}
        editingHabit={editingHabit}
      />
    </div>
  );
}
