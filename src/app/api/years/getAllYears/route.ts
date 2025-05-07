import { NextRequest } from 'next/server';
import { findAllYears } from '@/lib/models/races';

export async function GET(request: NextRequest) {

    const years = await findAllYears();

    return new Response(JSON.stringify(years), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }