'use client';

import Navbar from '../../components/Navbar';
import GTMChecklist from '../../components/GTMChecklist';
import Footer from '../../components/Footer';

export default function GTMChecklistPage() {
  return (
    <div className='min-h-screen bg-white flex flex-col font-sans text-slate-800 relative selection:bg-amber-500/20 selection:text-amber-600'>
      <Navbar />
      <main className='flex-1 pt-24 sm:pt-32 pb-12 sm:pb-20 relative z-10'>
        <GTMChecklist />
      </main>
      <Footer />
    </div>
  );
}
