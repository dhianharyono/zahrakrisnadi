import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Package from '@/models/Package';
import { PRICING_PLANS } from '@/utils/constants';

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(MONGODB_URI);
}

export async function GET() {
    try {
        await connectDB();
        const packages = await Package.find().sort({ order: 1, createdAt: 1 });

        if (packages.length === 0) {
            const seeded = await Package.insertMany(
                PRICING_PLANS.map((p, i) => ({ ...p, order: i })),
            );
            return NextResponse.json({ success: true, data: seeded });
        }

        return NextResponse.json({ success: true, data: packages });
    } catch (error) {
        console.error('Package GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch packages' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const pkg = await Package.create(body);
        return NextResponse.json({ success: true, data: pkg });
    } catch (error) {
        console.error('Package POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create package' },
            { status: 400 },
        );
    }
}
