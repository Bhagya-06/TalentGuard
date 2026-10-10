"""
Exports cleaned dataset, Top-50 watchlist, and summary statistics to frontend JSON.
"""

import os
import json
import pandas as pd
import numpy as np

def export_data_for_frontend():
    os.makedirs('frontend/src/data', exist_ok=True)
    
    # Load top 50
    top50_df = pd.read_csv('artifacts/top50_watchlist.csv')
    top50_list = top50_df.to_dict(orient='records')
    
    # Load full dataset for macro analytics
    raw_df = pd.read_csv('data/WA_Fn-UseC_-HR-Employee-Attrition.csv')
    
    # OverTime stats
    ot_stats = raw_df.groupby('OverTime')['Attrition'].value_counts(normalize=True).unstack() * 100
    ot_data = [
        {"status": "Works OverTime (Yes)", "attritionRate": round(float(ot_stats.loc['Yes', 'Yes']), 1), "count": int((raw_df['OverTime']=='Yes').sum()), "color": "#F43F5E"},
        {"status": "Standard Hours (No)", "attritionRate": round(float(ot_stats.loc['No', 'Yes']), 1), "count": int((raw_df['OverTime']=='No').sum()), "color": "#10B981"}
    ]
    
    # Role stats
    role_summary = raw_df.groupby('JobRole')['Attrition'].apply(lambda x: (x == 'Yes').mean() * 100).sort_values(ascending=False)
    role_data = [{"role": role, "rate": round(float(rate), 1)} for role, rate in role_summary.items()]
    
    # Department stats
    dept_summary = raw_df.groupby('Department')['Attrition'].apply(lambda x: (x == 'Yes').mean() * 100).sort_values(ascending=False)
    dept_data = [{"dept": dept, "rate": round(float(rate), 1), "count": int((raw_df['Department']==dept).sum())} for dept, rate in dept_summary.items()]
    
    # Model metrics
    with open('artifacts/model_metrics.json', 'r') as f:
        metrics = json.load(f)
        
    frontend_payload = {
        "metadata": {
            "client": "TechNova Solutions",
            "workforce": 12000,
            "annualTurnover": 16.1,
            "costPerExit": 47600,
            "monthlyQuota": 50,
            "precisionAt50": 96.0,
            "updatedAt": "2026-10-10"
        },
        "top50Watchlist": top50_list,
        "analytics": {
            "overtime": ot_data,
            "roles": role_data,
            "departments": dept_data
        },
        "models": metrics
    }
    
    with open('frontend/src/data/retentionData.json', 'w') as f:
        json.dump(frontend_payload, f, indent=2)
        
    print("Frontend data exported successfully to frontend/src/data/retentionData.json!")

if __name__ == '__main__':
    export_data_for_frontend()
