import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, CheckCircle2, ShieldAlert, Send, FileText } from 'lucide-react';

const avatarLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function RetentionAdvisor({ watchlist, workflowStatus, setWorkflowStatus }) {
  const [selectedEmpId, setSelectedEmpId] = useState(watchlist[0].EmployeeNumber);
  const [checkedActions, setCheckedActions] = useState({});
  const [showScriptModal, setShowScriptModal] = useState(false);

  const employee = watchlist.find(w => w.EmployeeNumber === selectedEmpId) || watchlist[0];
  const recommendedRaise = Math.round(employee.MonthlyIncome * 0.15);

  const getEmployeeInitials = (emp) => {
    const first = avatarLetters[(emp.EmployeeNumber + 2) % avatarLetters.length];
    const second = avatarLetters[(emp.EmployeeNumber + 7) % avatarLetters.length];
    return `${first}${second}`;
  };

  const toggleAction = (actionKey) => {
    setCheckedActions(prev => ({
      ...prev,
      [`${employee.EmployeeNumber}_${actionKey}`]: !prev[`${employee.EmployeeNumber}_${actionKey}`]
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#213042', margin: 0 }}>
          Why people leave and what to do next
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#6a7a8f', marginTop: '0.35rem' }}>
          Short view of the main reason someone may leave, plus the next best step for HR.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 340px) minmax(0, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
        <div className="talento-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.78)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6a7a8f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              High-risk people
            </span>
            <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
              Needs action
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
            {watchlist.slice(0, 10).map((emp) => {
              const isSelected = emp.EmployeeNumber === employee.EmployeeNumber;
              const initials = getEmployeeInitials(emp);
              return (
                <div
                  key={emp.EmployeeNumber}
                  onClick={() => setSelectedEmpId(emp.EmployeeNumber)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid',
                    borderColor: isSelected ? '#91a9ff' : 'rgba(93,108,131,0.14)',
                    background: isSelected ? 'rgba(91,110,225,0.08)' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e9edf9', color: '#4052bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2d3d', lineHeight: 1.2 }}>
                        Employee #{emp.EmployeeNumber}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7a8f', marginTop: '2px' }}>
                        {emp.JobRole} • ${emp.MonthlyIncome.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#c35151', fontFamily: 'var(--font-mono)' }}>
                    {emp.risk_score_pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="talento-card" style={{ background: 'rgba(250,250,252,0.9)', border: '1px solid rgba(93, 108, 131, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#e9edf9', color: '#4052bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800 }}>
                  {getEmployeeInitials(employee)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2d3d', margin: 0 }}>
                      Employee #{employee.EmployeeNumber}
                    </h3>
                    <span className="badge badge-red">
                      <AlertTriangle size={12} />
                      {employee.risk_score_pct}% at risk
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#6a7a8f', marginTop: '4px' }}>
                    {employee.JobRole} • {employee.Department} • {employee.YearsAtCompany} years at the company
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.9)', padding: '0.65rem 1.15rem', borderRadius: '12px', border: '1px solid rgba(93, 108, 131, 0.08)', textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: '#6a7a8f', fontWeight: 700, textTransform: 'uppercase' }}>
                  Monthly pay
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2d3d', fontFamily: 'var(--font-mono)' }}>
                  ${employee.MonthlyIncome.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="talento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ShieldAlert size={20} color="#d96262" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1f2d3d', margin: 0 }}>
                Why this person may leave
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ background: employee.OverTime === 'Yes' ? 'rgba(217,98,98,0.08)' : 'rgba(255,255,255,0.7)', border: '1.5px solid', borderColor: employee.OverTime === 'Yes' ? 'rgba(191,59,59,0.16)' : 'rgba(93,108,131,0.12)', borderRadius: '14px', padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: employee.OverTime === 'Yes' ? '#c35151' : '#475a72' }}>
                    TOO MUCH WORK
                  </span>
                  <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>High stress</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2d3d', marginBottom: '4px' }}>
                  {employee.OverTime === 'Yes' ? 'Long hours are taking a toll' : 'Workload is steady'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#5e6f88', lineHeight: 1.5 }}>
                  {employee.OverTime === 'Yes' ? 'Extra hours are adding pressure and making the role feel unsustainable.' : 'This needs a quick check-in to keep it stable.'}
                </div>
              </div>

              <div style={{ background: employee.MonthlyIncome < 3000 ? 'rgba(210,153,57,0.08)' : 'rgba(255,255,255,0.7)', border: '1.5px solid', borderColor: employee.MonthlyIncome < 3000 ? 'rgba(169,109,26,0.15)' : 'rgba(93,108,131,0.12)', borderRadius: '14px', padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: employee.MonthlyIncome < 3000 ? '#a96d1a' : '#475a72' }}>
                    PAY GAP
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>Below market</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2d3d', marginBottom: '4px' }}>
                  Salary is below the usual range
                </div>
                <div style={{ fontSize: '0.8rem', color: '#5e6f88', lineHeight: 1.5 }}>
                  At ${employee.MonthlyIncome.toLocaleString()}/mo, this person may be looking elsewhere.
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(93,108,131,0.12)', borderRadius: '14px', padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475a72' }}>
                    ROLE RISK
                  </span>
                  <span className="badge badge-dark" style={{ fontSize: '0.68rem' }}>Early stage</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2d3d', marginBottom: '4px' }}>
                  This role is moving fast
                </div>
                <div style={{ fontSize: '0.8rem', color: '#5e6f88', lineHeight: 1.5 }}>
                  This role often sees early churn if pressure and pay are not balanced.
                </div>
              </div>
            </div>
          </div>

          <div className="talento-card" style={{ borderLeft: '4px solid #5b6ee1', background: '#f7f8ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb size={20} color="#5b6ee1" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1f2d3d', margin: 0 }}>
                What HR can do next
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(93,108,131,0.12)', borderRadius: '14px', padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e7ecff', color: '#4052bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>1</div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1f2d3d' }}>Have a quick check-in</div>
                      <div style={{ fontSize: '0.82rem', color: '#5e6f88', marginTop: '4px', lineHeight: 1.5 }}>
                        Keep it simple: ask what is stressful, what is frustrating, and what support would help.
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setShowScriptModal(!showScriptModal)} className="btn btn-secondary btn-pill" style={{ whiteSpace: 'nowrap', background: 'rgba(91, 110, 225, 0.04)' }}>
                    <FileText size={14} />
                    {showScriptModal ? 'Hide help' : 'Quick script'}
                  </button>
                </div>

                {showScriptModal && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#f6f8fd', borderRadius: '10px', border: '1px solid rgba(93,108,131,0.12)', fontSize: '0.8rem', color: '#42516a', lineHeight: 1.6 }}>
                    <strong>Simple talking points:</strong>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '4px' }}>
                      <li>“What is the hardest part of your role right now?”</li>
                      <li>“What would make work feel more balanced?”</li>
                      <li>“What would help you stay and grow here?”</li>
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                {[
                  { key: 'interview', label: '1. Set a quick check-in' },
                  { key: 'workload', label: '2. Redesign workload' },
                  { key: 'comp', label: `3. Review pay against the role band (${employee.MonthlyIncome.toLocaleString()})` },
                  { key: 'mentor', label: '4. Add a mentor' },
                ].map((item) => {
                  const isDone = !!checkedActions[`${employee.EmployeeNumber}_${item.key}`];
                  return (
                    <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: isDone ? '#ffffff' : 'rgba(255,255,255,0.7)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid', borderColor: isDone ? '#9aaae8' : 'rgba(93,108,131,0.12)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: isDone ? 700 : 500, color: isDone ? '#4052bf' : '#42516a', boxShadow: isDone ? '0 2px 8px rgba(91, 110, 225, 0.10)' : 'none' }}>
                      <input type="checkbox" checked={isDone} onChange={() => toggleAction(item.key)} style={{ width: '16px', height: '16px', accentColor: '#5b6ee1' }} />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#5e6f88' }}>
                  HR follow-up: <strong style={{ color: '#1f2d3d' }}>HR team</strong>
                </div>
                <button
                  onClick={() => {
                    setWorkflowStatus(prev => ({ ...prev, [employee.EmployeeNumber]: 'Action plan started' }));
                    alert(`Action plan started for Employee #${employee.EmployeeNumber}.`);
                  }}
                  className="btn btn-primary"
                >
                  <Send size={15} />
                  Save action plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
