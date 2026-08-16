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
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Large Container Card (Soft Muted Amber Style) */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-amber-50/90 border border-amber-200/90 p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Glow Effect */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"></div>
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl"></div>

          {/* Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 relative z-10"
          >
            <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/80 mb-3 sm:mb-4">
              Bagaimana Caranya
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
              Empat langkah mudah mulai hidup sehat
            </h2>
          </motion.div>

          {/* Steps Sequence Grid */}
          <div className="relative">
            {/* Horizontal Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-amber-300/80 z-0"></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10"
            >
              {stepsList.map((step) => {
                const IconComponent = step.Icon;
                return (
                  <motion.div
                    key={step.num}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* White Circular Badge with Colored Icon */}
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100 relative z-10 transition-transform duration-300 group-hover:scale-110 shrink-0">
                      <IconComponent className={`w-6 h-6 ${step.color}`} />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed text-center max-w-xs">
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


