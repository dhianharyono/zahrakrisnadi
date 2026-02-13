import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='bg-dark text-white pt-10 pb-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 p-4 gap-12 lg:gap-8 mb-5 border-b border-gray-800 pb-12'>
          {/* Brand */}
          <div className='lg:col-span-2 space-y-3 md:space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold'>
                Z
              </div>
              <span className='text-lg md:text-xl font-bold text-white tracking-tight'>
                ZahraKrisnadi
              </span>
            </div>
            <li className='flex items-center gap-4'>
              <MapPin className='text-primary shrink-0 mt-1' size={15} />
              <span className='text-sm text-gray-400'>
                Bekasi, Jawa Barat, Indonesia
              </span>
            </li>
            <p className='text-gray-400 text-sm leading-relaxed max-w-sm'>
              Layanan gizi profesional bersetifikat STR. Berdedikasi pada
              kesejahteraan berbasis sains dan perubahan gaya hidup
              berkelanjutan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className='text-lg font-bold text-white mb-3 md:mb-6'>Menu</h4>
            <ul className='space-y-3 text-sm text-gray-400'>
              <li>
                <a href='#' className='hover:text-primary transition-colors'>
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href='#why-us'
                  className='hover:text-primary transition-colors'
                >
                  Mengapa Kami
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='hover:text-primary transition-colors'
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href='#testimonials'
                  className='hover:text-primary transition-colors'
                >
                  Testimoni
                </a>
              </li>
              <li>
                <a
                  href='#collaboration'
                  className='hover:text-primary transition-colors'
                >
                  Kolaborasi
                </a>
              </li>
            </ul>
          </div>

          {/* Services (Optional or just Contact) - Let's use Contact as requested */}
          <div>
            <h4 className='text-lg font-bold text-white mb-3 md:mb-6'>
              Kontak
            </h4>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li className='flex items-center gap-3'>
                <Linkedin className='text-primary shrink-0' size={18} />
                <Link
                  href='https://www.linkedin.com/in/zahrakrisnadi'
                  target='_blank'
                  className='hover:text-primary break-all'
                >
                  Zahra Krisnadi
                </Link>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='text-primary shrink-0' size={18} />
                <Link
                  href='https://wa.me/6285183076503'
                  target='_blank'
                  className='hover:text-primary'
                >
                  +62 851 8307 6503
                </Link>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='text-primary shrink-0' size={18} />
                <Link
                  href='mailto:dietisienzahrakrisnadi@gmail.com'
                  target='_blank'
                  className='hover:text-primary break-all'
                >
                  dietisienzahrakrisnadi@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center text-xs text-gray-600'>
          <p>
            &copy; {new Date().getFullYear()} Zahra Krisnadi. All rights
            reserved.
          </p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <p>Designed with ❤️ for Health enthusiasts</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
