import React from 'react';
import { useApp } from '../../../context/AppContext';
import { PrayerQuickTracker, QuranQuickTracker } from './PrayerQuickTracker';
import { UpcomingTasksCard, FinanceQuickCard } from './UpcomingTasksCard';
import { SleepQuickCard } from './SleepQuickCard';

export default function DashboardView({ onOpenQuickAction }) {
  const { setActivePage } = useApp();

  return (
    <div className="page-content">
      {/* 1. Swalah Prayers Tracker */}
      <div style={{ marginBottom: '24px' }}>
        <PrayerQuickTracker />
      </div>

      {/* 2. Daily Qur'an Reading & Sleep Recovery */}
      <div className="grid-dashboard-row">
        <QuranQuickTracker />
        <SleepQuickCard />
      </div>

      {/* 3. Upcoming Priority Tasks & Money Savings */}
      <div className="grid-dashboard-row" style={{ marginBottom: '24px' }}>
        <UpcomingTasksCard />
        <FinanceQuickCard />
      </div>
    </div>
  );
}
