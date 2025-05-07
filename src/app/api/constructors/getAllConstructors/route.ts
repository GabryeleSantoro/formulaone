import connect from '@/lib/db';
import { NextRequest } from 'next/server';

import { findAll } from '@/lib/models/constructors';

export async function GET(request: NextRequest) {
    try {
        await connect();
        const res = await findAll();
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response('Database connection error', { status: 500 });
    }
}