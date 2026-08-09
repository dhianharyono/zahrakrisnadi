import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Portfolio from '@/models/Portfolio';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await dbConnect();
        const body = await request.json();
        const portfolio = await Portfolio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!portfolio) {
            return NextResponse.json(
                { success: false, error: 'Not found' },
                { status: 404 },
            );
        }
        return NextResponse.json({ success: true, data: portfolio });
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
        const portfolio = await Portfolio.findByIdAndDelete(id);
        if (!portfolio) {
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
