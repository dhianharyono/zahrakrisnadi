'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

type TestimonialData = {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?visible=true');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const formattedData = json.data.map((t: any) => ({
            name: t.patientName,
            role: t.role || 'Client',
            content: t.message,
            rating: t.rating,
            image: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(t.patientName)}&backgroundColor=e1f5fe`,
          }));
          setTestimonials(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollWidth = scrollRef.current.scrollWidth;
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
      <div
        key={index}
        className={`${isMobile ? 'min-w-[85vw] snap-center' : 'w-100 shrink-0'} bg-white rounded-3xl p-6 md:p-8 border shadow-sm border-orange-100 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between h-full min-h-[300px] md:min-h-[350px]`}
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
      </div>
    );
  };

  if (testimonials.length === 0) {
    return null; // Don't render if no testimonials
  }

  return (
    <section id='testimonials' className='py-12 lg:py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 lg:mb-10'>
          <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
            Kisah Sukses
          </span>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Apa Kata <span className='text-primary italic'>Mereka</span>
          </h2>
        </div>

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
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-primary w-6' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className='hidden md:block relative overflow-hidden mask-gradient'>
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
