import { createUser, User } from '@/lib/models/users';
import { NextRequest } from 'next/server';
import { hashPassword } from '@/lib/hooks/pass-hashing';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, surname, email, password, username, dateOfBirth} = body;

    if (!name || !surname || !email || !password || !username || !dateOfBirth) {
        return new Response('Missing required fields', { status: 400 });
    }

    const newUser : User = {
        name,
        surname,
        email,
        password,
        joinedDate: new Date(),
        username,
        dob: new Date(dateOfBirth)
    };

    newUser.password = await hashPassword(password);

    var user = {};
    try {
        user = await createUser(newUser);
    } catch (error: any) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return new Response(`Error creating user, ${field} is already in use`, { status: 500 });
        }
        return new Response('Error creating user', { status: 500 });
    }

    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}