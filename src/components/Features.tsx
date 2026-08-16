'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { FEATURES_DATA } from '../utils/constants';

const Features: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentFeature = FEATURES_DATA[currentIndex];

  return (
    <section
      id="why-us"
      className="py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seamless Quote Container */}
        <div className="relative max-w-3xl mx-auto min-h-[260px] flex flex-col items-center justify-center text-center">
          {/* Decorative Quote Icon Matching Soulae.id */}
          <div className="mb-6 flex justify-center">
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-amber-400 fill-amber-400 rotate-180 stroke-none" />
          </div>

          {/* Animated Slide Content */}
          <div className="w-full relative min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="max-w-2xl mx-auto space-y-4"
              >
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {currentFeature.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                  {currentFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Pagination Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {FEATURES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${currentIndex === idx
                  ? 'w-8 bg-amber-500'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

