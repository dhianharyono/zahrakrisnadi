import React, { useState } from 'react';
import { RotateCcw, ChevronRight, Loader2 } from 'lucide-react';
import {
  BMI_CATEGORIES,
  BMICategoryData,
  CONTACT_INFO,
} from '../utils/constants';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [resultCategory, setResultCategory] = useState<BMICategoryData | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const calculateBMI = () => {
    if (height && weight) {
      setLoading(true);

      setTimeout(() => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        const bmiValue = w / (h * h);
        const roundedBmi = parseFloat(bmiValue.toFixed(1));

        setBmi(roundedBmi);

        // Determine Category based on Asian BMI standards (common in Indonesia)
        if (roundedBmi < 18.5) setResultCategory(BMI_CATEGORIES[0]);
        else if (roundedBmi <= 22.9) setResultCategory(BMI_CATEGORIES[1]);
        else if (roundedBmi <= 24.9) setResultCategory(BMI_CATEGORIES[2]);
        else if (roundedBmi <= 29.9) setResultCategory(BMI_CATEGORIES[3]);
        else setResultCategory(BMI_CATEGORIES[4]);

        setLoading(false);
      }, 800);
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setBmi(null);
    setResultCategory(null);
  };

  /**
   * Calculate the position of the marker on the gauge bar (0% to 100%).
   * Mapping roughly:
   * 0% (BMI 15) -> 100% (BMI 35) for visualization
   */
  const getMarkerPosition = (value: number) => {
    const minBMI = 15;
    const maxBMI = 35;
    const percentage = ((value - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <section id='bmi-calculator' className='py-12 lg:py-20 bg-orange-50/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
          {/* Left Side: Text Content */}
          <div className='space-y-3 md:space-y-6 p-4'>
            <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
              Pantau Progressmu
            </span>
            <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight'>
              Kalkulator BMI
            </h2>
            <p className='text-xs md:text-sm lg:text-lg text-gray-600'>
              Ketahui Body Mass Index (BMI) Anda secara instan. BMI adalah
              indikator sederhana dari rasio berat badan terhadap tinggi badan
              yang digunakan untuk mengklasifikasikan status berat badan.
            </p>
            <ul className='space-y-4 text-xs md:text-sm lg:text-lg mt-5'>
              <li className='flex items-center gap-3'>
                <div className='w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
                  <ChevronRight size={16} />
                </div>
                <span className='text-gray-700 font-medium'>
                  Hasil Instan & Akurat
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
                  <ChevronRight size={16} />
                </div>
                <span className='text-gray-700 font-medium'>
                  Saran gizi dasar terlampir
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
                  <ChevronRight size={16} />
                </div>
                <span className='text-gray-700 font-medium'>
                  Standard BMI Asia Pasifik
                </span>
              </li>
            </ul>
          </div>

          {/* Right Reference: Form OR Result Card */}
          <div className='bg-white mt-0 md:mt-8 lg:mt-10 rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative transition-all duration-500 ease-in-out'>
            {bmi === null ? (
              // --- FORM STATE --- //
              <div className='p-6 lg:p-10 space-y-6'>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-xs md:text-sm font-semibold text-gray-600'>
                      Tinggi (cm)
                    </label>
                    <input
                      type='number'
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className='w-full px-4 py-3 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400'
                      placeholder='170'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs md:text-sm font-semibold text-gray-600'>
                      Berat (kg)
                    </label>
                    <input
                      type='number'
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className='w-full px-4 py-3 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600'
                      placeholder='65'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs md:text-sm font-semibold text-gray-600'>
                    Usia (tahun)
                  </label>
                  <input
                    type='number'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className='w-full px-4 py-3 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400'
                    placeholder='25'
                  />
                  <p className='text-[10px] md:text-xs text-gray-400 italic'>
                    *Kalkulator ini berlaku untuk usia 20 tahun ke atas.
                  </p>
                </div>

                <button
                  onClick={calculateBMI}
                  disabled={loading}
                  className='w-full text-xs md:text-sm bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer'
                >
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'Hitung Sekarang'
                  )}
                </button>
              </div>
            ) : (
              // --- RESULT STATE --- //
              <div className='p-8 lg:p-10 animate-fade-in'>
                <div className='flex justify-between items-start mb-6'>
                  <div>
                    <h3 className='text-sm md:text-xl font-bold text-gray-900'>
                      Hasil Anda:
                    </h3>
                    <p
                      className={`text-lg md:text-2xl font-extrabold ${resultCategory?.textCurrent} mt-1`}
                    >
                      {resultCategory?.label}
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className='p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-primary transition-colors'
                    title='Hitung Ulang'
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                {/* Gauge Bar */}
                <div className='relative h-6 w-full rounded-full bg-gray-200 mb-8 overflow-hidden flex'>
                  {/* Segments matching the logic visually */}
                  <div
                    className='bg-blue-500 h-full w-[17.5%]'
                    title='Underweight'
                  ></div>{' '}
                  {/* < 18.5 */}
                  <div
                    className='bg-green-500 h-full w-[22%]'
                    title='Normal'
                  ></div>{' '}
                  {/* 18.5 - 22.9 */}
                  <div
                    className='bg-yellow-500 h-full w-[10%]'
                    title='Overweight'
                  ></div>{' '}
                  {/* 23 - 24.9 */}
                  <div
                    className='bg-orange-500 h-full w-[25%]'
                    title='Obesity I'
                  ></div>{' '}
                  {/* 25 - 29.9 */}
                  <div
                    className='bg-red-500 h-full grow'
                    title='Obesity II'
                  ></div>{' '}
                  {/* > 30 */}
                  {/* Marker */}
                  <div
                    className='absolute top-0 bottom-0 w-1 bg-gray-900 shadow-xl z-10 transition-all duration-1000'
                    style={{ left: `${getMarkerPosition(bmi)}%` }}
                  ></div>
                </div>

                {/* Reference Table */}
                <div className='mb-8'>
                  <div className='grid grid-cols-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide'>
                    <span>IMT (BMI)</span>
                    <span>Klasifikasi</span>
                  </div>
                  <div className='space-y-3'>
                    {BMI_CATEGORIES.map((cat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center text-sm ${cat.label === resultCategory?.label ? 'font-bold bg-gray-50 -mx-2 px-2 py-1 rounded-lg' : 'text-gray-600'}`}
                      >
                        <div className='w-1/2 flex items-center gap-2'>
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${cat.color}`}
                          ></div>
                          <span className='text-xs md:text-sm'>
                            {cat.range}
                          </span>
                        </div>
                        <div className='w-1/2 text-xs md:text-sm'>
                          {cat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div className='mb-8 pt-6 border-t border-gray-100'>
                  <h4 className='font-bold text-gray-900 mb-2 text-sm md:text-lg'>
                    Apa maksudnya?
                  </h4>
                  <p className='text-gray-600 text-xs md:text-sm leading-relaxed'>
                    Memiliki IMT (BMI) <span className='font-bold'>{bmi}</span>{' '}
                    berarti berat badan Anda{' '}
                    <span className='lowercase'>
                      {resultCategory?.description}
                    </span>
                  </p>
                </div>

                {/* CTAs */}
                <div className='space-y-3'>
                  <button
                    onClick={() => {
                      const message = `Halo Admin, saya sudah hitung BMI saya dan hasilnya ${bmi} (${resultCategory?.label}). Saya ingin konsultasi lebih lanjut dok.`;
                      window.open(CONTACT_INFO.whatsapp.url(message), '_blank');
                    }}
                    className='w-full bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 block text-center text-xs md:text-sm'
                  >
                    Konsultasi Dokter Online
                  </button>
                </div>

                <p className='text-[10px] text-gray-400 mt-4 text-center italic'>
                  *Hasil ini hanyalah indikator awal. Silakan konsultasi dengan
                  ahli untuk diagnosis medis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
