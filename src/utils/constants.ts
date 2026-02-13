import { Salad, Timer, Award } from 'lucide-react';

export const CONTACT_INFO = {
  whatsapp: {
    number: '6285183076503',
    display: '+62 851 8307 6503',
    url: (message = '') =>
      `https://wa.me/6285183076503${message ? `?text=${encodeURIComponent(message)}` : ''}`,
  },
  email: 'dietisienzahrakrisnadi@gmail.com',
  linkedin: {
    name: 'Zahra Krisnadi',
    url: 'https://www.linkedin.com/in/zahrakrisnadi',
  },
  instagram: {
    url: 'https://www.instagram.com/dietisienmu_/',
  },
  location: 'Bekasi, Jawa Barat, Indonesia',
};

export const NAV_LINKS = [
  { label: 'Layanan', href: '#services' },
  { label: 'Kalkulator BMI', href: '#bmi-calculator' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Kolaborasi', href: '#collaboration' },
  { label: 'Portofolio', href: '#portfolio' },
];

export const FEATURES_DATA = [
  {
    id: '01',
    title: 'Personalized',
    description:
      'Rencana nutrisi yang disusun khusus sesuai kebutuhan unik tubuh dan gaya hidup Anda.',
    Icon: Salad,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    bg: 'bg-green-50',
  },
  {
    id: '02',
    title: 'Anti Ribet',
    description:
      'Pola makan praktis tanpa aturan rumit, mudah diikuti dan berkelanjutan jangka panjang.',
    Icon: Timer,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    bg: 'bg-orange-50',
  },
  {
    id: '03',
    title: 'Tersertifikasi',
    description:
      'Konsultasi langsung dengan ahli gizi profesional yang memiliki sertifikasi resmi.',
    Icon: Award,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    bg: 'bg-blue-50',
  },
];

export const SERVICES_DATA = [
  {
    title: 'Manajemen Berat Badan',
    description:
      'Program khusus untuk mencapai berat badan ideal secara sehat dan berkelanjutan.',
    image: '/meal-planings.jpg',
    highlight: false,
  },
  {
    title: 'Nutrisi Ibu & Anak',
    description:
      'Panduan gizi optimal untuk masa kehamilan hingga tumbuh kembang sang buah hati.',
    image: '/little-asian.jpg',
    highlight: true,
  },
  {
    title: 'Diet Terapi Penyakit',
    description:
      'Pengaturan pola makan khusus bagi penderita Diabetes, Hipertensi, dan lainnya.',
    image: '/hipertensi.jpg',
    highlight: false,
  },
];

export const TESTIMONIALS_DATA = [
  {
    name: 'Maya Pertiwi',
    role: 'Ibu Rumah Tangga',
    content:
      'Program dari Zahra Krisnadi sangat menyenangkan. Saya tidak merasa lapar terus-menerus dan berat badan turun secara sehat!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=maya',
  },
  {
    name: 'Budi Santoso',
    role: 'Mahasiswa',
    content:
      'Konsultasi yang sangat mendalam. Zahra Krisnadi membantu saya paham jenis makanan apa yang cocok untuk kondisi lambung saya.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=budi',
  },
  {
    name: 'Sisi Pratama',
    role: 'Guru',
    content:
      'Awalnya meremehkan diet gizi yang mengenyangkan, ternyata saya salah. Performa lari harian saya meningkat drastis berkat menu dari Zahra Krisnadi!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sisi',
  },
  {
    name: 'Dewi Nurutari',
    role: 'Pewirausaha',
    content:
      'Saya lebih produktif dan tidak mudah lelah. Pola makan yang disarankan sangat mudah diterapkan di tengah kesibukan saya.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=gagah',
  },
  {
    name: 'Rina Melati',
    role: 'Model',
    content:
      'Berat badan stabil dan kulit jadi lebih glowing. Terima kasih Zahra Krisnadi!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=rina',
  },
  {
    name: 'Doni Kurniawan',
    role: 'Atlet',
    content:
      'Performa latihan saya meningkat pesat. Dietisien Zahra sangat paham kebutuhan nutrisi atlet.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=doni',
  },
];

export type BMICategoryName =
  | 'Berat badan kurang'
  | 'Berat badan normal'
  | 'Berat badan lebih'
  | 'Obesitas I'
  | 'Obesitas II';

export interface BMICategoryData {
  label: BMICategoryName;
  range: string;
  color: string;
  bgCurrent: string;
  textCurrent: string;
  description: string;
}

export const BMI_CATEGORIES: BMICategoryData[] = [
  {
    label: 'Berat badan kurang',
    range: 'Di bawah 18,5',
    color: 'bg-blue-500',
    bgCurrent: 'bg-blue-100',
    textCurrent: 'text-blue-700',
    description:
      'berada di bawah rentang normal. Anda mungkin memerlukan asupan nutrisi lebih.',
  },
  {
    label: 'Berat badan normal',
    range: '18,5 - 22,9',
    color: 'bg-green-500',
    bgCurrent: 'bg-green-100',
    textCurrent: 'text-green-700',
    description:
      'berada dalam rentang normal. Pertahankan pola makan dan gaya hidup sehat Anda.',
  },
  {
    label: 'Berat badan lebih',
    range: '23 - 24,9',
    color: 'bg-yellow-500',
    bgCurrent: 'bg-yellow-100',
    textCurrent: 'text-yellow-700',
    description:
      'di atas rentang normal. Disarankan untuk menjaga pola makan dan rutin berolahraga.',
  },
  {
    label: 'Obesitas I',
    range: '25 - 29,9',
    color: 'bg-orange-500',
    bgCurrent: 'bg-orange-100',
    textCurrent: 'text-orange-700',
    description:
      'menunjukkan obesitas tingkat I. Mengurangi berat badan dapat menurunkan risiko masalah kesehatan.',
  },
  {
    label: 'Obesitas II',
    range: '30 dan ke atas',
    color: 'bg-red-500',
    bgCurrent: 'bg-red-100',
    textCurrent: 'text-red-700',
    description:
      'menunjukkan obesitas tingkat II. Sangat disarankan berkonsultasi dengan ahli gizi atau dokter.',
  },
];

export const PORTFOLIO_DATA = [
  {
    title: 'Grand Launching @nourishmate.id ',
    category: 'Speaker',
    description:
      'Sebagai Dietisien (Ahli Gizi) yang berdedikasi, saya berkomitmen menjembatani edukasi kesehatan berbasis sains baik di ranah klinis maupun komunitas. Berpengalaman sebagai pembicara dalam webinar “Balance Diet” bersama Nourishmate, saya aktif mengedukasi masyarakat agar mampu menerapkan pola makan seimbang secara praktis, berkelanjutan, dan sesuai kebutuhan individu.',
    image: '/portofolio/speaker-1.jpg',
  },
  {
    title: 'Memperingati Hari Gizi Nasional | Brawijaya Hospital',
    category: 'Moderator',
    description:
      'Selain aktif sebagai penggiat sosial di bidang kesehatan, saya berpengalaman memandu forum diskusi kesehatan profesional. Saya dipercaya sebagai moderator dalam seminar “Gizi Usia Produktif” di Brawijaya Hospital Duren Tiga, yang mengulas peran strategis gizi dalam menjaga kesehatan, produktivitas, dan kualitas hidup kelompok usia produktif.',
    image: '/moderator.png',
  },
  {
    title: 'YAYASAN SEMANGAT MUDA INDONESIA',
    category: 'Health Educator',
    description:
      'Semangat Muda Indonesia (SMI) merupakan organisasi pengabdian masyarakat yang bergerak di bidang pendidikan, kesehatan, lingkungan, pariwisata, dan ekonomi kreatif dengan fokus membentuk pemimpin muda yang responsif, berintegritas, dan peduli terhadap lingkungan. Melalui kolaborasi dengan pemerintah dan masyarakat, SMI menjalankan program berdampak seperti Si Ceting (edukasi stunting dan pendampingan ibu hamil serta balita dengan Smart Chart dari 1000 Days Fund di Desa Keciput), edukasi PHBS di SDN 16 Sijuk, Belitung, serta keterlibatan relawan terpilih sebagai delegasi fully funded dan Best Volunteer.',
    image: '/portofolio/volunter.jpg',
  },
  {
    title: 'NGOBROL GIZI PRA NIKAH',
    category: 'Speaker',
    description:
      'Menikah membutuhkan kesiapan, termasuk kesiapan gizi. Sebagai muslimah, kita memiliki tugas mulia untuk peduli terhadap gizi pra-konsepsi dan gizi keluarga. Melalui peran saya sebagai pembicara edukasi gizi, saya mengajak para muslimah memahami pentingnya pemenuhan gizi sejak awal sebagai ikhtiar membangun keluarga yang sehat dan kuat, karena muslim yang sehat lebih dicintai Allah SWT.',
    image: '/portofolio/pemateri.jpg',
  },
  {
    title: 'Kolaborasi Brand Makanan Sehat Nourishmate Catering',
    category: 'Partnership',
    description:
      'Mengembangkan menu sehat bersama brand catering lokal terkemuka Nourishmate Catering.',
    image: '/portofolio/nourish.jpg',
  },
  {
    title: 'Founder Dietisienmu',
    category: 'Founder',
    description:
      'Membangun platform digital untuk membantu masyarakat Indonesia dalam mengakses layanan konsultasi gizi yang terjangkau dan berkualitas.',
    image: '/portofolio/dietisienmu.jpg',
  },
];
