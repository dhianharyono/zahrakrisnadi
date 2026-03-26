import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Footer: React.FC = () => {
  return (
    <footer className='bg-dark text-white pt-10 pb-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='grid grid-cols-1 lg:grid-cols-3 p-4 gap-12 lg:gap-8 mb-5 border-b border-gray-800 pb-12'
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className='space-y-3 md:space-y-4 w-fit'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold'>
                Z
              </div>
              <span className='text-lg md:text-xl font-bold text-white tracking-tight'>
                Zahra Krisnadi
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <MapPin className='text-primary shrink-0' size={15} />
              <span className='text-sm text-gray-400'>
                Bekasi, Jawa Barat, Indonesia
              </span>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed max-w-sm'>
              Didukung oleh tenaga gizi profesional tersertifikasi, kami
              menghadirkan layanan berbasis sains untuk membantu Anda mencapai
              perubahan gaya hidup yang sehat, terarah, dan berkelanjutan.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className='ml-0 md:ml-20'>
            <h4 className='text-lg font-bold text-white mb-3 md:mb-6'>Menu</h4>
            <ul className='space-y-4 text-sm text-gray-400 columns-1 md:columns-2'>
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
                  href='#tahap-layanan'
                  className='hover:text-primary transition-colors'
                >
                  Tahap Layanan
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
                  href='#pilih-paket'
                  className='hover:text-primary transition-colors'
                >
                  Pilih Paket
                </a>
              </li>
              <li>
                <a
                  href='#kalkulator-bmi'
                  className='hover:text-primary transition-colors'
                >
                  Kalkulator BMI
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
              <li>
                <a
                  href='#portofolio'
                  className='hover:text-primary transition-colors'
                >
                  Portofolio
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className='ml-0 md:ml-20'>
            <h4 className='text-lg font-bold text-white mb-3 md:mb-6'>
              Kontak
            </h4>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li className='flex items-center gap-3 group'>
                <Linkedin className='text-primary group-hover:scale-110 transition-transform shrink-0' size={18} />
                <Link
                  href='https://www.linkedin.com/in/zahrakrisnadi'
                  target='_blank'
                  className='hover:text-primary break-all'
                >
                  Zahra Krisnadi
                </Link>
              </li>
              <li className='flex items-center gap-3 group'>
                <Phone className='text-primary group-hover:scale-110 transition-transform shrink-0' size={18} />
                <Link
                  href='https://wa.me/6285183076503'
                  target='_blank'
                  className='hover:text-primary'
                >
                  Whatsapp
                </Link>
              </li>
              <li className='flex items-center gap-3 group'>
                <Mail className='text-primary group-hover:scale-110 transition-transform shrink-0' size={18} />
                <Link
                  href='mailto:dietisienzahrakrisnadi@gmail.com'
                  target='_blank'
                  className='hover:text-primary break-all'
                >
                  Email
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row justify-between items-center text-xs text-gray-600'
        >
          <p>
            &copy; {new Date().getFullYear()} Zahra Krisnadi. All rights
            reserved.
          </p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <p>Developed by
              <Link href="https://cetha-tech.vercel.app/" target="_blank" className="hover:text-primary transition-colors ml-1 font-bold">Cetha Technology</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
