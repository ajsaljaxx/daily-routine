import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare, CheckCircle, Sparkles } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone / installed mode
    const isAppStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(isAppStandalone);
    if (isAppStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isAppleDevice);

    // Check if user dismissed prompt recently
    const dismissedAt = localStorage.getItem('aura_pwa_dismissed');
    const isDismissedRecently = dismissedAt && (Date.now() - Number(dismissedAt) < 1000 * 60 * 60 * 24 * 3); // 3 days

    // Native Chrome / Android install prompt handler
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isDismissedRecently) {
        setTimeout(() => setShowPrompt(true), 1200);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // If on iOS and not dismissed recently, show the install prompt
    if (isAppleDevice && !isDismissedRecently && !isAppStandalone) {
      setTimeout(() => setShowPrompt(true), 1500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('aura_pwa_dismissed', String(Date.now()));
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <>
      {/* Sleek Bottom Floating Install Banner */}
      <div
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid rgba(178, 213, 229, 0.3)',
          borderRadius: '20px',
          padding: '14px 16px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(178, 213, 229, 0.15)',
          zIndex: 990,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideUpPrompt 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* App Logo Icon */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #020202 0%, #141c24 100%)',
            border: '1px solid rgba(178, 213, 229, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={20} color="var(--primary-royal)" />
        </div>

        {/* Text Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Install AURA App
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '1px 5px',
              borderRadius: '4px',
              backgroundColor: 'rgba(178, 213, 229, 0.15)',
              color: 'var(--primary-royal)'
            }}>
              FAST SHORTCUT
            </span>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '2px 0 0', lineHeight: 1.3 }}>
            Add to home screen for fullscreen offline experience!
          </p>
        </div>

        {/* Install Button */}
        <button
          onClick={handleInstallClick}
          style={{
            backgroundColor: 'var(--primary-royal)',
            color: '#020202',
            fontWeight: 800,
            fontSize: '0.78rem',
            padding: '8px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(178, 213, 229, 0.3)',
            cursor: 'pointer'
          }}
        >
          <Download size={14} />
          <span>Install</span>
        </button>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          style={{
            padding: '4px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0
          }}
          aria-label="Dismiss install prompt"
        >
          <X size={16} />
        </button>
      </div>

      {/* iOS Safari Step-by-step Guide Modal */}
      {showIosGuide && (
        <div
          className="modal-backdrop"
          onClick={() => setShowIosGuide(false)}
          style={{ zIndex: 1200 }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: '24px',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-xl)',
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} color="var(--primary-royal)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Add to iPhone Home Screen
                </h3>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="btn-icon btn-ghost"
                style={{ width: '28px', height: '28px' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-royal)' }}>
                  <Share size={18} />
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                  <strong>1. Tap the Share button</strong> in Safari's bottom toolbar
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-royal)' }}>
                  <PlusSquare size={18} />
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                  <strong>2. Scroll down</strong> and select <strong>"Add to Home Screen"</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                  <CheckCircle size={18} />
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                  <strong>3. Tap "Add"</strong> in top right. All done!
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpPrompt {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}
