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
        whileHover={isMobile ? {} : { y: -10, scale: 1.02 }}
        className={`${isMobile ? 'min-w-[85vw] snap-center' : 'w-100 shrink-0'} bg-white rounded-3xl p-6 md:p-8 border shadow-sm border-orange-100 transition-all duration-300 relative group flex flex-col justify-between h-full min-h-[300px] md:min-h-[350px]`}
      >
        <div className='absolute top-6 left-6 opacity-10 transform -translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform'>
          <Quote size={40} className='text-primary md:w-14 md:h-14' />
        </div>

        <div className='relative mb-6'>
          <div className='flex gap-1 mb-4'>
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className='fill-current text-yellow-400'
                strokeWidth={0}
              />
            ))}
          </div>
          <div className='relative'>
            <p
              className={`text-gray-600 leading-relaxed italic z-10 relative text-xs md:text-sm lg:text-base ${isExpanded ? '' : 'line-clamp-4'}`}
            >
              &quot;{testimonial.content}&quot;
            </p>
            {showReadMore && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card clicks if any
                  toggleExpand(index);
                }}
                className='text-primary text-xs font-bold mt-2 hover:underline focus:outline-none'
              >
                {isExpanded ? 'Sembunyikan' : 'Lihat Selengkapnya'}
              </button>
            )}
          </div>
        </div>

        <div className='flex items-center gap-4 mt-auto border-t border-gray-50 pt-6'>
          <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 shrink-0 bg-gray-50'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h4 className='font-bold text-gray-900 text-xs md:text-sm'>
              {testimonial.name}
            </h4>
            <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>
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
        className='py-12 lg:py-20 bg-white overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8 lg:mb-10'>
            <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block animate-pulse'>
              Kisah Sukses
            </span>
            <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
              Apa Kata <span className='text-primary italic'>Mereka</span>
            </h2>
          </div>
          <div className='flex gap-6 md:gap-8 overflow-x-auto pb-8 no-scrollbar items-stretch md:justify-center'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='shrink-0 w-[85vw] md:w-[400px] bg-white rounded-3xl p-6 md:p-8 border border-orange-50 shadow-sm animate-pulse flex flex-col h-[300px] md:h-[350px]'
              >
                <div className='flex gap-1 mb-6'>
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div
                      key={j}
                      className='w-4 h-4 bg-gray-100 rounded-full'
                    ></div>
                  ))}
                </div>
                <div className='space-y-3 mb-8 grow'>
                  <div className='h-4 bg-gray-50 rounded-lg w-full'></div>
                  <div className='h-4 bg-gray-50 rounded-lg w-11/12'></div>
                  <div className='h-4 bg-gray-50 rounded-lg w-4/5'></div>
                </div>
                <div className='flex items-center gap-4 mt-auto pt-6 border-t border-gray-50'>
                  <div className='w-12 h-12 rounded-full bg-gray-100'></div>
                  <div className='space-y-2'>
                    <div className='h-4 bg-gray-100 rounded w-24'></div>
                    <div className='h-3 bg-gray-50 rounded w-16'></div>
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
    return null; // Don't render if no testimonials
  }

  return (
    <section id='testimonials' className='py-12 lg:py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='text-center mb-8 lg:mb-10'
        >
          <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
            Kisah Sukses
          </span>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Apa Kata <span className='text-primary italic'>Mereka</span>
          </h2>
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
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-primary w-6' : 'bg-gray-300 w-2'
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
            className={`flex gap-8 py-8 items-stretch ${testimonials.length > 1 ? 'animate-marquee pause-on-hover' : 'justify-center'}`}
          >
            {/* Duplicate for infinite scroll only if more than 1 item */}
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
