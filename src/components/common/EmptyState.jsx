import React from 'react';

export function Badge({ variant = 'purple', children, style = {} }) {
  let className = 'badge badge-purple';
  if (variant === 'success') className = 'badge badge-success';
  if (variant === 'warning') className = 'badge badge-warning';
  if (variant === 'danger') className = 'badge badge-danger';
  if (variant === 'info') className = 'badge badge-info';

  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      border: '1px dashed var(--border-medium)'
    }}>
      {Icon && (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary-royal)',
          marginBottom: '16px'
        }}>
          <Icon size={26} />
        </div>
      )}
      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <p style={{ maxWidth: '380px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: actionLabel ? '20px' : '0' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {ActionIcon && <ActionIcon size={16} />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
