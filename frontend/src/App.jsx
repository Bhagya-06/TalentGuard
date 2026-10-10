import React, { useState } from 'react';
import Header from './components/Header';
import KpiBento from './components/KpiBento';
import RetentionAdvisor from './components/RetentionAdvisor';
import TriageQueue from './components/TriageQueue';
import WhatIfStudio from './components/WhatIfStudio';
import ActionEngine from './components/ActionEngine';
import AnalyticsView from './components/AnalyticsView';
import GovernanceView from './components/GovernanceView';
import AuthScreen from './components/AuthScreen';
import retentionData from './data/retentionData.json';
import { reviewService } from './services/reviewService';

const AUTH_STORAGE_KEY = 'workforce-retention-session';
const appName = import.meta.env.VITE_APP_NAME || 'TalentGuard';

function getStoredSession() {
  if (typeof window === 'undefined') return null;

  try {
    const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
}

function getAllowedCredentials() {
  const email = (import.meta.env.VITE_AUTH_EMAIL || 'test@company.com').trim().toLowerCase();
  const password = (import.meta.env.VITE_AUTH_PASSWORD || '123456').trim();

  return { email, password };
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('advisor');
  const [workflowStatus, setWorkflowStatusState] = useState(() => reviewService.getReviewState());
  const [session, setSession] = useState(getStoredSession());
  const [authError, setAuthError] = useState('');

  const setWorkflowStatus = (updater) => {
    setWorkflowStatusState((previousStatus) => {
      const nextStatus = typeof updater === 'function' ? updater(previousStatus) : updater;
      const normalizedStatus = Object.fromEntries(
        Object.entries(nextStatus).filter(([, status]) => status && status !== 'Waiting for follow-up')
      );
      reviewService.persistReviewState(normalizedStatus);
      return normalizedStatus;
    });
  };

  const handledCount = Object.keys(workflowStatus).length;

  const handleLogin = (email, password) => {
    const allowed = getAllowedCredentials();
    const normalizedEmail = email.trim().toLowerCase();

    if (!allowed.email || !allowed.password) {
      setAuthError('Set VITE_AUTH_EMAIL and VITE_AUTH_PASSWORD in your .env file before signing in.');
      return false;
    }

    if (normalizedEmail !== allowed.email || password !== allowed.password) {
      setAuthError('Incorrect email or password. Please try again.');
      return false;
    }

    const nextSession = {
      email: allowed.email,
      signedInAt: new Date().toISOString()
    };

    setSession(nextSession);
    setAuthError('');
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    return true;
  };

  const handleLogout = () => {
    setSession(null);
    setAuthError('');
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  if (!session) {
    return <AuthScreen onLogin={handleLogin} error={authError} appName={appName} />;
  }

  return (
    <div className="app-container" style={{ display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
      <aside style={{ position: 'sticky', top: '1rem' }}>
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          handledCount={handledCount}
          onLogout={handleLogout}
          userEmail={session.email}
          appName={appName}
        />
      </aside>

      <div style={{ minWidth: 0 }}>
        <KpiBento
          metadata={retentionData.metadata}
          watchlist={retentionData.top50Watchlist}
          handledCount={handledCount}
          onSelectCategory={(tab) => setCurrentTab(tab)}
        />

        <main>
          {currentTab === 'advisor' && (
            <RetentionAdvisor
              watchlist={retentionData.top50Watchlist}
              workflowStatus={workflowStatus}
              setWorkflowStatus={setWorkflowStatus}
            />
          )}

          {currentTab === 'triage' && (
            <TriageQueue
              watchlist={retentionData.top50Watchlist}
              workflowStatus={workflowStatus}
              setWorkflowStatus={setWorkflowStatus}
            />
          )}

          {currentTab === 'simulator' && (
            <WhatIfStudio />
          )}

          {currentTab === 'agent' && (
            <ActionEngine
              watchlist={retentionData.top50Watchlist}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              analytics={retentionData.analytics}
            />
          )}

          {currentTab === 'governance' && (
            <GovernanceView
              models={retentionData.models}
            />
          )}
        </main>
      </div>
    </div>
  );
}
