import React, { useState } from 'react';
import {
  Instagram,
  MapPinMinusInside,
  Menu,
  MessageCircleHeart,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO, NAV_LINKS } from '../utils/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='fixed w-full z-50 top-0 left-0 right-0 flex flex-col'>
      {/* Top Bar */}
      <div className='bg-primary text-white text-xs py-2 px-4'>
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
            <span className='flex items-center gap-2'>
              <Link
                href={CONTACT_INFO.whatsapp.url(
                  'Halo Dietisienmu, saya ingin bertanya.',
                )}
                target='_blank'
                className='hover:text-red-400 transition-colors'
              >
                <MessageCircleHeart size={14} className='sm:w-5 sm:h-5' />
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
      </div>

      <div className='bg-white/90 backdrop-blur-md shadow-sm w-full'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            <div className='shrink-0 flex items-center'>
              <span className='text-sm md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-orange-600'>
                <a href='#'>ZahraKrisnadi</a>
              </span>
            </div>
            <div className='hidden md:flex space-x-8 items-center'>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className='text-gray-700 hover:text-primary transition-colors font-medium text-sm'
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className='hidden md:flex'>
              <button
                onClick={() =>
                  window.open(
                    CONTACT_INFO.whatsapp.url(
                      'Halo Dietisienmu, saya tertarik untuk konsultasi.',
                    ),
                    '_blank',
                  )
                }
                className='bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer'
              >
                Konsultasi
              </button>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                onClick={toggleMenu}
                className='text-gray-700 hover:text-primary focus:outline-none'
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-lg absolute w-full left-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='px-2 pt-2 pb-3'>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className='block px-3 py-2 text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md font-medium text-xs'
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
