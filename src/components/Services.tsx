'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../utils/constants';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type PackageFeature = {
  name: string;
  value: string | boolean;
};

type Package = {
  _id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: PackageFeature[];
  highlight: boolean;
  order: number;
};

interface ServicesProps {
  showPricing?: boolean;
}

const Services: React.FC<ServicesProps> = ({ showPricing = true }) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activePricingIndex, setActivePricingIndex] = useState(0);
  const [pricingPlans, setPricingPlans] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const pricingScrollRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    fetchPricingPackages();
  }, []);

  const fetchPricingPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          setPricingPlans(json.data);
        }
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServicesScroll = () => {
    if (servicesScrollRef.current) {
      const { scrollLeft, scrollWidth } = servicesScrollRef.current;
      const itemCount = SERVICES_DATA.length;
      if (itemCount === 0) return;
      const itemWidth = scrollWidth / itemCount;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveServiceIndex(Math.min(Math.max(newIndex, 0), itemCount - 1));
    }
  };

  const handlePricingScroll = () => {
    if (pricingScrollRef.current) {
      const { scrollLeft, scrollWidth } = pricingScrollRef.current;
      const itemCount = pricingPlans.length;
      if (itemCount === 0) return;
      const itemWidth = scrollWidth / itemCount;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActivePricingIndex(Math.min(Math.max(newIndex, 0), itemCount - 1));
    }
  };

  const scrollPricingDesktop = (direction: 'left' | 'right') => {
    const container = document.getElementById('pricing-container-desktop');
    if (container) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id='services'
      className='py-12 sm:py-24 bg-white relative overflow-hidden'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
          variants={itemVariants}
          className='text-center max-w-2xl mx-auto mb-8 sm:mb-16'
        >
          <span className='inline-flex items-center rounded-full bg-amber-100/80 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-2.5 sm:mb-4'>
            Layanan
          </span>
          <h2 className='font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
            Program Layanan Unggulan
          </h2>
          <p className='text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-4 leading-relaxed max-w-2xl mx-auto'>
            Pilih solusi kesehatan yang dirancang khusus untuk kebutuhan tubuh Anda.
          </p>
        </motion.div>

        {/* Desktop View (Grid) */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className='hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch'
        >
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${service.highlight
                ? 'bg-white ring-2 ring-amber-500 shadow-md'
                : 'bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:ring-1 hover:ring-amber-300/60'
                }`}
            >
              <div>
                <div className='relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 ring-1 ring-slate-200/60 shadow-xs'>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  {service.highlight && (
                    <div className='absolute top-3 right-3 z-20 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider'>
                      Populer
                    </div>
                  )}
                </div>

                <h3 className='text-xl font-bold text-slate-900 mb-2'>
                  {service.title}
                </h3>
                <p className='text-slate-600 text-sm leading-relaxed mb-6'>
                  {service.description}
                </p>
              </div>
              <div className='mt-auto pt-6 border-t border-slate-100'>
                <button
                  onClick={() =>
                  (window.location.href = `/assessment?layanan=${encodeURIComponent(
                    service.title,
                  )}`)
                  }
                  className={`w-full py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${service.highlight
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-800 border border-slate-200/80'
                    }`}
                >
                  Konsultasi Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View (Horizontal Carousel) */}
        <div className='md:hidden'>
          <div
            ref={servicesScrollRef}
            onScroll={handleServicesScroll}
            className='flex gap-3.5 overflow-x-auto no-scrollbar scrollbar-hide items-stretch snap-x snap-mandatory py-3 px-3 sm:px-4'
          >
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={idx}
                className={`shrink-0 w-[82vw] max-w-[320px] rounded-2xl sm:rounded-3xl p-5 flex flex-col justify-between snap-center ${service.highlight
                  ? 'bg-white ring-2 ring-amber-500 shadow-md'
                  : 'bg-white border border-slate-200/80'
                  }`}
              >
                <div>
                  <div className='relative h-36 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-slate-100 ring-1 ring-slate-200/60 shadow-xs'>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover'
                    />
                    {service.highlight && (
                      <div className='absolute top-2.5 right-2.5 z-20 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider'>
                        Populer
                      </div>
                    )}
                  </div>

                  <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-1.5'>
                    {service.title}
                  </h3>
                  <p className='text-slate-600 text-xs leading-relaxed mb-4'>
                    {service.description}
                  </p>
                </div>
                <div className='mt-auto pt-3 border-t border-slate-100'>
                  <button
                    onClick={() =>
                    (window.location.href = `/assessment?layanan=${encodeURIComponent(
                      service.title,
                    )}`)
                    }
                    className={`w-full py-2.5 px-4 rounded-full font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${service.highlight
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-slate-100 hover:bg-amber-50 hover:text-amber-600 text-slate-800 border border-slate-200/80'
                      }`}
                  >
                    Konsultasi Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator for Services Carousel */}
          <div className='flex justify-center gap-2 mt-4'>
            {SERVICES_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (servicesScrollRef.current) {
                    const scrollWidth = servicesScrollRef.current.scrollWidth;
                    const itemWidth = scrollWidth / SERVICES_DATA.length;
                    servicesScrollRef.current.scrollTo({
                      left: itemWidth * idx,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeServiceIndex ? 'bg-amber-500 w-6' : 'bg-slate-300 w-2'
                  }`}
                aria-label={`Go to service slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Pricing Section (Pilihan Paket) */}
        {showPricing && (
          <div
            id='consultation'
            className='py-8 sm:py-12 mt-10 sm:mt-24 border-t border-slate-200/60'
          >
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
              variants={itemVariants}
              className='text-center max-w-2xl mx-auto mb-8 sm:mb-16'
            >
              <span className='inline-flex items-center rounded-full bg-amber-100/80 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-2.5 sm:mb-4'>
                Pilihan Paket
              </span>
              <h2 className='font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
                Paket Konsultasi Gizi
              </h2>
              <p className='text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-4 leading-relaxed max-w-2xl mx-auto'>
                Sesuaikan dengan kebutuhan dan target kesehatanmu
              </p>
            </motion.div>

            {/* Desktop & Mobile Pricing Cards Slider */}
            <div className='relative group'>
              {loading ? (
                <div className='flex justify-center items-center py-12'>
                  <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500'></div>
                </div>
              ) : (
                <>
                  {pricingPlans.length > 3 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => scrollPricingDesktop('left')}
                      className='hidden md:flex absolute -left-2 lg:left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md border border-slate-200 text-slate-800 transition-all z-20 cursor-pointer opacity-0 group-hover:opacity-100 items-center justify-center'
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                  )}

                  <div
                    id='pricing-container-desktop'
                    ref={pricingScrollRef}
                    onScroll={handlePricingScroll}
                    className='flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth py-4 items-stretch snap-x snap-mandatory px-3 sm:px-4'
                  >
                    {pricingPlans.map((plan) => {
                      const isHighlight = plan.highlight;
                      return (
                        <div
                          key={plan._id}
                          className={`shrink-0 w-[82vw] sm:w-[320px] md:w-[360px] max-w-[340px] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300 flex flex-col relative snap-center ${isHighlight
                            ? 'bg-white text-slate-900 ring-2 ring-amber-500 shadow-md'
                            : 'bg-white text-slate-900 border border-slate-200/80 shadow-xs hover:shadow-md'
                            }`}
                        >
                          {isHighlight && (
                            <div className='absolute top-0 right-0 bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-2xl rounded-tr-2xl sm:rounded-tr-3xl shadow-xs uppercase tracking-wider'>
                              POPULAR
                            </div>
                          )}

                          <div className='mb-4 sm:mb-6'>
                            <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1'>
                              {plan.name}
                            </h3>
                            <p className='text-xs md:text-sm text-slate-600'>
                              {plan.description}
                            </p>
                          </div>

                          <div className='mb-4 sm:mb-6 border-b border-slate-200/80 pb-4 sm:pb-6 flex items-baseline gap-1.5'>
                            <span className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900'>
                              {plan.price}
                            </span>
                            <span className='text-xs md:text-sm font-semibold text-amber-600'>
                              / {plan.duration}
                            </span>
                          </div>

                          <ul className='space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8 grow'>
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className='flex items-start gap-2.5 sm:gap-3'>
                                <div className='mt-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0'>
                                  <Check size={11} strokeWidth={3} />
                                </div>
                                <div className='text-xs sm:text-sm'>
                                  <span className='font-medium text-slate-800 block'>
                                    {feature.name}
                                  </span>
                                  {feature.value !== true && (
                                    <span className='text-[10px] sm:text-[11px] text-slate-500 block mt-0.5'>
                                      {feature.value}
                                    </span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>

                          <button
                            onClick={() =>
                            (window.location.href = `/assessment?paket=${encodeURIComponent(
                              plan.name,
                            )}`)
                            }
                            className={`w-full py-2.5 sm:py-3.5 rounded-full font-bold flex items-center justify-center transition-all cursor-pointer text-xs sm:text-sm md:text-base mt-auto shadow-xs hover:shadow-md ${isHighlight
                              ? 'bg-amber-500 hover:bg-amber-600 text-white'
                              : 'bg-slate-100 hover:bg-amber-50 hover:text-amber-600 text-slate-800 border border-slate-200/80'
                              }`}
                          >
                            Pilih Paket Ini
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dots Indicator for Pricing (Mobile) */}
                  {pricingPlans.length > 0 && (
                    <div className='flex md:hidden justify-center gap-2 mt-4'>
                      {pricingPlans.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (pricingScrollRef.current) {
                              const scrollWidth = pricingScrollRef.current.scrollWidth;
                              const itemWidth = scrollWidth / pricingPlans.length;
                              pricingScrollRef.current.scrollTo({
                                left: itemWidth * idx,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activePricingIndex ? 'bg-amber-500 w-6' : 'bg-slate-300 w-2'
                            }`}
                          aria-label={`Go to pricing slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {pricingPlans.length > 3 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => scrollPricingDesktop('right')}
                      className='hidden md:flex absolute -right-2 lg:right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md border border-slate-200 text-slate-800 transition-all z-20 cursor-pointer opacity-0 group-hover:opacity-100 items-center justify-center'
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
