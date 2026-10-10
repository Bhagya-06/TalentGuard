import React, { useState } from 'react';
import { AlertCircle, BriefcaseBusiness, ShieldCheck } from 'lucide-react';

export default function AuthScreen({ onLogin, error, appName = 'IBM HR Retention Monitor' }) {
  const [email, setEmail] = useState(import.meta.env.VITE_AUTH_EMAIL || 'test@company.com');
  const [password, setPassword] = useState('123456');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');

    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter your email and password.');
      return;
    }

    setSubmitting(true);
    const success = onLogin(email, password);
    setSubmitting(false);

    if (!success) {
      setLocalError(error || 'Unable to sign in. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'radial-gradient(circle at top, rgba(91,110,225,0.14), transparent 24%), #f3efe8',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '980px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(93,108,131,0.12)',
        borderRadius: '28px',
        boxShadow: '0 24px 50px rgba(76, 91, 112, 0.10)',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f4f7ff 0%, #eef4ff 100%)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #5b6ee1 0%, #7a9cff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 14px 24px rgba(91,110,225,0.25)'
            }}>
              <BriefcaseBusiness size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2d3d' }}>{appName}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#6a7a8f', textTransform: 'uppercase' }}>
                Workforce risk
              </div>
            </div>
          </div>

          <div style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.15, color: '#1f2d3d', marginBottom: '0.9rem' }}>
            Keep your team strong before issues grow.
          </div>

          <p style={{ fontSize: '0.98rem', color: '#42516a', maxWidth: '440px', lineHeight: 1.7 }}>
            Spot risk early, support your people with clear actions, and keep HR follow-ups focused, calm, and timely.
          </p>

          <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(93,108,131,0.12)', borderRadius: '12px', padding: '0.7rem 0.9rem', color: '#42516a', fontSize: '0.82rem' }}>
              <ShieldCheck size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Secure HR access
            </div>
            <div style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(93,108,131,0.12)', borderRadius: '12px', padding: '0.7rem 0.9rem', color: '#42516a', fontSize: '0.82rem' }}>
              <ShieldCheck size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Fast action planning
            </div>
          </div>
        </div>

        <div style={{ padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '370px' }}>
            <div style={{ marginBottom: '1.4rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#6a7a8f', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                Sign in
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1f2d3d', margin: 0 }}>Welcome back</h2>
            </div>

            {(error || localError) && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 0.9rem',
                borderRadius: '12px',
                background: 'rgba(217, 98, 98, 0.08)',
                border: '1px solid rgba(191, 59, 59, 0.18)',
                color: '#9d2b2b',
                fontSize: '0.82rem',
                marginBottom: '1rem'
              }}>
                <AlertCircle size={15} />
                {error || localError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: '#42516a', fontWeight: 600 }}>
                Work email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-control"
                  placeholder="Email address"
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: '#42516a', fontWeight: 600 }}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-control"
                  placeholder="Enter password"
                />
              </label>

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.9rem 1rem' }}>
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6a7a8f', textAlign: 'center', lineHeight: 1.6 }}>
              Set VITE_AUTH_EMAIL and VITE_AUTH_PASSWORD in your .env file to enable sign-in.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
