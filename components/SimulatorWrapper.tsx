import React from 'react';

export default function SimulatorWrapper({ type, children }: { type: string, children: React.ReactNode }) {
  if (type === 'SMISHING' || type === 'VISHING') {
    return (
      <div style={{ backgroundColor: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        {/* Mobile Device Frame */}
        <div style={{
          width: '375px',
          height: '812px',
          backgroundColor: '#000',
          borderRadius: '40px',
          border: '12px solid #222',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          {/* Notch */}
          <div style={{
             position: 'absolute',
             top: 0,
             left: '50%',
             transform: 'translateX(-50%)',
             width: '150px',
             height: '30px',
             backgroundColor: '#222',
             borderBottomLeftRadius: '20px',
             borderBottomRightRadius: '20px',
             zIndex: 50
          }} />
          
          <div style={{ height: '100%', overflowY: 'auto', backgroundColor: '#fff' }}>
             {children}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Frame for Phishing / Whaling
  return (
    <div style={{ backgroundColor: '#222', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #444',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Browser Mock Header */}
        <div style={{ backgroundColor: '#e2e2e2', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #ccc' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
            https://secure-login.portal-validation.com/auth
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
