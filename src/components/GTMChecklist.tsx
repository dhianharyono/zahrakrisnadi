'use client';

import React, { useState } from 'react';
import { HelpCircle, Stethoscope, FileText, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const GTMChecklist: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      text: 'Apakah anak Mom memberi tahu/signal saat lapar?',
      options: ['YA', 'TIDAK'],
      riskOptions: ['TIDAK'],
    },
    {
      text: 'Apakah menurut Mom anakmu makan dengan cukup?',
      options: ['YA', 'TIDAK'],
      riskOptions: ['TIDAK'],
    },
    {
      text: 'Berapa lama waktu untuk memberi makan anak Mom?',
      options: ['<5', '5-30', '>30'],
      riskOptions: ['<5', '>30'],
      subtext: '(dalam menit)',
    },
    {
      text: 'Apakah Mom harus melakukan sesuatu yang spesial agar anak mau makan?',
      options: ['YA', 'TIDAK'],
      riskOptions: ['YA'],
    },
    {
      text: 'Apakah anak Mom memberi tahu/signal jika sudah kenyang?',
      options: ['YA', 'TIDAK'],
      riskOptions: ['TIDAK'],
    },
    {
      text: 'Berdasarkan pertanyaan di atas, apakah Mom memiliki kekhawatiran tentang kemajuan makan anak Mom?',
      options: ['YA', 'TIDAK'],
      riskOptions: ['YA'],
    },
  ];

  const toggleAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const riskCount = Object.entries(answers).reduce((count, [idx, value]) => {
    const question = questions[parseInt(idx)];
    return question.riskOptions.includes(value) ? count + 1 : count;
  }, 0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const totalAnswered = Object.keys(answers).length;

  return (
    <section
      id='gtm-checklist'
      className='py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30'
    >
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl mix-blend-multiply'
        ></motion.div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Main Header */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className='text-center mb-16 lg:mb-20'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-6 shadow-sm border border-orange-200'>
            <Stethoscope size={16} />
            Edukasi
          </div>
          <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-2 lg:mb-6 leading-tight'>
            Checklist Penyebab{' '}
            <span className='text-primary inline-block relative'>
              GTM
              <svg
                className='absolute w-full h-3 -bottom-2 left-0 text-orange-400 opacity-60'
                viewBox='0 0 100 20'
                preserveAspectRatio='none'
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d='M0,10 Q50,20 100,5'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                />
              </svg>
            </span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-xs lg:text-lg'>
            Temukan berbagai potensi penyebab Gerakan Tutup Mulut pada si Kecil untuk membantu AyBun memberikan penanganan yang tepat.
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className='grid lg:grid-cols-12 gap-10 lg:gap-16 items-start'>
          {/* Left: Info & Download (5 columns) */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
            className='lg:col-span-12 xl:col-span-5 flex flex-col gap-8'
          >
            {/* UNTUK SIAPA LIST INI? */}
            <motion.div
              variants={itemVariants}
              className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-orange-100/30 border border-orange-100/50 hover:border-orange-200 transition-colors group'
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 bg-orange-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  <HelpCircle className='w-7 h-7' />
                </div>
                <h3 className='text-xl font-black text-gray-900 tracking-tight'>
                  UNTUK SIAPA LIST INI?
                </h3>
              </div>
              <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                Jika anak AyBun mengalami kesulitan makan, <span className='font-bold italic'>picky eater</span> maupun <strong className='text-gray-900'>GTM (gerakan tutup mulut)</strong> berkepanjangan, maka checklist ini dapat membantu AyBun untuk mencari tahu sumber sebab anak sulit makan.
              </p>
            </motion.div>

            {/* SKRINING PFD */}
            <motion.div
              variants={itemVariants}
              className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-red-100/20 border border-red-100/50 hover:border-red-200 transition-colors group'
            >
              <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 bg-red-50 rounded-2xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300'>
                  <Stethoscope className='w-7 h-7' />
                </div>
                <h3 className='text-xl font-black text-gray-900 tracking-tight'>
                  SKRINING PFD
                </h3>
              </div>
              <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                <span className='font-bold text-gray-800'>Paediatric Feeding Disorder</span> adalah kondisi dimana asupan oral (lewat mulut) tidak sesuai dengan kebutuhan nutrisi dan perkembangan usia anak. Di dalam check list ini, silahkan AyBun melakukan skrining mandiri untuk mengetahui apakah anak AyBun termasuk berisiko mengalami PFD.
              </p>
            </motion.div>

            {/* Download Button Component - Minimalist Version */}
            <motion.div
              variants={itemVariants}
              className='p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden group'
            >
              <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div className='flex gap-4 items-center'>
                  <div className='p-3 bg-white rounded-2xl shadow-sm text-orange-500'>
                    <FileText className='w-6 h-6' />
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-slate-900 leading-tight'>Checklist Lengkap GTM</h4>
                    <p className='text-slate-500 text-xs mt-1'>Edisi PDF Premium untuk AyBun</p>
                  </div>
                </div>
                <a
                  href='/file/Checklist Penyebab GTM.pdf'
                  download
                  className='inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer shadow-md'
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Form (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='lg:col-span-12 xl:col-span-7 flex flex-col gap-6'
          >
            <div className='bg-orange-100/30 p-6 md:p-8 rounded-[2rem] border border-orange-100'>
              <div className='flex flex-col gap-2 mb-10 text-center'>
                <h3 className='text-lg md:text-xl font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight'>
                  THE FEEDING MATTERS INFANT AND CHILD FEEDING QUESTIONNAIRE (ICFQ)©
                </h3>
                <div className='flex flex-col items-center gap-x-3 gap-y-1'>
                  <p className='text-gray-700 font-bold text-sm'>
                    Untuk digunakan anak 0-36 bulan
                  </p>
                  <p className='text-gray-500 italic text-xs'>
                    (dengan adjustment untuk anak prematur = usia koreksi)
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                {questions.map((q, idx) => (
                  <div key={idx} className='flex flex-col gap-3'>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                      <div className='flex-1 bg-white p-5 md:p-6 rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] border-2 border-transparent border-b-gray-100 flex items-start gap-3'>
                        <span className='text-primary font-black text-sm md:text-base'>{idx + 1}.</span>
                        <p className='text-sm md:text-base font-bold text-gray-800 leading-snug'>
                          {q.text}
                        </p>
                      </div>

                      <div className='flex flex-col items-center gap-1 shrink-0'>
                        <div className='flex gap-2 p-1 rounded-2xl border border-gray-200'>
                          {q.options.map((option) => {
                            const isRisk = q.riskOptions.includes(option);
                            const isSelected = answers[idx] === option;

                            return (
                              <button
                                key={option}
                                onClick={() => toggleAnswer(idx, option)}
                                className={`cursor-pointer min-w-[70px] md:min-w-[85px] px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-200 uppercase tracking-wider ${isSelected
                                  ? isRisk
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-95'
                                    : 'bg-gray-800 text-white shadow-lg scale-95'
                                  : 'bg-white text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                                  }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        {q.subtext && (
                          <span className='text-[10px] font-bold text-gray-600 uppercase tracking-tighter'>
                            {q.subtext}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <p className='text-xs font-black text-gray-800 tracking-[0.2em] leading-relaxed text-center mt-10'>
                  JIKA TERDAPAT 2 ATAU LEBIH JAWABAN BERWARNA ORANYE,
                  <span className='block text-xs mt-1 text-primary'>SEGERA KONSULTASIKAN DENGAN DSA (DOKTER SPESIALIS ANAK)</span>
                </p>
              </div>
            </div>

            <AnimatePresence>
              {totalAnswered === questions.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex flex-col items-center gap-6 mt-6'
                >
                  {riskCount >= 2 ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='w-full p-6 rounded-[2rem] bg-red-500 text-white shadow-xl shadow-red-500/20 flex items-center gap-3 md:gap-6 relative overflow-hidden'
                    >
                      <div className='absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl'></div>
                      <div className='p-2 md:p-4 bg-white/20 rounded-2xl backdrop-blur-md shrink-0'>
                        <AlertCircle className='w-4 h-4 md:w-8 md:h-8' />
                      </div>
                      <div>
                        <p className='font-black text-xs uppercase tracking-widest mb-1 opacity-80'>Peringatan Dini:</p>
                        <p className='text-sm font-bold leading-tight'>Si Kecil menunjukkan risiko Paediatric Feeding Disorder.<br /> Segera jadwalkan konsultasi dengan Dokter Spesialis Anak (DSA)</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='w-full p-6 rounded-[2rem] bg-green-500 text-white shadow-xl shadow-green-500/20 flex items-center gap-3 md:gap-6 relative overflow-hidden'
                    >
                      <div className='absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl'></div>
                      <div className='p-2 md:p-4 bg-white/20 rounded-2xl backdrop-blur-md shrink-0'>
                        <CheckCircle2 className='w-4 h-4 md:w-8 md:h-8' />
                      </div>
                      <div>
                        <p className='font-black text-xs uppercase tracking-widest mb-1 opacity-80'>Hasil Skrining:</p>
                        <p className='text-sm font-bold leading-tight'>Si Kecil saat ini dalam kategori risiko rendah. <br />Tetap konsisten pantau pola makan & feeding rules yang baik ya, AyBun!</p>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAnswers({})}
                    className='cursor-pointer flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-orange-100 text-orange-500 font-bold text-sm hover:bg-orange-50 hover:border-orange-200 transition-all shadow-sm'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Reset Checklist
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GTMChecklist;

