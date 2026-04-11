import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../utils/auth';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username and password are required' },
                { status: 400 }
            );
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT Token
        const token = await signToken({ 
            id: admin._id, 
            username: admin.username 
        });

        const response = NextResponse.json({ success: true, message: 'Login successful' });
        
        // Set HttpOnly cookie for auth
        response.cookies.set('admin_token', token, {
            httpOnly: true, // Prevent XSS
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}
