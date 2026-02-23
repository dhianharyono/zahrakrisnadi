import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import Upload from '../../../../models/Upload';

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
    try {
        await dbConnect();

        // In Next.js 15+, params is a Promise that must be awaited
        const params = await context.params;
        const filename = params?.filename;

        if (!filename) {
            return new NextResponse('Filename is required', { status: 400 });
        }

        const fileRecord = await Upload.findOne({ filename });

        if (!fileRecord) {
            return new NextResponse('File not found', { status: 404 });
        }

        return new NextResponse(fileRecord.data, {
            status: 200,
            headers: {
                'Content-Type': fileRecord.contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
