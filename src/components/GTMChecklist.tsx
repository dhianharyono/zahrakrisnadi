'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Stethoscope,
  FileText,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
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
          className='text-center max-w-2xl mx-auto mb-12 sm:mb-16'
        >
          <span className='inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-3 sm:mb-4'>
            <Stethoscope size={15} />
            Edukasi Kesehatan
          </span>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight'>
            Checklist Penyebab GTM (Gerakan Tutup Mulut)
          </h2>
          <p className='text-slate-600 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto'>
            Temukan potensi penyebab anak sulit makan untuk membantu AyBun memberikan penanganan medis yang tepat.
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
          {/* Left: Info & Download (5 columns) */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
            className='lg:col-span-5 flex flex-col gap-6'
          >
            {/* UNTUK SIAPA LIST INI? */}
            <motion.div
              variants={itemVariants}
              className='rounded-3xl bg-white p-7 sm:p-8 shadow-xs ring-1 ring-slate-200/80 hover:ring-amber-300/60 hover:shadow-md transition-all duration-300'
            >
              <div className='flex items-center gap-3.5 mb-4'>
                <div className='w-11 h-11 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0'>
                  <HelpCircle className='w-5 h-5' />
                </div>
                <h3 className='text-base sm:text-lg font-bold text-slate-900 tracking-tight'>
                  Untuk Siapa Checklist Ini?
                </h3>
              </div>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Jika si Kecil mengalami kesulitan makan, <span className='italic font-semibold text-slate-800'>picky eater</span>, maupun <strong className='text-slate-900'>Gerakan Tutup Mulut (GTM)</strong> berkepanjangan, checklist ini membantu AyBun menemukan akar masalahnya.
              </p>
            </motion.div>

            {/* SKRINING PFD */}
            <motion.div
              variants={itemVariants}
              className='rounded-3xl bg-white p-7 sm:p-8 shadow-xs ring-1 ring-slate-200/80 hover:ring-rose-300/60 hover:shadow-md transition-all duration-300'
            >
              <div className='flex items-center gap-3.5 mb-4'>
                <div className='w-11 h-11 rounded-2xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0'>
                  <Stethoscope className='w-5 h-5' />
                </div>
                <h3 className='text-base sm:text-lg font-bold text-slate-900 tracking-tight'>
                  Skrining Risiko PFD
                </h3>
              </div>
              <p className='text-sm text-slate-600 leading-relaxed'>
                <span className='font-semibold text-slate-900'>Paediatric Feeding Disorder (PFD)</span> adalah kondisi saat asupan oral tidak mencukupi kebutuhan nutrisi & perkembangan usia anak.
              </p>
            </motion.div>

            {/* Download Button Component */}
            <motion.div
              variants={itemVariants}
              className='rounded-3xl bg-slate-50 border border-slate-200/80 p-6 shadow-xs relative overflow-hidden'
            >
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='flex gap-3.5 items-center'>
                  <div className='w-11 h-11 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0'>
                    <FileText className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-slate-900 leading-snug'>
                      Checklist Lengkap GTM
                    </h4>
                    <p className='text-slate-500 text-xs mt-0.5'>
                      Dokumen PDF Ringkas
                    </p>
                  </div>
                </div>
                <a
                  href='/file/Checklist Penyebab GTM.pdf'
                  download
                  className='inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 cursor-pointer shadow-xs shrink-0'
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
            className='lg:col-span-7 flex flex-col gap-6'
          >
            <div className='bg-amber-50/70 p-6 sm:p-8 rounded-3xl border border-amber-200/80'>
              <div className='text-center mb-8'>
                <h3 className='font-serif text-base sm:text-lg font-bold text-slate-900 mb-2 leading-tight uppercase tracking-wide'>
                  Infant and Child Feeding Questionnaire (ICFQ)©
                </h3>
                <p className='text-slate-700 font-medium text-xs sm:text-sm'>
                  Untuk anak usia 0-36 bulan (disesuaikan untuk anak prematur)
                </p>
              </div>
              <div className='space-y-4'>
                {questions.map((q, idx) => (
                  <div key={idx} className='flex flex-col gap-3'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                      <div className='flex-1 bg-white p-4 sm:p-5 rounded-2xl ring-1 ring-slate-200/80 shadow-2xs flex items-start gap-3'>
                        <span className='text-amber-600 font-bold text-sm shrink-0'>
                          {idx + 1}.
                        </span>
                        <p className='text-xs sm:text-sm font-medium text-slate-800 leading-relaxed'>
                          {q.text}
                        </p>
                      </div>

                      <div className='flex flex-col items-center gap-1 shrink-0'>
                        <div className='flex gap-1.5 p-1 rounded-2xl bg-white ring-1 ring-slate-200/80'>
                          {q.options.map((option) => {
                            const isRisk = q.riskOptions.includes(option);
                            const isSelected = answers[idx] === option;

                            return (
                              <button
                                key={option}
                                onClick={() => toggleAnswer(idx, option)}
                                className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 uppercase tracking-wider ${isSelected
                                    ? isRisk
                                      ? 'bg-amber-500 text-white shadow-xs'
                                      : 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                  }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className='text-xs font-bold text-slate-800 leading-relaxed text-center mt-8 pt-4 border-t border-amber-200/80'>
                  JIKA TERDAPAT 2 ATAU LEBIH JAWABAN BERWARNA ORANYE,
                  <span className='block text-xs mt-1 text-amber-700 font-semibold'>
                    SEGERA KONSULTASIKAN DENGAN DOKTER SPESIALIS ANAK (DSA)
                  </span>
                </p>
              </div>
            </div>

            <AnimatePresence>
              {totalAnswered === questions.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex flex-col items-center gap-4 mt-2'
                >
                  {riskCount >= 2 ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='w-full p-5 sm:p-6 rounded-3xl bg-rose-500 text-white shadow-md flex items-center gap-4 relative overflow-hidden'
                    >
                      <div className='p-3 bg-white/20 rounded-2xl backdrop-blur-md shrink-0'>
                        <AlertCircle className='w-6 h-6' />
                      </div>
                      <div>
                        <p className='font-bold text-xs uppercase tracking-wider mb-0.5 opacity-90'>
                          Peringatan Dini:
                        </p>
                        <p className='text-xs sm:text-sm font-medium leading-relaxed'>
                          Si Kecil menunjukkan indikasi risiko Paediatric Feeding Disorder. Segera konsultasikan dengan Dokter Spesialis Anak (DSA).
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='w-full p-5 sm:p-6 rounded-3xl bg-emerald-600 text-white shadow-md flex items-center gap-4 relative overflow-hidden'
                    >
                      <div className='p-3 bg-white/20 rounded-2xl backdrop-blur-md shrink-0'>
                        <CheckCircle2 className='w-6 h-6' />
                      </div>
                      <div>
                        <p className='font-bold text-xs uppercase tracking-wider mb-0.5 opacity-90'>
                          Hasil Skrining:
                        </p>
                        <p className='text-xs sm:text-sm font-medium leading-relaxed'>
                          Si Kecil dalam kategori risiko rendah. Tetap konsisten menjaga pola makan & feeding rules yang baik ya, AyBun!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setAnswers({})}
                    className='cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full bg-white ring-1 ring-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all shadow-2xs'
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
