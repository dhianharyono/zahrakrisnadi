import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const viewport: Viewport = {
  themeColor: '#f59e0b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zahrakrisnadi.com'),
  title: {
    default: 'Zahra Krisnadi | Ahli Gizi Terpercaya & Konsultasi Diet Online',
    template: '%s | Zahra Krisnadi',
  },
  description:
    'Solusi konsultasi gizi profesional, meal plan personal, dan program diet berbasis bukti ilmiah bersama Zahra Krisnadi, S.Tr.Gz, RD (Dietisien Tersertifikasi).',
  keywords: [
    'Zahra Krisnadi',
    'ahli gizi',
    'dietisien',
    'dietisien tersertifikasi',
    'konsultasi gizi',
    'konsultasi diet online',
    'meal plan personal',
    'pola makan sehat',
    'ahli gizi jakarta',
    'ahli gizi indonesia',
    'program penurunan berat badan',
  ],
  authors: [{ name: 'Zahra Krisnadi', url: 'https://www.zahrakrisnadi.com' }],
  creator: 'Zahra Krisnadi',
  publisher: 'Zahra Krisnadi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.zahrakrisnadi.com',
  },
  openGraph: {
    title: 'Zahra Krisnadi | Ahli Gizi Terpercaya & Konsultasi Diet Online',
    description:
      'Wujudkan tubuh ideal dan kesehatan optimal bersama Zahra Krisnadi, S.Tr.Gz, RD. Program gizi personalisasi & pendampingan profesional.',
    url: 'https://www.zahrakrisnadi.com',
    siteName: 'Zahra Krisnadi Nutritionist',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zahra Krisnadi - Ahli Gizi Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahra Krisnadi | Ahli Gizi Terpercaya',
    description:
      'Konsultasi gizi & meal plan personal bersama Zahra Krisnadi, S.Tr.Gz, RD (Dietisien Tersertifikasi).',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zahra Krisnadi, S.Tr.Gz, RD',
  jobTitle: 'Ahli Gizi & Dietisien Tersertifikasi',
  url: 'https://www.zahrakrisnadi.com',
  email: 'dietisienzahrakrisnadi@gmail.com',
  image: 'https://www.zahrakrisnadi.com/images/profile.JPG',
  sameAs: [
    'https://www.instagram.com/dietisienmu_/',
    'https://www.linkedin.com/in/zahrakrisnadi',
  ],
  description:
    'Zahra Krisnadi, S.Tr.Gz, RD adalah Dietisien Tersertifikasi & Ahli Gizi Terpercaya yang menyediakan layanan konsultasi gizi online, meal plan personal, dan edukasi pola makan sehat.',
};

import ScrollToTop from '../components/ScrollToTop';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
