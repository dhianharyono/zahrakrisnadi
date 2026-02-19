import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, password } = await request.json();

        // Check if no admins exist, create default one
        // const adminCount = await Admin.countDocuments();
        // if (adminCount === 0) {
        //     const hashedPassword = await bcrypt.hash('nutrisi2025', 10);
        //     await Admin.create({ username: 'admin', password: hashedPassword });
        // }

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

        // Set HttpOnly cookie for auth (Simplified for this context)
        // In a real app, use JWT or Session
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_token', 'valid', {
            httpOnly: false, // Accessible by JS for client-side check if needed
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
