'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home page after a short delay
        const timeout = setTimeout(() => {
            router.push('/');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-md w-full">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-300">404</span>
                    </div>
                </div>

                <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h1>
                <p className="text-xs md:text-sm text-gray-500 mb-8">
                    Maaf, halaman yang Anda cari tidak tersedia. <br />
                    Mengalihkan Anda ke halaman utama...
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-primary font-medium animate-pulse">
                        <Loader2 className="w-3 h-3 md:w-5 md:h-5 animate-spin" />
                        <span className='text-xs md:text-sm'>Sedang mengalihkan...</span>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Kembali Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
