import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Zap,
  Calendar,
  Wallet,
  Moon,
  BookOpen,
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function MobileNav() {
  const { activePage, setActivePage } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: Zap },
    { id: 'tasks', label: 'Tasks', icon: Calendar },
    { id: 'finance', label: 'Finance', icon: Wallet }
  ];

  const moreItems = [
    { id: 'sleep', label: 'Sleep Tracker', icon: Moon, desc: 'Monthly recovery & logs' },
    { id: 'reading', label: 'Reading Hub', icon: BookOpen, desc: 'Books, shelves & streaks' },
    { id: 'settings', label: 'Settings & Profile', icon: Settings, desc: 'Preferences & targets' }
  ];

  const handleSelectMore = (id) => {
    setActivePage(id);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* Bottom Sticky Navigation Bar */}
      <nav style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--mobile-nav-height)',
        backgroundColor: 'var(--bg-surface-translucent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        zIndex: 150,
        padding: '0 8px',
        alignItems: 'center',
        justifyContent: 'space-around'
      }} className="mobile-only-nav">
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                flex: 1,
                height: '100%',
                color: isActive ? 'var(--primary-royal)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span style={{ fontSize: '0.72rem' }}>{tab.label}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setShowMoreMenu(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            flex: 1,
            height: '100%',
            color: showMoreMenu || !mainTabs.some(t => t.id === activePage) ? 'var(--primary-royal)' : 'var(--text-muted)'
          }}
        >
          <Menu size={20} />
          <span style={{ fontSize: '0.72rem' }}>More</span>
        </button>
      </nav>

      {/* More Modal / Bottom Sheet */}
      {showMoreMenu && (
        <div
          className="modal-backdrop"
          onClick={() => setShowMoreMenu(false)}
          style={{ alignItems: 'flex-end', padding: 0 }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderTopLeftRadius: 'var(--radius-lg)',
              borderTopRightRadius: 'var(--radius-lg)',
              padding: '24px 20px calc(var(--mobile-nav-height) + 16px)',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              animation: 'modalSlideUp 0.25s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                All Sections & Features
              </h3>
              <button
                className="btn-icon btn-ghost"
                onClick={() => setShowMoreMenu(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {moreItems.map(item => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMore(item.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isActive ? 'var(--primary-soft)' : 'var(--bg-secondary)',
                      border: `1px solid ${isActive ? 'var(--primary-royal)' : 'var(--border-light)'}`,
                      textAlign: 'left',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--grad-royal)' : 'var(--bg-surface)',
                      color: isActive ? '#FFFFFF' : 'var(--primary-royal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Media query styling helper */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-only-nav {
            display: flex !important;
          }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
