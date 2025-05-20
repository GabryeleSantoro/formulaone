import { NextRequest, NextResponse } from 'next/server';
import { deleteUser, findUserById } from '@/lib/models/users';
import { updateUser } from '@/lib/models/users';
import { hashPassword } from '@/lib/hooks/pass-hashing';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {    // Get the ID from the URL search params
    
    const id = (await params).id;
    if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        
        var user = await findUserById(parseInt(id));

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json({ error: 'Failed to retrieve user' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const body = await request.json();

        if (body.password) {
            body.password = await hashPassword(body.password);
        }
        
        // Update the user
        const updatedUser = await updateUser(parseInt(id), body);
        
        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
        }
        
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        // Delete the user
        const deletedUser = await deleteUser(parseInt(id));
        
        if (!deletedUser) {
            return NextResponse.json({ error: 'User not found or deletion failed' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}