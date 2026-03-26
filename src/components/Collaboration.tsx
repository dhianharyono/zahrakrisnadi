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
    <section id='collaboration' className='py-12 lg:py-20 bg-orange-50/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='relative rounded-[3rem] overflow-hidden bg-white shadow-2xl p-6 lg:p-16 flex flex-col md:flex-row items-center gap-8 lg:gap-12 border border-gray-100'
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3'
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className='absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-green-100/30 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3'
          />

          <div className='flex-1 space-y-4 lg:space-y-6 text-center md:text-left'>
            <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
              Partnership
            </span>
            <h2 className='text-xl lg:text-5xl font-extrabold text-gray-900'>
              Mari Berkolaborasi
            </h2>
            <p className='text-xs md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0'>
              Terbuka untuk kerjasama kemitraan, pembicara seminar kesehatan,
              atau narasumber artikel gizi berkualitas. Mari bersama membangun
              masyarakat yang lebih sehat.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4'>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(
                    CONTACT_INFO.whatsapp.url(
                      'Halo Admin, kami ingin berkolaborasi dengan anda.',
                    ),
                    '_blank',
                  )
                }
                className='bg-primary hover:bg-orange-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold shadow-lg shadow-orange-200 transition-all hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm lg:text-base'
              >
                <Mail size={20} />
                Hubungi Saya
              </motion.button>
            </div>
          </div>

          <div className='flex-1 w-full max-w-sm relative p-4 md:p-0'>
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className='relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border-4 border-white shadow-xl transform rotate-3 transition-all duration-500'
            >
              <Image
                src='/collaboration.jpg'
                alt='Collaboration'
                fill
                className='object-cover opacity-90 transition-opacity'
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;
