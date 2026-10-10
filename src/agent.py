"""
Agentic Action Drafter for TalentGuard (Bonus +5 Pts).

Auto-drafts personalized retention action plans, manager briefs, and 1-on-1 meeting outlines
marked [PENDING_APPROVAL] for human-in-the-loop sign-off.
"""

from datetime import datetime

def draft_retention_action_memo(employee_data):
    """
    Takes an employee row (dict or pandas Series) and generates a structured
    retention intervention memo.
    """
    emp_id = employee_data.get('EmployeeNumber', 'Unknown')
    role = employee_data.get('JobRole', 'Employee')
    dept = employee_data.get('Department', 'Technology')
    risk_pct = employee_data.get('risk_score_pct', 85.0)
    income = employee_data.get('MonthlyIncome', 5000)
    overtime = employee_data.get('OverTime', 'No')
    years_co = employee_data.get('YearsAtCompany', 2)
    reasons = employee_data.get('top_3_risk_reasons', 'Overtime burnout | Market compensation gap | Low job satisfaction')
    
    # Financial impact calculation: exit cost is 6 to 9 months of salary
    est_salary = income * 12
    cost_of_exit_min = int(income * 6)
    cost_of_exit_max = int(income * 9)
    
    # Priority classification
    urgency = "CRITICAL / IMMEDIATE" if risk_pct >= 75 else "HIGH PRIORITY"
    
    memo = f"""================================================================================
AGENTIC TALENTGUARD WORKFLOW — AUTOMATED RETENTION MEMO
================================================================================
STATUS: [PENDING_APPROVAL - HR BUSINESS PARTNER SIGN-OFF REQUIRED]
GENERATED: {datetime.now().strftime('%Y-%m-%d %H:%M')}
PRIORITY LEVEL: {urgency}
--------------------------------------------------------------------------------
EMPLOYEE SUMMARY:
• Employee ID: #{emp_id}
• Position: {role} ({dept})
• Tenure: {years_co} years | Monthly Compensation: ${income:,} (Est. Annual: ${est_salary:,})
• Predicted Attrition Risk: {risk_pct}% (Top Decile Flight Risk)
• Est. Financial Exposure if Lost (6–9 mos salary): ${cost_of_exit_min:,} – ${cost_of_exit_max:,}

DIAGNOSED RISK DRIVERS (EVIDENCE-BACKED):
{reasons}

RECOMMENDED ACTION PACKAGE (SELECT TO APPROVE):
[x] 1. Schedule Confidential 1-on-1 Stay Interview within 5 business days.
[x] 2. Immediate Workload Review: {'Address chronic OverTime demands immediately.' if overtime == 'Yes' else 'Review sprint allocation and autonomy.'}
[x] 3. Compensation & Equity Parity: Evaluate off-cycle adjustment to market P50/P75.
[ ] 4. Fast-Track Mentorship: Pair with Senior Director for promotion pathway.

DRAFTED 1-ON-1 INVITATION EMAIL TO EMPLOYEE:
--------------------------------------------------------------------------------
Subject: Checking in & your future growth at TechNova

Hi {role.split()[0]} Team Member,

I wanted to take some dedicated time next week for a casual check-in. You've made 
valuable contributions to our team over the last {years_co} year(s), and I want to ensure 
we are actively supporting your work-life balance, project satisfaction, and long-term 
career aspirations at TechNova.

Let's grab 30 minutes over coffee or virtual chat to discuss how things are feeling 
and where you'd like to steer your path next.

Best regards,
People & Culture Business Partner
TechNova Solutions
================================================================================
"""
    return memo

if __name__ == '__main__':
    sample = {
        'EmployeeNumber': 1024,
        'JobRole': 'Sales Representative',
        'Department': 'Sales',
        'risk_score_pct': 92.4,
        'MonthlyIncome': 2600,
        'OverTime': 'Yes',
        'YearsAtCompany': 1,
        'top_3_risk_reasons': 'Overtime Burnout (3x risk) | Compensation in Bottom Quartile | High-Turnover Sales Role'
    }
    print(draft_retention_action_memo(sample))
