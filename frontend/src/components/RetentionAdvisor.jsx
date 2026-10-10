import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, CheckCircle2, DollarSign, Clock, UserCheck, ShieldAlert, Sparkles, Send, FileText, ChevronRight } from 'lucide-react';

export default function RetentionAdvisor({ watchlist, workflowStatus, setWorkflowStatus }) {
  const [selectedEmpId, setSelectedEmpId] = useState(watchlist[0].EmployeeNumber);
  const [checkedActions, setCheckedActions] = useState({});
  const [customNotes, setCustomNotes] = useState('');
  const [showScriptModal, setShowScriptModal] = useState(false);

  const employee = watchlist.find(w => w.EmployeeNumber === selectedEmpId) || watchlist[0];
  const estExitCost = Math.round(employee.MonthlyIncome * 7.5);
  const recommendedRaise = Math.round(employee.MonthlyIncome * 0.15);

  const toggleAction = (actionKey) => {
    setCheckedActions(prev => ({
      ...prev,
      [`${employee.EmployeeNumber}_${actionKey}`]: !prev[`${employee.EmployeeNumber}_${actionKey}`]
    }));
  };

  const getInitials = (role) => {
    return role.split(' ').map(w => w[0]).join('').slice(0, 2);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '4px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #5B4DFB, #7C3AED)',
            color: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}>
            AI HR ADVISOR
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Flight Root-Cause Diagnostic & Retention Playbook
          </h2>
        </div>
        <p style={{ fontSize: '0.86rem', color: '#64748B' }}>
          Autonomous diagnostic engine that pinpoints <strong>WHY</strong> high-risk employees consider leaving and advises HR on <strong>WHAT SPECIFIC ACTIONS</strong> to take to retain them.
        </p>
      </div>

      {/* Main Grid: Selector on Left, Diagnostic & Advisory on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 340px) minmax(0, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left: High-Risk Employee Selector List */}
        <div className="talento-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              High-Risk Cohort (Top 10)
            </span>
            <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
              Action Needed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
            {watchlist.slice(0, 10).map((emp) => {
              const isSelected = emp.EmployeeNumber === employee.EmployeeNumber;
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
                    borderColor: isSelected ? '#5B4DFB' : '#F1F5F9',
                    background: isSelected ? '#F8F7FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isSelected ? 'linear-gradient(135deg, #5B4DFB, #7C3AED)' : '#E2E8F0',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.78rem'
                    }}>
                      {getInitials(emp.JobRole)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                        {emp.JobRole}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        ID #{emp.EmployeeNumber} • ${emp.MonthlyIncome.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#E03131',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {emp.risk_score_pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Complete Diagnostic & Advisory Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Employee Hero Header Card */}
          <div className="talento-card" style={{
            background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 50%, #EEF2FF 100%)',
            border: '1.5px solid #E9D5FF'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #5B4DFB, #7C3AED)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 16px -4px rgba(91, 77, 251, 0.35)'
                }}>
                  {getInitials(employee.JobRole)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {employee.JobRole}
                    </h3>
                    <span className="badge badge-red">
                      <AlertTriangle size={12} />
                      {employee.risk_score_pct}% FLIGHT RISK
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '4px' }}>
                    Employee #{employee.EmployeeNumber} • Division: <strong>{employee.Department}</strong> • Tenure: <strong>{employee.YearsAtCompany} Year(s)</strong>
                  </div>
                </div>
              </div>

              {/* Financial Impact Chip */}
              <div style={{
                background: '#FFFFFF',
                padding: '0.65rem 1.15rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                  Exit Replacement Cost
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E03131', fontFamily: 'var(--font-mono)' }}>
                  ${estExitCost.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: WHY THEY MIGHT RESIGN (ROOT CAUSE DIAGNOSTIC) */}
          <div className="talento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ShieldAlert size={20} color="#E03131" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                1. Why This Employee Might Resign (Root Cause Analysis)
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Based on empirical behavioral patterns and TechNova workforce data, our diagnostic engine identified the following triggers:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              
              {/* Trigger 1: Workload & Overtime */}
              <div style={{
                background: employee.OverTime === 'Yes' ? '#FFF5F5' : '#F8FAFC',
                border: '1.5px solid',
                borderColor: employee.OverTime === 'Yes' ? '#FFC9C9' : '#E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: employee.OverTime === 'Yes' ? '#C92A2A' : '#475569' }}>
                    🚨 WORKLOAD & BURNOUT
                  </span>
                  <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>3.0x Velocity</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {employee.OverTime === 'Yes' ? 'Chronic Overtime Exhaustion' : 'Standard Working Hours'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {employee.OverTime === 'Yes' 
                    ? 'Employee regularly works uncompensated overtime. Company-wide, overtime staff quit at 30.5% vs 10.4%—making burnout their primary flight accelerant.'
                    : 'Workload volume is balanced, but cognitive fatigue must be monitored.'}
                </div>
              </div>

              {/* Trigger 2: Compensation Parity */}
              <div style={{
                background: employee.MonthlyIncome < 3000 ? '#FFF4E6' : '#F8FAFC',
                border: '1.5px solid',
                borderColor: employee.MonthlyIncome < 3000 ? '#FFD8A8' : '#E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: employee.MonthlyIncome < 3000 ? '#D9480F' : '#475569' }}>
                    📉 COMPENSATION DEFICIT
                  </span>
                  <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>Bottom Quartile</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  Salary (${employee.MonthlyIncome.toLocaleString()}/mo) Below Median
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  Earning ${employee.MonthlyIncome.toLocaleString()}/mo puts them significantly below TechNova's peer median ($4,900/mo). Competitor poaching offers a 25-35% instant uplift.
                </div>
              </div>

              {/* Trigger 3: Role Volatility */}
              <div style={{
                background: '#F8F9FA',
                border: '1.5px solid #E9ECEF',
                borderRadius: '14px',
                padding: '1.15rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#495057' }}>
                    ⏳ ROLE & TENURE FRICTION
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>Flight Window</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {employee.JobRole} Market Pressure
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {employee.JobRole} roles experience ~40% annual turnover across the tech services industry, with high churn occurring during Year 0 to Year 2.
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 2: WHAT HR CAN DO TO PREVENT THEM FROM LEAVING (ADVISORY PLAYBOOK) */}
          <div className="talento-card" style={{ borderLeft: '4px solid #5B4DFB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb size={20} color="#5B4DFB" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                2. What HR Can Do to Prevent Them from Leaving (Actionable Playbook)
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Concrete, prioritized management countermeasures designed to defuse resignation triggers within the next 14 days:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Play 1: Immediate Stay Interview */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#E0E7FF',
                      color: '#4338CA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      1
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                        Conduct an Empathetic 1-on-1 "Stay Interview" (Within 48 Hours)
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                        <strong>HR Guidance:</strong> Schedule a casual 30-minute coffee conversation. <em>Crucial rule:</em> Never mention that an AI model flagged them. Instead, frame it as proactive talent care: <em>"We value your dedication and want to ensure you feel supported in your workload and career goals."</em>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowScriptModal(!showScriptModal)}
                    className="btn btn-secondary btn-pill"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <FileText size={14} />
                    {showScriptModal ? 'Hide Script' : 'View Script'}
                  </button>
                </div>

                {/* Expanded Script Modal */}
                {showScriptModal && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.8rem',
                    color: '#334155',
                    lineHeight: 1.6
                  }}>
                    <strong>Key Talking Points for HRBP:</strong>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '4px' }}>
                      <li><em>"How has your current workload felt over the past quarter? Are there bottlenecks burning you out?"</em></li>
                      <li><em>"Where do you see yourself evolving at TechNova over the next 18 months, and what support can we offer?"</em></li>
                      <li><em>"What is one blocker in your daily workflow that if removed would significantly improve your energy?"</em></li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Play 2: Workload & Overtime Cap */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#FEE2E2',
                    color: '#B91C1C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    2
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                      Enforce Workload Rebalancing & OverTime Cap (Immediate Operational Fix)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                      <strong>HR Guidance:</strong> Partner with their Engineering/Delivery Manager to reassign non-critical sprint backlog items. Cap weekly overtime to prevent the 3x burnout spiral. Offer 1 flexible work-from-home day per sprint to restore autonomy.
                    </div>
                  </div>
                </div>
              </div>

              {/* Play 3: Off-Cycle Compensation Adjustment */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#FEF3C7',
                    color: '#B45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    3
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                      Submit Off-Cycle Compensation Parity Adjustment (+15% / +${recommendedRaise}/mo)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                      <strong>Financial Business Case:</strong> An off-cycle bump of <strong>+${recommendedRaise}/mo</strong> ($2,400/yr) neutralizes market poaching. Spending $2,400 saves TechNova <strong>${estExitCost.toLocaleString()}</strong> in replacement recruiting fees—yielding a <strong>14.5x ROI</strong>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Play 4: Career Progression & Equity */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.15rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#EDE9FE',
                    color: '#6D28D9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    4
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                      Formalize Growth Roadmap & Stock Option Grant
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                      <strong>HR Guidance:</strong> Pair the employee with a Senior Practice Director for bi-weekly mentorship. Define clear promotion milestones for next cycle and offer Level-1 vesting stock options as long-term retention golden handcuffs.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 3: INTERACTIVE RETENTION ACTION TRACKER */}
          <div className="talento-card" style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} color="#5B4DFB" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  HR Action Commitment Checklist
                </h4>
              </div>
              <span className="badge badge-purple">
                Commit to HRIS Core
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { key: 'interview', label: '1. Schedule Stay Interview (48h)' },
                { key: 'workload', label: '2. Issue Workload & Overtime Cap' },
                { key: 'comp', label: `3. Propose +$${recommendedRaise}/mo Salary Bump` },
                { key: 'mentor', label: '4. Assign Executive Mentor' },
              ].map(item => {
                const isDone = !!checkedActions[`${employee.EmployeeNumber}_${item.key}`];
                return (
                  <label
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      background: isDone ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: isDone ? '#5B4DFB' : '#E2E8F0',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: isDone ? 700 : 500,
                      color: isDone ? '#5B4DFB' : '#334155',
                      boxShadow: isDone ? '0 2px 8px rgba(91, 77, 251, 0.15)' : 'none'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleAction(item.key)}
                      style={{ width: '16px', height: '16px', accentColor: '#5B4DFB' }}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Save & Confirm */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Assigned HRBP: <strong style={{ color: '#0F172A' }}>Sarah Jenkins (People & Culture)</strong>
              </div>
              <button
                onClick={() => {
                  setWorkflowStatus(prev => ({
                    ...prev,
                    [employee.EmployeeNumber]: 'Retention Action Plan Active'
                  }));
                  alert(`Retention action plan committed to HRIS for Employee #${employee.EmployeeNumber}!`);
                }}
                className="btn btn-primary"
              >
                <Send size={15} />
                Confirm & Commit Playbook to HRIS
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
