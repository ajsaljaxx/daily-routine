import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = Info;
        let iconColor = 'var(--primary-royal)';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'var(--success)';
        } else if (toast.type === 'warning' || toast.type === 'danger') {
          Icon = AlertCircle;
          iconColor = 'var(--warning)';
        } else if (toast.type === 'celebration') {
          Icon = Sparkles;
          iconColor = 'var(--primary-royal)';
        }

        return (
          <div key={toast.id} className="toast">
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
