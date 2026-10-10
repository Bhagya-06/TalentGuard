import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingDown, DollarSign, ShieldCheck, ArrowRight } from 'lucide-react';

export default function WhatIfStudio() {
  // Baseline State
  const [role, setRole] = useState('Sales Representative');
  const [salary, setSalary] = useState(2800);
  const [overtime, setOvertime] = useState('Yes');
  const [satisfaction, setSatisfaction] = useState(1);
  const [tenure, setTenure] = useState(1);

  // Proposed Levers
  const [salaryRaise, setSalaryRaise] = useState(15); // +15%
  const [eliminateOT, setEliminateOT] = useState(true);
  const [mentorship, setMentorship] = useState(true);

  // Model-aligned risk heuristic based on trained weights
  // Baseline probability calculation
  const calculateRisk = (r, s, ot, sat, ten) => {
    let logit = -1.2;
    if (r === 'Sales Representative') logit += 1.4;
    else if (r === 'Laboratory Technician') logit += 0.8;
    else if (r === 'Research Scientist') logit += 0.3;
    else if (r === 'Manager' || r === 'Research Director') logit -= 1.1;

    if (ot === 'Yes') logit += 1.35; // 3x multiplier
    if (s < 3000) logit += 0.9;
    else if (s < 5000) logit += 0.3;
    else if (s > 10000) logit -= 0.8;

    if (sat <= 1) logit += 0.85;
    else if (sat === 2) logit += 0.35;
    else if (sat >= 4) logit -= 0.6;

    if (ten <= 1) logit += 0.7;
    else if (ten >= 5) logit -= 0.4;

    const prob = 1 / (1 + Math.exp(-logit));
    return Math.min(96, Math.max(8, prob * 100));
  };

  const baselineRisk = calculateRisk(role, salary, overtime, satisfaction, tenure);

  // Mitigated calculation
  const newSalary = Math.round(salary * (1 + salaryRaise / 100));
  const newOT = eliminateOT ? 'No' : overtime;
  const newSat = mentorship ? Math.min(4, satisfaction + 1) : satisfaction;
  const mitigatedRisk = calculateRisk(role, newSalary, newOT, newSat, tenure);

  const deltaRisk = baselineRisk - mitigatedRisk;
  const savedExposure = Math.round((salary * 7.5) * (deltaRisk / 100));

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
          👤 Interactive What-If Countermeasure Studio
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
          Simulate targeted retention levers in real time. Validate expected flight-risk reduction before presenting formal compensation or workload offers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '1.5rem' }}>
        {/* Left: Baseline Profile */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sliders size={18} color="#818CF8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
              1. Candidate Baseline Profile
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Job Role / Family
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-control"
              >
                <option value="Sales Representative">Sales Representative (High Churn ~40%)</option>
                <option value="Laboratory Technician">Laboratory Technician (~24%)</option>
                <option value="Research Scientist">Research Scientist (~16%)</option>
                <option value="Sales Executive">Sales Executive (~17%)</option>
                <option value="Manufacturing Director">Manufacturing Director (~7%)</option>
                <option value="Manager">Manager (&lt;5%)</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#94A3B8', fontWeight: 600 }}>Current Monthly Salary</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>${salary.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="1500"
                max="15000"
                step="250"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Chronic OverTime Status (3x Multiplier)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Yes', 'No'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setOvertime(val)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: overtime === val ? (val === 'Yes' ? '#F43F5E' : '#10B981') : 'rgba(255,255,255,0.08)',
                      background: overtime === val ? (val === 'Yes' ? 'rgba(244,63,94,0.15)' : 'rgba(16,185,129,0.15)') : 'rgba(255,255,255,0.03)',
                      color: overtime === val ? '#FFFFFF' : '#94A3B8',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.82rem'
                    }}
                  >
                    {val === 'Yes' ? '⚠️ Yes (Overtime)' : '✓ Standard Hours'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#94A3B8', fontWeight: 600 }}>Job Satisfaction Rating</span>
                <span style={{ fontWeight: 700, color: satisfaction <= 2 ? '#FB7185' : '#34D399' }}>
                  {satisfaction} / 4 ({satisfaction <= 1 ? 'Critical Low' : satisfaction === 2 ? 'Low' : satisfaction === 3 ? 'Good' : 'High'})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={satisfaction}
                onChange={(e) => setSatisfaction(Number(e.target.value))}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#94A3B8', fontWeight: 600 }}>Company Tenure</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{tenure} Year(s)</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Right: Countermeasure Levers & Real-Time Impact */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#A855F7" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
              2. Retention Countermeasures & Efficacy
            </h3>
          </div>

          {/* Interactive Levers */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#E2E8F0' }}>Proposed Salary Adjustment</span>
                <span style={{ color: '#38BDF8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  +{salaryRaise}% (${newSalary.toLocaleString()}/mo)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={salaryRaise}
                onChange={(e) => setSalaryRaise(Number(e.target.value))}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={eliminateOT}
                onChange={(e) => setEliminateOT(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#6366F1' }}
              />
              <span>
                <strong>Workload Cap:</strong> Eliminate Overtime & Rebalance Sprint Tasks
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={mentorship}
                onChange={(e) => setMentorship(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#6366F1' }}
              />
              <span>
                <strong>Executive Mentorship:</strong> Fast-Track Career Growth Roadmap (+1 Satisfaction)
              </span>
            </label>
          </div>

          {/* Live Outcome Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginTop: '0.5rem'
          }}>
            <div style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#FDA4AF', fontWeight: 700, textTransform: 'uppercase' }}>
                Baseline Risk
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FB7185', fontFamily: 'var(--font-mono)' }}>
                {baselineRisk.toFixed(1)}%
              </div>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#6EE7B7', fontWeight: 700, textTransform: 'uppercase' }}>
                Mitigated Risk
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                {mitigatedRisk.toFixed(1)}%
              </div>
            </div>

            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase' }}>
                Capital Saved
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818CF8', fontFamily: 'var(--font-mono)' }}>
                ${savedExposure.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Visual Delta Progress Comparison */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
              <span style={{ color: '#94A3B8' }}>Risk Reduction Delta</span>
              <span style={{ color: '#34D399', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                ↓ {deltaRisk.toFixed(1)}% Reduction
              </span>
            </div>
            <div className="progress-track" style={{ height: '10px' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${baselineRisk}%`,
                  background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #F43F5E 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
