import React from 'react';
import { DollarSign, ShieldAlert, Clock, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function KpiBento({ metadata, onSelectCategory }) {
  const exposureTotal = (metadata.workforce * (metadata.annualTurnover / 100) * metadata.costPerExit);

  // Avatar initial helpers to mimic the Talento UI Kit avatar stacks
  const avatarColors = ['#FF6B6B', '#5B4DFB', '#20C997', '#FF922B', '#845EF7'];

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Top Strip: Talento Hero Balance Card on Left + 4 Category Boxes on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(0, 2fr)', gap: '1.25rem', alignItems: 'stretch' }}>
        
        {/* Talento Royal Hero Balance Card */}
        <div className="talento-balance-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                Annual Turnover Exposure
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                16.1% Rate
              </span>
            </div>
            
            <div style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', marginTop: '0.5rem', lineHeight: 1.1 }}>
              ${(exposureTotal / 1e6).toFixed(1)}M
            </div>

            <div style={{ fontSize: '0.82rem', opacity: 0.85, marginTop: '0.35rem' }}>
              ~{Math.round(metadata.workforce * (metadata.annualTurnover / 100)).toLocaleString()} expected exits if unmitigated
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => onSelectCategory && onSelectCategory('advisor')}
              className="btn btn-white btn-pill"
              style={{ fontSize: '0.82rem' }}
            >
              <ArrowUpRight size={15} />
              Open AI Advisor
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('triage')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              View Top 50
            </button>
          </div>
        </div>

        {/* Talento 4 Status Boxes (Inspired by Inspiration UI image) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          
          {/* Box 1: Critical Flight Risk (Red outline) */}
          <div
            className="talento-status-box red"
            onClick={() => onSelectCategory && onSelectCategory('advisor')}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#C92A2A', marginBottom: '4px' }}>
                Critical Flight Risk (12)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Resignation probability &gt; 90%
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div className="avatar-group">
                {['JW', 'MD', 'EJ', 'WB'].map((init, i) => (
                  <div key={i} className="avatar-circle" style={{ background: avatarColors[i] }}>
                    {init}
                  </div>
                ))}
              </div>
              <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>Immediate 48h</span>
            </div>
          </div>

          {/* Box 2: OverTime Burnout (Orange outline) */}
          <div
            className="talento-status-box orange"
            onClick={() => onSelectCategory && onSelectCategory('simulator')}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#D9480F', marginBottom: '4px' }}>
                OverTime Burnout (18)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Subject to 3.0x turnover multiplier
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div className="avatar-group">
                {['AL', 'RK', 'ST', 'BK'].map((init, i) => (
                  <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+1)%5] }}>
                    {init}
                  </div>
                ))}
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>Cap Hours</span>
            </div>
          </div>

          {/* Box 3: Compensation Deficit (Blue outline) */}
          <div
            className="talento-status-box blue"
            onClick={() => onSelectCategory && onSelectCategory('simulator')}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1864AB', marginBottom: '4px' }}>
                Compensation Deficit (14)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Salary in bottom quartile
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div className="avatar-group">
                {['CH', 'DW', 'FL', 'GN'].map((init, i) => (
                  <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+2)%5] }}>
                    {init}
                  </div>
                ))}
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Review Band</span>
            </div>
          </div>

          {/* Box 4: Retained / In Intervention (Green outline) */}
          <div
            className="talento-status-box green"
            onClick={() => onSelectCategory && onSelectCategory('triage')}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#099268', marginBottom: '4px' }}>
                Retained / Actioned (6)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Stay interviews completed
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div className="avatar-group">
                {['MK', 'NP', 'PQ'].map((init, i) => (
                  <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+3)%5] }}>
                    {init}
                  </div>
                ))}
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Resolved</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
