import React from 'react';
import { FEATURES_DATA } from '../utils/constants';

const Features: React.FC = () => {
  return (
    <section
      id='why-us'
      className='py-12 lg:py-20 bg-linear-to-b from-orange-50/30 to-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10 lg:mb-20'>
          <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
            Nilai Utama
          </span>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Mengapa Konsultasi dengan{' '}
            <span className='text-primary italic'>Dietisien</span>
          </h2>
        </div>

        <div className='grid grid-cols-3 gap-3 md:gap-6 lg:gap-8'>
          {FEATURES_DATA.map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <div
                key={index}
                className={`relative pt-12 pb-4 px-2 md:pt-16 md:pb-8 md:px-6 rounded-2xl md:rounded-3xl ${feature.bg} text-center group transition-all duration-300 hover:-translate-y-2 border-2 md:border-3 border-white h-full flex flex-col items-center`}
              >
                {/* Floating Icon Container */}
                <div
                  className={`absolute -top-6 md:-top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full ${feature.bgColor} flex items-center justify-center shadow-md md:shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl border-2 md:border-4 border-white`}
                >
                  <Icon
                    className={`${feature.color} w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12`}
                  />
                </div>

                {/* Content */}
                <div className='relative z-10 mt-4 md:mt-6 flex-1 flex flex-col justify-start w-full'>
                  <h3 className='text-[10px] sm:text-xs md:text-lg lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight px-1'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed text-[9px] sm:text-[10px] md:text-sm lg:text-base px-1'>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
