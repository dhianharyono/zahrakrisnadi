'use client';

import React, { useState } from 'react';
import { Instagram, MapPinMinusInside, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO, NAV_LINKS } from '../utils/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='fixed w-full z-50 top-0 left-0 right-0 flex flex-col'>
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-primary text-white text-xs py-2 px-4'
      >
        <div className='max-w-7xl mx-auto flex justify-between items-center sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <span className='flex items-center gap-2'>
              <Link
                href={CONTACT_INFO.instagram.url}
                target='_blank'
                className='hover:text-red-400 transition-colors'
              >
                <Instagram size={14} className='sm:w-5 sm:h-5' />
              </Link>
            </span>
          </div>
          <div className='flex items-center gap-6'>
            <span className='flex items-center gap-2'>
              <MapPinMinusInside size={14} className='sm:w-5 sm:h-5' />
              <span className='hidden sm:inline'>
                {CONTACT_INFO.location.split(',')[0]}, Indonesia
              </span>
              <span className='sm:hidden'>
                {CONTACT_INFO.location.split(',')[0]}
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-white/90 backdrop-blur-md shadow-sm w-full'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            <div className='shrink-0 flex items-center'>
              <span className='text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-orange-600'>
                <a href='#'>Zahra Krisnadi</a>
              </span>
            </div>
            <div className='hidden md:flex space-x-8 items-center'>
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className='text-gray-700 hover:text-primary transition-colors font-medium text-sm'
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className='hidden md:flex'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById('consultation')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform cursor-pointer'
              >
                Konsultasi
              </motion.button>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                onClick={toggleMenu}
                className='text-gray-700 hover:text-primary focus:outline-none w-5 h-5 flex items-center justify-center'
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='md:hidden bg-white shadow-lg absolute w-full left-0 overflow-hidden'
            >
              <div className='px-2 pt-2 pb-3'>
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.98 }}
                    className='block px-3 py-2 text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md font-medium text-xs'
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
