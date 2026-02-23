import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Upload from '../../../models/Upload';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

        await Upload.create({
            filename,
            contentType: file.type || 'application/octet-stream',
            data: buffer,
            size: file.size,
        });

        return NextResponse.json({ success: true, fileName: filename });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
