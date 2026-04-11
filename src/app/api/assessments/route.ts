import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Assessment from '../../../models/Assessment';

// GET ALL
export async function GET() {
    try {
        await dbConnect();
        const assessments = await Assessment.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: assessments });
    } catch (error: any) {
        console.error('Assessment GET error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch assessments' }, 
            { status: 500 }
        );
    }
}

// CREATE NEW
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        
        // Basic validation
        if (!body.namaLengkap) {
            return NextResponse.json(
                { success: false, message: 'Nama lengkap is required' },
                { status: 400 }
            );
        }

        const assessment = await Assessment.create({
            ...body,
            status: 'new'
        });
        
        return NextResponse.json({ success: true, data: assessment }, { status: 201 });
    } catch (error: any) {
        console.error('Assessment POST error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create assessment' }, 
            { status: 400 }
        );
    }
}

// UPDATE ONE
export async function PUT(request: Request) {
    try {
        await dbConnect();
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
    } catch (error: any) {
        console.error('Assessment PUT error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update assessment' }, 
            { status: 400 }
        );
    }
}

// DELETE ONE
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: "ID Required" }, { status: 400 });
        }

        const deletedAssessment = await Assessment.findByIdAndDelete(id);

        if (!deletedAssessment) {
            return NextResponse.json(
                { success: false, message: "Assessment not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Assessment deleted successfully' });
    } catch (error: any) {
        console.error('Assessment DELETE error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete assessment' }, 
            { status: 500 }
        );
    }
}
