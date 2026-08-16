'use client';

import Navbar from '../../components/Navbar';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  return (
    <div className='min-h-screen bg-slate-50/60 flex flex-col font-sans text-slate-800 relative selection:bg-amber-500/20 selection:text-amber-600'>
      <Navbar />
      <main className='flex-1 pt-24 sm:pt-32 pb-12 sm:pb-20 relative z-10'>
        <Services />
      </main>
      <Footer />
    </div>
  );
}
