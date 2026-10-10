import React, { useState } from 'react';
import { Search, Download, AlertTriangle, ArrowUpDown, CheckCircle, Clock } from 'lucide-react';

export default function TriageQueue({ watchlist, workflowStatus, setWorkflowStatus }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState(1);

  // Departments and Roles
  const depts = ['ALL', ...new Set(watchlist.map(w => w.Department))];
  const roles = ['ALL', ...new Set(watchlist.map(w => w.JobRole))];

  // Filtering
  const filtered = watchlist.filter(item => {
    const matchesDept = deptFilter === 'ALL' || item.Department === deptFilter;
    const matchesRole = roleFilter === 'ALL' || item.JobRole === roleFilter;
    const matchesSearch = !search || 
      item.EmployeeNumber.toString().includes(search) ||
      item.JobRole.toLowerCase().includes(search.toLowerCase()) ||
      item.top_3_risk_reasons.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  const selectedCandidate = watchlist.find(w => w.rank === selectedRank) || watchlist[0];
  const candidateStatus = workflowStatus[selectedCandidate.EmployeeNumber] || 'Pending HRBP Assignment';

  const handleStatusChange = (newStatus) => {
    setWorkflowStatus(prev => ({
      ...prev,
      [selectedCandidate.EmployeeNumber]: newStatus
    }));
  };

  const handleExportCSV = () => {
    const headers = ['Rank', 'EmployeeNumber', 'JobRole', 'Department', 'MonthlyIncome', 'OverTime', 'RiskScorePct', 'Top3RiskReasons', 'RetentionRecommendation'];
    const rows = watchlist.map(w => [
      w.rank,
      w.EmployeeNumber,
      `"${w.JobRole}"`,
      `"${w.Department}"`,
      w.MonthlyIncome,
      w.OverTime,
      w.risk_score_pct,
      `"${w.top_3_risk_reasons}"`,
      `"${w.concrete_retention_recommendation.replace(/\n/g, ' ')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TechNova_TalentGuard_Top50_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Title & Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
            🎯 Monthly Retention Triage Queue (Top 50 Action Roster)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
            Ranked priority cohort calibrated strictly to HR's 50-person monthly interview bottleneck.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary btn-pill">
          <Download size={14} />
          Export Queue (CSV)
        </button>
      </div>

      {/* Filter Ribbon */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Search Candidate ID / Keyword
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. 1024 or Sales Rep..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-control"
                style={{ paddingLeft: '2.2rem' }}
              />
              <Search size={14} color="#64748B" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Filter Division
            </label>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="input-control"
            >
              {depts.map(d => <option key={d} value={d} style={{ background: '#0F172A' }}>{d}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Filter Job Family
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-control"
            >
              {roles.map(r => <option key={r} value={r} style={{ background: '#0F172A' }}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Split Roster & Candidate Deep-Dive */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: '1.25rem' }}>
        {/* Left: Scrollable Data Table */}
        <div className="table-wrapper" style={{ maxHeight: '550px' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Employee</th>
                <th>Division</th>
                <th>Salary</th>
                <th>OverTime</th>
                <th>Flight Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const isSelected = row.rank === selectedCandidate.rank;
                const riskColor = row.risk_score_pct >= 80 ? '#F43F5E' : row.risk_score_pct >= 65 ? '#F59E0B' : '#38BDF8';
                return (
                  <tr
                    key={row.rank}
                    onClick={() => setSelectedRank(row.rank)}
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      borderLeft: isSelected ? '3px solid #6366F1' : '3px solid transparent'
                    }}
                  >
                    <td>
                      <span style={{
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: isSelected ? '#818CF8' : '#94A3B8'
                      }}>
                        #{row.rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{row.JobRole}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                        ID #{row.EmployeeNumber}
                      </div>
                    </td>
                    <td style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{row.Department}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>${row.MonthlyIncome.toLocaleString()}</td>
                    <td>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: row.OverTime === 'Yes' ? '#FB7185' : '#34D399'
                      }}>
                        {row.OverTime}
                      </span>
                    </td>
                    <td style={{ width: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${row.risk_score_pct}%`, background: riskColor }}
                          />
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          color: riskColor,
                          width: '45px',
                          textAlign: 'right'
                        }}>
                          {row.risk_score_pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: Candidate Dossier & Retention Package */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-critical">
              <AlertTriangle size={12} />
              {selectedCandidate.risk_score_pct}% FLIGHT RISK
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              PRIORITY #{selectedCandidate.rank} • ID #{selectedCandidate.EmployeeNumber}
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              {selectedCandidate.JobRole}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#818CF8', marginTop: '2px' }}>
              {selectedCandidate.Department}
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.85rem',
            borderRadius: '12px',
            fontSize: '0.82rem'
          }}>
            <div>
              <div style={{ color: '#64748B' }}>Monthly Salary</div>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>${selectedCandidate.MonthlyIncome.toLocaleString()}</strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Tenure</div>
              <strong>{selectedCandidate.YearsAtCompany} Years</strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Works OverTime</div>
              <strong style={{ color: selectedCandidate.OverTime === 'Yes' ? '#FB7185' : '#34D399' }}>
                {selectedCandidate.OverTime}
              </strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Cost if Lost</div>
              <strong style={{ color: '#FB7185', fontFamily: 'var(--font-mono)' }}>
                ${Math.round(selectedCandidate.MonthlyIncome * 7.5).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Diagnosed Flight Drivers */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Diagnosed Flight Drivers (Evidence-Backed)
            </div>
            <div style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              fontSize: '0.8rem',
              color: '#FECDD3',
              lineHeight: 1.5
            }}>
              {selectedCandidate.top_3_risk_reasons}
            </div>
          </div>

          {/* Recommended Retention Action */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Prescribed Retention Action Package
            </div>
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              fontSize: '0.82rem',
              color: '#C7D2FE',
              lineHeight: 1.6,
              whiteSpace: 'pre-line'
            }}>
              {selectedCandidate.concrete_retention_recommendation}
            </div>
          </div>

          {/* Workflow Status Selector */}
          <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              HRBP Triage Status (Syncs to HRIS)
            </label>
            <select
              value={candidateStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="input-control"
              style={{ fontWeight: 600, color: '#38BDF8' }}
            >
              <option value="Pending HRBP Assignment">Pending HRBP Assignment</option>
              <option value="Stay Interview Scheduled">Stay Interview Scheduled</option>
              <option value="Compensation Parity Submitted">Compensation Parity Submitted</option>
              <option value="Workload Rebalanced">Workload Rebalanced</option>
              <option value="Case Resolved / Retained">Case Resolved / Retained</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
