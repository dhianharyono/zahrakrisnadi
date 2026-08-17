'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MousePointerClick, Video, FileText, Sparkles } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const stepsList = [
  {
    num: '01',
    title: 'Pilih Program',
    desc: 'Tentukan program konsultasi sesuai kebutuhanmu dan selesaikan pembayaran.',
    Icon: MousePointerClick,
    color: 'text-amber-500',
  },
  {
    num: '02',
    title: 'Sesi Konsultasi',
    desc: 'Terhubung langsung dengan Dietisien / Ahli Gizi tersertifikasi.',
    Icon: Video,
    color: 'text-amber-500',
  },
  {
    num: '03',
    title: 'Meal Plan',
    desc: 'Dapatkan rencana makan (meal plan) yang dipersonalisasi khusus untuk tubuh Anda.',
    Icon: FileText,
    color: 'text-amber-500',
  },
  {
    num: '04',
    title: 'Mulai Sehat',
    desc: 'Nikmati perjalanan baru menuju tubuh yang lebih sehat!',
    Icon: Sparkles,
    color: 'text-amber-500',
  },
];

const ServiceSteps: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Large Container Card (Clean White Style) */}
        <div className="rounded-2xl sm:rounded-[2.5rem] bg-white border border-slate-200/80 p-5 sm:p-10 lg:p-14 shadow-xs relative overflow-hidden">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 relative z-10"
          >
            <span className="inline-flex items-center rounded-full bg-amber-100/80 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60 mb-2.5 sm:mb-4">
              Bagaimana Caranya
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
              Empat langkah mudah mulai hidup sehat
            </h2>
          </motion.div>

          {/* Steps Sequence Grid */}
          <div className="relative">
            {/* Horizontal Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-slate-200 z-0"></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 relative z-10"
            >
              {stepsList.map((step) => {
                const IconComponent = step.Icon;
                return (
                  <motion.div
                    key={step.num}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Icon Badge */}
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-amber-50/80 flex items-center justify-center shadow-xs border border-amber-200/60 relative z-10 transition-transform duration-300 group-hover:scale-110 shrink-0">
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${step.color}`} />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-serif text-base sm:text-xl font-bold text-slate-900 mt-3 sm:mt-6 mb-1.5 sm:mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-xs">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSteps;


