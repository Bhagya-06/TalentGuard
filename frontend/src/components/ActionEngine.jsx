import React, { useState } from 'react';
import { Bot, Copy, Check, Download, Sparkles, FileText } from 'lucide-react';

export default function ActionEngine({ watchlist }) {
  const [selectedId, setSelectedId] = useState(watchlist[0].EmployeeNumber);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState(null);

  const candidate = watchlist.find(w => w.EmployeeNumber === selectedId) || watchlist[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const exitCostMin = Math.round(candidate.MonthlyIncome * 6);
      const exitCostMax = Math.round(candidate.MonthlyIncome * 9);
      
      const memoText = `================================================================================
TALENTGUARD™ AGENTIC WORKFLOW — AUTONOMOUS RETENTION MEMO
================================================================================
STATUS: [PENDING_APPROVAL — HR BUSINESS PARTNER SIGN-OFF REQUIRED]
TIMESTAMP: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}
PRIORITY BAND: ${candidate.risk_score_pct >= 75 ? 'CRITICAL / IMMEDIATE ACTION REQUIRED' : 'HIGH PRIORITY'}
--------------------------------------------------------------------------------
1. EMPLOYEE EXECUTIVE PROFILE:
• Employee ID: #${candidate.EmployeeNumber}
• Job Title: ${candidate.JobRole} (${candidate.Department})
• Tenure: ${candidate.YearsAtCompany} Year(s) | Current Monthly Compensation: $${candidate.MonthlyIncome.toLocaleString()}
• Predicted Attrition Risk: ${candidate.risk_score_pct}% (Top-Decile Operational Risk)
• Organizational Financial Exposure if Lost: $${exitCostMin.toLocaleString()} – $${exitCostMax.toLocaleString()}

2. DIAGNOSED ROOT FLIGHT DRIVERS:
${candidate.top_3_risk_reasons}

3. PRESCRIBED RETENTION ACTION PLAN:
[x] Step 1: Schedule Confidential 1-on-1 Stay Interview within 5 business days.
[x] Step 2: Workload Review — ${candidate.OverTime === 'Yes' ? 'Cap chronic overtime hours; rebalance sprint dependencies.' : 'Assess project autonomy and sprint friction.'}
[x] Step 3: Compensation & Equity Parity — Evaluate off-cycle adjustment to market P50/P75 band.
[ ] Step 4: Executive Mentorship — Pair with Practice Lead for structured growth trajectory.

4. DRAFTED 1-ON-1 STAY INTERVIEW INVITATION:
--------------------------------------------------------------------------------
Subject: Checking in & your future growth at TechNova

Hi ${candidate.JobRole.split(' ')[0]} Team Member,

I wanted to take some dedicated time next week for a casual check-in. You've made 
valuable contributions to our team over the last ${candidate.YearsAtCompany} year(s), and I want to ensure 
we are actively supporting your work-life balance, project satisfaction, and long-term 
career aspirations at TechNova.

Let's grab 30 minutes over coffee or virtual chat to discuss how things are feeling 
and where you'd like to steer your path next.

Best regards,
People & Culture Business Partner
TechNova Solutions Global
================================================================================`;
      setGeneratedMemo(memoText);
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = () => {
    if (!generatedMemo) return;
    navigator.clipboard.writeText(generatedMemo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedMemo) return;
    const blob = new Blob([generatedMemo], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TechNova_RetentionMemo_Emp_${candidate.EmployeeNumber}.md`;
    link.click();
  };

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
          🤖 Autonomous Retention Action Generator
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
          Agentic synthesis engine that diagnoses employee flight factors, estimates cost exposure, and auto-drafts a personalized Stay-Interview briefing memo for HRBP sign-off.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 1.8fr)', gap: '1.5rem' }}>
        {/* Left: Candidate Selector */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Bot size={18} color="#A855F7" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
              Select Candidate
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Priority Cohort Member
              </label>
              <select
                value={selectedId}
                onChange={(e) => {
                  setSelectedId(Number(e.target.value));
                  setGeneratedMemo(null);
                }}
                className="input-control"
              >
                {watchlist.slice(0, 20).map(c => (
                  <option key={c.EmployeeNumber} value={c.EmployeeNumber} style={{ background: '#0F172A' }}>
                    Rank #{c.rank} • Emp #{c.EmployeeNumber} ({c.JobRole} - {c.risk_score_pct}%)
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '0.82rem',
              lineHeight: 1.8
            }}>
              <div><strong style={{ color: '#E2E8F0' }}>Role:</strong> {candidate.JobRole} ({candidate.Department})</div>
              <div><strong style={{ color: '#E2E8F0' }}>Monthly Salary:</strong> ${candidate.MonthlyIncome.toLocaleString()}</div>
              <div><strong style={{ color: '#E2E8F0' }}>OverTime:</strong> {candidate.OverTime}</div>
              <div>
                <strong style={{ color: '#E2E8F0' }}>Flight Probability:</strong>{' '}
                <span style={{ color: '#F87171', fontWeight: 700 }}>{candidate.risk_score_pct}%</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn btn-ai-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <Sparkles size={16} />
              {isGenerating ? 'Synthesizing Memo...' : '⚡ Generate Autonomous Action Memo'}
            </button>
          </div>
        </div>

        {/* Right: Generated Terminal Package */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge-pending">
              ● STATUS: PENDING_APPROVAL — HUMAN IN THE LOOP
            </span>

            {generatedMemo && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleCopy} className="btn btn-secondary btn-pill">
                  {copied ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={handleDownload} className="btn btn-secondary btn-pill">
                  <Download size={14} />
                  Download (.md)
                </button>
              </div>
            )}
          </div>

          {generatedMemo ? (
            <div style={{
              background: '#04060A',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: '#CBD5E1',
              maxHeight: '440px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {generatedMemo}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              color: '#64748B'
            }}>
              <FileText size={36} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
              <div style={{ fontWeight: 600, color: '#94A3B8' }}>No Memo Generated Yet</div>
              <div style={{ fontSize: '0.8rem', maxWidth: '300px', marginTop: '4px' }}>
                Select a candidate and click "Generate Autonomous Action Memo" to compile the personalized briefing package.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
