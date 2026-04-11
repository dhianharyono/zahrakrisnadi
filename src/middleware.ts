import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key-change-it-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    // 1. Protect Admin Pages
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, KEY);
            return NextResponse.next();
        } catch (error) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return response;
        }
    }

    // 2. Protect API Routes
    // Public API routes that don't need auth:
    const publicGetRoutes = ['/api/packages', '/api/portfolio', '/api/testimonials'];
    const isPublicApi = 
        pathname === '/api/auth/login' || 
        pathname === '/api/auth/logout' || 
        (pathname === '/api/assessments' && method === 'POST') ||
        (pathname.startsWith('/api/uploads/') && method === 'GET') ||
        (publicGetRoutes.includes(pathname) && method === 'GET');

    if (pathname.startsWith('/api/') && !isPublicApi) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        try {
            await jwtVerify(token, KEY);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json(
                { success: false, message: 'Invalid token' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
