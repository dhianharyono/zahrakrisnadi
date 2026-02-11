import React from 'react';
import { FEATURES_DATA } from '../utils/constants';

const Features: React.FC = () => {
  return (
    <section
      id='why-us'
      className='py-12 lg:py-20 bg-linear-to-b from-orange-50/30 to-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 lg:mb-20'>
          <span className='text-primary font-serif italic text-lg mb-2 block'>
            Nilai Utama
          </span>
          <h2 className='text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Mengapa Konsultasi dengan{' '}
            <span className='text-primary italic'>Dietisien</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8'>
          {FEATURES_DATA.map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <div
                key={index}
                className={`relative pt-16 pb-8 px-6 rounded-3xl ${feature.bg} text-center group transition-all duration-300 hover:-translate-y-2 border-3 border-white`}
              >
                {/* Floating Icon Container */}
                <div
                  className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 lg:w-24 lg:h-24 rounded-full ${feature.bgColor} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl border-4 border-white`}
                >
                  <Icon className={`${feature.color} w-8 h-8 lg:w-10 lg:h-10`} />
                </div>

                {/* Content */}
                <div className='relative z-10 mt-6'>
                  <h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed mb-6 text-sm min-h-20'>
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
