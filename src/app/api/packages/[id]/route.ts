import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Package from '@/models/Package';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await dbConnect();
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
        await dbConnect();
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
