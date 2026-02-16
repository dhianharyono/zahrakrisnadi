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
    title: 'Program Diet Personalized',
    description:
      'Kami percaya bahwa kamu spesial. Karena itu kamu perlu pola makan yang spesial juga, khusus untukmu.',
    Icon: Salad,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    bg: 'bg-green-50',
  },
  {
    id: '02',
    title: 'Diet Anti Ribet dan Tanpa Produk',
    description:
      'Dengan bantuan ahli gizi, kamu tetap bisa capai target sehat tapa tergantung produk diet apapun.',
    Icon: Timer,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    bg: 'bg-orange-50',
  },
  {
    id: '03',
    title: 'Dietisien/Ahli Gizi Terferifikasi',
    description:
      'Berpengalaman dan teregistrasi oleh MTKI (Majelis Tenaga Kesehatan Indonesia)',
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

export const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 'Rp 150.000',
    duration: '30 HARI',
    description: 'Cocok untuk pemula yang ingin mulai hidup sehat.',
    features: [
      { name: 'Konseling 1on1 dengan Ahli Gizi (video call)', value: '1 kali' },
      { name: 'Pemeriksaan kondisi gizi', value: true },
      { name: 'Personalized menu', value: true },
      { name: 'Personalized meal plan', value: '3 hari' },
      { name: 'Konsultasi chat dengan Ahli Gizi', value: '3 kali per minggu' },
    ],
    highlight: false,
  },
  {
    name: 'Advance',
    price: 'Rp 300.000',
    duration: '30 HARI',
    description: 'Pendampingan intensif untuk hasil yang maksimal.',
    features: [
      { name: 'Konseling 1on1 dengan Ahli Gizi (video call)', value: '3 kali' },
      { name: 'Pemeriksaan kondisi gizi', value: true },
      { name: 'Personalized menu', value: true },
      { name: 'Personalized meal plan', value: '10 hari' },
      { name: 'Konsultasi chat dengan Ahli Gizi', value: 'Setiap hari kerja' },
    ],
    highlight: true,
  },
];

export const TESTIMONIALS_DATA = [
  {
    name: 'Nugraha',
    role: 'Karyawan Swasta',
    content:
      'Sebelumnya saya sudah mengikuti program personal trainer di gym, tetapi menu yang disarankan terasa kurang bervariasi sehingga membuat saya cepat bosan dan kurang konsisten. Setelah konsultasi dengan Kak Zahra, saya mendapatkan guideline makan yang lebih fleksibel dan sesuai kebutuhan saya. Sekarang saya lebih enjoy menjalani pola makan sehat dan terasa jauh lebih sustainable',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=budi',
  },
  {
    name: 'Ahmad',
    role: 'Pengusaha',
    content:
      'Setelah konsultasi gizi dan melakukan medical check-up ulang 3 bulan kemudian, Alhamdulillah kadar gula darah dan kolesterol saya sudah kembali normal. Terima kasih atas bimbingan dan panduan makan yang jelas, realistis, dan mudah dijalankan sehingga saya bisa lebih konsisten menjaga pola hidup sehat.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sisi',
  },
  {
    name: 'Ibrahim',
    role: 'Pemilik Bisnis Catering',
    content:
      'Saya kerjasama dengan mbak Zahra sejak 2024, alhamdulillah overall sangat positif. Knowledgenya sangat luas khususnya terkait menu-menu yang sedang tren saat ini, sangat applicable diterapkan di bisnis kami. Komunikasi responsif dan pelayanannya juga yg sangat ramah, memudahkan kami meskipun bekerja dari kota yg berjauhan.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=doni',
  },
  {
    name: 'Habibah',
    role: 'Mahasiswi',
    content:
      'First time aku konsultasi dengan ahli gizi dan mudah dimengerti banget. Thank you kak Zahra!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=maya',
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
    title: 'Memperingati Hari Gizi Nasional | Brawijaya Hospital',
    category: 'Moderator',
    description:
      'Selain aktif sebagai penggiat sosial di bidang kesehatan, saya berpengalaman memandu forum diskusi kesehatan profesional. Saya dipercaya sebagai moderator dalam seminar “Gizi Usia Produktif” di Brawijaya Hospital Duren Tiga, yang mengulas peran strategis gizi dalam menjaga kesehatan, produktivitas, dan kualitas hidup kelompok usia produktif.',
    image: '/moderator.png',
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
  {
    title: 'Grand Launching @nourishmate.id ',
    category: 'Speaker',
    description:
      'Sebagai Dietisien (Ahli Gizi) yang berdedikasi, saya berkomitmen menjembatani edukasi kesehatan berbasis sains baik di ranah klinis maupun komunitas. Berpengalaman sebagai pembicara dalam webinar “Balance Diet” bersama Nourishmate, saya aktif mengedukasi masyarakat agar mampu menerapkan pola makan seimbang secara praktis, berkelanjutan, dan sesuai kebutuhan individu.',
    image: '/portofolio/speaker-1.jpg',
  },
  {
    title: 'Fasilitator Pemberdayaan',
    category: 'Health Educator',
    description:
      'Berperan sebagai fasilitator dalam mendampingi kader Posyandu untuk mengikuti dan menyelesaikan pelatihan digital Kader Academy bertema “Stunting and Smart Posters” yang diselenggarakan oleh 1000 Days Fund. Pendampingan dilakukan melalui edukasi materi, diskusi interaktif, serta asistensi teknis agar kader mampu memahami isu stunting secara komprehensif dan mengaplikasikan media edukasi secara efektif di masyarakat.',
    image: '/portofolio/volunter.jpg',
  },
  {
    title: 'Si Ceting Banda',
    category: 'Helath Educator',
    description:
      'Sebagai PIC program Kuliah Kader Si Ceting (Cegah Stunting Itu Penting), saya mengoordinasikan pelatihan penggunaan Smart Chart dari 1000 Days Fund kepada Kader Posyandu di Desa Dender, Banda Neira. Program ini bertujuan membekali kader dengan pemahaman komprehensif tentang stunting dan pencegahannya, serta meningkatkan kemampuan mereka dalam menggunakan media edukasi Smart Chart secara efektif untuk penyuluhan kepada masyarakat.',
    image: '/portofolio/si_ceting.JPG',
  },
  {
    title: 'NGOBROL GIZI PRA NIKAH @casispolriid',
    category: 'Speaker',
    description:
      'Menjaga Nutrisi Tubuh untuk Latihan Binsik Polri adalah Health Talk kolaborasi bersama CasisPolri.id yang membahas strategi gizi tepat untuk mendukung energi, pemulihan otot, hidrasi, dan komposisi tubuh ideal selama latihan intens. Materi disusun aplikatif dan berbasis evidence-based nutrition untuk membantu calon anggota Polri tampil prima saat seleksi.',
    image: '/portofolio/casispilriid.jpeg',
  },
  {
    title: 'Nasyiatul Aisyiyah',
    category: 'Speaker',
    description:
      'Menjadi speaker dalam acara yang diselenggarakan oleh Pimpinan Cabang Nasyiatul Aisyiyah Sewon Selatan, saya membawakan tema tentang cara, tips, dan trik menikmati makanan bersama keluarga sekaligus meningkatkan kesadaran terhadap isu food waste. Materi ini menekankan pentingnya perencanaan menu, pengaturan porsi yang bijak, kreativitas mengolah sisa bahan makanan, serta membangun kebiasaan makan mindful agar makanan lebih dihargai, dinikmati, dan tidak terbuang sia-sia dalam kehidupan sehari-hari.',
    image: '/portofolio/Nasyiatul_Aisyiyah.jpeg',
  },
];
