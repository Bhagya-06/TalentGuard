"""
Data Preparation & Pipeline Hygiene for TalentGuard (P1).

TRAPS HANDLED:
1. EmployeeNumber: Unique ID column that causes artificial memorization -> DROPPED.
2. Constants: EmployeeCount (always 1), StandardHours (always 80), Over18 (always 'Y') -> DROPPED.
3. Imbalance Handling: 16.1% base attrition rate. We use stratified splitting to guarantee
   identical train/test distribution without leaking test fold statistics.
"""

import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

DROP_COLUMNS = ['EmployeeNumber', 'EmployeeCount', 'StandardHours', 'Over18']
TARGET_COL = 'Attrition'

def load_and_clean_data(filepath='data/WA_Fn-UseC_-HR-Employee-Attrition.csv'):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")
    
    df = pd.read_csv(filepath)
    
    # Audit traps before dropping
    trap_report = {
        'total_rows': len(df),
        'total_cols_initial': len(df.columns),
        'id_column_dropped': 'EmployeeNumber' in df.columns,
        'constants_dropped': [c for c in ['EmployeeCount', 'StandardHours', 'Over18'] if c in df.columns],
        'base_attrition_count': int((df[TARGET_COL] == 'Yes').sum()),
        'base_attrition_rate': float((df[TARGET_COL] == 'Yes').mean())
    }
    
    # Keep track of employee identifier for final artifact linking
    employee_ids = df['EmployeeNumber'] if 'EmployeeNumber' in df.columns else pd.Series(range(len(df)))
    
    # Drop traps
    cleaned_df = df.drop(columns=[c for c in DROP_COLUMNS if c in df.columns], errors='ignore').copy()
    
    # Target encoding
    cleaned_df['target'] = (cleaned_df[TARGET_COL] == 'Yes').astype(int)
    cleaned_df = cleaned_df.drop(columns=[TARGET_COL])
    
    # Separate features and target
    X = cleaned_df.drop(columns=['target'])
    y = cleaned_df['target']
    
    categorical_cols = X.select_dtypes(include=['object', 'category']).columns.tolist()
    numerical_cols = X.select_dtypes(include=[np.number]).columns.tolist()
    
    return X, y, employee_ids, categorical_cols, numerical_cols, trap_report

def get_train_test_split(test_size=0.25, random_state=42):
    X, y, emp_ids, cat_cols, num_cols, report = load_and_clean_data()
    
    X_train, X_test, y_train, y_test, id_train, id_test = train_test_split(
        X, y, emp_ids, test_size=test_size, random_state=random_state, stratify=y
    )
    
    return {
        'X_train': X_train,
        'X_test': X_test,
        'y_train': y_train,
        'y_test': y_test,
        'id_train': id_train,
        'id_test': id_test,
        'cat_cols': cat_cols,
        'num_cols': num_cols,
        'report': report
    }

if __name__ == '__main__':
    data = get_train_test_split()
    print("Data loaded successfully!")
    print(f"Train shape: {data['X_train'].shape}, Test shape: {data['X_test'].shape}")
    print(f"Report: {data['report']}")
