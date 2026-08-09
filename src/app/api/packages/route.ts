import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Package from '@/models/Package';
import { PRICING_PLANS } from '@/utils/constants';

export async function GET() {
    try {
        await dbConnect();
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
        await dbConnect();
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
