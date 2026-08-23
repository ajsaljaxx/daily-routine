import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import QuickActionModal from './components/layout/QuickActionModal';
import ToastContainer from './components/common/ToastContainer';
import PwaInstallPrompt from './components/common/PwaInstallPrompt';
import FloatingAiChatbot from './components/common/FloatingAiChatbot';

// Active Module Views
import DashboardView from './components/modules/Dashboard/DashboardView';
import HabitsView from './components/modules/Habits/HabitsView';
import TasksView from './components/modules/Tasks/TasksView';
import SleepView from './components/modules/Sleep/SleepView';
import FinanceView from './components/modules/Finance/FinanceView';
import ReadingView from './components/modules/Reading/ReadingView';
import SettingsView from './components/modules/Settings/SettingsView';

export default function App() {
  const { activePage } = useApp();
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <DashboardView
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
          />
        );
      case 'habits':
        return <HabitsView />;
      case 'tasks':
        return <TasksView />;
      case 'sleep':
        return <SleepView />;
      case 'finance':
        return <FinanceView />;
      case 'reading':
        return <ReadingView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Header onOpenQuickAction={() => setIsQuickActionOpen(true)} />
        <main style={{ flex: 1 }}>
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav />

      {/* Global Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
      />

      {/* PWA Install App Shortcut Prompt */}
      <PwaInstallPrompt />

      {/* Floating AI Chatbot Widget */}
      <FloatingAiChatbot />

      {/* Global Toast Notification System */}
      <ToastContainer />
    </div>
  );
}
