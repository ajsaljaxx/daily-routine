import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import TaskCalendar from './TaskCalendar';
import TaskModal from './TaskModal';
import {
  Plus,
  Search,
  Check,
  Clock,
  Trash2,
  Edit2,
  Calendar,
  ListFilter,
  Flame,
  AlertTriangle
} from 'lucide-react';

export default function TasksView() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useApp();

  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'calendar'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'completed', 'urgent'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [calendarTargetDate, setCalendarTargetDate] = useState(null);

  const handleOpenAdd = (date = null) => {
    setEditingTask(null);
    setCalendarTargetDate(date);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      editTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'pending') return !task.completed;
    if (filterStatus === 'completed') return task.completed;
    if (filterStatus === 'urgent') return task.priority === 'Urgent' || task.priority === 'High';

    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="page-content">
      {/* Header & Main Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Tasks & Calendar Schedule
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Organize assignments, study blocks, workouts, and priority deadlines.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => handleOpenAdd()} style={{ gap: '8px' }}>
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {/* Main View Switcher (Task List vs Calendar) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'list' ? 700 : 500,
              backgroundColor: activeTab === 'list' ? 'var(--primary-royal)' : 'transparent',
              color: activeTab === 'list' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Tasks List ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'calendar' ? 700 : 500,
              backgroundColor: activeTab === 'calendar' ? 'var(--primary-royal)' : 'transparent',
              color: activeTab === 'calendar' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Interactive Calendar
          </button>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* 1. CALENDAR VIEW */}
      {activeTab === 'calendar' ? (
        <TaskCalendar
          tasks={tasks}
          toggleTask={toggleTask}
          onAddTaskForDate={(date) => handleOpenAdd(date)}
          onEditTask={handleOpenEdit}
        />
      ) : (
        /* 2. TASK LIST VIEW */
        <div>
          {/* Unified Tasks List */}
          {filteredTasks.length === 0 ? (
            <div className="aura-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Your schedule is clear! ✨
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                Enjoy the free space or plan something meaningful.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => handleOpenAdd()}>
                <Plus size={16} />
                <span>Add a New Task</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredTasks.map(task => {
                const priority = task.priority || 'Medium';

                // Priority Color Coding: Urgent -> RED, High -> ORANGE, Others -> BLUE
                let pBg = 'rgba(36, 87, 255, 0.14)';
                let pColor = '#2457FF';
                let pBorderLeft = '5px solid #2457FF';

                if (priority === 'Urgent') {
                  pBg = 'rgba(239, 68, 68, 0.15)';
                  pColor = '#EF4444';
                  pBorderLeft = '5px solid #EF4444';
                } else if (priority === 'High') {
                  pBg = 'rgba(245, 158, 11, 0.15)';
                  pColor = '#F59E0B';
                  pBorderLeft = '5px solid #F59E0B';
                }

                return (
                  <div
                    key={task.id}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      borderLeft: task.completed ? '5px solid var(--border-medium)' : pBorderLeft,
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      boxShadow: 'var(--shadow-sm)',
                      opacity: task.completed ? 0.65 : 1,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {/* Checkbox & Task Info */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: 0 }}>
                      <button
                        onClick={() => toggleTask(task.id)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: `2px solid ${task.completed ? 'var(--success)' : 'var(--border-medium)'}`,
                          backgroundColor: task.completed ? 'var(--success)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                          cursor: 'pointer'
                        }}
                      >
                        {task.completed && <Check size={14} strokeWidth={3} color="#FFFFFF" />}
                      </button>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '4px'
                        }}>
                          {task.title}
                        </div>

                        {task.notes && (
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                            {task.notes}
                          </p>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} />
                            {task.date}
                          </span>

                          {task.time && (
                            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={13} />
                              {task.time}
                            </span>
                          )}

                          {task.category && (
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-secondary)'
                            }}>
                              {task.category}
                            </span>
                          )}

                          {task.recurring && task.recurring !== 'None' && (
                            <span style={{ fontSize: '0.72rem', color: 'var(--primary-royal)', fontWeight: 600 }}>
                              ↻ {task.recurring}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Priority Badge & Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: pBg,
                        color: pColor
                      }}>
                        {priority}
                      </span>

                      <button
                        onClick={() => handleOpenEdit(task)}
                        className="btn-icon btn-ghost"
                        style={{ width: '32px', height: '32px' }}
                        title="Edit task"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="btn-icon btn-ghost"
                        style={{ width: '32px', height: '32px', color: 'var(--danger)' }}
                        title="Delete task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        defaultDate={calendarTargetDate}
      />
    </div>
  );
}
