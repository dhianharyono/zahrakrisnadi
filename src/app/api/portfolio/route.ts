import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Portfolio from '@/models/Portfolio';
import { PORTFOLIO_DATA } from '@/utils/constants';

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
        const portfolio = await Portfolio.find().sort({ createdAt: -1 });

        // Seed if empty
        if (portfolio.length === 0) {
            const seeded = await Portfolio.insertMany(PORTFOLIO_DATA);
            return NextResponse.json({ success: true, data: seeded });
        }

        return NextResponse.json({ success: true, data: portfolio });
    } catch (error) {
        console.error('Portfolio GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch portfolio data' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const portfolio = await Portfolio.create(body);
        return NextResponse.json({ success: true, data: portfolio });
    } catch (error) {
        console.error('Portfolio POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create portfolio entry' },
            { status: 400 },
        );
    }
}
