import React from 'react';
import { Users, TrendingDown, DollarSign, Target } from 'lucide-react';

export default function KpiBento({ metadata }) {
  const cards = [
    {
      label: 'Active Workforce',
      value: metadata.workforce.toLocaleString(),
      sub: '↑ 98.4% Monitored Nodes',
      subColor: '#34D399',
      borderGrad: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
      icon: Users
    },
    {
      label: 'Annual Turnover Rate',
      value: `${metadata.annualTurnover}%`,
      sub: `~${Math.round(metadata.workforce * (metadata.annualTurnover/100)).toLocaleString()} Annual Exits`,
      subColor: '#FB7185',
      borderGrad: 'linear-gradient(90deg, #F43F5E, #FB7185)',
      icon: TrendingDown
    },
    {
      label: 'Financial Exposure',
      value: `$${((metadata.workforce * (metadata.annualTurnover/100) * metadata.costPerExit)/1e6).toFixed(1)}M`,
      sub: `Avg $${metadata.costPerExit.toLocaleString()} / Exit Cost`,
      subColor: '#94A3B8',
      borderGrad: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
      icon: DollarSign
    },
    {
      label: 'HR Monthly Quota',
      value: `${metadata.monthlyQuota} Max`,
      sub: `Precision@50: ${metadata.precisionAt50}% Lift`,
      subColor: '#38BDF8',
      borderGrad: 'linear-gradient(90deg, #10B981, #34D399)',
      icon: Target
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginBottom: '1.75rem'
    }}>
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="glass-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '1.25rem 1.4rem'
            }}
          >
            {/* Top Gradient Border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: c.borderGrad
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  marginBottom: '0.35rem'
                }}>
                  {c.label}
                </div>
                <div style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  lineHeight: 1.1
                }}>
                  {c.value}
                </div>
              </div>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <Icon size={18} color="#94A3B8" />
              </div>
            </div>

            <div style={{
              fontSize: '0.78rem',
              color: c.subColor,
              fontWeight: 500,
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              {c.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
