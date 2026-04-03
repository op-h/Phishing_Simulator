export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CampaignReportPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const resolvedParams = await params;
  const campaign = await prisma.campaign.findUnique({
    where: { id: resolvedParams.campaignId },
    include: { template: true },
  });

  if (!campaign) {
    notFound();
  }

  const report = await prisma.analyticReport.findUnique({
    where: { campaignId: campaign.id }
  });

  // Pull individual target exposure logs
  const exposureEvents = await prisma.exposureEvent.findMany({
    where: { campaignId: campaign.id },
    include: { target: true },
    orderBy: { createdAt: 'asc' }
  });

  // Calculate detailed metrics
  const delivered = report?.deliveredCount || 0;
  const exposed = report?.exposedCount || 0;
  const safe = delivered - exposed;
  const exposureRate = delivered > 0 ? ((exposed / delivered) * 100).toFixed(1) : '0';
  const safeRate = delivered > 0 ? ((safe / delivered) * 100).toFixed(1) : '0';

  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <Link href="/analytics" style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>&lt; Back to Global Analytics</Link>
          <h1 style={{ marginTop: '10px', marginBottom: '5px' }}>{campaign.name} Report</h1>
          <p style={{ margin: 0, color: 'var(--text-main)' }}>Template: {campaign.template.name}</p>
        </div>
        <a href={`/api/analytics/${campaign.id}/export`} target="_blank" className="button-neon">
          Export CSV
        </a>
      </header>

      {/* Progress Bars (Hack The Box vibes) */}
      <div className="glass-panel" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Exposure Breakdown</h2>
        
        {/* Safe Bar */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--success-neon)' }}>Resilient Targets ({safe})</span>
            <span>{safeRate}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${safeRate}%`, height: '100%', background: 'var(--success-neon)' }} />
          </div>
        </div>

        {/* Exposed Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--error-neon)' }}>Exposed Targets ({exposed})</span>
            <span>{exposureRate}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${exposureRate}%`, height: '100%', background: 'var(--error-neon)', boxShadow: '0 0 10px var(--error-neon)' }} />
          </div>
        </div>
      </div>

      {/* Exposure Event Table */}
      <h2 style={{ marginTop: '50px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--error-neon)' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        Target Activity Log (<span style={{ color: 'var(--error-neon)' }}>{exposureEvents.length} EXPOSED</span>)
      </h2>
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', marginTop: '20px' }}>
        {exposureEvents.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '20px 15px' }}>TARGET ENTITY</th>
                <th style={{ padding: '20px 15px' }}>IDENTITY / ROLE</th>
                <th style={{ padding: '20px 15px' }}>TIMESTAMP</th>
                <th style={{ padding: '20px 15px' }}>SOURCE IP</th>
                <th style={{ padding: '20px 15px' }}>DEVICE / AGENT</th>
              </tr>
            </thead>
            <tbody>
              {exposureEvents.map(event => (
                <tr key={event.id} className="report-row">
                  <td style={{ padding: '20px 15px', color: 'var(--error-neon)', fontWeight: 'bold' }}>
                    {event.target.phone || event.target.email || event.targetId}
                  </td>
                  <td style={{ padding: '20px 15px' }}>{event.target.name || event.target.phone || 'Unknown'}</td>
                  <td style={{ padding: '20px 15px', fontSize: '0.85rem' }}>{new Date(event.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '20px 15px', fontSize: '0.9rem', color: 'var(--text-main)', fontFamily: 'monoscape' }}>{event.ipAddress || '127.0.0.1'}</td>
                  <td style={{ padding: '20px 15px', fontSize: '0.75rem', color: 'var(--text-main)', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {event.userAgent || 'Unknown'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--accent-neon)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛡️</div>
            <p style={{ letterSpacing: '2px', fontWeight: 'bold' }}>ZERO COMPROMISES DETECTED. DEFENSES ARE HOLDING.</p>
          </div>
        )}
      </div>
    </div>
  );
}
