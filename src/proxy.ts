import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key-change-it-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

function applySecurityHeaders(response: NextResponse, nonce?: string): NextResponse {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), autoplay=()');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

    const scriptSrc = nonce 
        ? `'self' 'nonce-${nonce}' 'strict-dynamic'`
        : `'self'`;

    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://api.dicebear.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://images.unsplash.com https://i.pravatar.cc https://api.dicebear.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`
    );
    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    // 1. Protect Admin Pages
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return applySecurityHeaders(NextResponse.redirect(new URL('/admin/login', request.url)), nonce);
        }

        try {
            await jwtVerify(token, KEY);
            return applySecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }), nonce);
        } catch (error) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return applySecurityHeaders(response, nonce);
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
            return applySecurityHeaders(
                NextResponse.json(
                    { success: false, message: 'Unauthorized' },
                    { status: 401 }
                ),
                nonce
            );
        }

        try {
            await jwtVerify(token, KEY);
            return applySecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }), nonce);
        } catch (error) {
            return applySecurityHeaders(
                NextResponse.json(
                    { success: false, message: 'Invalid token' },
                    { status: 401 }
                ),
                nonce
            );
        }
    }

    return applySecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }), nonce);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
