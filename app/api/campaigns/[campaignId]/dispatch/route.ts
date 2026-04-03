import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  try {
    const resolvedParams = await params;
    const campaignId = resolvedParams.campaignId;
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { template: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status === 'COMPLETED') {
        return NextResponse.json({ error: 'Campaign already dispatched' }, { status: 400 });
    }

    // Parse target data generated from our DRAFT form
    let targetOutputs: string[] = [];
    try {
      targetOutputs = JSON.parse(campaign.targetEmails);
    } catch {
      return NextResponse.json({ error: 'Invalid target configurations encoded in campaign' }, { status: 400 });
    }

    if (targetOutputs.length === 0) {
      return NextResponse.json({ error: 'No targets specified' }, { status: 400 });
    }

    // We generate a host-based URL from request for the payload links
    const baseUrl = new URL(request.url).origin;

    let successCount = 0;
    let botCompromiseCount = 0;
    const errors: any[] = [];

    // Dispatch loop (Simulated)
    for (const targetIdentifier of targetOutputs) {
      try {
        const isPhone = targetIdentifier.match(/^\+?[\d\s-]+$/);
        const emailVal = isPhone ? `simulated_${targetIdentifier.replace(/\D/g, '')}@sim.user` : targetIdentifier;

        const target = await prisma.target.create({
           data: {
             email: emailVal,
             phone: isPhone ? targetIdentifier : null,
             name: isPhone ? targetIdentifier : targetIdentifier.split('@')[0], 
           }
        });

        const payloadLink = `${baseUrl}/sim/${campaign.id}/${target.id}`;
        console.log(`[SIMULATOR] Dispatched ${campaign.type} to ${targetIdentifier}: payload=${payloadLink}`);

        // Interactive Bot Simulation
        // If it's a bot target and simulator is enabled, randomly "compromise" them
        const isBotTemplate = targetIdentifier.includes('_') || 
                             targetIdentifier.includes('.') || 
                             targetIdentifier.includes('sim') || 
                             targetIdentifier.includes('+964');
                             
        if ((campaign as any).simulateBotTraffic && isBotTemplate) {
          const compromiseChance = Math.random();
          if (compromiseChance > 0.65) { // 35% chance
            await prisma.exposureEvent.create({
              data: {
                campaignId: campaign.id,
                targetId: target.id,
                status: 'EXPOSED',
                ipAddress: `10.0.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
                userAgent: 'Mozilla/5.0 (Bot Simulation Engine)',
                // Micro-staggering timestamps
                createdAt: new Date(Date.now() + (successCount * 2000)) 
              }
            });
            botCompromiseCount++;
            console.log(`[BOT-SIM] Target ${targetIdentifier} took the bait! (Automated)`);
          }
        }

        successCount++;
      } catch (err: any) {
        errors.push({ target: targetIdentifier, error: err.message });
      }
    }

    // Simulated network delay execution block
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mark as ACTIVE indicating it was dispatched
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: 'ACTIVE' },
    });

    // Create analytical report base
    await prisma.analyticReport.upsert({
      where: { campaignId: campaign.id },
      create: {
        campaignId: campaign.id,
        totalTargets: targetOutputs.length,
        deliveredCount: successCount,
        exposedCount: botCompromiseCount,
      },
      update: {
        deliveredCount: successCount,
        exposedCount: {
          increment: botCompromiseCount
        }
      }
    });

    return NextResponse.json({
      success: true,
      dispatched: successCount,
      total: targetOutputs.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error: any) {
    console.error('Dispatch API Error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
