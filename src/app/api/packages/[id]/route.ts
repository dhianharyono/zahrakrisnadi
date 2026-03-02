import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Package from '@/models/Package';

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(MONGODB_URI);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await request.json();
        const pkg = await Package.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!pkg) {
            return NextResponse.json(
                { success: false, error: 'Not found' },
                { status: 404 },
            );
        }
        return NextResponse.json({ success: true, data: pkg });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update' },
            { status: 400 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await connectDB();
        const pkg = await Package.findByIdAndDelete(id);
        if (!pkg) {
            return NextResponse.json(
                { success: false, error: 'Not found' },
                { status: 404 },
            );
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete' },
            { status: 400 },
        );
    }
}
