import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import {
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  Moon
} from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose }) {
  const { addTask, addHabit, addTransaction, logSleep, userProfile } = useApp();
  const [activeTab, setActiveTab] = useState('task');

  // Task form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskTime, setTaskTime] = useState('14:00');
  const [taskCategory, setTaskCategory] = useState('General');

  // Habit form
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Fitness');

  // Finance form
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('Food');

  // Sleep form
  const [sleepFrom, setSleepFrom] = useState('23:00');
  const [sleepTo, setSleepTo] = useState('06:30');

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({
      title: taskTitle,
      priority: taskPriority,
      time: taskTime,
      category: taskCategory
    });
    setTaskTitle('');
    onClose();
  };

  const handleHabitSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    addHabit({
      name: habitName,
      category: habitCategory,
      frequency: 'Daily'
    });
    setHabitName('');
    onClose();
  };

  const handleTxSubmit = (e) => {
    e.preventDefault();
    if (!txTitle.trim() || !txAmount) return;
    addTransaction({
      title: txTitle,
      amount: Number(txAmount),
      type: txType,
      category: txCategory
    });
    setTxTitle('');
    setTxAmount('');
    onClose();
  };

  const handleSleepSubmit = (e) => {
    e.preventDefault();
    logSleep({
      from: sleepFrom,
      to: sleepTo
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Log Center" maxWidth="560px">
      {/* Category selector pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {[
          { id: 'task', label: 'Task', icon: CalendarCheck },
          { id: 'habit', label: 'Habit', icon: CheckCircle2 },
          { id: 'finance', label: 'Money (₹)', icon: IndianRupee },
          { id: 'sleep', label: 'Sleep', icon: Moon }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                fontWeight: 600,
                background: isActive ? 'var(--grad-royal)' : 'var(--bg-secondary)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task Form */}
      {activeTab === 'task' && (
        <form onSubmit={handleTaskSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              placeholder="e.g. Complete AI Assignment"
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent 🔥</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" value={taskTime} onChange={e => setTaskTime(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Education, Fitness, Personal, Work..."
              value={taskCategory}
              onChange={e => setTaskCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Add Task
          </button>
        </form>
      )}

      {/* Habit Form */}
      {activeTab === 'habit' && (
        <form onSubmit={handleHabitSubmit}>
          <div className="form-group">
            <label>Habit Name</label>
            <input
              type="text"
              placeholder="e.g. Morning 20 min Jogging"
              value={habitName}
              onChange={e => setHabitName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={habitCategory} onChange={e => setHabitCategory(e.target.value)}>
              <option value="Fitness">Fitness & Health</option>
              <option value="Education">Education & Study</option>
              <option value="Mindfulness">Mindfulness & Peace</option>
              <option value="Discipline">Personal Discipline</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Create Habit
          </button>
        </form>
      )}

      {/* Finance Form */}
      {activeTab === 'finance' && (
        <form onSubmit={handleTxSubmit}>
          <div className="form-group">
            <label>Transaction Title</label>
            <input
              type="text"
              placeholder="e.g. Grocery store purchase"
              value={txTitle}
              onChange={e => setTxTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amount ({userProfile?.currency || '₹'})</label>
              <input
                type="number"
                placeholder="250"
                value={txAmount}
                onChange={e => setTxAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={txType} onChange={e => setTxType(e.target.value)}>
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
                <option value="saving">Saving</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={txCategory} onChange={e => setTxCategory(e.target.value)}>
              <option value="Food">Food & Dining</option>
              <option value="Travel">Travel & Commute</option>
              <option value="Education">Education & Books</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills & Utilities</option>
              <option value="Work">Freelance / Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Record Transaction
          </button>
        </form>
      )}

      {/* Sleep Form */}
      {activeTab === 'sleep' && (
        <form onSubmit={handleSleepSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Bedtime (From)</label>
              <input type="time" value={sleepFrom} onChange={e => setSleepFrom(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Wake-up (To)</label>
              <input type="time" value={sleepTo} onChange={e => setSleepTo(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Record Sleep & Add to Today's Total
          </button>
        </form>
      )}
    </Modal>
  );
}
