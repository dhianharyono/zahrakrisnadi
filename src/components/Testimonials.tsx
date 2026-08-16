'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

type TestimonialData = {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  gender?: string;
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const getAvatarUrl = (name: string, gender?: string) => {
    const seed = encodeURIComponent(name);

    // Micah style is very similar to Notionists and allows filtering features explicitly
    if (gender === 'l') {
      return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&facialHairProbability=30&hair=dougFunny,fonze,mrClean,mrT&backgroundColor=b6e3f4`;
    }
    if (gender === 'p') {
      return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&facialHairProbability=0&hair=full,pixie,dannyPhantom&backgroundColor=ffdfbf`;
    }

    // Default fallback
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e1f5fe`;
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/testimonials?visible=true');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const formattedData = json.data.map(
              (t: {
                patientName: string;
                role?: string;
                message: string;
                rating: number;
                gender?: string;
              }) => ({
                name: t.patientName,
                role: t.role || 'Client',
                content: t.message,
                rating: t.rating,
                image: getAvatarUrl(t.patientName, t.gender),
                gender: t.gender,
              }),
            );
            setTestimonials(formattedData);
          }
        }
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      const itemCount = testimonials.length;
      if (itemCount === 0) return;

      const itemWidth = scrollWidth / itemCount;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), itemCount - 1));
    }
  };

  const renderCard = (
    testimonial: TestimonialData,
    index: number,
    isMobile: boolean,
  ) => {
    const isExpanded = expandedIndices.includes(index);
    const showReadMore = testimonial.content.length > 150;

    return (
      <motion.div
        key={index}
        whileHover={isMobile ? {} : { y: -6 }}
        className={`${isMobile ? 'min-w-[85vw] snap-center' : 'w-96 shrink-0'} bg-white rounded-3xl p-7 sm:p-8 shadow-xs ring-1 ring-slate-200/80 hover:ring-amber-300/60 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between h-full min-h-[300px] md:min-h-[340px]`}
      >
        <div className='absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity'>
          <Quote size={36} className='text-amber-600' />
        </div>

        <div className='relative mb-6'>
          <div className='flex gap-1 mb-4'>
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className='fill-amber-400 text-amber-400'
                strokeWidth={0}
              />
            ))}
          </div>
          <div className='relative'>
            <p
              className={`text-slate-600 leading-relaxed z-10 relative text-xs sm:text-sm ${isExpanded ? '' : 'line-clamp-4'}`}
            >
              &quot;{testimonial.content}&quot;
            </p>
            {showReadMore && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(index);
                }}
                className='text-amber-600 font-bold text-xs mt-2 hover:underline focus:outline-none'
              >
                {isExpanded ? 'Sembunyikan' : 'Lihat Selengkapnya'}
              </button>
            )}
          </div>
        </div>

        <div className='flex items-center gap-3.5 mt-auto border-t border-slate-100 pt-5'>
          <div className='w-11 h-11 rounded-full overflow-hidden ring-2 ring-amber-200/80 shrink-0 bg-slate-50'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h4 className='font-bold text-slate-900 text-xs sm:text-sm'>
              {testimonial.name}
            </h4>
            <p className='text-[11px] text-amber-800 font-semibold uppercase tracking-wider'>
              {testimonial.role}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section
        id='testimonials'
        className='py-16 sm:py-24 bg-slate-50/60 overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-2xl mx-auto mb-12'>
            <span className='inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-4 animate-pulse'>
              Kisah Sukses
            </span>
            <h2 className='font-serif text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight'>
              Apa Kata Mereka
            </h2>
          </div>
          <div className='flex gap-6 overflow-x-auto pb-8 no-scrollbar items-stretch md:justify-center'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs animate-pulse flex flex-col h-[300px]'
              >
                <div className='flex gap-1 mb-6'>
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div
                      key={j}
                      className='w-4 h-4 bg-slate-100 rounded-full'
                    ></div>
                  ))}
                </div>
                <div className='space-y-3 mb-8 grow'>
                  <div className='h-4 bg-slate-100 rounded-lg w-full'></div>
                  <div className='h-4 bg-slate-100 rounded-lg w-11/12'></div>
                  <div className='h-4 bg-slate-100 rounded-lg w-4/5'></div>
                </div>
                <div className='flex items-center gap-4 mt-auto pt-6 border-t border-slate-100'>
                  <div className='w-11 h-11 rounded-full bg-slate-100'></div>
                  <div className='space-y-2'>
                    <div className='h-4 bg-slate-100 rounded w-24'></div>
                    <div className='h-3 bg-slate-100 rounded w-16'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id='testimonials' className='py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='text-center max-w-2xl mx-auto mb-12 sm:mb-16'
        >
          <span className='inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 sm:mb-4'>
            Kisah Sukses
          </span>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
            Apa Kata Mereka
          </h2>
          <p className='text-slate-600 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto'>
            Pengalaman nyata dalam mendampingi tumbuh kembang dan kesehatan gizi keluarga.
          </p>
        </motion.div>

        {/* Global Styles */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @media (min-width: 768px) {
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 50s linear infinite;
              width: max-content;
            }
            .mask-gradient {
              mask-image: linear-gradient(
                to right,
                transparent,
                black 10%,
                black 90%,
                transparent
              );
              -webkit-mask-image: linear-gradient(
                to right,
                transparent,
                black 10%,
                black 90%,
                transparent
              );
            }
            .pause-on-hover:hover {
              animation-play-state: paused;
            }
          }
        `}</style>

        {/* Mobile View */}
        <div className='md:hidden'>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-4 w-full items-stretch'
          >
            {testimonials.map((testimonial, index) =>
              renderCard(testimonial, index, true),
            )}
          </div>

          {/* Dots Indicator */}
          <div className='flex justify-center gap-2 mt-4'>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const scrollWidth = scrollRef.current.scrollWidth;
                    const itemWidth = scrollWidth / testimonials.length;
                    scrollRef.current.scrollTo({
                      left: itemWidth * idx,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-amber-500 w-6' : 'bg-slate-300 w-2'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='hidden md:block relative overflow-hidden mask-gradient'
        >
          <div
            className={`flex gap-6 py-6 items-stretch ${testimonials.length > 1
              ? 'animate-marquee pause-on-hover'
              : 'justify-center'
              }`}
          >
            {(testimonials.length > 1
              ? [...testimonials, ...testimonials]
              : testimonials
            ).map((testimonial, index) =>
              renderCard(testimonial, index, false),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
