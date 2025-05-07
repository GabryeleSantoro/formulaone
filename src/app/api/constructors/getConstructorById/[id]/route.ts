import { NextRequest } from 'next/server';

import { findById } from '@/lib/models/constructors';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        if (!id) {
            return new Response('ID is required', { status: 400 });
        }

        const idRegex = /^[0-9a-fA-F]{24}$/;
        if (!idRegex.test(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }
        const res = await findById(id);
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response('Database connection error', { status: 500 });
    }
}