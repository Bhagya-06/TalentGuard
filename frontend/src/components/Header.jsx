import React from 'react';
import { Shield, Sparkles, Activity, Layers, Sliders, Bot, BarChart3, CheckCircle2 } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, handledCount }) {
  const tabs = [
    { id: 'triage', label: 'Priority Roster (Top 50)', icon: Layers },
    { id: 'simulator', label: 'What-If Studio', icon: Sliders },
    { id: 'agent', label: 'Autonomous Action Drafter', icon: Bot },
    { id: 'analytics', label: 'Macro Analytics', icon: BarChart3 },
    { id: 'governance', label: 'ML Governance Audit', icon: CheckCircle2 },
  ];

  return (
    <header style={{ marginBottom: '1.75rem' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.75rem',
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        marginBottom: '1.25rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.5)'
          }}>
            <Shield size={24} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #FFFFFF 40%, #94A3B8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                TalentGuard™
              </h1>
              <span style={{
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#818CF8',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                ENTERPRISE AI
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
              Autonomous Flight-Risk Detection & Retention Protocol | TechNova Solutions
            </p>
          </div>
        </div>

        {/* Telemetry Status Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            color: '#34D399',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)'
          }}>
            <span className="dot-pulse"></span>
            HRIS LIVE • 12,000 NODES MONITORED
          </div>

          <div style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#CBD5E1'
          }}>
            Triage: <strong style={{ color: '#38BDF8' }}>{handledCount}/50</strong> Handled
          </div>
        </div>
      </div>

      {/* Modern Navigation Bar */}
      <nav style={{
        display: 'flex',
        gap: '0.5rem',
        background: 'rgba(13, 18, 29, 0.5)',
        padding: '0.4rem',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflowX: 'auto'
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%)' : 'transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(99, 102, 241, 0.4), 0 4px 12px rgba(99, 102, 241, 0.15)' : 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} color={isActive ? '#818CF8' : '#64748B'} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
