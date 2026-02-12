import React from 'react';
import Image from 'next/image';
import { SERVICES_DATA, CONTACT_INFO } from '../utils/constants';

const Services: React.FC = () => {
  return (
    <section
      id='services'
      className='py-12 lg:py-20 bg-linear-to-b from-white to-orange-50/20 relative overflow-hidden'
    >
      {/* Background Decorations */}
      <div className='absolute top-0 right-0 w-1/3 h-full bg-orange-100/20 -skew-x-12 transform translate-x-1/2 -z-10 blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 -z-10'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-2xl mx-auto mb-10 lg:mb-16'>
          <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
            Layanan
          </span>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 leading-tight'>
            Program Nutrisi{' '}
            <span className='text-primary italic'>Unggulan</span>
          </h2>
          <p className='text-gray-600 text-sm max-w-2xl mx-auto'>
            Pilih solusi kesehatan yang dirancang khusus untuk kebutuhan tubuh
            Anda.
          </p>
        </div>

        <div className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-8 items-stretch px-1 md:px-0'>
          {SERVICES_DATA.map((service, index) => {
            const isHighlight = service.highlight;
            return (
              <div
                key={index}
                className={`group relative rounded-xl md:rounded-3xl p-2 md:p-6 transition-all duration-500 ease-out hover:-translate-y-1 md:hover:-translate-y-3 flex flex-col h-full transform
                                ${
                                  isHighlight
                                    ? 'bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-lg md:shadow-2xl ring-2 md:ring-4 scale-[1.02] md:scale-105 z-10'
                                    : 'bg-white border border-gray-100 shadow-md md:shadow-xl hover:shadow-lg md:hover:shadow-2xl text-gray-900'
                                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative h-20 sm:h-28 md:h-64 w-full aspect-square md:aspect-4/3 rounded-lg md:rounded-2xl overflow-hidden mb-2 md:mb-6 shadow-sm md:shadow-md transition-transform duration-500 group-hover:scale-[1.02] ${isHighlight ? 'ring-1 md:ring-2 ring-white/20' : ''}`}
                >
                  <div
                    className={`absolute inset-0 z-10 ${isHighlight ? 'bg-black/10' : 'bg-transparent'}`}
                  ></div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  {isHighlight && (
                    <div className='absolute top-1.5 right-1.5 md:top-4 md:right-4 z-20 bg-orange-500 text-white text-[7px] md:text-xs font-bold px-1.5 py-0.5 md:px-3 md:py-1 rounded-full shadow-md'>
                      POPULAR
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className='flex flex-col grow'>
                  <h3
                    className={`text-[10px] sm:text-xs md:text-xl font-bold mb-1 md:mb-2 leading-tight ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-[8px] sm:text-[10px] md:text-sm leading-relaxed mb-2 md:mb-6 grow line-clamp-3 md:line-clamp-none ${isHighlight ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {service.description}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={() =>
                      window.open(
                        CONTACT_INFO.whatsapp.url(
                          `Halo Dietisienmu, saya tertarik dengan program ${service.title}.`,
                        ),
                        '_blank',
                      )
                    }
                    className={`w-full text-[8px] sm:text-xs md:text-sm mt-auto py-1.5 md:py-4 rounded-md md:rounded-xl font-bold flex items-center justify-center gap-1 md:gap-2 transition-all duration-300 transform group-hover:scale-[1.02] cursor-pointer
                                        ${
                                          isHighlight
                                            ? 'bg-primary hover:bg-orange-600 text-white shadow-sm md:shadow-lg shadow-orange-900/20'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300'
                                        }`}
                  >
                    Daftar <span className='hidden sm:inline'>Sekarang</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
