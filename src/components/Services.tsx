import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SERVICES_DATA, PRICING_PLANS, CONTACT_INFO } from '../utils/constants';

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(1);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length,
    );
  };

  const [activePricingIndex, setActivePricingIndex] = React.useState(0);

  const nextPricingSlide = () => {
    setActivePricingIndex((prev) => (prev + 1) % PRICING_PLANS.length);
  };

  const prevPricingSlide = () => {
    setActivePricingIndex(
      (prev) => (prev - 1 + PRICING_PLANS.length) % PRICING_PLANS.length,
    );
  };

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
            Program Layanan{' '}
            <span className='text-primary italic'>Unggulan</span>
          </h2>
          <p className='text-gray-600 text-sm max-w-2xl mx-auto'>
            Pilih solusi kesehatan yang dirancang khusus untuk kebutuhan tubuh
            Anda.
          </p>
        </div>

        {/* Desktop View (Grid) */}
        <div className='hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-start'>
          {SERVICES_DATA.map((service, index) => {
            const isHighlight = service.highlight;
            return (
              <div
                key={index}
                className={`group relative rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-3 flex flex-col h-full transform hover:scale-105
                                ${
                                  isHighlight
                                    ? 'bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-2xl ring-4 scale-105 hover:scale-110 z-10'
                                    : 'bg-white border border-gray-100 shadow-xl hover:shadow-2xl text-gray-900'
                                }`}
              >
                <div
                  className={`relative h-64 lg:h-80 w-full aspect-4/3 rounded-2xl overflow-hidden mb-6 shadow-md transition-transform duration-500 group-hover:scale-[1.02] ${isHighlight ? 'ring-2 ring-white/20' : ''}`}
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
                    <div className='absolute top-4 right-4 z-20 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                      POPULAR
                    </div>
                  )}
                </div>

                <div className='flex flex-col grow'>
                  <h3
                    className={`text-xl font-bold mb-2 ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 grow ${isHighlight ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {service.description}
                  </p>

                  <button
                    onClick={() =>
                      window.open(
                        '/assessment',
                        // CONTACT_INFO.whatsapp.url(
                        //   `Halo Dietisienmu, saya tertarik dengan program ${service.title}.`,
                        // ),
                        // '_blank',
                      )
                    }
                    className={`w-full text-sm mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:scale-[1.02] cursor-pointer
                                        ${
                                          isHighlight
                                            ? 'bg-primary hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300'
                                        }`}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View (Carousel) */}
        <div className='md:hidden relative px-4'>
          <div className='flex items-center justify-center'>
            {SERVICES_DATA.map((service, index) => {
              if (index !== activeIndex) return null;

              const isHighlight = service.highlight; // Or force highlight style for clarity if needed, but let's stick to data
              // The user wants the card enlarged. We can use the 'highlight' style or a robust style for all.
              // Let's use a robust style for the active one.

              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-6 flex flex-col w-full max-w-sm mx-auto shadow-xl transition-all duration-300 ${
                    isHighlight
                      ? 'bg-linear-to-br from-gray-900 to-gray-800 text-white ring-4 ring-gray-800'
                      : 'bg-white border border-gray-100 text-gray-900'
                  }`}
                >
                  <div
                    className={`relative h-64 w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-md`}
                  >
                    <div
                      className={`absolute inset-0 z-10 ${isHighlight ? 'bg-black/10' : 'bg-transparent'}`}
                    ></div>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover'
                    />
                    {isHighlight && (
                      <div className='absolute top-4 right-4 z-20 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                        POPULAR
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col grow text-center'>
                    <h3
                      className={`text-lg md:text-xl font-bold mb-3 ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-xs md:text-sm leading-relaxed mb-6 ${isHighlight ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {service.description}
                    </p>

                    <button
                      onClick={() => window.open('/assessment')}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer
                                          ${
                                            isHighlight
                                              ? 'bg-primary hover:bg-orange-600 text-white'
                                              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'
                                          }`}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 backdrop-blur-sm transition-all z-20 cursor-pointer'
            aria-label='Previous'
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 backdrop-blur-sm transition-all z-20 cursor-pointer'
            aria-label='Next'
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots/Indicators */}
          <div className='flex justify-center gap-2 mt-6'>
            {SERVICES_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeIndex ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className='mt-20 lg:mt-32'>
          <div className='text-center max-w-2xl mx-auto mb-10 lg:mb-16'>
            <span className='text-primary italic text-sm md:text-lg mb-2 block'>
              Pilihan Paket
            </span>
            <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 leading-tight'>
              Paket Konsultasi <span className='text-primary italic'>Gizi</span>
            </h2>
            <p className='text-gray-600 text-sm max-w-2xl mx-auto'>
              Sesuaikan dengan kebutuhan dan target kesehatanmu
            </p>
          </div>

          {/* Desktop View (Grid) */}
          <div className='hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto'>
            {PRICING_PLANS.map((plan, index) => {
              const isHighlight = plan.highlight;
              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 ${
                    isHighlight
                      ? 'bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-2xl ring-4 ring-orange-500/50 scale-105 z-10'
                      : 'bg-white text-gray-900 border border-gray-100 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isHighlight && (
                    <div className='absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-2xl shadow-lg'>
                      POPULAR
                    </div>
                  )}

                  <div className='mb-6'>
                    <h3
                      className={`text-2xl font-bold mb-0 md:mb-2 ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${isHighlight ? 'text-gray-300' : 'text-gray-500'}`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className='mb-8 border-b border-gray-200/20 pb-8'>
                    <span
                      className={`text-4xl font-extrabold block ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-medium ${isHighlight ? 'text-orange-400' : 'text-primary'}`}
                    >
                      / {plan.duration}
                    </span>
                  </div>

                  <ul className='space-y-4 mb-8 grow'>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <div
                          className={`mt-0.5 min-w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isHighlight ? 'bg-orange-500/20 text-orange-400' : 'bg-green-100 text-green-600'}`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <div className='text-sm'>
                          <span
                            className={`font-medium block ${isHighlight ? 'text-gray-200' : 'text-gray-800'}`}
                          >
                            {feature.name}
                          </span>
                          {feature.value !== true && (
                            <span
                              className={`text-xs block mt-0.5 ${isHighlight ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                              {feature.value}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      window.open(
                        CONTACT_INFO.whatsapp.url(
                          `Halo Dietisienmu, saya tertarik dengan paket ${plan.name}.`,
                        ),
                        '_blank',
                      )
                    }
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02]
                      ${
                        isHighlight
                          ? 'bg-primary hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    Pilih Paket {plan.name}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile View (Carousel) */}
          <div className='md:hidden relative px-4'>
            <div className='flex items-center justify-center'>
              {PRICING_PLANS.map((plan, index) => {
                if (index !== activePricingIndex) return null;
                const isHighlight = plan.highlight;
                return (
                  <div
                    key={index}
                    className={`relative rounded-3xl p-5 flex flex-col w-full max-w-sm mx-auto shadow-xl transition-all duration-300 ${
                      isHighlight
                        ? 'bg-linear-to-br from-gray-900 to-gray-800 text-white ring-4 ring-gray-800'
                        : 'bg-white border border-gray-100 text-gray-900'
                    }`}
                  >
                    {isHighlight && (
                      <div className='absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl shadow-lg'>
                        POPULAR
                      </div>
                    )}

                    <div className='mb-4'>
                      <h3
                        className={`text-xl font-bold ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs ${isHighlight ? 'text-gray-300' : 'text-gray-500'}`}
                      >
                        {plan.description}
                      </p>
                    </div>

                    <div className='mb-6 border-b border-gray-200/20 pb-4'>
                      <span
                        className={`text-2xl font-extrabold block ${isHighlight ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-xs font-medium ${isHighlight ? 'text-orange-400' : 'text-primary'}`}
                      >
                        / {plan.duration}
                      </span>
                    </div>

                    <ul className='space-y-3 mb-6 grow'>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className='flex items-start gap-2.5'>
                          <div
                            className={`mt-0.5 min-w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isHighlight ? 'bg-orange-500/20 text-orange-400' : 'bg-green-100 text-green-600'}`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <div className='text-xs'>
                            <span
                              className={`font-medium block ${isHighlight ? 'text-gray-200' : 'text-gray-800'}`}
                            >
                              {feature.name}
                            </span>
                            {feature.value !== true && (
                              <span
                                className={`text-[10px] block mt-0.5 ${isHighlight ? 'text-gray-400' : 'text-gray-500'}`}
                              >
                                {feature.value}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        window.open(
                          CONTACT_INFO.whatsapp.url(
                            `Halo Dietisienmu, saya tertarik dengan paket ${plan.name}.`,
                          ),
                          '_blank',
                        )
                      }
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm cursor-pointer
                        ${
                          isHighlight
                            ? 'bg-primary hover:bg-orange-600 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'
                        }`}
                    >
                      Pilih Paket {plan.name}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevPricingSlide}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 backdrop-blur-sm transition-all z-20 cursor-pointer'
              aria-label='Previous Pricing'
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPricingSlide}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 backdrop-blur-sm transition-all z-20 cursor-pointer'
              aria-label='Next Pricing'
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots/Indicators */}
            <div className='flex justify-center gap-2 mt-6'>
              {PRICING_PLANS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePricingIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activePricingIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
