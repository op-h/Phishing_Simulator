import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
