'use client';

import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { CONTACT_INFO } from '../utils/constants';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Collaboration: React.FC = () => {
  return (
    <section
      id='collaboration'
      className='py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='relative rounded-3xl sm:rounded-[2.5rem] bg-white shadow-xs ring-1 ring-slate-200/80 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 lg:gap-12 overflow-hidden'
        >
          {/* Ambient Glow Accents */}
          <div className='pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl'></div>
          <div className='pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl'></div>

          <div className='flex-1 text-center md:text-left space-y-4 sm:space-y-6 relative z-10'>
            <span className='inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 sm:mb-4'>
              Partnership & Kolaborasi
            </span>
            <h2 className='font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
              Mari Berkolaborasi Bersama
            </h2>
            <p className='text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0'>
              Terbuka untuk kerjasama kemitraan instansi, pembicara seminar
              kesehatan, webinar edukasi, maupun narasumber konten gizi
              profesional. Mari bersama membangun masyarakat yang lebih sehat.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2'>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open(
                    CONTACT_INFO.whatsapp.url(
                      'Halo Admin, kami ingin berkolaborasi dengan anda.',
                    ),
                    '_blank',
                  )
                }
                className='bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shrink-0'
              >
                <Mail size={18} />
                Hubungi Kami
              </motion.button>
            </div>
          </div>

          <div className='flex-1 w-full max-w-sm relative z-10'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='relative aspect-square bg-slate-100 rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-md transition-transform duration-300'
            >
              <Image
                src='/collaboration.jpg'
                alt='Collaboration'
                fill
                className='object-cover opacity-95 transition-opacity'
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;
