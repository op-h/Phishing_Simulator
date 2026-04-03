import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, templateId, rawEmails, socEmail, type, simulateBotTraffic } = body;

    if (!name || !templateId || !rawEmails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Process raw targets (comma-separated or one-per-line)
    // We split by newline or comma to preserve spaces within phone numbers
    const targetList = [...new Set(
      rawEmails.split(/\n|,/).map((e: string) => e.trim()).filter((e: string) => e.length > 3)
    )];

    if (targetList.length === 0) {
      return NextResponse.json({ error: 'No valid targets provided' }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        type: type || 'EMAIL_PHISHING',
        status: 'DRAFT',
        templateId,
        socEmail: socEmail || null,
        targetEmails: JSON.stringify(targetList),
        simulateBotTraffic: !!simulateBotTraffic,
      } as any
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    console.error('Create Campaign API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
