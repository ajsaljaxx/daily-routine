import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Modal from '../../common/Modal';
import {
  BookOpen,
  Plus,
  Flame,
  CheckCircle2,
  Trash2,
  Edit2,
  TrendingUp,
  Bookmark,
  Sparkles,
  Award
} from 'lucide-react';

export default function ReadingView() {
  const { books, addBook, updateBookProgress, deleteBook, userProfile } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Reading', 'Want to Read', 'Completed'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Add book form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('320');
  const [category, setCategory] = useState('Personal Growth');
  const [status, setStatus] = useState('Reading');
  const [color, setColor] = useState('#2457FF');

  // Log session form
  const [sessionPages, setSessionPages] = useState('20');
  const [sessionNotes, setSessionNotes] = useState('');

  const targetDailyPages = userProfile?.dailyReadingTarget || 25;
  const completedBooksCount = books.filter(b => b.status === 'Completed').length;
  const readingBooks = books.filter(b => b.status === 'Reading');
  const activeBook = readingBooks[0] || books[0];

  const filteredBooks = books.filter(b => {
    if (activeTab === 'All') return true;
    return b.status === activeTab;
  });

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addBook({
      title,
      author,
      totalPages: Number(totalPages),
      currentPage: status === 'Completed' ? Number(totalPages) : 0,
      category,
      status,
      color
    });

    setTitle('');
    setAuthor('');
    setIsAddModalOpen(false);
  };

  const handleLogSession = (e) => {
    e.preventDefault();
    if (!selectedBook) return;
    const newPage = (selectedBook.currentPage || 0) + Number(sessionPages);
    updateBookProgress(selectedBook.id, newPage);
    setIsLogModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Header & Primary Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Reading Hub & Intellectual Growth
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Expand your mental models, depth of knowledge, and daily reading streak.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)} style={{ gap: '8px' }}>
          <Plus size={18} />
          <span>Add Book</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
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
            <BookOpen size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Daily Reading Goal</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              18 / {targetDailyPages} Pages
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary-royal)', fontWeight: 600 }}>
              72% Completed Today
            </span>
          </div>
        </div>

        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 163, 64, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4A340'
          }}>
            <Flame size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Reading Streak</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              14 Days 🔥
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Consistent daily habit
            </span>
          </div>
        </div>

        <div className="aura-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--success-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)'
          }}>
            <Award size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Books Completed</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {completedBooksCount} Books
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>
              This Year
            </span>
          </div>
        </div>
      </div>

      {/* Featured Current Book Hero Banner */}
      {activeBook && (
        <div className="aura-card" style={{
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-secondary) 100%)',
          marginBottom: '24px',
          padding: '24px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Book Spine Simulation */}
            <div style={{
              width: '90px',
              height: '125px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${activeBook.color || '#2457FF'}, #071536)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '12px 10px',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.8 }}>Book</span>
              <strong style={{ fontSize: '0.8rem', lineHeight: 1.2 }}>{activeBook.title}</strong>
              <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>{activeBook.author}</span>
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary-deep)',
                  textTransform: 'uppercase'
                }}>
                  Currently Reading
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {activeBook.category}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {activeBook.title}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 12px' }}>
                by {activeBook.author}
              </p>

              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    Page {activeBook.currentPage} of {activeBook.totalPages}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-royal)' }}>
                    {Math.round((activeBook.currentPage / activeBook.totalPages) * 100)}%
                  </span>
                </div>
                <div className="progress-track" style={{ height: '8px' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(activeBook.currentPage / activeBook.totalPages) * 100}%`,
                      background: 'var(--grad-royal)'
                    }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                💡 Read {Math.max(0, targetDailyPages - 18)} more pages today to complete your daily {targetDailyPages}-page target.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedBook(activeBook);
                setIsLogModalOpen(true);
              }}
              style={{ gap: '6px' }}
            >
              <Bookmark size={16} />
              <span>Log Reading Session</span>
            </button>
          </div>
        </div>
      )}

      {/* Book Shelf Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '12px',
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        {['All', 'Reading', 'Want to Read', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: activeTab === tab ? 700 : 500,
              backgroundColor: activeTab === tab ? 'var(--primary-royal)' : 'transparent',
              color: activeTab === tab ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab} ({tab === 'All' ? books.length : books.filter(b => b.status === tab).length})
          </button>
        ))}
      </div>

      {/* Books Shelf Grid */}
      <div className="grid-3-col">
        {filteredBooks.map(book => {
          const progressPercent = Math.min(100, Math.round((book.currentPage / book.totalPages) * 100));

          return (
            <div
              key={book.id}
              className="aura-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                  {/* Spine */}
                  <div style={{
                    width: '54px',
                    height: '76px',
                    borderRadius: '6px',
                    background: `linear-gradient(135deg, ${book.color || '#2457FF'}, #071536)`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '4px',
                    flexShrink: 0
                  }}>
                    {book.title.slice(0, 14)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      background: book.status === 'Completed' ? 'var(--success-bg)' : 'var(--bg-secondary)',
                      color: book.status === 'Completed' ? 'var(--success)' : 'var(--text-secondary)'
                    }}>
                      {book.status}
                    </span>

                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '4px 0 2px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {book.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {book.author}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {book.currentPage} / {book.totalPages} pages
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-royal)' }}>
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${progressPercent}%`, background: book.color || 'var(--grad-royal)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedBook(book);
                    setIsLogModalOpen(true);
                  }}
                  style={{ flex: 1 }}
                >
                  Update Page
                </button>

                <button
                  onClick={() => deleteBook(book.id)}
                  className="btn-icon btn-ghost"
                  style={{ width: '30px', height: '30px', color: 'var(--danger)' }}
                  title="Remove book"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Book Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Book to Library" maxWidth="480px">
        <form onSubmit={handleSaveBook}>
          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              placeholder="e.g. Deep Work"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              placeholder="e.g. Cal Newport"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Pages</label>
              <input
                type="number"
                value={totalPages}
                onChange={e => setTotalPages(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Initial Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Reading">Currently Reading</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Personal Growth, Productivity, Finance, Technology..."
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Add Book
          </button>
        </form>
      </Modal>

      {/* Log Reading Session Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title={`Log Reading for ${selectedBook?.title}`} maxWidth="420px">
        <form onSubmit={handleLogSession}>
          <div className="form-group">
            <label>Pages Read Today</label>
            <input
              type="number"
              value={sessionPages}
              onChange={e => setSessionPages(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Record Progress
          </button>
        </form>
      </Modal>
    </div>
  );
}
