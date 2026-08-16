'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';
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
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
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

  // Lock body scroll when modal or zoomed image is open
  useEffect(() => {
    if (selectedItem || isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, isZoomed]);

  const closeModal = () => {
    setSelectedItem(null);
    setIsZoomed(false);
  };

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
                    <p className='text-slate-300 text-xs font-medium flex items-center gap-1'>
                      Klik untuk melihat detail
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Portals mounted directly to document.body */}
      {mounted &&
        createPortal(
          <>
            {/* Detail Modal Popup */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  key='portfolio-detail-modal'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8'
                  role='dialog'
                  aria-modal='true'
                >
                  {/* Backdrop */}
                  <div
                    className='absolute inset-0 bg-slate-950/75 backdrop-blur-md'
                    onClick={closeModal}
                  ></div>

                  {/* Modal Content Container */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 15 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className='relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden ring-1 ring-slate-200/80 z-10'
                  >
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className='absolute top-3 right-3 z-30 bg-white/90 hover:bg-white p-2.5 rounded-full text-slate-700 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-slate-200/60'
                      aria-label='Close modal'
                    >
                      <X size={20} />
                    </button>

                    {/* Image Side - Larger Display with Zoom Hint */}
                    <div
                      className='w-full md:w-3/5 h-72 sm:h-[420px] md:h-auto min-h-[320px] md:min-h-[500px] relative bg-slate-900/5 group flex items-center justify-center shrink-0 overflow-hidden cursor-pointer p-4'
                      onClick={() => setIsZoomed(true)}
                      title='Klik untuk memperbesar gambar'
                    >
                      <Image
                        src={getImageUrl(selectedItem.image)}
                        alt={selectedItem.title}
                        fill
                        className='object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-102'
                        priority
                      />
                      {/* Zoom Badge */}
                      <div className='absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md group-hover:bg-amber-600 transition-colors'>
                        <ZoomIn size={14} />
                        <span>Klik untuk perbesar gambar</span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className='w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[50vh] md:max-h-none'>
                      <div>
                        <span className='inline-flex items-center rounded-full bg-amber-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-4 w-fit'>
                          {selectedItem.category}
                        </span>
                        <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight'>
                          {selectedItem.title}
                        </h3>
                        <div className='text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 space-y-2 whitespace-pre-line'>
                          <p>{selectedItem.description}</p>
                        </div>
                      </div>

                      <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-auto'>
                        <button
                          onClick={() => setIsZoomed(true)}
                          className='px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-full transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5 border border-amber-200/60'
                        >
                          <ZoomIn size={14} />
                          Lihat Gambar Penuh
                        </button>
                        <a
                          href='#collaboration'
                          onClick={closeModal}
                          className='flex-1 text-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all cursor-pointer text-xs shadow-sm hover:shadow-md'
                        >
                          Hubungi Kami
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fullscreen Image Lightbox Preview */}
            <AnimatePresence>
              {isZoomed && selectedItem && (
                <motion.div
                  key='portfolio-zoom-modal'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4'
                  onClick={() => setIsZoomed(false)}
                >
                  <button
                    onClick={() => setIsZoomed(false)}
                    className='absolute top-5 right-5 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all shadow-lg cursor-pointer'
                    aria-label='Close zoomed image'
                  >
                    <X size={24} />
                  </button>

                  <div
                    className='relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-2'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={getImageUrl(selectedItem.image)}
                      alt={selectedItem.title}
                      fill
                      className='object-contain'
                      priority
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </section>
  );
};

export default Portfolio;
