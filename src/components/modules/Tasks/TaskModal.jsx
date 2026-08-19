import React, { useState } from 'react';
import Modal from '../../common/Modal';

export default function TaskModal({ isOpen, onClose, onSave, editingTask = null, defaultDate = null }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [priority, setPriority] = useState(editingTask?.priority || 'Medium');
  const [date, setDate] = useState(editingTask?.date || defaultDate || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(editingTask?.time || '10:00 AM');
  const [category, setCategory] = useState(editingTask?.category || 'Study');
  const [notes, setNotes] = useState(editingTask?.notes || '');
  const [recurring, setRecurring] = useState(editingTask?.recurring || 'None');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...(editingTask || {}),
      title,
      priority,
      date,
      time,
      category,
      notes,
      recurring
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTask ? "Edit Task" : "Create New Task"}
      maxWidth="520px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="e.g. Complete AI Assignment"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High ⚡</option>
              <option value="Urgent">Urgent 🔥</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Study">Study & AI</option>
              <option value="Education">Education & College</option>
              <option value="Work">Work & Projects</option>
              <option value="Fitness">Fitness & Health</option>
              <option value="Finance">Finance & Budget</option>
              <option value="Personal">Personal & Reading</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Time / Schedule</label>
            <input type="text" placeholder="10:00 AM" value={time} onChange={e => setTime(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>Recurring Frequency</label>
          <select value={recurring} onChange={e => setRecurring(e.target.value)}>
            <option value="None">Does not repeat</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes / Checklist (Optional)</label>
          <textarea
            rows={3}
            placeholder="Additional requirements, links, or sub-points..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          {editingTask ? "Save Task Changes" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
}
