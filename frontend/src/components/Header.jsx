import React from 'react';
import { Sparkles, Layers, Sliders, Bot, BarChart3, CheckCircle2, Lightbulb, Bell } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, handledCount }) {
  const tabs = [
    { id: 'advisor', label: '💡 HR Retention Advisor (Why & What to Do)', isFeatured: true },
    { id: 'triage', label: '🎯 Priority Queue (Top 50)', isFeatured: false },
    { id: 'simulator', label: '👤 What-If Studio', isFeatured: false },
    { id: 'agent', label: '🤖 Autonomous Action Drafter', isFeatured: false },
    { id: 'analytics', label: '📊 Macro Analytics', isFeatured: false },
    { id: 'governance', label: '⚙️ ML Governance Audit', isFeatured: false },
  ];

  return (
    <header style={{ marginBottom: '1.75rem' }}>
      {/* Top Talento Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.75rem',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #F1F5F9',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
        marginBottom: '1.25rem'
      }}>
        {/* Talento Flower Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #5B4DFB 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px -2px rgba(91, 77, 251, 0.35)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Talento
              </h1>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                HR Retention AI
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
              TechNova People Operations & Retention Intelligence
            </p>
          </div>
        </div>

        {/* Right Status Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            background: '#E6FCF5',
            border: '1px solid #96F2D7',
            color: '#099268',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#20C997',
              boxShadow: '0 0 8px #20C997'
            }} />
            HRIS Telemetry Connected (12k Staff)
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '12px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#334155'
          }}>
            Triage Progress: <strong style={{ color: '#5B4DFB' }}>{handledCount}/50</strong>
          </div>

          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer'
          }}>
            <Bell size={18} />
          </div>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <nav style={{
        display: 'flex',
        gap: '0.5rem',
        background: '#FFFFFF',
        padding: '0.4rem',
        borderRadius: '16px',
        border: '1.5px solid #F1F5F9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        overflowX: 'auto'
      }}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive 
                  ? 'linear-gradient(135deg, #5B4DFB 0%, #7C3AED 100%)' 
                  : (tab.isFeatured ? '#F8F7FF' : 'transparent'),
                color: isActive ? '#FFFFFF' : (tab.isFeatured ? '#5B4DFB' : '#64748B'),
                fontWeight: isActive ? 700 : (tab.isFeatured ? 700 : 600),
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 14px rgba(91, 77, 251, 0.3)' : 'none'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
