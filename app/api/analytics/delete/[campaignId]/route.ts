import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  try {
    const resolvedParams = await params;
    const campaignId = resolvedParams.campaignId;

    // Delete associated exposure events first
    await prisma.exposureEvent.deleteMany({
      where: { campaignId }
    });

    // Delete the analytic report
    await prisma.analyticReport.deleteMany({
      where: { campaignId }
    });

    // Optional: Reset campaign status to DRAFT so it can be re-run, or just leave as is.
    // The user specifically wants to "remove these", so we keep the campaign but wipe its stats.
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'DRAFT' }
    });

    return NextResponse.json({ message: 'Mission report purged successfully' });
  } catch (error) {
    console.error('Delete Report Error:', error);
    return NextResponse.json({ error: 'Failed to purge mission report' }, { status: 500 });
  }
}
