import prisma from '@/lib/prisma';
import Link from 'next/link';
import ClearAnalyticsButton from '@/components/ClearAnalyticsButton';
import DeleteReportButton from '@/components/DeleteReportButton';

const MetricIcons = {
  Delivered: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
  ),
  Exposed: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  ),
  Rate: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  )
};

export default async function GlobalAnalyticsPage() {
  const reports = await prisma.analyticReport.findMany({
    include: { campaign: true },
    orderBy: { generatedAt: 'desc' }
  });

  // Calculate Global Totals
  const totalDelivered = reports.reduce((sum, r) => sum + r.deliveredCount, 0);
  const totalExposed = reports.reduce((sum, r) => sum + r.exposedCount, 0);
  
  const totalSafe = totalDelivered > 0 ? totalDelivered - totalExposed : 0;
  
  const exposureRate = totalDelivered > 0 ? ((totalExposed / totalDelivered) * 100).toFixed(1) : '0.0';
  const safeRate = totalDelivered > 0 ? ((totalSafe / totalDelivered) * 100).toFixed(1) : '0.0';

  return (
    <div className="main-content">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
           <h1>Global SOC Intelligence</h1>
           <p style={{ color: 'var(--text-main)', marginTop: '5px' }}>Organization-wide simulated security posture overview.</p>
        </div>
        <ClearAnalyticsButton />
      </header>

      {/* Global Metric Cards */}
      <div className="grid-cards" style={{ marginBottom: '50px' }}>
        <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-neon)' }}>
           <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>Payloads Delivered</h3>
           <div className="stat-value">{totalDelivered}</div>
        </div>
        <div className="glass-panel" style={{ borderTop: '4px solid var(--error-neon)' }}>
           <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>Exposed Entities</h3>
           <div className="stat-value" style={{ color: 'var(--error-neon)' }}>{totalExposed}</div>
           <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{exposureRate}% FAILURE RATE</div>
        </div>
        <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-secondary)' }}>
           <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>Resilience Factor</h3>
           <div className="stat-value" style={{ color: 'var(--accent-secondary)' }}>{safeRate}%</div>
           <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{totalSafe} TARGETS SECURE</div>
        </div>
      </div>

      {/* Recent Campaign List */}
      <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        Mission Logs
        <span className="badge" style={{ fontSize: '0.6rem' }}>{reports.length} ACTIVE</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {reports.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-main)', letterSpacing: '1px' }}>NO INTELLIGENCE GATHERED. DISPATCH A MISSION TO BEGIN.</p>
          </div>
        ) : reports.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={`/analytics/${r.campaignId}`} style={{ flex: 1, textDecoration: 'none' }}>
                <div className="glass-panel" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '20px 30px',
                  borderLeft: r.exposedCount > 0 ? '4px solid var(--error-neon)' : '4px solid var(--accent-neon)' 
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px', color: 'var(--text-bright)', fontSize: '1.1rem' }}>{r.campaign.name}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {new Date(r.generatedAt).toLocaleDateString()} &bull; {r.campaign.type.replace('_', ' ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-main)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MetricIcons.Delivered /> DELIVERED
                      </div>
                      <div style={{ fontWeight: '900', color: 'var(--text-bright)' }}>{r.deliveredCount}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-main)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MetricIcons.Exposed /> EXPOSED
                      </div>
                      <div style={{ fontWeight: '900', color: r.exposedCount > 0 ? 'var(--error-neon)' : 'var(--text-bright)' }}>{r.exposedCount}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-main)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MetricIcons.Rate /> RATE
                      </div>
                      <div style={{ fontWeight: '900', color: 'var(--accent-neon)' }}>
                        {r.deliveredCount > 0 ? ((r.exposedCount / r.deliveredCount) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <DeleteReportButton campaignId={r.campaignId} />
            </div>
        ))}
      </div>
    </div>
  );
}
