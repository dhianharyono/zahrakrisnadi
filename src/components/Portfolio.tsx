'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

type PortfolioItem = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = React.useState<PortfolioItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null);

  React.useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setPortfolioData(json.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch portfolio', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
      return imagePath;
    }
    return `/api/uploads/${imagePath}`;
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  return (
    <section id='portfolio' className='py-16 sm:py-24 bg-white relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='text-center max-w-2xl mx-auto mb-12 sm:mb-16'
        >
          <span className='inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 sm:mb-4'>
            Galeri & Aktivitas
          </span>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
            Portofolio Kegiatan
          </h2>
          <p className='text-slate-600 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto'>
            Dokumentasi berbagai kegiatan seminar, workshop, edukasi gizi, dan konsultasi bersama mitra dan klien.
          </p>
        </motion.div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className='rounded-3xl shadow-xs bg-white border border-slate-200/80 overflow-hidden animate-pulse'
              >
                <div className='aspect-4/3 bg-slate-100'></div>
                <div className='p-6'>
                  <div className='h-4 bg-slate-100 rounded-lg w-1/4 mb-3'></div>
                  <div className='h-6 bg-slate-200 rounded-lg w-3/4 mb-2'></div>
                  <div className='h-4 bg-slate-100 rounded-lg w-full'></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          >
            {portfolioData.map((item, index) => (
              <motion.div
                key={item._id || index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className='group relative overflow-hidden rounded-3xl bg-white shadow-xs ring-1 ring-slate-200/80 hover:ring-amber-300/60 hover:shadow-md transition-all duration-300 cursor-pointer'
                onClick={() => setSelectedItem(item)}
              >
                <div className='aspect-4/3 relative bg-slate-100 overflow-hidden'>
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className='object-cover object-top transition-transform duration-700 group-hover:scale-105'
                  />
                  {/* Overlay: visible on hover */}
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6'>
                    <span className='bg-amber-500 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full w-fit mb-2 shadow-xs'>
                      {item.category}
                    </span>
                    <h3 className='text-white text-lg font-bold leading-snug mb-1'>
                      {item.title}
                    </h3>
                    <p className='text-slate-300 text-xs font-medium'>
                      Klik untuk melihat detail
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'
            role='dialog'
            aria-modal='true'
          >
            {/* Backdrop */}
            <div
              className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
              onClick={() => setSelectedItem(null)}
            ></div>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden ring-1 ring-slate-200'
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className='absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-700 transition-colors shadow-xs cursor-pointer'
              >
                <X size={18} />
              </button>

              {/* Image Side */}
              <div className='w-full md:w-1/2 h-60 md:h-auto relative bg-slate-50 shrink-0'>
                <Image
                  src={getImageUrl(selectedItem.image)}
                  alt={selectedItem.title}
                  fill
                  className='object-contain p-4'
                />
              </div>

              {/* Content Side */}
              <div className='w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white'>
                <span className='inline-flex items-center rounded-full bg-amber-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 w-fit'>
                  {selectedItem.category}
                </span>
                <h3 className='text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-tight'>
                  {selectedItem.title}
                </h3>
                <div className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6'>
                  <p>{selectedItem.description}</p>
                </div>

                <div className='flex gap-3 mt-auto pt-2'>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className='flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-full transition-colors cursor-pointer text-xs'
                  >
                    Tutup
                  </button>
                  <a
                    href='#collaboration'
                    onClick={() => setSelectedItem(null)}
                    className='flex-1 text-center px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-colors cursor-pointer text-xs shadow-xs'
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
