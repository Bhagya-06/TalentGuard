import React from 'react';
import { BarChart2, Flame, Award, Briefcase } from 'lucide-react';

export default function AnalyticsView({ analytics }) {
  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
          📊 Macro Workforce Health & Turnover Analytics
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
          Diagnostic view uncovering enterprise flight vectors, workload burnout hotspots, and role-specific turnover risk across TechNova.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Overtime Hotspot */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Flame size={18} color="#F43F5E" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Finding 1: OverTime is a 3.0x Flight Multiplier
            </h3>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Staff working regular OverTime resign at <strong style={{ color: '#FB7185' }}>30.5%</strong> compared to just <strong style={{ color: '#34D399' }}>10.4%</strong> for standard-hour staff.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.overtime.map((ot, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{ot.status}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: ot.color }}>
                    {ot.attritionRate}% Turnover
                  </span>
                </div>
                <div className="progress-track" style={{ height: '8px' }}>
                  <div className="progress-fill" style={{ width: `${ot.attritionRate * 2.5}%`, background: ot.color }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                  Cohort Headcount: {ot.count.toLocaleString()} employees
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Vulnerability */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Briefcase size={18} color="#818CF8" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Finding 2: Turnover Risk by Job Family
            </h3>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1rem' }}>
            Frontline Sales Representatives experience near-40% annual turnover, driven by heavy target quotas and market poaching.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '300px', overflowY: 'auto' }}>
            {analytics.roles.map((r, i) => {
              const barColor = r.rate >= 30 ? '#F43F5E' : r.rate >= 15 ? '#F59E0B' : '#34D399';
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                    <span style={{ color: '#CBD5E1' }}>{r.role}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: barColor }}>
                      {r.rate}%
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${r.rate * 2.3}%`, background: barColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
