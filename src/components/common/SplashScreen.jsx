import React, { useState, useEffect } from 'react';
import { getGreetingAndQuote } from '../../data/motivationalQuotes';
import { Sparkles, Flame, ArrowRight, X } from 'lucide-react';

export default function SplashScreen({ isOpen, onClose, userName = 'Ajsal' }) {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const { quote } = getGreetingAndQuote();

  const AUTO_DISMISS_TIME = 5500; // 5.5 seconds

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsClosing(false);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / AUTO_DISMISS_TIME) * 100);
      setProgress(pct);

      if (elapsed >= AUTO_DISMISS_TIME) {
        handleDismiss();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 350);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 13, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '24px',
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36, 87, 255, 0.28) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 6s ease-in-out infinite alternate'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '15%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223, 247, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Glassmorphic Splash Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          background: 'linear-gradient(145deg, rgba(13, 23, 46, 0.92) 0%, rgba(9, 17, 36, 0.95) 100%)',
          border: '1px solid rgba(36, 87, 255, 0.35)',
          borderRadius: '28px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(36, 87, 255, 0.22)',
          padding: '36px 36px 30px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'splashPopIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Dismiss Button */}
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Skip to Dashboard"
        >
          <X size={18} />
        </button>

        {/* Brand Icon & Welcome Tag */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 28px rgba(36, 87, 255, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            marginBottom: '18px'
          }}
        >
          <img 
            src="/aura-logo.svg" 
            alt="AURA Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} 
          />
        </div>

        {/* Personalized Greeting */}
        <div style={{ marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--primary-ice)',
              background: 'rgba(36, 87, 255, 0.2)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-block',
              marginBottom: '10px'
            }}
          >
            AURA Life OS • Daily Spark
          </span>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            Hello, <span style={{ background: 'linear-gradient(135deg, #DFF7FF 0%, #5C95FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userName}</span> 👋
          </h1>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'rgba(223, 247, 255, 0.75)', margin: '0 0 24px' }}>
          Welcome back. Here is your daily motivation to inspire your day.
        </p>

        {/* Motivation Quote Card */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(36, 87, 255, 0.12) 0%, rgba(223, 247, 255, 0.05) 100%)',
            border: '1px solid rgba(223, 247, 255, 0.2)',
            borderRadius: '20px',
            padding: '24px 22px',
            marginBottom: '26px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(36, 87, 255, 0.3)',
                color: '#DFF7FF'
              }}
            >
              {quote?.category || 'Mindset & Growth'}
            </span>
          </div>

          <blockquote
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              lineHeight: 1.5,
              color: '#FFFFFF',
              margin: '0 0 12px',
              fontStyle: 'italic'
            }}
          >
            "{quote?.text}"
          </blockquote>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.86rem', color: 'rgba(223, 247, 255, 0.8)', fontWeight: 500 }}>
              — {quote?.author}
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#FBBF24', fontWeight: 600 }}>
              <Flame size={15} />
              <span>14-day streak</span>
            </div>
          </div>
        </div>

        {/* Enter App Button */}
        <button
          onClick={handleDismiss}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '1.02rem',
            borderRadius: '14px',
            background: 'var(--grad-royal)',
            boxShadow: '0 8px 24px rgba(36, 87, 255, 0.45)',
            gap: '8px',
            color: '#FFFFFF',
            fontWeight: 700
          }}
        >
          <span>Enter AURA Dashboard</span>
          <ArrowRight size={18} />
        </button>

        {/* Auto Dismiss Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            marginTop: '20px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2457FF, #DFF7FF)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.05s linear'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '6px', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
          <span>Auto-opening dashboard</span>
          <span>Click anywhere to start</span>
        </div>
      </div>

      <style>{`
        @keyframes splashPopIn {
          from { transform: scale(0.92) translateY(12px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          from { transform: scale(1); opacity: 0.7; }
          to { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
