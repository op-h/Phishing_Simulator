'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function NewCampaignForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'EMAIL_PHISHING';

  const [name, setName] = useState('');
  const [type, setType] = useState(initialType);
  const [templateId, setTemplateId] = useState('');
  const [socEmail, setSocEmail] = useState('');
  const [rawEmails, setRawEmails] = useState('');
  const [simulateBotTraffic, setSimulateBotTraffic] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        if (res.ok) {
           const data = await res.json();
           setTemplates(data);
        }
      } catch (err) {
        console.error('Dropdown fetch error', err);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (searchParams.get('type')) {
      setType(searchParams.get('type') as string);
    }
  }, [searchParams]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateId) return alert('Please select a template');
    if (!rawEmails.trim()) return alert('Please provide at least one target');

    setLoading(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, templateId, rawEmails, socEmail, type, simulateBotTraffic })
      });
      
      if (res.ok) {
        router.push('/campaigns');
      } else {
        const err = await res.json();
        alert('Failed to draft campaign: ' + (err.error || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <header style={{ marginBottom: '30px' }}>
        <Link href="/campaigns" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '14px' }}>&lt; Back to Campaigns</Link>
        <h1 style={{ marginTop: '10px' }}>Draft Phishing Campaign</h1>
      </header>

      <form onSubmit={handleCreate} className="glass-panel" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-bright)' }}>Campaign Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="e.g. Q3 Finance Dept Audit" 
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-bright)' }}>Attack Vector</label>
          <select value={type} onChange={e => setType(e.target.value)} required style={inputStyle}>
            <option value="EMAIL_PHISHING">Email Phishing</option>
            <option value="SMISHING">Smishing (SMS)</option>
            <option value="VISHING">Vishing (Voice/WhatsApp)</option>
            <option value="WHALING">Whaling (Targeted Execs)</option>
          </select>
        </div>

        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
             <label style={{ color: 'var(--text-bright)', fontWeight: 'bold' }}>Targets (Emails, Phone Numbers, or Identifiers)</label>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ fontSize: '0.8rem', color: 'var(--accent-neon)' }}>Quick-Add Targets:</span>
               <button 
                 type="button" 
                 onClick={() => {
                   const count = 10;
                   const generated = [];
                   const names = ['ali', 'ahmed', 'fatima', 'zainab', 'omar', 'mustafa', 'sarah', 'noor'];
                   const domains = ['iraq-corp.com', 'baghdad-bank.iq', 'wasit-oil.iq', 'kirkuk-dev.com.iq'];
                   for(let i=0; i<count; i++) {
                     if(type === 'EMAIL_PHISHING' || type === 'WHALING') {
                        const name = names[Math.floor(Math.random()*names.length)];
                        const domain = domains[Math.floor(Math.random()*domains.length)];
                        generated.push(`${name}.${Math.floor(Math.random()*90)+10}@${domain}`);
                     } else {
                        generated.push(`+964 7${Math.floor(Math.random()*3)+7}0 ${Math.floor(Math.random()*900)+100} ${Math.floor(Math.random()*9000)+1000}`);
                     }
                   }
                   setRawEmails(generated.join(', '));
                 }}
                 className="button-neon" 
                 style={{ padding: '4px 10px', fontSize: '0.7rem' }}
               >
                 GENERATE 10
               </button>
               <button 
                 type="button" 
                 onClick={() => {
                   const count = 25;
                   const generated = [];
                   const roles = ['ceo', 'cfo', 'hr', 'finance', 'it.admin', 'info', 'support'];
                   const domains = ['government.iq', 'iq-oil.com', 'basra-trade.iq', 'national-bank.iq'];
                   for(let i=0; i<count; i++) {
                     if(type === 'EMAIL_PHISHING' || type === 'WHALING') {
                        const role = roles[Math.floor(Math.random()*roles.length)];
                        const domain = domains[Math.floor(Math.random()*domains.length)];
                        generated.push(`${role}_${Math.floor(Math.random()*900)+100}@${domain}`);
                     } else {
                        generated.push(`+964 7${Math.floor(Math.random()*3)+7}0 ${Math.floor(Math.random()*900)+100} ${Math.floor(Math.random()*9000)+1000}`);
                     }
                   }
                   setRawEmails(generated.join(', '));
                 }}
                 className="button-neon" 
                 style={{ padding: '4px 10px', fontSize: '0.7rem' }}
               >
                 GENERATE 25
               </button>
             </div>
           </div>
           <textarea
             value={rawEmails}
             onChange={e => setRawEmails(e.target.value)}
             placeholder="john.doe@example.com, +1-555-0100, Executive_Jane..."
             required
             rows={5}
             className="form-input"
             style={{ resize: 'vertical' }}
           />
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderStyle: 'dashed' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={simulateBotTraffic} 
              onChange={e => setSimulateBotTraffic(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-neon)' }} 
            />
            <div>
              <span style={{ color: 'var(--accent-neon)', fontWeight: 'bold' }}>ENABLE BOT INTERACTION SIMULATOR</span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-main)' }}>Randomly simulates 15-40% compromise rate for bot-generated targets after dispatch.</p>
            </div>
          </label>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-bright)' }}>Payload Template</label>
          <select value={templateId} onChange={e => setTemplateId(e.target.value)} required style={inputStyle}>
            <option value="" disabled>Select a Template...</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-bright)' }}>Your SOC Notification List (Where simulated alerts are sent)</label>
          <input 
            type="email" 
            value={socEmail} 
            onChange={e => setSocEmail(e.target.value)} 
            placeholder="soc-admin@company.com" 
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" className="button-neon" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'DRAFTING...' : 'CREATE DRAFT'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid var(--border-light)',
  color: '#fff',
  borderRadius: '4px'
};

export default function NewCampaignPage() {
  return (
    <Suspense fallback={<div className="main-content">Loading Mission Configuration...</div>}>
      <NewCampaignForm />
    </Suspense>
  );
}
