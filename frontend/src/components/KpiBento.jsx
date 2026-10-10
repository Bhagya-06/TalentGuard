import React from 'react';

export default function KpiBento({ metadata, watchlist = [], handledCount = 0, onSelectCategory }) {
  const exposureTotal = (metadata.workforce * (metadata.annualTurnover / 100) * metadata.costPerExit);
  const avatarColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  const highRiskCount = watchlist.filter((person) => person.risk_score_pct >= 75).length;
  const burnoutCount = watchlist.filter((person) => person.OverTime === 'Yes').length;
  const payGapCount = watchlist.filter((person) => person.MonthlyIncome < Math.round(watchlist.reduce((sum, item) => sum + item.MonthlyIncome, 0) / watchlist.length)).length;
  const actionCount = Math.min(handledCount, watchlist.length || handledCount || 0);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '24px',
        border: '1px solid rgba(93, 108, 131, 0.12)',
        padding: '1rem',
        boxShadow: '0 20px 50px rgba(93, 108, 131, 0.08)',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(0, 2fr)', gap: '1rem', alignItems: 'stretch' }}>
          <div className="talento-balance-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #eef4ff 0%, #f4f0ff 100%)',
            border: '1px solid rgba(93, 108, 131, 0.10)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#5f6f88', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Possible loss this year
                </span>
                <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>
                  16.1% rate
                </span>
              </div>

              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1f2d3d', marginTop: '0.4rem', lineHeight: 1.1 }}>
                ${(exposureTotal / 1e6).toFixed(1)}M
              </div>

              <div style={{ fontSize: '0.78rem', color: '#5f6f88', marginTop: '0.35rem' }}>
                ~{Math.round(metadata.workforce * (metadata.annualTurnover / 100)).toLocaleString()} expected exits per year
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button onClick={() => onSelectCategory && onSelectCategory('advisor')} className="btn btn-blue btn-pill">Open guide</button>
              <button onClick={() => onSelectCategory && onSelectCategory('triage')} className="btn btn-secondary btn-pill" style={{ background: 'rgba(91, 110, 225, 0.04)', color: '#1f2d3d', border: '1px solid rgba(93, 108, 131, 0.12)' }}>People list</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <div className="talento-status-box" onClick={() => onSelectCategory && onSelectCategory('advisor')} style={{ borderLeft: '4px solid #DC2626', background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(93,108,131,0.12)', color: '#1f2d3d' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2d3d' }}>High risk ({highRiskCount})</div>
                <div style={{ fontSize: '0.74rem', color: '#6a7a8f' }}>Likely to leave soon</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div className="avatar-group">
                  {['JW', 'MD', 'EJ', 'WB'].map((init, i) => (
                    <div key={i} className="avatar-circle" style={{ background: avatarColors[i] }}>{init}</div>
                  ))}
                </div>
                <span className="badge badge-red">48h Action</span>
              </div>
            </div>

            <div className="talento-status-box" onClick={() => onSelectCategory && onSelectCategory('simulator')} style={{ borderLeft: '4px solid #EA580C', background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(93,108,131,0.12)', color: '#1f2d3d' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2d3d' }}>Burnout risk ({burnoutCount})</div>
                <div style={{ fontSize: '0.74rem', color: '#6a7a8f' }}>Too much overtime</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div className="avatar-group">
                  {['AL', 'RK', 'ST', 'BK'].map((init, i) => (
                    <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+1)%5] }}>{init}</div>
                  ))}
                </div>
                <span className="badge badge-amber">Cap hours</span>
              </div>
            </div>

            <div className="talento-status-box" onClick={() => onSelectCategory && onSelectCategory('simulator')} style={{ borderLeft: '4px solid #2563EB', background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(93,108,131,0.12)', color: '#1f2d3d' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2d3d' }}>Pay gap ({payGapCount})</div>
                <div style={{ fontSize: '0.74rem', color: '#6a7a8f' }}>Below market pay</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div className="avatar-group">
                  {['CH', 'DW', 'FL', 'GN'].map((init, i) => (
                    <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+2)%5] }}>{init}</div>
                  ))}
                </div>
                <span className="badge badge-dark" style={{ background: 'rgba(93,108,131,0.06)', color: '#1f2d3d' }}>Review pay</span>
              </div>
            </div>

            <div className="talento-status-box" onClick={() => onSelectCategory && onSelectCategory('triage')} style={{ borderLeft: '4px solid #16A34A', background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(93,108,131,0.12)', color: '#1f2d3d' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2d3d' }}>In action ({actionCount})</div>
                <div style={{ fontSize: '0.74rem', color: '#6a7a8f' }}>Stay conversations done</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div className="avatar-group">
                  {['MK', 'NP', 'PQ'].map((init, i) => (
                    <div key={i} className="avatar-circle" style={{ background: avatarColors[(i+3)%5] }}>{init}</div>
                  ))}
                </div>
                <span className="badge badge-green">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
