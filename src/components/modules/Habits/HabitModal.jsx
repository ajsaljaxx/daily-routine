import React, { useState } from 'react';
import Modal from '../../common/Modal';

export default function HabitModal({ isOpen, onClose, onSave, editingHabit = null }) {
  const [name, setName] = useState(editingHabit?.name || '');
  const [category, setCategory] = useState(editingHabit?.category || 'Fitness');
  const [frequency, setFrequency] = useState(editingHabit?.frequency || 'Daily');
  const [color, setColor] = useState(editingHabit?.color || '#2457FF');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...(editingHabit || {}),
      name,
      category,
      frequency,
      color
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingHabit ? "Edit Habit" : "Create New Habit"}
      maxWidth="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Habit Name</label>
          <input
            type="text"
            placeholder="e.g. 20 Mins Meditation & Focus"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Fitness">Fitness & Health</option>
              <option value="Mindfulness">Mindfulness & Peace</option>
              <option value="Education">Education & Study</option>
              <option value="Discipline">Personal Discipline</option>
              <option value="Health">Nutrition & Hydration</option>
              <option value="Reflection">Spiritual & Reflection</option>
            </select>
          </div>

          <div className="form-group">
            <label>Frequency</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)}>
              <option value="Daily">Every Day</option>
              <option value="Weekdays">Weekdays Only (Mon-Fri)</option>
              <option value="Weekends">Weekends Only</option>
              <option value="3x Weekly">3x per Week</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Color Accent</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['#2457FF', '#103FE0', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444'].map(c => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: c,
                  border: color === c ? '3px solid var(--text-primary)' : '2px solid transparent',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
          {editingHabit ? "Save Changes" : "Create Habit"}
        </button>
      </form>
    </Modal>
  );
}
