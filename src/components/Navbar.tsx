'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../utils/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 transition-all duration-500 py-3 sm:py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 ease-in-out sm:px-5 border ${
            scrolled
              ? 'bg-white/90 backdrop-blur-md border-slate-200/60 shadow-sm shadow-slate-900/5'
              : 'bg-white/70 backdrop-blur-md border-transparent shadow-none'
          }`}
        >
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center shrink-0">
              <span className="absolute inset-0 animate-pulse rounded-lg bg-primary/20"></span>
              <span className="relative w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-xs">
                Z
              </span>
            </span>
            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
              Zahra Krisnadi
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden items-center gap-5 lg:gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs lg:text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-600 hover:text-amber-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions: CTA Button + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA Button */}
            <Link
              href="/assessment"
              className="hidden rounded-full bg-amber-500 px-5 py-2.5 text-xs lg:text-sm font-semibold text-white shadow-xs transition-all hover:bg-amber-600 hover:shadow-md active:scale-95 sm:inline-flex cursor-pointer"
            >
              Konsultasi
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 ring-1 ring-slate-200/80 md:hidden text-slate-700 hover:bg-slate-200/80 transition-all cursor-pointer"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-4 w-4 stroke-amber-600" />
              ) : (
                <Menu className="h-4 w-4 stroke-slate-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-3 md:hidden rounded-3xl bg-white/95 backdrop-blur-xl p-4 shadow-xl ring-1 ring-slate-900/10 flex flex-col space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                    pathname === link.href
                      ? 'bg-amber-50 text-amber-600 font-bold'
                      : 'text-slate-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center">
                <Link
                  href="/assessment"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-full bg-amber-500 py-2.5 text-xs font-semibold text-white text-center shadow-xs hover:bg-amber-600 transition-all cursor-pointer"
                >
                  Konsultasi Sekarang
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

