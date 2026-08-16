import React, { useState } from 'react';
import { RotateCcw, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  BMI_CATEGORIES,
  BMICategoryData,
  CONTACT_INFO,
} from '../utils/constants';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

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
    const hNum = parseFloat(height);
    const wNum = parseFloat(weight);

    if (hNum > 0 && wNum > 0) {
      setLoading(true);

      setTimeout(() => {
        const hMeters = hNum / 100;
        const bmiValue = wNum / (hMeters * hMeters);
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
    <section id='bmi-calculator' className='py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
          {/* Left Side: Text Content */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={itemVariants}
            className='lg:col-span-5 space-y-4 sm:space-y-6'
          >
            <span className='inline-flex items-center rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 sm:mb-4'>
              Pantau Progressmu
            </span>
            <h2 className='font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
              Ketahui Indeks Massa Tubuh (BMI) Anda
            </h2>
            <p className='text-sm text-slate-600 leading-relaxed'>
              Body Mass Index (BMI) adalah indikator sederhana rasio berat badan terhadap tinggi badan yang digunakan secara luas untuk mengukur status gizi dan kesehatan tubuh secara rasional.
            </p>
            <ul className='space-y-3.5 pt-2'>
              <li className='flex items-center gap-3'>
                <div className='w-7 h-7 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0'>
                  <ChevronRight size={16} />
                </div>
                <span className='text-slate-800 font-medium text-sm sm:text-base'>
                  Kalkulasi Akurat & Instan
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='w-7 h-7 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0'>
                  <ChevronRight size={16} />
                </div>
                <span className='text-slate-800 font-medium text-sm sm:text-base'>
                  Standar Klasifikasi BMI Asia Pasifik
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Right Reference: Form OR Result Card */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={itemVariants}
            className='lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xs ring-1 ring-slate-200/80 overflow-hidden relative'
          >
            <AnimatePresence mode='wait'>
              {bmi === null ? (
                // --- FORM STATE --- //
                <motion.div
                  key='form'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-6'
                >
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-end'>
                        <label className='text-xs sm:text-sm font-semibold text-slate-700'>
                          Tinggi (cm)
                        </label>
                        <div className='flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition-all'>
                          <input
                            type='number'
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className='w-12 text-right text-sm font-bold text-slate-900 outline-none bg-transparent'
                            placeholder='170'
                          />
                          <span className='text-xs text-slate-500 select-none font-medium'>
                            cm
                          </span>
                        </div>
                      </div>
                      <input
                        type='range'
                        min='100'
                        max='220'
                        value={height || 165}
                        onChange={(e) => setHeight(e.target.value)}
                        className='w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500'
                      />
                    </div>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-end'>
                        <label className='text-xs sm:text-sm font-semibold text-slate-700'>
                          Berat (kg)
                        </label>
                        <div className='flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition-all'>
                          <input
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className='w-12 text-right text-sm font-bold text-slate-900 outline-none bg-transparent'
                            placeholder='60'
                          />
                          <span className='text-xs text-slate-500 select-none font-medium'>
                            kg
                          </span>
                        </div>
                      </div>
                      <input
                        type='range'
                        min='30'
                        max='150'
                        value={weight || 60}
                        onChange={(e) => setWeight(e.target.value)}
                        className='w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500'
                      />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex justify-between items-end'>
                      <label className='text-xs sm:text-sm font-semibold text-slate-700'>
                        Usia (tahun)
                      </label>
                      <div className='flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition-all'>
                        <input
                          type='number'
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className='w-12 text-right text-sm font-bold text-slate-900 outline-none bg-transparent'
                          placeholder='25'
                        />
                        <span className='text-xs text-slate-500 select-none font-medium'>
                          th
                        </span>
                      </div>
                    </div>
                    <input
                      type='range'
                      min='20'
                      max='100'
                      value={age || 25}
                      onChange={(e) => setAge(e.target.value)}
                      className='w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500'
                    />
                    <p className='text-[11px] text-slate-500 italic pt-2'>
                      *Kalkulator ini berlaku untuk usia 20 tahun ke atas.
                    </p>
                  </div>

                  <button
                    onClick={calculateBMI}
                    disabled={loading}
                    className='w-full text-sm rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer mt-4'
                  >
                    {loading ? (
                      <Loader2 className='animate-spin w-5 h-5' />
                    ) : (
                      'Hitung BMI Sekarang'
                    )}
                  </button>
                </motion.div>
              ) : (
                // --- RESULT STATE --- //
                <motion.div
                  key='result'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className='space-y-6'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider'>
                        Hasil Indeks Massa Tubuh (BMI)
                      </h3>
                      <p
                        className={`text-2xl sm:text-3xl font-extrabold ${resultCategory?.textCurrent} mt-1`}
                      >
                        {bmi} — {resultCategory?.label}
                      </p>
                    </div>
                    <button
                      onClick={reset}
                      className='p-2.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-amber-600 transition-colors'
                      title='Hitung Ulang'
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>

                  {/* Gauge Bar */}
                  <div className='relative h-5 w-full rounded-full bg-slate-200 mb-6 overflow-hidden flex'>
                    <div
                      className='bg-blue-500 h-full w-[17.5%]'
                      title='Underweight'
                    ></div>
                    <div
                      className='bg-emerald-500 h-full w-[22%]'
                      title='Normal'
                    ></div>
                    <div
                      className='bg-amber-400 h-full w-[10%]'
                      title='Overweight'
                    ></div>
                    <div
                      className='bg-orange-500 h-full w-[25%]'
                      title='Obesity I'
                    ></div>
                    <div
                      className='bg-red-500 h-full grow'
                      title='Obesity II'
                    ></div>
                    {/* Marker */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: `${getMarkerPosition(bmi)}%` }}
                      transition={{
                        delay: 0.3,
                        duration: 1.2,
                        ease: 'easeOut',
                      }}
                      className='absolute top-0 bottom-0 w-1.5 bg-slate-900 shadow-md z-10 rounded-full'
                    ></motion.div>
                  </div>

                  {/* Reference Table */}
                  <div className='rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2.5'>
                    <div className='grid grid-cols-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-200/60'>
                      <span>IMT (BMI)</span>
                      <span>Klasifikasi</span>
                    </div>
                    <div className='space-y-2'>
                      {BMI_CATEGORIES.map((cat, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center text-xs sm:text-sm ${cat.label === resultCategory?.label ? 'font-bold bg-amber-100/70 text-amber-900 px-3 py-1.5 rounded-xl ring-1 ring-amber-300/60' : 'text-slate-600 px-3 py-1'}`}
                        >
                          <div className='w-1/2 flex items-center gap-2'>
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${cat.color}`}
                            ></div>
                            <span>{cat.range}</span>
                          </div>
                          <div className='w-1/2'>{cat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className='pt-4 border-t border-slate-200/80'>
                    <h4 className='font-bold text-slate-900 text-base mb-2'>
                      Penjelasan & Penanganan:
                    </h4>

                    {(resultCategory?.label.includes('Obesitas') ||
                      resultCategory?.label === 'Berat badan lebih') && (
                        <div className='text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed'>
                          <p>
                            Memiliki IMT (BMI){' '}
                            <span className='font-bold text-slate-900'>{bmi}</span> berarti berat badan Anda <span className='font-semibold text-slate-900'>{resultCategory?.description}</span>.
                          </p>
                          <p>
                            Menjaga berat badan ideal dapat secara signifikan mengurangi risiko gangguan metabolisme dan penyakit sistemik jangka panjang.
                          </p>
                        </div>
                      )}
                  </div>

                  {/* CTAs */}
                  <div className='pt-2'>
                    <button
                      onClick={() => {
                        const message = `Halo Admin, saya sudah hitung BMI saya dan hasilnya ${bmi} (${resultCategory?.label}). Saya ingin konsultasi lebih lanjut dok.`;
                        window.open(
                          CONTACT_INFO.whatsapp.url(message),
                          '_blank',
                        );
                      }}
                      className='w-full text-sm rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 shadow-sm hover:shadow-md transition-all active:scale-95 block text-center'
                    >
                      Konsultasi Ahli Gizi Online via WhatsApp
                    </button>
                  </div>

                  <p className='text-[11px] text-slate-500 text-center italic'>
                    *Hasil kalkulator ini adalah indikator awal. Silakan konsultasikan kondisi spesifik Anda dengan Dietisien.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
