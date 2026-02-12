import React from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

const Hero: React.FC = () => {
  return (
    <section className='relative min-h-screen pt-24 pb-12 lg:pt-32 lg:pb-20 flex items-center overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center'>
          {/* Left Content */}
          <div className='space-y-3 lg:space-y-8 mt-15 lg:mt-0'>
            <span className='text-primary font-serif italic text-sm md:text-lg block text-center lg:text-left'>
              Think Healthier
            </span>
            <h1 className='text-2xl lg:text-6xl font-extrabold text-gray-900 leading-tight text-center lg:text-left'>
              Your
              <span className='text-primary'> Nutrition </span> Journey Start
              Here
            </h1>
            <p className='text-xs md:text-sm lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left mb-8 lg:mb-10'>
              Kami hadir untuk membantu kamu menjadi versi diri yang paling
              sehat melalui pendekatan gizi berbasis ilmu. Dapatkan pendampingan
              personal lewat layanan konsultasi gizi online yang praktis, aman,
              dan sesuai dengan kebutuhan Anda.
            </p>

            <div className='flex flex-col-2 sm:flex-row gap-4 pt-4 justify-center lg:justify-start'>
              <button
                onClick={() =>
                  window.open(
                    CONTACT_INFO.whatsapp.url(
                      'Halo Dietisienmu, saya ingin mulai konsultasi.',
                    ),
                    '_blank',
                  )
                }
                className='flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold shadow-lg shadow-orange-200 hover:shadow-xl transform hover:-translate-y-1 transition-all w-full sm:w-auto cursor-pointer text-xs md:text-sm lg:text-base'
              >
                Mulai Konsultasi
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('services')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold border border-gray-200 shadow-sm hover:shadow-md transition-all w-full sm:w-auto cursor-pointer text-xs md:text-sm lg:text-base'
              >
                {/* <PlayCircle className='w-5 h-5 text-primary' /> */}
                Lihat Layanan
              </button>
            </div>

            <div className='pt-8 flex items-center justify-center lg:justify-start gap-6 lg:gap-8 text-gray-500'>
              <div className='text-center lg:text-left'>
                <h3 className='text-2xl lg:text-3xl font-bold text-green-800'>
                  500+
                </h3>
                <p className='text-xs lg:text-sm font-medium'>Klien Terbantu</p>
              </div>
              <div className='h-12 w-px bg-gray-200'></div>
              <div className='text-center lg:text-left'>
                <h3 className='text-2xl lg:text-3xl font-bold text-green-800'>
                  100%
                </h3>
                <p className='text-xs lg:text-sm font-medium'>Basis Ilmiah</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className='relative mt-12 lg:mt-0 flex justify-center lg:justify-end'>
            <div className='absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-full blur-2xl transform scale-90 translate-y-4 -z-10'></div>

            <div className='relative w-fit mx-auto lg:mr-0'>
              {/* Main Profile Image */}
              <div className='relative z-10 rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white'>
                <div className='relative h-80 w-64 sm:h-112.5 sm:w-87.5 lg:h-125 lg:w-95 bg-gray-100'>
                  <Image
                    src='/images/profile.JPG'
                    alt='Ahli Gizi'
                    fill
                    className='object-cover object-center'
                    priority
                  />
                </div>
              </div>

              {/* Secondary Meal Image (Floating) */}
              <div className='absolute -bottom-8 -left-12 lg:bottom-12 lg:-left-24 z-20 rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white hidden sm:block'>
                <div className='relative h-40 w-40 lg:h-50 lg:w-50 bg-gray-100'>
                  <Image
                    src='/meal.jpg'
                    alt='Healthy Meal'
                    fill
                    className='object-cover object-center'
                    priority
                  />
                </div>
              </div>

              {/* Verification Badge */}
              <div className='absolute bottom-4 right-4 lg:bottom-12 lg:-right-12 z-30 bg-white p-2 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl flex items-center gap-2 lg:gap-4 animate-bounce-slow w-auto lg:max-w-none border border-gray-50 transform scale-90 lg:scale-100 origin-bottom-right'>
                <div className='w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center text-green-600 shrink-0'>
                  <BadgeCheck size={16} className='lg:w-6 lg:h-6' />
                </div>
                <div>
                  <p className='font-semibold text-gray-500 text-[10px] lg:text-sm'>
                    TERVERIFIKASI
                  </p>
                  <p className='font-bold text-xs lg:text-sm text-gray-900 leading-tight whitespace-nowrap'>
                    Ahli Gizi Berlisensi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
