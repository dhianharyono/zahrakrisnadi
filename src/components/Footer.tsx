import React from 'react';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CONTACT_INFO, NAV_LINKS } from '../utils/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10"
        >
          {/* Brand Identity & Social Links */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-xs shrink-0">
                Z
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Zahra Krisnadi
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Ruang konseling gizi online yang hangat dan tanpa menghakimi.
              Bersama ahli gizi tersertifikasi, kami menemani perjalananmu untuk
              hidup sehat, seimbang, dan bertumbuh.
            </p>
            <div>
              <span className="inline-flex items-center rounded-full bg-amber-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/60">
                Berdiri sejak 2024
              </span>
            </div>
            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT_INFO.whatsapp.url()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 text-slate-700 transition-all hover:bg-emerald-500 hover:text-white hover:shadow-xs"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 text-slate-700 transition-all hover:bg-amber-500 hover:text-white hover:shadow-xs"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_INFO.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 text-slate-700 transition-all hover:bg-blue-600 hover:text-white hover:shadow-xs"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 text-slate-700 transition-all hover:bg-amber-600 hover:text-white hover:shadow-xs"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Jelajahi Navigation Links */}
          <div className="lg:col-span-3 space-y-4 md:pl-4 lg:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Jelajahi
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-amber-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-6 md:pl-4 lg:pl-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Kontak
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 font-medium">
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="transition-colors hover:text-amber-600 break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_INFO.whatsapp.url()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-amber-600"
                  >
                    {CONTACT_INFO.whatsapp.display}
                  </a>
                </li>
                <li className="text-slate-500">@dietisienmu_</li>
                <li className="text-slate-500">{CONTACT_INFO.location}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Copyright Footer Row */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3 w-full">
          <p>© {new Date().getFullYear()} Zahra Krisnadi. Hak cipta dilindungi.</p>
          <p>
            Developed by{' '}
            <Link
              href="https://cetha-tech.vercel.app/"
              target="_blank"
              className="font-semibold text-slate-700 hover:text-amber-600 transition-colors"
            >
              Cetha Technologies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

