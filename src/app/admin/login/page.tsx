'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isRedirecting) return;

    setIsLoading(true);
    setIsRedirecting(false);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsRedirecting(true);
          router.refresh();
          router.push('/admin/dashboard');
          return;
        } else {
          setError(
            data.message ||
              'Login gagal. Periksa kembali username dan password.',
          );
          setIsLoading(false);
        }
      } else {
        let errorMsg = 'Login gagal. Periksa kembali username dan password.';
        try {
          const data = await res.json();
          if (data.message) errorMsg = data.message;
        } catch {
          /* ignore parse error */
        }
        setError(errorMsg);
        setIsLoading(false);
      }
    } catch {
      setError('Terjadi kesalahan pada server. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-stretch bg-white overflow-hidden'>
      {/* Left Side - Visual & Branding */}
      <div className='hidden lg:flex lg:w-1/2 relative bg-orange-500 text-white flex-col justify-between p-16 overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary to-orange-600 z-10'></div>
          {/* Abstract organic shapes background */}
          <div className='absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px] animate-pulse-slow'></div>
          <div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-yellow-300/20 rounded-full blur-[80px]'></div>
        </div>

        <Link href='/' className='relative z-10'>
          <div className='flex items-center gap-3 text-2xl font-bold tracking-tight'>
            <div className='w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center shadow-lg shadow-black/10'>
              <span className='font-serif italic text-xl'>Z</span>
            </div>
            Zahra Krisnadi
          </div>
        </Link>

        <div className='relative z-10 max-w-xl'>
          <h1 className='text-5xl font-bold leading-tight mb-6'>
            Selamat Datang kembali di{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200'>
              Admin Dashboard
            </span>
          </h1>
          <p className='text-orange-50 text-lg leading-relaxed mb-8'>
            Kelola data pasien, pantau perkembangan kesehatan, dan atur jadwal
            konsultasi dalam satu dashboard yang terintegrasi.
          </p>
          <div className='flex items-center gap-4 text-sm font-medium text-white'>
            <div className='flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm shadow-sm'>
              <ShieldCheck className='w-4 h-4 text-green-300' />
              <span>Secure System</span>
            </div>
            <div className='flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm shadow-sm'>
              <Lock className='w-4 h-4 text-yellow-300' />
              <span>Encrypted Data</span>
            </div>
          </div>
        </div>

        <div className='relative z-10 text-sm text-orange-200'>
          &copy; {new Date().getFullYear()} Zahra Krisnadi • All Rights Reserved
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-orange-50/30 relative overflow-hidden'>
        {/* Decorative background blurs for right side */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2'></div>
        <div className='w-full max-w-md space-y-8 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-orange-100/50 border border-white relative z-10'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900 tracking-tight mb-2'>
              Admin Dashboard
            </h2>
            <p className='text-gray-500 text-sm'>
              Masukkan kredensial Anda untuk mengakses dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700 ml-1'>
                Username
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <User className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
                </div>
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading || isRedirecting}
                  className='block w-full pl-11 pr-4 text-sm py-4 bg-white/60 border border-orange-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed'
                  placeholder='Masukkan username Anda'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700 ml-1'>
                Password
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isRedirecting}
                  className='block w-full pl-11 text-sm pr-12 py-4 bg-white/60 border border-orange-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed'
                  placeholder='Masukkan Password Anda'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isRedirecting}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none disabled:opacity-50'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-slide-down'>
                <AlertCircle className='w-5 h-5 flex-shrink-0' />
                <span>{error}</span>
              </div>
            )}

            <button
              type='submit'
              disabled={isLoading || isRedirecting}
              className='w-full cursor-pointer flex text-sm items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0'
            >
              {isRedirecting ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Mengalihkan...</span>
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className='lg:hidden text-center mt-8 text-xs text-gray-400'>
            &copy; {new Date().getFullYear()} Zahra Krisnadi Dietisien System
          </div>
        </div>
      </div>
    </div>
  );
}
