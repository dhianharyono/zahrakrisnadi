import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Testimonial from '../../../models/Testimonial';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const visibleOnly = searchParams.get('visible') === 'true';

    try {
        const query = visibleOnly ? { isVisible: true } : {};
        const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const testimonial = await Testimonial.create(body);
        return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });

        if (!testimonial) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: testimonial });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, message: 'ID Required' }, { status: 400 });

        const deleted = await Testimonial.findByIdAndDelete(id);

        if (!deleted) return NextResponse.json({ success: false }, { status: 404 });

        return NextResponse.json({ success: true, data: deleted });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
