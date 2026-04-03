import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Safely clear all simulation data
    // We clear exposure events first due to foreign key constraints, 
    // then analytic reports, then reset campaign statuses if needed.
    
    await prisma.exposureEvent.deleteMany({});
    
    await prisma.analyticReport.updateMany({
      data: {
        totalTargets: 0,
        deliveredCount: 0,
        exposedCount: 0
      }
    });

    // Also mark all campaigns as DRAFT to allow re-simulation if desired
    await prisma.campaign.updateMany({
      data: { status: 'DRAFT' }
    });

    return NextResponse.json({ message: 'Analytics cleared successfully' });
  } catch (error) {
    console.error('Clear Analytics Error:', error);
    return NextResponse.json({ error: 'Failed to clear analytics' }, { status: 500 });
  }
}
