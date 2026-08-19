import React from 'react';
import { useApp } from '../../../context/AppContext';
import DashboardHero from './DashboardHero';
import TodayProgressRings from './TodayProgressRings';
import { PrayerQuickTracker, QuranQuickTracker } from './PrayerQuickTracker';
import { UpcomingTasksCard, FinanceQuickCard } from './UpcomingTasksCard';
import { SleepQuickCard } from './SleepQuickCard';

export default function DashboardView({ onOpenQuickAction }) {
  const { setActivePage } = useApp();

  return (
    <div className="page-content">
      {/* 1. TOP: Dynamic Dashboard Hero Section */}
      <div style={{ marginBottom: '20px' }}>
        <DashboardHero
          onOpenReading={() => setActivePage('reading')}
          onQuickLog={onOpenQuickAction}
        />
      </div>

      {/* 2. SECOND ROW: Today's Progress Dial & Swalah Prayer Tracker */}
      <div className="grid-dashboard-top">
        <TodayProgressRings />
        <PrayerQuickTracker />
      </div>

      {/* 3. THIRD ROW: Qur'an Tracker & Upcoming Priority Tasks */}
      <div className="grid-dashboard-row">
        <QuranQuickTracker />
        <UpcomingTasksCard />
      </div>

      {/* 4. FOURTH ROW: Finance Pulse & Sleep Duration */}
      <div className="grid-dashboard-row" style={{ marginBottom: '24px' }}>
        <FinanceQuickCard />
        <SleepQuickCard />
      </div>
    </div>
  );
}
