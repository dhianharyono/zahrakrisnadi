import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Assessment from '../../../models/Assessment';

// GET ALL
export async function GET() {
    await dbConnect();
    try {
        const assessments = await Assessment.find({}).sort({ createdAt: -1 });
        return NextResponse.json(assessments);
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

// CREATE NEW
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const assessment = await Assessment.create({
            ...body,
            status: 'new'
        });
        return NextResponse.json(assessment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

// UPDATE ONE
export async function PUT(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "ID Required" }, { status: 400 });
        }

        const updatedAssessment = await Assessment.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAssessment) {
            return NextResponse.json({ success: false, message: "Assessment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedAssessment });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}

// DELETE ONE
export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: "ID Required" }, { status: 400 });
        }

        const deletedAssessment = await Assessment.findByIdAndDelete(id);

        if (!deletedAssessment) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: deletedAssessment });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
