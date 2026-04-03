export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DispatchButton from './DispatchButton';
import DeleteCampaignButton from '@/components/DeleteCampaignButton';

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    include: { template: true, analyticReport: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Active Campaigns</h1>
          <p>Manage and orchestrate Phishing, Vishing, and Smishing campaigns.</p>
        </div>
        <Link href="/campaigns/new" className="button-neon">
          + Draft Campaign
        </Link>
      </header>

      <div className="grid-cards" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-bright)' }}>{campaign.name}</h3>
                <span style={{ 
                  background: campaign.status === 'ACTIVE' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(102, 252, 241, 0.1)', 
                  color: campaign.status === 'ACTIVE' ? 'var(--success-neon)' : 'var(--text-bright)', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  border: `1px solid ${campaign.status === 'ACTIVE' ? 'var(--success-neon)' : 'var(--border-light)'}`
                }}>
                  {campaign.status}
                </span>
                
                <span className={`badge ${
                  (campaign as any).type === 'EMAIL_PHISHING' ? 'badge-phishing' :
                  (campaign as any).type === 'SMISHING' ? 'badge-smishing' :
                  (campaign as any).type === 'VISHING' ? 'badge-vishing' :
                  'badge-whaling'
                }`}>
                  {(campaign as any).type.replace('_', ' ')}
                </span>
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', margin: '0 0 10px' }}>
                Template: <strong>{campaign.template?.name || 'Unknown'}</strong> | Selected Targets: {(() => {
                  try { return JSON.parse(campaign.targetEmails).length; } catch { return 0; }
                })()} 
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
               {campaign.status === 'DRAFT' && (
                 <DispatchButton campaignId={campaign.id} />
               )}
               <Link 
                 href={`/sim/preview/${campaign.templateId}?type=${(campaign as any).type}`} 
                 target="_blank" 
                 className="button-neon" 
                 style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}
               >
                 TEST PAYLOAD
               </Link>
               {campaign.status === 'ACTIVE' && (
                 <Link href={`/analytics/${campaign.id}`} className="button-neon" style={{ borderColor: 'var(--success-neon)', color: 'var(--success-neon)' }}>
                   RESULTS
                 </Link>
               )}
               <DeleteCampaignButton campaignId={campaign.id} />
            </div>
          </div>
        ))}

        {campaigns.length === 0 && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>No campaigns drafted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
