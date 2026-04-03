'use client';

import React, { useState } from 'react';

export default function MetaLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '980px', justifyContent: 'space-between', padding: '20px' }}>
        
        {/* Left column - branding */}
        <div style={{ flex: 1, paddingRight: '32px', paddingTop: '4vh', display: 'none', '@media (min-width: 900px)': { display: 'block' } } as React.CSSProperties}>
          <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook" style={{ width: '300px', marginLeft: '-28px', marginBottom: '-10px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 'normal', lineHeight: '32px', color: '#1c1e21' }}>
            Connect with friends and the world around you on Facebook.
          </h2>
        </div>

        {/* Right column - form */}
        <div style={{ width: '396px', maxWidth: '100%' }}>
          <div style={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)', boxSizing: 'border-box', padding: '20px 0 28px', width: '100%' }}>
            <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
              <input type="hidden" name="campaignId" value={campaignId} />
              <input type="hidden" name="targetId" value={targetId} />
              <input type="hidden" name="type" value="PHISHING" />

              <input 
                type="text" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone number"
                required
                style={{
                  fontSize: '17px',
                  padding: '14px 16px',
                  border: '1px solid #dddfe2',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  outline: 'none'
                }}
              />
              
              {/* Fake password field just for realism - ignored by backend */}
              <input 
                type="password" 
                placeholder="Password"
                required
                style={{
                  fontSize: '17px',
                  padding: '14px 16px',
                  border: '1px solid #dddfe2',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  outline: 'none'
                }}
              />

              <button 
                type="submit"
                style={{
                  backgroundColor: '#0866ff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '20px',
                  lineHeight: '48px',
                  padding: '0 16px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                Log In
              </button>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <a href="#" style={{ color: '#0866ff', fontSize: '14px', textDecoration: 'none' }}>Forgot password?</a>
              </div>

              <hr style={{ border: '0', borderBottom: '1px solid #dadde1', margin: '20px 0' }} />

              <div style={{ textAlign: 'center' }}>
                <a href="#" style={{
                  display: 'inline-block',
                  backgroundColor: '#42b72a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '17px',
                  lineHeight: '48px',
                  padding: '0 16px',
                  fontWeight: 'bold',
                  textDecoration: 'none'
                }}>
                  Create new account
                </a>
              </div>
            </form>
          </div>
          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '14px', color: '#1c1e21' }}>
            <a href="#" style={{ color: '#1c1e21', textDecoration: 'none', fontWeight: 'bold' }}>Create a Page</a> for a celebrity, brand or business.
          </div>
        </div>
      </div>
    </div>
  );
}
