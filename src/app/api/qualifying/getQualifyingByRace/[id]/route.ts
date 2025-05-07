import { NextRequest } from 'next/server';
import { getQualifyingByRaceId } from '@/lib/models/qualifying';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    try {
        const id = (await params).id;

        if (!id) {
            return new Response('ID is required', { status: 400 });
        }

        const res = await getQualifyingByRaceId(id);
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response('Database connection error', { status: 500 });
    }
}