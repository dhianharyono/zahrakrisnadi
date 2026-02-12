import React from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '../utils/constants';
import { X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<
    (typeof PORTFOLIO_DATA)[0] | null
  >(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  return (
    <section id='portfolio' className='py-15 bg-white relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-5 md:mb-16'>
          <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
            Galeri
          </span>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 leading-tight'>
            Portofolio <span className='text-primary italic'>Kegiatan</span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-sm md:text-lg'>
            Dokumentasi berbagai kegiatan seminar, workshop, dan konsultasi gizi
            yang telah dilaksanakan bersama berbagai mitra dan klien.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-0'>
          {PORTFOLIO_DATA.map((item, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer'
              onClick={() => setSelectedItem(item)}
            >
              <div className='aspect-4/3 relative bg-gray-100'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover object-top transition-transform duration-700 group-hover:scale-110'
                />
                {/* Overlay: visible on hover */}
                <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6'>
                  <span className='bg-primary text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full w-fit mb-3 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75'>
                    {item.category}
                  </span>
                  <h3 className='text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 hidden md:block'>
                    {item.title}
                  </h3>
                  <h3 className='text-white text-lg font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 md:hidden'>
                    {item.title}
                  </h3>
                  <p className='text-gray-200 text-sm line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150'>
                    Klik untuk melihat detail
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedItem && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'
          role='dialog'
          aria-modal='true'
        >
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity'
            onClick={() => setSelectedItem(null)}
          ></div>

          {/* Modal Content */}
          <div className='relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden animate-modal-in duration-300'>
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className='absolute top-3 right-3 z-10 md:hidden bg-white/80 p-1.5 rounded-full text-gray-800 hover:bg-white transition-colors shadow-sm'
            >
              <X size={20} />
            </button>
            <button
              onClick={() => setSelectedItem(null)}
              className='absolute top-4 right-4 z-10 hidden md:block bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors'
            >
              <X size={24} />
            </button>

            {/* Image Side */}
            <div className='w-full md:w-1/2 h-56 md:h-auto relative bg-gray-50 flex-shrink-0'>
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className='object-contain p-2 md:p-4'
              />
            </div>

            {/* Content Side */}
            <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white'>
              <span className='text-primary font-bold tracking-wider uppercase text-[10px] md:text-xs mb-2 md:mb-3'>
                {selectedItem.category}
              </span>
              <h3 className='text-lg md:text-3xl font-extrabold text-gray-900 mb-3 md:mb-6 leading-tight'>
                {selectedItem.title}
              </h3>
              <div className='prose prose-sm md:prose-blue text-gray-600 mb-6 md:mb-8'>
                <p className='leading-relaxed text-sm md:text-lg'>
                  {selectedItem.description}
                </p>
              </div>

              <div className='flex gap-3 md:gap-4 mt-auto'>
                <button
                  onClick={() => setSelectedItem(null)}
                  className='flex-1 md:flex-none px-4 py-2 md:px-6 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg md:rounded-xl transition-colors cursor-pointer text-xs md:text-sm'
                >
                  Tutup
                </button>
                <a
                  href='#collaboration'
                  onClick={() => setSelectedItem(null)}
                  className='flex-1 md:flex-none text-center px-4 py-2 md:px-6 md:py-3 bg-primary hover:bg-primary/90 text-xs md:text-sm text-white font-semibold rounded-lg md:rounded-xl transition-colors cursor-pointer'
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
