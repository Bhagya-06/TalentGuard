import React, { useState } from 'react';
import { Search, Download, AlertTriangle } from 'lucide-react';

const avatarLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function TriageQueue({ watchlist, workflowStatus, setWorkflowStatus }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState(1);

  const statusOptions = ['Waiting for follow-up', 'In review', 'Action plan started', 'Escalated', 'Resolved'];

  const depts = ['ALL', ...new Set(watchlist.map(w => w.Department))];
  const roles = ['ALL', ...new Set(watchlist.map(w => w.JobRole))];

  const getEmployeeInitials = (emp) => {
    const first = avatarLetters[(emp.EmployeeNumber + 3) % avatarLetters.length];
    const second = avatarLetters[(emp.EmployeeNumber + 9) % avatarLetters.length];
    return `${first}${second}`;
  };

  const filtered = watchlist.filter(item => {
    const matchesDept = deptFilter === 'ALL' || item.Department === deptFilter;
    const matchesRole = roleFilter === 'ALL' || item.JobRole === roleFilter;
    const matchesSearch = !search ||
      item.EmployeeNumber.toString().includes(search) ||
      item.JobRole.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  const selectedCandidate = watchlist.find(w => w.rank === selectedRank) || watchlist[0];
  const candidateStatus = workflowStatus[selectedCandidate.EmployeeNumber] || 'Waiting for follow-up';

  const handleExportCSV = () => {
    const headers = ['Rank', 'EmployeeNumber', 'JobRole', 'Department', 'MonthlyIncome', 'OverTime', 'RiskScorePct'];
    const rows = watchlist.map(w => [
      w.rank,
      w.EmployeeNumber,
      `"${w.JobRole}"`,
      `"${w.Department}"`,
      w.MonthlyIncome,
      w.OverTime,
      w.risk_score_pct,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `People_Review_List_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#213042' }}>
            People review list
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6a7a8f', marginTop: '0.25rem' }}>
            Top people to review this month, ranked by risk and urgency.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary btn-pill">
          <Download size={14} />
          Export list
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.72)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Search by ID or role
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Type employee ID or job"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-control"
                style={{ paddingLeft: '2.2rem' }}
              />
              <Search size={14} color="#66758b" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Filter team
            </label>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input-control">
              {depts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#6a7a8f', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Filter role
            </label>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input-control">
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: '1.25rem' }}>
        <div className="table-wrapper" style={{ maxHeight: '550px', overflowY: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Person</th>
                <th>Team</th>
                <th>Pay</th>
                <th>Overtime</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const isSelected = row.rank === selectedCandidate.rank;
                const riskColor = row.risk_score_pct >= 80 ? '#D96262' : row.risk_score_pct >= 65 ? '#D29939' : '#3F82F6';
                const initials = getEmployeeInitials(row);
                return (
                  <tr key={row.rank} onClick={() => setSelectedRank(row.rank)} style={{ cursor: 'pointer', background: isSelected ? 'rgba(91, 110, 225, 0.06)' : 'transparent', borderLeft: isSelected ? '3px solid #5b6ee1' : '3px solid transparent' }}>
                    <td><span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: isSelected ? '#4c7ef5' : '#7a8aa0' }}>#{row.rank}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#e9edf9', color: '#4052bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.72rem' }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1f2d3d' }}>Employee #{row.EmployeeNumber}</div>
                          <div style={{ fontSize: '0.72rem', color: '#6a7a8f', fontFamily: 'var(--font-mono)' }}>{row.JobRole}</div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: riskColor, marginTop: '2px' }}>
                            Risk {row.risk_score_pct}%
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#475a72', fontSize: '0.8rem' }}>{row.Department}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#1f2d3d' }}>${row.MonthlyIncome.toLocaleString()}</td>
                    <td><span style={{ fontSize: '0.75rem', fontWeight: 600, color: row.OverTime === 'Yes' ? '#c35151' : '#2b8f6e' }}>{row.OverTime}</span></td>
                    <td style={{ width: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-track"><div className="progress-fill" style={{ width: `${row.risk_score_pct}%`, background: riskColor }} /></div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: riskColor, width: '45px', textAlign: 'right' }}>{row.risk_score_pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-red"><AlertTriangle size={12} /> {selectedCandidate.risk_score_pct}% risk</span>
            <span style={{ fontSize: '0.75rem', color: '#6a7a8f', fontFamily: 'var(--font-mono)' }}>Priority #{selectedCandidate.rank}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e9edf9', color: '#4052bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
              {getEmployeeInitials(selectedCandidate)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1f2d3d' }}>Employee #{selectedCandidate.EmployeeNumber}</h3>
              <p style={{ fontSize: '0.85rem', color: '#5e6f88', marginTop: '2px' }}>{selectedCandidate.JobRole} • {selectedCandidate.Department}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', background: 'rgba(245,247,251,0.9)', padding: '0.85rem', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(93,108,131,0.12)' }}>
            <div><div style={{ color: '#6a7a8f' }}>Pay</div><strong style={{ fontFamily: 'var(--font-mono)', color: '#1f2d3d' }}>${selectedCandidate.MonthlyIncome.toLocaleString()}</strong></div>
            <div><div style={{ color: '#6a7a8f' }}>Years</div><strong style={{ color: '#1f2d3d' }}>{selectedCandidate.YearsAtCompany}</strong></div>
            <div><div style={{ color: '#6a7a8f' }}>Overtime</div><strong style={{ color: selectedCandidate.OverTime === 'Yes' ? '#c35151' : '#2b8f6e' }}>{selectedCandidate.OverTime}</strong></div>
            <div><div style={{ color: '#6a7a8f' }}>Risk</div><strong style={{ color: '#1f2d3d' }}>{selectedCandidate.risk_score_pct}%</strong></div>
          </div>

          <div style={{ background: 'rgba(245,247,251,0.9)', border: '1px solid rgba(93,108,131,0.12)', borderRadius: '12px', padding: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#6a7a8f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Review status
            </label>
            <select
              value={candidateStatus}
              onChange={(e) => setWorkflowStatus(prev => ({ ...prev, [selectedCandidate.EmployeeNumber]: e.target.value }))}
              className="input-control"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ background: 'rgba(245,247,251,0.9)', border: '1px solid rgba(93,108,131,0.12)', borderRadius: '12px', padding: '0.9rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6a7a8f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Main reason</div>
            <div style={{ fontSize: '0.9rem', color: '#1f2d3d', marginTop: '0.35rem', lineHeight: 1.5 }}>{selectedCandidate.top_3_risk_reasons.split('|')[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
