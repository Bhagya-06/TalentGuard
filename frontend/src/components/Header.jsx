import React from 'react';
import { Layers, Sliders, Bot, BarChart3, CheckCircle2, Lightbulb, BriefcaseBusiness, LogOut } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, handledCount, onLogout, userEmail, appName = 'IBM HR Retention Monitor' }) {
  const tabs = [
    { id: 'advisor', label: 'Why this person matters', icon: Lightbulb },
    { id: 'triage', label: 'People list', icon: Layers },
    { id: 'simulator', label: 'What-if check', icon: Sliders },
    { id: 'agent', label: 'Action note', icon: Bot },
    { id: 'analytics', label: 'Insights', icon: BarChart3 },
    { id: 'governance', label: 'Audit', icon: CheckCircle2 },
  ];

  return (
    <aside style={{
      background: '#f8f6f2',
      border: '1px solid rgba(93, 108, 131, 0.12)',
      borderRadius: '22px',
      boxShadow: '0 18px 40px rgba(93, 108, 131, 0.08)',
      padding: '1.1rem 0.85rem',
      minHeight: 'calc(100vh - 2rem)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0.5rem 1rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #5b6ee1 0%, #7a9cff 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 22px rgba(91, 110, 225, 0.25)'
        }}>
          <BriefcaseBusiness size={20} />
        </div>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1f2d3d', lineHeight: 1.2 }}>
            {appName}
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: '#6a7a8f', textTransform: 'uppercase', marginTop: '2px' }}>
            Workforce risk
          </div>
        </div>
      </div>

      <div style={{
        padding: '0.5rem 0.5rem 0.9rem',
        borderBottom: '1px solid rgba(93, 108, 131, 0.1)',
        marginBottom: '0.75rem'
      }}>
        <div style={{
          padding: '0.45rem 0.7rem',
          borderRadius: '10px',
          background: 'rgba(43, 143, 110, 0.10)',
          border: '1px solid rgba(29, 115, 89, 0.18)',
          color: '#1d7359',
          fontSize: '0.72rem',
          fontWeight: 700,
          textAlign: 'center'
        }}>
          {handledCount}/50 reviewed
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
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
                gap: '0.6rem',
                padding: '0.8rem 0.8rem',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: isActive ? 'rgba(91, 110, 225, 0.15)' : 'transparent',
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#1f2d3d' : '#6a7a8f',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                boxShadow: isActive ? '0 10px 20px rgba(91, 110, 225, 0.08)' : 'none'
              }}
            >
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: isActive ? 'rgba(91,110,225,0.08)' : 'rgba(93,108,131,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={15} color={isActive ? '#4169e1' : '#7e8ea8'} />
              </span>
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: '1rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(93, 108, 131, 0.1)' }}>
        <div style={{ fontSize: '0.7rem', color: '#6a7a8f', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.55rem' }}>
          Signed in as
        </div>
        <div style={{ fontSize: '0.8rem', color: '#1f2d3d', fontWeight: 700, marginBottom: '0.8rem' }}>
          {userEmail}
        </div>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.75rem 0.8rem',
            borderRadius: '10px',
            border: '1px solid rgba(93,108,131,0.12)',
            background: '#ffffff',
            color: '#36455d',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
