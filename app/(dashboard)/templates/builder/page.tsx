'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VisualTemplateBuilderPage() {
  const [templateName, setTemplateName] = useState('');
  const [htmlCode, setHtmlCode] = useState('<div style="text-align: center; padding: 40px; font-family: sans-serif;">\n  <h1>Login Required</h1>\n  <p>Please enter your credentials below.</p>\n  <!-- DO NOT RENAME campaignId/targetId/type -->\n  <form method="POST" action="/api/capture" style="display: flex; flex-direction: column; max-width: 300px; margin: 0 auto; gap: 10px;">\n    <input type="hidden" name="campaignId" value="{campaignId}" />\n    <input type="hidden" name="targetId" value="{targetId}" />\n    <input type="hidden" name="type" value="PHISHING" />\n    <input type="email" name="email" placeholder="Email" required style="padding: 10px;" />\n    <input type="password" name="password" placeholder="Password" style="padding: 10px;" />\n    <button type="submit" style="background: #007bff; color: #fff; border: none; padding: 10px;">Sign In</button>\n  </form>\n</div>');

  // In a real advanced builder, this would use a drag-and-drop framework like GrapesJS or Craft.js.
  // For the simulator UI, we present a robust live-preview editor to craft zero-day custom templates.
  
  const handleSave = async () => {
    if (!templateName) return alert('Provide a template name');
    alert('Template saved to backend successfully! (Mocked for dashboard UI flow)');
    // This would POST to `/api/templates` to create the new database generic HTML template record.
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
           <Link href="/templates" style={{ color: 'var(--text-main)', fontSize: '14px', textDecoration: 'none' }}>&lt; Back to Templates</Link>
           <h1 style={{ margin: '10px 0 0' }}>Visual Template Builder</h1>
           <p style={{ margin: 0 }}>Design zero-day, company-specific phishing payloads rapidly.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
           <input 
             type="text" 
             placeholder="Template Name (e.g. AcmeCorp Portal)" 
             value={templateName}
             onChange={e => setTemplateName(e.target.value)}
             style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-light)', color: '#fff' }}
           />
           <button className="button-neon" onClick={handleSave}>Save Custom Template</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, gap: '20px', overflow: 'hidden' }}>
        {/* Editor Pane */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0' }}>
           <div style={{ padding: '15px', borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.05)', fontWeight: 'bold' }}>
             HTML / Drag-and-Drop Structure Output
           </div>
           <textarea 
             value={htmlCode}
             onChange={(e) => setHtmlCode(e.target.value)}
             style={{ 
               flex: 1, 
               width: '100%', 
               background: '#0b0c10', 
               color: '#00ff88', 
               fontFamily: 'monospace', 
               padding: '20px', 
               border: 'none', 
               outline: 'none', 
               resize: 'none' 
             }}
           />
        </div>

        {/* Live Preview Pane */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, backgroundColor: '#fff' }}>
           <div style={{ padding: '15px', borderBottom: '1px solid #ccc', background: '#f5f5f5', color: '#000', fontWeight: 'bold' }}>
             Live Victim Preview (Simulated Browser)
           </div>
           <div 
             style={{ flex: 1, padding: '20px', color: '#000', overflowY: 'auto' }}
             dangerouslySetInnerHTML={{ __html: htmlCode }}
           />
        </div>
      </div>
    </div>
  );
}
