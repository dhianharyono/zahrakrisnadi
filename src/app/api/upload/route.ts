import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Upload from '../../../models/Upload';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export async function POST(req: Request) {
    try {
        await dbConnect();

        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        // 1. Validate File Size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ success: false, message: 'File too large (Max 5MB)' }, { status: 400 });
        }

        // 2. Validate File Type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ success: false, message: 'Unsupported file type' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename: remove special characters except dot, dash, underscore
        const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}-${sanitizedOriginalName}`;

        await Upload.create({
            filename,
            contentType: file.type,
            data: buffer,
            size: file.size,
        });

        return NextResponse.json({ success: true, fileName: filename });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to upload file' }, 
            { status: 500 }
        );
    }
}
