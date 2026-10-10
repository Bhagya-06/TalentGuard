import React, { useState } from 'react';
import Header from './components/Header';
import KpiBento from './components/KpiBento';
import TriageQueue from './components/TriageQueue';
import WhatIfStudio from './components/WhatIfStudio';
import ActionEngine from './components/ActionEngine';
import AnalyticsView from './components/AnalyticsView';
import GovernanceView from './components/GovernanceView';
import retentionData from './data/retentionData.json';

export default function App() {
  const [currentTab, setCurrentTab] = useState('triage');
  const [workflowStatus, setWorkflowStatus] = useState({});

  const handledCount = Object.keys(workflowStatus).length;

  return (
    <div className="app-container">
      {/* Top Header & Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        handledCount={handledCount}
      />

      {/* Bento Metric Cards */}
      <KpiBento metadata={retentionData.metadata} />

      {/* Active Module View */}
      <main>
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
  );
}
