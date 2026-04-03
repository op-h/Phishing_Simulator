import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Safely extract ONLY identifiers.
    const campaignId = formData.get('campaignId') as string;
    const targetId = formData.get('targetId') as string;

    if (!campaignId || !targetId) {
      // If preview mode, just redirect safely
      if (campaignId === 'PREVIEW') {
         return NextResponse.redirect(new URL('/sim/failure?preview=true', request.url));
      }
      return NextResponse.json({ error: 'Missing identifying parameters' }, { status: 400 });
    }

    // 1. Log the Exposure Event
    const ipAddress = request.headers.get('x-forwarded-for') || 'Unknown IP';
    const userAgent = request.headers.get('user-agent') || 'Unknown Device';

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { template: true }
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    await prisma.exposureEvent.create({
      data: {
        campaignId,
        targetId,
        status: 'EXPOSED',
        ipAddress: ipAddress.split(',')[0].trim(),
        userAgent,
      }
    });

    // 2. Increment AnalyticReport exposedCount safely
    await prisma.analyticReport.update({
      where: { campaignId },
      data: {
        exposedCount: {
          increment: 1,
        }
      }
    });

    // 2.5 Fire Simulated Notification to SOC Admin if configured
    if (campaign.socEmail) {
      try {
        const targetObj = await prisma.target.findUnique({ where: { id: targetId }});
        const vectorType = formData.get('type') || (campaign as any).type || 'PHISHING';
        
        console.log(`\n[🚨 SIMULATED SOC ALERT: ${campaign.socEmail}]`);
        console.log(`STATUS: Target Compromised`);
        console.log(`VECTOR: ${vectorType}`);
        console.log(`ENTITY: ${targetObj?.email || targetId}`);
        console.log(`CAMPAIGN: '${campaign.name}' (\`${campaign.template.name}\`)`);
        console.log(`SOURCE: ${ipAddress.split(',')[0].trim()} | ${userAgent}\n`);
      } catch (err) {
        console.error('Simulated SOC notification failed:', err);
      }
    }

    // 3. Immediately redirect victim to the Failure Intervention Landing Page
    return NextResponse.redirect(new URL('/sim/failure', request.url), 302);

  } catch (error: any) {
    console.error('Capture API Error:', error);
    // Even on error, we redirect to failure to prevent them from retrying or getting suspicious
    return NextResponse.redirect(new URL('/sim/failure?err=true', request.url), 302);
  }
}
