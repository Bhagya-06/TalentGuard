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

      const memoText = `Subject: Follow-up conversation and stay support for Employee #${candidate.EmployeeNumber}

Hello,

I wanted to check in about how things are going and make sure we are supporting your work and growth. Based on the current review, we see a few areas to watch: workload pressure, market pay alignment, and long-term role satisfaction.

From the current review, this role is showing some risk signals. The main items we are seeing are:
- workload pressure from ${candidate.OverTime === 'Yes' ? 'regular overtime' : 'day-to-day project demands'}
- market pay gap compared with similar roles
- need for more clarity on growth and career path

The most practical next step is a short check-in with HR and the manager within the next few days. We can review workload, discuss support options, and look at what would help you stay and grow here.

Estimated impact if we do not act: around $${exitCostMin.toLocaleString()} to $${exitCostMax.toLocaleString()} in replacement and transition cost.

I would like to schedule a brief conversation next week to talk through what support would help most. Please let me know a time that works for you.

Best,
HR Team`;
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
    const blob = new Blob([generatedMemo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RetentionEmail_Emp_${candidate.EmployeeNumber}.txt`;
    link.click();
  };

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#213042' }}>
          🤖 Quick action note
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#6a7a8f', marginTop: '2px' }}>
          Pick a person and create a short note for the next HR follow-up.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 1.8fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ background: 'rgba(255,255,255,0.72)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Bot size={18} color="#5b6ee1" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#1f2d3d' }}>
              Select Candidate
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Person to follow up
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
                  <option key={c.EmployeeNumber} value={c.EmployeeNumber} style={{ background: '#eef2ff' }}>
                    Rank #{c.rank} • Emp #{c.EmployeeNumber} ({c.JobRole} - {c.risk_score_pct}%)
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              background: '#f8f9fd',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(93,108,131,0.12)',
              fontSize: '0.82rem',
              lineHeight: 1.8,
              color: '#42516a'
            }}>
              <div><strong style={{ color: '#1f2d3d' }}>Role:</strong> {candidate.JobRole} ({candidate.Department})</div>
              <div><strong style={{ color: '#1f2d3d' }}>Monthly Salary:</strong> ${candidate.MonthlyIncome.toLocaleString()}</div>
              <div><strong style={{ color: '#1f2d3d' }}>OverTime:</strong> {candidate.OverTime}</div>
              <div>
                <strong style={{ color: '#1f2d3d' }}>Flight Probability:</strong>{' '}
                <span style={{ color: '#bf3b3b', fontWeight: 700 }}>{candidate.risk_score_pct}%</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <Sparkles size={16} />
              {isGenerating ? 'Creating note...' : '⚡ Create action note'}
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.72)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#f1f4ff',
              color: '#4156b8',
              border: '1px solid rgba(91,110,225,0.18)',
              borderRadius: '999px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              ● STATUS: READY FOR HR REVIEW
            </span>

            {generatedMemo && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleCopy} className="btn btn-secondary btn-pill">
                  {copied ? <Check size={14} color="#2b8f6e" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={handleDownload} className="btn btn-secondary btn-pill">
                  <Download size={14} />
                  Download (.txt)
                </button>
              </div>
            )}
          </div>

          {generatedMemo ? (
            <div style={{
              background: '#f4f6fb',
              border: '1px solid rgba(93,108,131,0.12)',
              borderRadius: '12px',
              padding: '1.25rem',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: '#2e425d',
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
              background: '#f5f7fb',
              borderRadius: '12px',
              border: '1px dashed rgba(93,108,131,0.18)',
              textAlign: 'center',
              color: '#64748B'
            }}>
              <FileText size={36} style={{ marginBottom: '0.75rem', opacity: 0.5, color: '#6a7a8f' }} />
              <div style={{ fontWeight: 600, color: '#42516a' }}>No note yet</div>
              <div style={{ fontSize: '0.8rem', maxWidth: '300px', marginTop: '4px', color: '#73829a' }}>
                Pick someone and create the next HR message.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
