import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Zap,
  Calendar,
  Moon,
  Wallet,
  BookOpen,
  Settings,
  Flame,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const { activePage, setActivePage, userProfile, habits, tasks, finance } = useApp();

  const pendingTasksCount = tasks.filter(t => !t.completed).length;
  const activeHabitsCount = habits.filter(h => !h.completedToday).length;
  const currency = userProfile?.currency || '₹';
  const balanceStr = `${currency}${(finance?.currentBalance ?? 0).toLocaleString('en-IN')}`;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Daily Habits', icon: Zap, badge: activeHabitsCount > 0 ? activeHabitsCount : null },
    { id: 'tasks', label: 'Tasks & Calendar', icon: Calendar, badge: pendingTasksCount > 0 ? pendingTasksCount : null },
    { id: 'sleep', label: 'Sleep Tracker', icon: Moon },
    { id: 'finance', label: 'Finance & Goals', icon: Wallet, extraBadge: balanceStr },
    { id: 'reading', label: 'Reading Hub', icon: BookOpen }
  ];

  return (
    <aside className="sidebar-aside" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: 'var(--sidebar-width)',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      transition: 'all var(--transition-normal)',
      overflowY: 'auto'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(2, 0, 13, 0.08)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          flexShrink: 0
        }}>
          <img 
            src="/aura-logo.svg" 
            alt="AURA Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} 
          />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              AURA
            </span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-soft)',
              color: 'var(--primary-deep)',
              textTransform: 'uppercase'
            }}>
              Life OS
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
            Personal Intelligence
          </p>
        </div>
      </div>

      {/* Main Navigation Menu (Minimal Pill Style) */}
      <nav style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                background: isActive
                  ? 'var(--grad-royal)'
                  : item.highlight
                  ? 'var(--primary-soft)'
                  : 'var(--bg-surface)',
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : item.highlight ? 'rgba(36, 87, 255, 0.25)' : 'var(--border-light)'}`,
                boxShadow: isActive
                  ? '0 6px 16px rgba(36, 87, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                  : '0 2px 5px rgba(13, 23, 42, 0.04)',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(-1.5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(36, 87, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 5px rgba(13, 23, 42, 0.04)';
                  e.currentTarget.style.borderColor = item.highlight ? 'rgba(36, 87, 255, 0.25)' : 'var(--border-light)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon
                  size={18}
                  style={{
                    color: isActive ? '#FFFFFF' : item.highlight ? 'var(--primary-royal)' : 'var(--text-secondary)',
                    flexShrink: 0
                  }}
                />
                <span style={{ letterSpacing: '-0.01em' }}>{item.label}</span>
              </div>

              {item.extraBadge && !isActive ? (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-light)'
                }}>
                  {item.extraBadge}
                </span>
              ) : item.badge ? (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(255,255,255,0.28)' : 'var(--primary-soft)',
                  color: isActive ? '#FFFFFF' : 'var(--primary-deep)',
                  border: isActive ? '1px solid rgba(255,255,255,0.3)' : 'none'
                }}>
                  {item.badge}
                </span>
              ) : item.highlight && !isActive ? (
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--primary-royal)' }} />
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Settings & User Profile Card */}
      <div style={{
        padding: '14px 14px 20px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={() => setActivePage('settings')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: activePage === 'settings' ? 700 : 500,
            color: activePage === 'settings' ? '#FFFFFF' : 'var(--text-primary)',
            background: activePage === 'settings' ? 'var(--grad-royal)' : 'var(--bg-surface)',
            border: `1px solid ${activePage === 'settings' ? 'rgba(255,255,255,0.2)' : 'var(--border-light)'}`,
            boxShadow: activePage === 'settings' ? '0 6px 16px rgba(36, 87, 255, 0.35)' : '0 2px 5px rgba(13, 23, 42, 0.04)',
            textAlign: 'left',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer'
          }}
        >
          <Settings size={18} style={{ color: activePage === 'settings' ? '#FFFFFF' : 'var(--text-secondary)' }} />
          <span>Settings</span>
        </button>

        {/* User Mini Profile with Streak & Balance */}
        <div
          onClick={() => setActivePage('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--grad-royal)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            {(userProfile?.name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userProfile?.name || 'Ajsal'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={12} color="#F4A340" />
                <span>14d</span>
              </span>
              <span>•</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {balanceStr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
