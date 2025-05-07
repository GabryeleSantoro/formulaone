import { NextRequest } from 'next/server';
import { findAllRacesByYear } from '@/lib/models/races';

export async function GET(request: NextRequest, { params }: { params: Promise<{ year: string }> }) {

    const year = (await params).year;

    if (!year) {
      return new Response('Year is required', { status: 400 });
    }
    
    const yearRegex = /^\d{4}$/;

    if (!yearRegex.test(year)) {
      return new Response('Invalid year format', { status: 400 });
    }

    const years = await findAllRacesByYear(year);

    return new Response(JSON.stringify(years), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }