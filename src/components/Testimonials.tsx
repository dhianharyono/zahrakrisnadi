import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../utils/constants';

const Testimonials: React.FC = () => {
  return (
    <section id='testimonials' className='py-12 lg:py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 lg:mb-10'>
          <span className='text-primary font-serif italic text-lg mb-2 block'>
            Kisah Sukses
          </span>
          <h2 className='text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Apa Kata <span className='text-primary italic'>Mereka</span>
          </h2>
        </div>

        <div className='relative w-full overflow-hidden mask-gradient'>
          {/* Internal Style for Marquee Animation */}
          <style jsx>{`
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
          `}</style>

          <div className='flex gap-8 animate-marquee pause-on-hover py-8'>
            {/* Render items twice for seamless loop */}
            {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map(
              (testimonial, index) => (
                <div
                  key={index}
                  className='w-75 md:w-100 bg-white rounded-3xl p-6 md:p-8 border shadow-sm border-orange-100 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between shrink-0'
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
                    <p className='text-gray-600 leading-relaxed italic z-10 relative text-sm md:text-base'>
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  <div className='flex items-center gap-4 mt-auto border-t border-gray-50 pt-6'>
                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 shrink-0'>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-900 text-sm'>
                        {testimonial.name}
                      </h4>
                      <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
