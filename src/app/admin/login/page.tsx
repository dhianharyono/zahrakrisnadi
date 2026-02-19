'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Login gagal. Periksa kembali username dan password.');
            }
        } catch (err) {
            setError('Terjadi kesalahan pada server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-stretch bg-white overflow-hidden">
            {/* Left Side - Visual & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 text-white flex-col justify-between p-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/80 z-10"></div>
                    {/* Abstract organic shapes background */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px]"></div>
                </div>

                <Link href="/" className="relative z-10">
                    <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-white font-serif italic text-xl">Z</span>
                        </div>
                        Zahra Krisnadi
                    </div>
                </Link>

                <div className="relative z-10 max-w-xl">
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Selamat Datang kembali di <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Admin Portal</span>
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        Kelola data pasien, pantau perkembangan kesehatan, dan atur jadwal konsultasi dalam satu dashboard yang terintegrasi.
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 text-green-400" />
                            <span>Secure System</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                            <Lock className="w-4 h-4 text-orange-400" />
                            <span>Encrypted Data</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Dietisien System • All Rights Reserved
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-gray-50/50">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100">
                    <div className="text-center lg:text-left">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Login Akun</h2>
                        <p className="text-gray-500 text-sm">Masukkan kredensial Anda untuk mengakses dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-11 pr-4 text-sm py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                                    placeholder="Masukkan username Anda"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 text-sm pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                                    placeholder="Masukkan Password Anda"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
                                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex text-sm items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk Dashboard</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="lg:hidden text-center mt-8 text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Zahra Krisnadi Dietisien System
                    </div>
                </div>
            </div>
        </div>
    );
}
