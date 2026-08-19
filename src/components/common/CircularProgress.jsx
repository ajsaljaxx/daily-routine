import React from 'react';

export default function CircularProgress({
  percentage = 0,
  size = 120,
  strokeWidth = 10,
  color = '#2457FF',
  trackColor = 'var(--bg-secondary)',
  label = '',
  sublabel = '',
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      {/* Center content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        {children ? (
          children
        ) : (
          <>
            <span style={{ fontSize: `${size * 0.22}px`, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {clampedPercentage}%
            </span>
            {sublabel && (
              <span style={{ fontSize: `${size * 0.1}px`, color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                {sublabel}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
