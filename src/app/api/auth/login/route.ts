import { NextRequest } from 'next/server';
import { comparePassword, hashPassword } from '@/lib/hooks/pass-hashing';
import { loginUser } from '@/lib/models/users';
import { User } from '@/lib/models/users';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
        return new Response('Missing required fields', { status: 400 });
    }

    var user : User | null;

    try {
        const hashedPassword = await hashPassword(password);
        user = await loginUser(username);
        if (!user) {
            return new Response('Invalid email', { status: 401 });
        }

        // Check if the password matches
        if (!user.password || !comparePassword(user.password, hashedPassword)) {
            return new Response('Invalid password', { status: 401 });
        }

        var headers = new Headers();

        try {
            // Set a session cookie with user info
            const encodedToken = Buffer.from(JSON.stringify(user)).toString('base64');

            // Set cookie that expires in 24 hours
            const cookie = `session=${encodedToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24}; SameSite=Strict`;
            headers.append('Set-Cookie', cookie);
        } catch (error: any) {
            console.error('Error setting cookie', error);
            return new Response('Error setting cookie', { status: 500 });
        }

        // Update the response headers
        return new Response(JSON.stringify(user), { 
            status: 200, 
            headers: headers 
        });

    } catch (error: any) {
        return new Response('No user found', { status: 500 });
    }
}