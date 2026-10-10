import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, TrendingDown, ShieldCheck } from 'lucide-react';

export default function WhatIfStudio() {
  const [role, setRole] = useState('Sales Representative');
  const [salary, setSalary] = useState(2800);
  const [overtime, setOvertime] = useState('Yes');
  const [satisfaction, setSatisfaction] = useState(1);
  const [tenure, setTenure] = useState(1);
  const [salaryRaise, setSalaryRaise] = useState(15);
  const [reduceHours, setReduceHours] = useState(true);
  const [mentorSupport, setMentorSupport] = useState(true);

  const calculateRisk = (r, s, ot, sat, ten) => {
    let logit = -1.2;
    if (r === 'Sales Representative') logit += 1.4;
    else if (r === 'Laboratory Technician') logit += 0.8;
    else if (r === 'Research Scientist') logit += 0.3;
    else if (r === 'Manager' || r === 'Research Director') logit -= 1.1;

    if (ot === 'Yes') logit += 1.35;
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
  const newSalary = Math.round(salary * (1 + salaryRaise / 100));
  const newOT = reduceHours ? 'No' : overtime;
  const newSat = mentorSupport ? Math.min(4, satisfaction + 1) : satisfaction;
  const mitigatedRisk = calculateRisk(role, newSalary, newOT, newSat, tenure);
  const riskDrop = baselineRisk - mitigatedRisk;
  const savedExposure = Math.round((salary * 7.5) * (riskDrop / 100));

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#213042' }}>What-if check</h2>
        <p style={{ fontSize: '0.82rem', color: '#6a7a8f', marginTop: '0.25rem' }}>Try a few small changes and see how much risk goes down before an HR conversation starts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ background: 'rgba(255,255,255,0.72)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <SlidersHorizontal size={18} color="#4c7ef5" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#1f2d3d' }}>Current person</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Job type</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="input-control">
                <option value="Sales Representative">Sales Representative</option>
                <option value="Laboratory Technician">Laboratory Technician</option>
                <option value="Research Scientist">Research Scientist</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Manufacturing Director">Manufacturing Director</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#6a7a8f', fontWeight: 600 }}>Monthly pay</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#1f2d3d' }}>${salary.toLocaleString()}/mo</span>
              </div>
              <input type="range" min="1500" max="15000" step="250" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Extra hours?</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Yes', 'No'].map(val => (
                  <button key={val} type="button" onClick={() => setOvertime(val)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid', borderColor: overtime === val ? (val === 'Yes' ? '#e28a8a' : '#8ad0a8') : '#dfe6ef', background: overtime === val ? (val === 'Yes' ? 'rgba(217,98,98,0.09)' : 'rgba(43,143,110,0.08)') : '#FFFFFF', color: '#2b3d52', fontWeight: 700, cursor: 'pointer' }}>
                    {val === 'Yes' ? 'Yes, a lot' : 'No, normal hours'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#6a7a8f', fontWeight: 600 }}>Happiness score</span>
                <span style={{ fontWeight: 700, color: satisfaction <= 2 ? '#c35151' : '#2b8f6e' }}>{satisfaction} / 4</span>
              </div>
              <input type="range" min="1" max="4" step="1" value={satisfaction} onChange={(e) => setSatisfaction(Number(e.target.value))} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#6a7a8f', fontWeight: 600 }}>Time with the company</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#1f2d3d' }}>{tenure} year(s)</span>
              </div>
              <input type="range" min="0" max="15" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(255,255,255,0.72)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#7d63d6" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#1f2d3d' }}>Possible HR move</h3>
          </div>

          <div style={{ background: '#f7f9fd', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(93,108,131,0.12)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#5e6f88' }}>Pay increase</span>
                <span style={{ color: '#446bd3', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>+{salaryRaise}% (${newSalary.toLocaleString()}/mo)</span>
              </div>
              <input type="range" min="0" max="40" step="5" value={salaryRaise} onChange={(e) => setSalaryRaise(Number(e.target.value))} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem', color: '#2a3d58' }}>
              <input type="checkbox" checked={reduceHours} onChange={(e) => setReduceHours(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#5b6ee1' }} />
              <span>Cut overtime and rebalance work</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem', color: '#2a3d58' }}>
              <input type="checkbox" checked={mentorSupport} onChange={(e) => setMentorSupport(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#5b6ee1' }} />
              <span>Give a mentor and clear growth steps</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(217,98,98,0.08)', border: '1px solid rgba(217,98,98,0.18)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#b64c4c', fontWeight: 700, textTransform: 'uppercase' }}>Now</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c35151', fontFamily: 'var(--font-mono)' }}>{baselineRisk.toFixed(1)}%</div>
            </div>
            <div style={{ background: 'rgba(43,143,110,0.08)', border: '1px solid rgba(43,143,110,0.18)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#1d7359', fontWeight: 700, textTransform: 'uppercase' }}>After</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2b8f6e', fontFamily: 'var(--font-mono)' }}>{mitigatedRisk.toFixed(1)}%</div>
            </div>
            <div style={{ background: 'rgba(76,126,245,0.08)', border: '1px solid rgba(76,126,245,0.18)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#3f6ad1', fontWeight: 700, textTransform: 'uppercase' }}>Saved</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4c7ef5', fontFamily: 'var(--font-mono)' }}>${savedExposure.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', background: '#eefaf3', border: '1px solid #d3f0df', borderRadius: '12px', padding: '0.9rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#2b8f6e" />
              <div>
                <div style={{ fontSize: '0.76rem', color: '#1d7359', fontWeight: 700, textTransform: 'uppercase' }}>Likely effect</div>
                <div style={{ fontSize: '0.9rem', color: '#1d7359', fontWeight: 700 }}>{riskDrop.toFixed(1)} points lower risk</div>
              </div>
            </div>
            <TrendingDown size={18} color="#2b8f6e" />
          </div>
        </div>
      </div>
    </div>
  );
}
