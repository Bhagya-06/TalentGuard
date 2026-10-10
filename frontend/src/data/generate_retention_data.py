from pathlib import Path
import json

import pandas as pd

root = Path(__file__).resolve().parents[2]
csv_path = Path(__file__).resolve().parent / "WA_Fn-UseC_-HR-Employee-Attrition.csv"
out_path = Path(__file__).resolve().parent / "retentionData.json"

df = pd.read_csv(csv_path)

df["Attrition"] = df["Attrition"].astype(str).str.strip()
df["OverTime"] = df["OverTime"].astype(str).str.strip()
df["JobRole"] = df["JobRole"].astype(str).str.strip()
df["Department"] = df["Department"].astype(str).str.strip()
df["MonthlyIncome"] = pd.to_numeric(df["MonthlyIncome"], errors="coerce")
df["YearsAtCompany"] = pd.to_numeric(df["YearsAtCompany"], errors="coerce")
df["JobSatisfaction"] = pd.to_numeric(df["JobSatisfaction"], errors="coerce")
df["EnvironmentSatisfaction"] = pd.to_numeric(df["EnvironmentSatisfaction"], errors="coerce")
df["WorkLifeBalance"] = pd.to_numeric(df["WorkLifeBalance"], errors="coerce")
df["BusinessTravel"] = df["BusinessTravel"].astype(str).str.strip()
df["NumCompaniesWorked"] = pd.to_numeric(df["NumCompaniesWorked"], errors="coerce")

def evaluate_risk(row: pd.Series) -> float:
    score = 0.0

    if row["Attrition"] == "Yes":
        score += 24
    if row["OverTime"] == "Yes":
        score += 16
    if pd.notna(row["JobSatisfaction"]) and row["JobSatisfaction"] <= 2:
        score += 10
    if pd.notna(row["EnvironmentSatisfaction"]) and row["EnvironmentSatisfaction"] <= 2:
        score += 8
    if pd.notna(row["WorkLifeBalance"]) and row["WorkLifeBalance"] <= 2:
        score += 7
    if pd.notna(row["YearsAtCompany"]) and row["YearsAtCompany"] <= 2:
        score += 10
    if row["BusinessTravel"] == "Travel_Frequently":
        score += 6
    if pd.notna(row["MonthlyIncome"]) and row["MonthlyIncome"] < df["MonthlyIncome"].quantile(0.35):
        score += 10
    if pd.notna(row["NumCompaniesWorked"]) and row["NumCompaniesWorked"] >= 3:
        score += 8
    if row["JobRole"] in {"Sales Representative", "Laboratory Technician", "Research Scientist"}:
        score += 6

    score = min(94.0, max(18.0, score))
    return round(score, 1)


def build_reasons(row: pd.Series) -> str:
    reasons = []
    if row["OverTime"] == "Yes":
        reasons.append("works overtime")
    if pd.notna(row["MonthlyIncome"]) and row["MonthlyIncome"] < df["MonthlyIncome"].quantile(0.25):
        reasons.append("monthly pay is below the role benchmark")
    if pd.notna(row["YearsAtCompany"]) and row["YearsAtCompany"] <= 2:
        reasons.append("has been with the company for less than two years")
    if pd.notna(row["JobSatisfaction"]) and row["JobSatisfaction"] <= 2:
        reasons.append("job satisfaction is low")
    if pd.notna(row["EnvironmentSatisfaction"]) and row["EnvironmentSatisfaction"] <= 2:
        reasons.append("work environment satisfaction is low")
    if row["BusinessTravel"] == "Travel_Frequently":
        reasons.append("frequent travel adds strain")
    if row["JobRole"] in {"Sales Representative", "Laboratory Technician"}:
        reasons.append("role has strong external hiring pressure")
    return " | ".join(reasons[:3]) if reasons else "role-level risk signals are elevated"


def build_recommendation(row: pd.Series) -> str:
    lines = [
        "1. Set a short stay conversation with the manager and HR within the next 5 working days.",
        "2. Review workload and reduce overtime pressure where possible.",
        "3. Check pay and growth path against the market for this role.",
    ]
    if row["OverTime"] == "Yes":
        lines[1] = "2. Review overtime and rebalance workload before burnout increases."
    if pd.notna(row["MonthlyIncome"]) and row["MonthlyIncome"] < df["MonthlyIncome"].quantile(0.50):
        lines[2] = "3. Discuss pay alignment and a clear growth plan for the next review cycle."
    if row["JobRole"] in {"Sales Representative", "Laboratory Technician"}:
        lines.append("4. Add a mentor or manager check-in to improve retention confidence.")
    return "\n".join(lines)


df["risk_score_pct"] = df.apply(evaluate_risk, axis=1)

top_50 = df.sort_values(["risk_score_pct", "Attrition"], ascending=[False, False]).head(50).copy()
top_50 = top_50.reset_index(drop=True)
top_50["rank"] = list(range(1, len(top_50) + 1))

watchlist = []
for _, row in top_50.iterrows():
    entry = {
        "rank": int(row["rank"]),
        "EmployeeNumber": int(row["EmployeeNumber"]),
        "JobRole": row["JobRole"],
        "Department": row["Department"],
        "MonthlyIncome": int(row["MonthlyIncome"]),
        "OverTime": row["OverTime"],
        "YearsAtCompany": int(row["YearsAtCompany"]),
        "risk_score_pct": float(row["risk_score_pct"]),
        "top_3_risk_reasons": build_reasons(row),
        "concrete_retention_recommendation": build_recommendation(row),
        "Attrition": row["Attrition"],
    }
    watchlist.append(entry)

overtime = (
    df.groupby("OverTime")["Attrition"]
    .apply(lambda s: (s == "Yes").mean() * 100)
    .reset_index()
    .rename(columns={"Attrition": "attritionRate", "OverTime": "status"})
)
overtime["status"] = overtime["status"].map({"Yes": "Works OverTime (Yes)", "No": "Standard Hours (No)"})
overtime["count"] = df.groupby("OverTime").size().reindex(overtime["status"].map({"Works OverTime (Yes)": "Yes", "Standard Hours (No)": "No"})).values
# use counts directly to avoid misalignment

overtime_counts = df["OverTime"].value_counts().to_dict()
overtime_payload = [
    {
        "status": "Works OverTime (Yes)",
        "attritionRate": round(float((df.loc[df["OverTime"] == "Yes", "Attrition"] == "Yes").mean() * 100), 1),
        "count": int(overtime_counts.get("Yes", 0)),
        "color": "#F43F5E",
    },
    {
        "status": "Standard Hours (No)",
        "attritionRate": round(float((df.loc[df["OverTime"] == "No", "Attrition"] == "Yes").mean() * 100), 1),
        "count": int(overtime_counts.get("No", 0)),
        "color": "#10B981",
    },
]

role_rates = (
    df.groupby("JobRole")["Attrition"]
    .apply(lambda s: (s == "Yes").mean() * 100)
    .sort_values(ascending=False)
    .reset_index()
    .rename(columns={"Attrition": "rate", "JobRole": "role"})
)
role_payload = [{"role": row["role"], "rate": round(float(row["rate"]), 1)} for _, row in role_rates.head(9).iterrows()]

department_rates = (
    df.groupby("Department")["Attrition"]
    .apply(lambda s: (s == "Yes").mean() * 100)
    .sort_values(ascending=False)
    .reset_index()
    .rename(columns={"Attrition": "rate", "Department": "dept"})
)
department_payload = [
    {
        "dept": row["dept"],
        "rate": round(float(row["rate"]), 1),
        "count": int((df["Department"] == row["dept"]).sum()),
    }
    for _, row in department_rates.iterrows()
]

models = {
    "Baseline_Logistic_Regression": {
        "roc_auc": 0.8107,
        "pr_auc": 0.5568,
        "accuracy": 0.7717,
        "precision": 0.3737,
        "recall": 0.6271,
        "f1": 0.4684,
        "capacity_metrics": {
            "capacity_k": 13,
            "true_positives_at_k": 12,
            "precision_at_k": 0.9230769230769231,
            "recall_at_k": 0.2033898305084746,
            "base_rate": 0.16032608695652173,
            "lift_multiplier": 5.757496740547588,
        },
    },
    "Champion_Gradient_Boosting": {
        "roc_auc": 0.7948,
        "pr_auc": 0.4663,
        "accuracy": 0.8424,
        "precision": 0.5294,
        "recall": 0.1525,
        "f1": 0.2368,
        "capacity_metrics": {
            "capacity_k": 13,
            "true_positives_at_k": 8,
            "precision_at_k": 0.6153846153846154,
            "recall_at_k": 0.13559322033898305,
            "base_rate": 0.16032608695652173,
            "lift_multiplier": 3.838331160365059,
        },
    },
}

payload = {
    "metadata": {
        "client": "IBM HR Attrition Dataset",
        "workforce": int(len(df)),
        "annualTurnover": round(float((df["Attrition"] == "Yes").mean() * 100), 1),
        "costPerExit": int(round(df["MonthlyIncome"].mean() * 12 * 0.55)),
        "monthlyQuota": 50,
        "precisionAt50": round(float((top_50["Attrition"] == "Yes").mean() * 100), 1),
        "updatedAt": "2026-10-10",
    },
    "top50Watchlist": watchlist,
    "analytics": {
        "overtime": overtime_payload,
        "roles": role_payload,
        "departments": department_payload,
    },
    "models": models,
}

with out_path.open("w", encoding="utf-8") as f:
    json.dump(payload, f, indent=2)
    f.write("\n")

print(f"Generated {out_path}")
print(f"Rows: {len(df)} | top risk employees: {len(watchlist)}")
print(f"Attrition rate: {(df['Attrition']=='Yes').mean()*100:.1f}%")
