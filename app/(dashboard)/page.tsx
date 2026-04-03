import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const activeCampaigns = await prisma.campaign.count({
    where: { status: 'ACTIVE' }
  });
  
  const totalExposures = await prisma.analyticReport.aggregate({
    _sum: { exposedCount: true }
  });

  const campaignsByType = await prisma.campaign.groupBy({
    by: ['type'],
    _count: { _all: true }
  });

  return (
    <div className="main-content">
      <header style={{ marginBottom: '40px' }}>
        <h1>SOC Command Center</h1>
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Simulation Platform Monitor & Operations</p>
      </header>
      
      <div className="grid-cards">
        <div className="glass-panel">
          <h3>Active Missions</h3>
          <div className="stat-value">{activeCampaigns}</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Across all attack vectors</p>
          <Link href="/campaigns" className="button-neon" style={{marginTop: '20px'}}>Orchestration</Link>
        </div>

        <div className="glass-panel">
          <h3>Total Compromised</h3>
          <div className="stat-value" style={{color: "var(--error-neon)"}}>{totalExposures._sum.exposedCount || 0}</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Cumulative vulnerability index</p>
          <Link href="/analytics" className="button-neon" style={{marginTop: '20px', borderColor: 'var(--error-neon)', color: 'var(--error-neon)'}}>Threat Intel</Link>
        </div>

        <div className="glass-panel" style={{ gridColumn: 'span 1' }}>
          <h3>Attack Distribution</h3>
          <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
             {campaignsByType.map(c => (
               <div key={c.type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                 <span style={{ color: 'var(--text-main)' }}>{c.type.replace('_', ' ')}</span>
                 <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>{c._count._all}</span>
               </div>
             ))}
             {campaignsByType.length === 0 && <p style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>No data available yet.</p>}
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '50px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        Quick Dispatch
        <span className="badge" style={{ fontSize: '0.6rem', borderStyle: 'dashed' }}>READY</span>
      </h2>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <Link href="/campaigns/new?type=EMAIL_PHISHING" className="glass-panel" style={{ textDecoration: 'none', textAlign: 'center', borderBottom: '4px solid var(--accent-secondary)' }}>
          <div style={{ color: 'var(--accent-secondary)', marginBottom: '15px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <h4 style={{ margin: 0, letterSpacing: '1px' }}>NEW PHISH</h4>
        </Link>
        <Link href="/campaigns/new?type=SMISHING" className="glass-panel" style={{ textDecoration: 'none', textAlign: 'center', borderBottom: '4px solid var(--warning-neon)' }}>
          <div style={{ color: 'var(--warning-neon)', marginBottom: '15px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          </div>
          <h4 style={{ margin: 0, letterSpacing: '1px' }}>NEW SMISH</h4>
        </Link>
        <Link href="/campaigns/new?type=VISHING" className="glass-panel" style={{ textDecoration: 'none', textAlign: 'center', borderBottom: '4px solid var(--error-neon)' }}>
          <div style={{ color: 'var(--error-neon)', marginBottom: '15px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <h4 style={{ margin: 0, letterSpacing: '1px' }}>NEW VISH</h4>
        </Link>
        <Link href="/campaigns/new?type=WHALING" className="glass-panel" style={{ textDecoration: 'none', textAlign: 'center', borderBottom: '4px solid #b400ff' }}>
          <div style={{ color: '#b400ff', marginBottom: '15px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          </div>
          <h4 style={{ margin: 0, letterSpacing: '1px' }}>NEW WHALE</h4>
        </Link>
      </div>
    </div>
  );
}
