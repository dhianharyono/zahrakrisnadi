'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HelpCircle, Stethoscope, X } from 'lucide-react';

const GTMChecklist: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id='gtm-checklist'
      className='py-14 lg:py-24 relative overflow-hidden bg-linear-to-br from-orange-50/80 via-white to-red-50/50'
    >
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl mix-blend-multiply'></div>
        <div className='absolute bottom-10 -left-32 w-120 h-120 rounded-full bg-red-100/40 blur-3xl mix-blend-multiply'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-12 lg:mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 text-primary font-medium text-xs md:text-sm mb-4 shadow-sm'>
            <Stethoscope size={16} />
            Edukasi
          </div>
          <h2 className='text-xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 leading-tight'>
            Checklist Penyebab{' '}
            <span className='text-primary inline-block relative'>
              GTM
              <svg
                className='absolute w-full h-3 -bottom-1 left-0 text-orange-300 opacity-70'
                viewBox='0 0 100 20'
                preserveAspectRatio='none'
              >
                <path
                  d='M0,10 Q50,20 100,5'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                />
              </svg>
            </span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-xs md:text-sm'>
            Temukan berbagai potensi penyebab Gerakan Tutup Mulut pada si Kecil
            untuk membantu AyBun memberikan penanganan yang tepat.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch'>
          {/* Left: Text Content */}
          <div className='flex-1 flex flex-col gap-6 justify-center'>
            {/* Card 1 */}
            <div className='relative overflow-hidden bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group h-full'>
              <div className='absolute -right-4 -top-4 w-24 h-24 bg-linear-to-bl from-orange-100 to-transparent rounded-full opacity-0 scale-50 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'></div>
              <div className='relative z-10'>
                <div className='flex items-center gap-3 md:gap-4 mb-4 md:mb-5'>
                  <div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-orange-50 text-orange-500 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                    <HelpCircle className='w-5 h-5 md:w-6 md:h-6' />
                  </div>
                  <h3 className='text-sm md:text-lg font-bold text-gray-900 leading-tight'>
                    UNTUK SIAPA LIST INI?
                  </h3>
                </div>
                <p className='text-gray-600 text-xs md:text-sm leading-relaxed'>
                  Jika anak AyBun mengalami kesulitan makan,{' '}
                  <span className='font-medium italic'>picky eater</span> maupun{' '}
                  <strong className='text-gray-800'>
                    GTM (gerakan tutup mulut)
                  </strong>{' '}
                  berkepanjangan, maka checklist ini dapat membantu AyBun untuk
                  mencari tahu sumber sebab anak sulit makan.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='relative overflow-hidden bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group h-full'>
              <div className='absolute -right-4 -bottom-4 w-24 h-24 bg-linear-to-tl from-red-100 to-transparent rounded-full opacity-0 scale-50 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'></div>
              <div className='relative z-10'>
                <div className='flex items-center gap-3 md:gap-4 mb-4 md:mb-5'>
                  <div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-red-50 text-red-500 shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors duration-300'>
                    <Stethoscope className='w-5 h-5 md:w-6 md:h-6' />
                  </div>
                  <h3 className='text-sm md:text-lg font-bold text-gray-900 leading-tight'>
                    SKRINING PFD
                  </h3>
                </div>
                <p className='text-gray-600 text-xs md:text-sm leading-relaxed'>
                  <span className='font-semibold text-gray-800'>
                    Paediatric Feeding Disorder
                  </span>{' '}
                  adalah kondisi di mana asupan oral (lewat mulut) tidak sesuai
                  dengan kebutuhan nutrisi dan perkembangan usia anak. Di dalam
                  checklist ini, silakan AyBun melakukan skrining mandiri untuk
                  mengetahui apakah anak AyBun termasuk berisiko mengalami PFD.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Images Section */}
          <div className='w-full lg:w-[55%] flex flex-col sm:flex-row gap-6 items-center justify-center'>
            {/* Gambar 1: ICFQ */}
            <div
              className='w-full sm:w-1/2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-3/4'
              onClick={() => setSelectedImage('/ICFQ.jpeg')}
            >
              <Image
                src='/ICFQ.jpeg'
                alt='The Feeding Matters Infant and Child Feeding Questionnaire (ICFQ)'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center'>
                <span className='opacity-0 group-hover:opacity-100 bg-white/95 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm shadow-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0'>
                  Perbesar Gambar
                </span>
              </div>
            </div>

            {/* Gambar 2: Checklist Dokter / Ahli */}
            <div
              className='w-full sm:w-1/2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-3/4'
              onClick={() => setSelectedImage('/GTM.jpeg')}
            >
              <Image
                src='/GTM.jpeg'
                alt='Checklist Penyebab GTM by Expert'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center'>
                <span className='opacity-0 group-hover:opacity-100 bg-white/95 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm shadow-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0'>
                  Perbesar Gambar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Image Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm transition-opacity duration-300'
          onClick={() => setSelectedImage(null)}
        >
          <div
            className='relative w-full max-w-4xl max-h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-200'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute -top-12 right-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110'
              aria-label='Tutup popup'
            >
              <X className='w-6 h-6' />
            </button>
            <Image
              src={selectedImage}
              alt='Expanded view'
              width={1200}
              height={1600}
              className='max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl'
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GTMChecklist;
