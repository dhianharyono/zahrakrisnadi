'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  Package,
} from 'lucide-react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Redirection is handled by middleware.ts
    // This useEffect is no longer strictly necessary for protection
    // but can be used for other client-side init if needed.
  }, [pathname, router]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const performLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        setShowLogoutModal(false);
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback
      setShowLogoutModal(false);
      router.push('/admin/login');
    }
  };

  const navItems = [
    {
      name: 'Dashboard Analitik',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    { name: 'Data Assessment', href: '/admin/assessments', icon: FileText },
    { name: 'Testimonial', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Portofolio', href: '/admin/portfolio', icon: ImageIcon },
    { name: 'Kelola Paket', href: '/admin/packages', icon: Package },
  ];

  // If on login page, render without layout
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 flex font-sans relative overflow-x-hidden selection:bg-orange-100 selection:text-primary'>
      <Toaster position='top-right' reverseOrder={false} />

      {/* Background Decorations */}
      <div className='fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50 to-transparent -z-10 pointer-events-none' />
      <div className='fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -z-10 opacity-60' />
      <div className='fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-100/30 rounded-full blur-3xl -z-10' />

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-2xl shadow-orange-100/50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 h-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='h-full flex flex-col p-6'>
          <div className='flex items-center justify-between mb-10'>
            <div>
              <h1 className='text-xl font-serif font-bold text-gray-800 leading-none'>
                <span className='text-primary'>Zahra</span> Krisnadi
              </h1>
              <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1'>
                Admin Dashboard
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className='md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <nav className='flex-1 space-y-2 overflow-y-auto pr-2'>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname?.startsWith(item.href) && item.href !== '/admin');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-orange-200 translate-x-1'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-primary hover:translate-x-1'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`}
                    />
                  </div>
                  <span
                    className={`font-medium text-xs ${isActive ? 'font-bold' : ''}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className='pt-6 mt-6 border-t border-gray-100/50'>
            {/* Area untuk tambahan menu bawah jika ada */}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-300'>
        {/* Header */}
        <header className='bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm'>
          <div className='flex items-center'>
            <button
              onClick={() => setSidebarOpen(true)}
              className='p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-full md:hidden'
            >
              <Menu className='w-5 h-5' />
            </button>
            <span className='font-serif font-bold text-lg text-gray-800 md:hidden'>
              <span className='text-primary'>Zahra</span> Admin
            </span>
          </div>

          <button
            onClick={handleLogoutClick}
            className='cursor-pointer flex items-center gap-2 px-4 py-2 ml-auto rounded-xl text-white hover:bg-red-50 hover:text-red-500 transition-all duration-300 border border-red-200 hover:border-red-200 bg-red-500'
            title='Keluar'
          >
            <span className='font-medium text-xs hidden sm:inline'>Keluar</span>
          </button>
        </header>

        <main className='flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto'>
          {children}
        </main>
      </div>
      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title='Konfirmasi Keluar'
        message='Apakah Anda yakin ingin keluar dari halaman admin?'
        confirmLabel='Keluar'
        cancelLabel='Batal'
        isDanger={true}
        onConfirm={performLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
