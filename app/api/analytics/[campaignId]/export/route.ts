import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  try {
    const resolvedParams = await params;
    const campaignId = resolvedParams.campaignId;

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { template: true }
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const exposureEvents = await prisma.exposureEvent.findMany({
      where: { campaignId },
      include: { target: true },
      orderBy: { createdAt: 'asc' }
    });

    // Formatting CSV rows
    const headers = ['Event ID', 'Timestamp', 'Target Name', 'Target Email/Phone', 'Department', 'Status', 'IP Address', 'User Agent'];
    
    const rows = exposureEvents.map(event => [
      event.id,
      new Date(event.createdAt).toISOString(),
      event.target.name || 'Unknown',
      event.target.email || event.targetId,
      event.status, // Should be EXPOSED
      event.ipAddress || 'Unknown',
      // Wrap user agent in quotes to prevent comma splitting issues
      `"${(event.userAgent || 'Unknown').replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="CampaignReport-${campaign.name.replace(/\s+/g, '_')}.csv"`,
      },
    });

  } catch (error) {
    console.error('CSV Export Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
