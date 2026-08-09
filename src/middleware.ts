import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key-change-it-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

function applySecurityHeaders(request: NextRequest, response: NextResponse, cspHeader: string): NextResponse {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Content-Security-Policy', cspHeader);

    const origin = request.headers.get('origin');
    const allowedOrigins = ['https://www.zahrakrisnadi.com', 'https://zahrakrisnadi.com', 'http://localhost:3000'];
    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Vary', 'Origin');
    } else {
        response.headers.set('Access-Control-Allow-Origin', 'https://www.zahrakrisnadi.com');
    }

    return response;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    // Generate cryptographic Nonce for Content Security Policy
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';
    const scriptSrc = `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`;

    const cspHeader = [
        "default-src 'self'",
        scriptSrc,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://api.dicebear.com https://www.googletagmanager.com https://www.google-analytics.com",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://images.unsplash.com https://i.pravatar.cc https://api.dicebear.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests;",
    ].join('; ');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    // 1. Protect Admin Pages
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return applySecurityHeaders(request, NextResponse.redirect(new URL('/admin/login', request.url)), cspHeader);
        }

        try {
            await jwtVerify(token, KEY);
            const response = NextResponse.next({ request: { headers: requestHeaders } });
            return applySecurityHeaders(request, response, cspHeader);
        } catch (error) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return applySecurityHeaders(request, response, cspHeader);
        }
    }

    // 2. Protect API Routes
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
            return applySecurityHeaders(request, NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            ), cspHeader);
        }

        try {
            await jwtVerify(token, KEY);
            const response = NextResponse.next({ request: { headers: requestHeaders } });
            return applySecurityHeaders(request, response, cspHeader);
        } catch (error) {
            return applySecurityHeaders(request, NextResponse.json(
                { success: false, message: 'Invalid token' },
                { status: 401 }
            ), cspHeader);
        }
    }

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    return applySecurityHeaders(request, response, cspHeader);
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
