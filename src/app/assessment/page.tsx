'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Activity,
  Utensils,
  Apple,
  Dumbbell,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

type FormData = {
  // Step 1: Identitas
  namaLengkap: string;
  usia: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pendidikan: string;
  targetKonsultasi: string;
  beratBadan: string;
  tinggiBadan: string;
  lila: string;

  // Step 2: Riwayat Kesehatan
  pemeriksaanLab: string;
  keluhan: string[];
  riwayatPenyakit: string;
  obatKonsumsi: string;
  suplemenKonsumsi: string;

  // Step 3: Pola Makan
  frekuensiMakan: string;
  frekuensiMakanLainnya: string;
  polaMakan: string[];
  waktuMakan: string;
  riwayatDiet: string; // Ya/Tidak/Lainnya
  alasanBerhentiDiet: string;

  // Step 4: Food Recall
  sumberKarbohidrat: string;
  laukHewani: string;
  laukNabati: string;
  sayuran: string;
  buahbuahan: string;
  minuman: string;
  cemilan: string;

  // Step 5: Aktivitas Fisik
  olahraga: string; // Ya/Tidak
  frekuensiOlahraga: string;
  jenisOlahraga: string;
};

const initialFormData: FormData = {
  namaLengkap: '',
  usia: '',
  tanggalLahir: '',
  jenisKelamin: '',
  pendidikan: '',
  targetKonsultasi: '',
  beratBadan: '',
  tinggiBadan: '',
  lila: '',
  pemeriksaanLab: '',
  keluhan: [],
  riwayatPenyakit: '',
  obatKonsumsi: '',
  suplemenKonsumsi: '',
  frekuensiMakan: '',
  frekuensiMakanLainnya: '',
  polaMakan: [],
  waktuMakan: '',
  riwayatDiet: '',
  alasanBerhentiDiet: '',
  sumberKarbohidrat: '',
  laukHewani: '',
  laukNabati: '',
  sayuran: '',
  buahbuahan: '',
  minuman: '',
  cemilan: '',
  olahraga: '',
  frekuensiOlahraga: '',
  jenisOlahraga: '',
};

const steps = [
  { id: 1, label: 'Identitas Diri', icon: User },
  { id: 2, label: 'Kesehatan', icon: Activity },
  { id: 3, label: 'Kebiasaan', icon: Utensils },
  { id: 4, label: 'Konsumsi', icon: Apple },
  { id: 5, label: 'Aktivitas', icon: Dumbbell },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    const currentList = formData[field] as string[];
    let newList;
    if (currentList.includes(value)) {
      newList = currentList.filter((item) => item !== value);
    } else {
      newList = [...currentList, value];
    }
    handleChange(field, newList);
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    const requireField = (field: keyof FormData, message: string) => {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] = message;
        isValid = false;
      }
    };

    if (currentStep === 1) {
      requireField('namaLengkap', 'Nama lengkap wajib diisi');
      requireField('usia', 'Usia wajib diisi');
      requireField('tanggalLahir', 'Tanggal lahir wajib diisi');
      requireField('targetKonsultasi', 'Target konsultasi wajib diisi');
    }

    if (currentStep === 4) {
      requireField('sumberKarbohidrat', 'Wajib diisi');
      requireField('laukHewani', 'Wajib diisi');
      requireField('laukNabati', 'Wajib diisi');
      requireField('sayuran', 'Wajib diisi');
      requireField('buahbuahan', 'Wajib diisi');
      requireField('minuman', 'Wajib diisi');
      requireField('cemilan', 'Wajib diisi');
    }

    if (currentStep === 5) {
      requireField('olahraga', 'Pilih salah satu');
      if (formData.olahraga === 'Ya') {
        requireField('frekuensiOlahraga', 'Wajib diisi');
        requireField('jenisOlahraga', 'Wajib diisi');
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      // Simpan data ke database (mock API)
      try {
        await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            createdAt: new Date().toISOString(),
            status: 'new',
          }),
        });
      } catch (error) {
        console.error('Failed to save assessment', error);
      }

      // Redirect ke WhatsApp
      const message = `Halo Admin Zahra Krisnadi, saya telah mengisi form assessment awal.%0A%0ANama: ${formData.namaLengkap}%0ATujuan: ${formData.targetKonsultasi}%0A%0AMohon info selanjutnya. Terima kasih.`;
      const waUrl = `https://wa.me/6281234567890?text=${message}`; // Ganti nomor WA sesuai kebutuhan

      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = waUrl;
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4'>
        <div className='bg-white rounded-4xl shadow-xl p-8 max-w-md w-full text-center border border-orange-100 animate-fade-in'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle className='w-10 h-10 text-green-600' />
          </div>
          <h2 className='text-lg md:text-2xl font-serif font-bold text-gray-900 mb-1 md:mb-3'>
            Terima Kasih!
          </h2>
          <p className='text-gray-600 mb-8 font-sans leading-relaxed text-xs md:text-sm'>
            Data assessment Anda telah kami terima. Kami sedang mengalihkan Anda
            ke WhatsApp admin untuk konfirmasi selanjutnya.
          </p>
          <div className='w-full h-1.5 bg-gray-100 rounded-full overflow-hidden'>
            <div className='h-full bg-green-500 animate-[pulse_1s_ease-in-out_infinite] w-full'></div>
          </div>
        </div>
      </div>
    );
  }

  const CurrentStepIcon = steps[step - 1].icon;

  return (
    <div className='min-h-screen bg-[#FDFBF7] font-sans text-gray-800 relative selection:bg-primary/20 selection:text-primary pb-20'>
      {/* Background Ambience */}
      <div className='fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0'>
        <div className='absolute top-[-20%] right-[-10%] w-150 h-150 bg-orange-200/20 rounded-full blur-[100px] opacity-60' />
        <div className='absolute bottom-[-10%] left-[-10%]w-125 h-125 bg-green-200/20 rounded-full blur-[100px] opacity-60' />
      </div>

      {/* Header */}
      <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-50/50 shadow-sm transition-all duration-300'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors'>
              <ChevronLeft className='w-5 h-5 text-primary' />
            </div>
            <span className='font-bold text-gray-900 hidden sm:block'>
              Kembali ke Beranda
            </span>
          </Link>

          <div className='flex items-center gap-4'>
            <div className='text-right hidden sm:block'>
              <p className='text-xs font-bold text-primary uppercase tracking-widest'>
                Assessment Awal
              </p>
              <p className='text-sm text-gray-500 font-serif'>
                Langkah {step} dari {steps.length}
              </p>
            </div>
            <div className='relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center'>
              <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
                <path
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='#FED7AA'
                  strokeWidth='3'
                />
                <path
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='#F97316'
                  strokeWidth='3'
                  strokeDasharray={`${(step / steps.length) * 100}, 100`}
                  className='transition-all duration-500 ease-out'
                  strokeLinecap='round'
                />
              </svg>
              <span className='absolute text-[10px] md:text-xs font-bold text-primary'>
                {Math.round((step / steps.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className='relative z-10 max-w-3xl mx-auto px-4 mt-8 md:mt-12'>
        {/* Progress Stepper Visual (Desktop) */}
        <div className='hidden md:flex justify-between items-center mb-12 relative px-4'>
          <div className='absolute top-1/2 w-162.5 h-0.5 bg-gray-200 -z-10 -translate-y-1/2 rounded-full'></div>
          <div
            className='absolute top-1/2 h-0.5 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500'
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => {
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            const Icon = s.icon;

            return (
              <div
                key={s.id}
                className='flex flex-col items-center gap-2 bg-[#FDFBF7] px-2'
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2
                    ${isActive
                      ? 'bg-primary border-primary text-white shadow-lg shadow-orange-200 scale-110'
                      : isCompleted
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle className='w-5 h-5' />
                  ) : (
                    <Icon className='w-5 h-5' />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-4xl shadow-xl shadow-orange-100/50 border border-orange-50/50 overflow-hidden'>
          {/* Form Header Inside Card */}
          <div className='bg-linear-to-b from-orange-200 to-white px-3 py-3 md:px-10 md:py-10'>
            <div className='flex items-center gap-4 mb-2'>
              <div className='w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white shadow-md flex items-center justify-center text-primary transform rotate-3'>
                <CurrentStepIcon className='w-3 h-3 md:w-6 md:h-6' />
              </div>
              <div>
                <h1 className='text-sm md:text-xl font-serif font-bold text-gray-900'>
                  {steps[step - 1].label}
                </h1>
                <p className='text-gray-500 text-[10px] text-xs md:text-sm'>
                  Lengkapi data berikut untuk melanjutkan.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className='px-6 py-3 md:px-10 space-y-8'
          >
            {/* Step 1: Identitas */}
            {step === 1 && (
              <div className='space-y-6 animate-fade-in text-xs md:text-sm'>
                <InputField
                  label='Nama Lengkap'
                  required
                  value={formData.namaLengkap}
                  onChange={(v) => handleChange('namaLengkap', v)}
                  error={errors.namaLengkap}
                  placeholder='Contoh: Budi Santoso'
                  icon={<User className='w-5 h-5 text-gray-400' />}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 block'>
                      Tanggal Lahir <span className='text-red-500'>*</span>
                    </label>
                    <div className='relative group'>
                      <Calendar className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none' />
                      <input
                        type='date'
                        value={formData.tanggalLahir}
                        onChange={(e) =>
                          handleChange('tanggalLahir', e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-200 font-medium
                           ${errors.tanggalLahir
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                            : 'border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400'
                          }`}
                      />
                    </div>
                    {errors.tanggalLahir && (
                      <p className='text-xs text-red-500 font-medium mt-1'>
                        {errors.tanggalLahir}
                      </p>
                    )}
                  </div>

                  <InputField
                    label='Usia (Tahun)'
                    type='number'
                    placeholder='Contoh: 25'
                    required
                    value={formData.usia}
                    onChange={(v) => handleChange('usia', v)}
                    error={errors.usia}
                  />
                </div>

                <div className='space-y-4'>
                  <label className='text-sm font-semibold text-gray-700 block'>
                    Jenis Kelamin
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    {['Laki-laki', 'Perempuan'].map((gender) => (
                      <div
                        key={gender}
                        onClick={() => handleChange('jenisKelamin', gender)}
                        className={`cursor-pointer rounded-xl p-4 border-2 flex items-center gap-3 transition-all duration-200
                          ${formData.jenisKelamin === gender ? 'border-primary bg-orange-50/50' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.jenisKelamin === gender ? 'border-primary' : 'border-gray-300'}`}
                        >
                          {formData.jenisKelamin === gender && (
                            <div className='w-2.5 h-2.5 rounded-full bg-primary' />
                          )}
                        </div>
                        <span
                          className={`font-medium ${formData.jenisKelamin === gender ? 'text-gray-900' : 'text-gray-500'}`}
                        >
                          {gender}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-gray-700 block'>
                    Pendidikan Terakhir
                  </label>
                  <select
                    value={formData.pendidikan}
                    onChange={(e) => handleChange('pendidikan', e.target.value)}
                    className='w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-orange-100 transition-all font-medium text-gray-700 cursor-pointer appearance-none'
                  >
                    <option value=''>Pilih Pendidikan</option>
                    {[
                      'Tidak tamat SD',
                      'SD',
                      'SMP',
                      'SMA/SMK',
                      'Diploma',
                      'Sarjana',
                      'Pascasarjana',
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <TextAreaField
                  label='Target Konsultasi'
                  placeholder='Ceritakan tujuan Anda melakukan konsultasi gizi secara detail...'
                  required
                  value={formData.targetKonsultasi}
                  onChange={(v) => handleChange('targetKonsultasi', v)}
                  error={errors.targetKonsultasi}
                />

                <div className='pt-6 border-t border-dashed border-gray-200'>
                  <h3 className='text-sm md:text-lg font-bold text-gray-900 mb-4'>
                    Metrik Tubuh Awal
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <InputField
                      label='Tinggi Badan (cm)'
                      type='number'
                      value={formData.tinggiBadan}
                      onChange={(v) => handleChange('tinggiBadan', v)}
                      placeholder='170'
                    />
                    <InputField
                      label='Berat Badan (kg)'
                      type='number'
                      value={formData.beratBadan}
                      onChange={(v) => handleChange('beratBadan', v)}
                      placeholder='65'
                    />
                    <InputField
                      label='Lingkar Lengan Atas (cm)'
                      type='number'
                      placeholder='Opsional'
                      value={formData.lila}
                      onChange={(v) => handleChange('lila', v)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Riwayat Kesehatan */}
            {step === 2 && (
              <div className='space-y-6 animate-fade-in text-xs md:text-sm'>
                <TextAreaField
                  label='Pemeriksaan Lab (jika ada)'
                  placeholder='Sebutkan hasil lab terakhir (Kolesterol, Gula Darah, Asam Urat, dll)...'
                  value={formData.pemeriksaanLab}
                  onChange={(v) => handleChange('pemeriksaanLab', v)}
                />

                <div className='space-y-3'>
                  <label className='text-sm font-semibold text-gray-700 block'>
                    Keluhan yang dirasakan
                  </label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    {[
                      'Mual',
                      'Muntah',
                      'Alergi makanan',
                      'Pantangan makanan',
                      'Demam',
                      'Sariawan',
                      'Gangguan mengunyah',
                    ].map((item) => {
                      const isSelected = formData.keluhan.includes(item);
                      return (
                        <button
                          type='button'
                          key={item}
                          onClick={() => handleCheckboxChange('keluhan', item)}
                          className={`px-4 py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border-2
                               ${isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <TextAreaField
                  label='Riwayat Penyakit'
                  placeholder='Deskripsikan riwayat penyakit dahulu atau keluarga...'
                  value={formData.riwayatPenyakit}
                  onChange={(v) => handleChange('riwayatPenyakit', v)}
                />

                <TextAreaField
                  label='Obat yang dikonsumsi'
                  placeholder='Nama obat, dosis, frekuensi...'
                  value={formData.obatKonsumsi}
                  onChange={(v) => handleChange('obatKonsumsi', v)}
                />

                <TextAreaField
                  label='Suplemen/Vitamin yang dikonsumsi'
                  placeholder='Nama vitamin, merk, dosis...'
                  value={formData.suplemenKonsumsi}
                  onChange={(v) => handleChange('suplemenKonsumsi', v)}
                />
              </div>
            )}

            {/* Step 3: Pola Makan */}
            {step === 3 && (
              <div className='space-y-6 animate-fade-in text-xs md:text-sm'>
                <div className='bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50'>
                  <label className='text-sm font-semibold text-gray-700 block mb-3'>
                    Frekuensi Makan Harian
                  </label>
                  <div className='flex flex-wrap gap-3'>
                    {['1x', '2x', '3x'].map((opt) => (
                      <button
                        key={opt}
                        type='button'
                        onClick={() => {
                          handleChange('frekuensiMakan', opt);
                          handleChange('frekuensiMakanLainnya', '');
                        }}
                        className={`w-14 h-14 rounded-full border-2 text-sm font-bold transition-all duration-200 flex items-center justify-center
                            ${formData.frekuensiMakan === opt
                            ? 'bg-primary border-primary text-white shadow-lg shadow-orange-200 scale-105'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                    <div className='flex-1 min-w-30'>
                      <input
                        type='text'
                        placeholder='Lainnya...'
                        value={formData.frekuensiMakanLainnya}
                        onChange={(e) => {
                          handleChange('frekuensiMakanLainnya', e.target.value);
                          handleChange('frekuensiMakan', 'Lainnya');
                        }}
                        className={`w-full px-5 py-3.5 rounded-2xl border bg-white outline-none font-medium transition-all
                             ${formData.frekuensiMakan === 'Lainnya'
                            ? 'border-primary ring-2 ring-orange-100'
                            : 'border-gray-200 text-gray-500'
                          }`}
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <label className='text-sm font-semibold text-gray-700 block'>
                    Waktu Makan & Pola
                  </label>
                  <div className='grid grid-cols-2 gap-3 mb-4'>
                    {['Sarapan', 'Makan Siang', 'Makan Malam', 'Cemilan'].map(
                      (item) => {
                        const isSelected = formData.polaMakan.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() =>
                              handleCheckboxChange('polaMakan', item)
                            }
                            className={`text-xs md:text-sm cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all
                                ${isSelected ? 'bg-primary text-white border-primary shadow-md shadow-orange-200' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                          >
                            <span className='font-medium text-xs md:text-sm'>
                              {item}
                            </span>
                            {isSelected && (
                              <CheckCircle className='w-3 h-3 md:w-4 md:h-4' />
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                  <InputField
                    label='Detail Waktu Makan'
                    placeholder='Contoh: Sarapan jam 7, Makan Siang jam 12...'
                    value={formData.waktuMakan}
                    onChange={(v) => handleChange('waktuMakan', v)}
                  />
                </div>

                <div className='p-6 bg-gray-50 rounded-2xl border border-gray-100'>
                  <label className='text-sm font-semibold text-gray-700 block mb-3'>
                    Apakah sedang menjalani diet tertentu?
                  </label>
                  <div className='flex flex-wrap gap-4 mb-4'>
                    {['Ya', 'Tidak', 'Lainnya'].map((opt) => (
                      <label
                        key={opt}
                        className='flex items-center gap-2 cursor-pointer group'
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.riwayatDiet === opt ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}
                        >
                          {formData.riwayatDiet === opt && (
                            <div className='w-2.5 h-2.5 bg-primary rounded-full' />
                          )}
                        </div>
                        <input
                          type='radio'
                          value={opt}
                          checked={formData.riwayatDiet === opt}
                          onChange={() => handleChange('riwayatDiet', opt)}
                          className='hidden'
                        />
                        <span
                          className={`text-sm font-medium ${formData.riwayatDiet === opt ? 'text-gray-900' : 'text-gray-500'}`}
                        >
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>

                  {formData.riwayatDiet === 'Ya' && (
                    <div className='animate-slide-down'>
                      <InputField
                        label='Alasan berhenti / deskripsi singkat diet'
                        placeholder='Ceritakan pengalaman diet Anda...'
                        value={formData.alasanBerhentiDiet}
                        onChange={(v) => handleChange('alasanBerhentiDiet', v)}
                        className='bg-white'
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Food Recall */}
            {step === 4 && (
              <div className='space-y-8 animate-fade-in text-xs md:text-sm'>
                <div className='flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-800 text-sm leading-relaxed'>
                  <div className='bg-orange-100 p-2 rounded-lg shrink-0'>
                    <Apple className='w-5 h-5 text-orange-600' />
                  </div>
                  <p className='text-xs md:text-sm'>
                    Mohon sebutkan jenis makanan yang{' '}
                    <strong>biasa dikonsumsi</strong> sehari-hari untuk membantu
                    kami menganalisis asupan gizi Anda.
                  </p>
                </div>

                <div className='grid grid-cols-1 gap-6'>
                  <TextAreaField
                    label='Sumber Karbohidrat'
                    placeholder='Nasi, mie, ubi, singkong, roti, dll'
                    required
                    value={formData.sumberKarbohidrat}
                    onChange={(v) => handleChange('sumberKarbohidrat', v)}
                    error={errors.sumberKarbohidrat}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <TextAreaField
                      label='Lauk Hewani'
                      placeholder='Telur, ayam, daging, ikan, sarden, dll'
                      required
                      value={formData.laukHewani}
                      onChange={(v) => handleChange('laukHewani', v)}
                      error={errors.laukHewani}
                    />
                    <TextAreaField
                      label='Lauk Nabati'
                      placeholder='Tempe, tahu, kacang-kacangan'
                      required
                      value={formData.laukNabati}
                      onChange={(v) => handleChange('laukNabati', v)}
                      error={errors.laukNabati}
                    />
                  </div>
                  <TextAreaField
                    label='Sayuran'
                    placeholder='Bayam, wortel, kangkung, buncis, dll'
                    required
                    value={formData.sayuran}
                    onChange={(v) => handleChange('sayuran', v)}
                    error={errors.sayuran}
                  />
                  <TextAreaField
                    label='Buah-buahan'
                    placeholder='Apel, jeruk, pepaya, pisang, dll'
                    required
                    value={formData.buahbuahan}
                    onChange={(v) => handleChange('buahbuahan', v)}
                    error={errors.buahbuahan}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <TextAreaField
                      label='Minuman'
                      placeholder='Teh, kopi, susu, boba, soda, minuman energi'
                      required
                      value={formData.minuman}
                      onChange={(v) => handleChange('minuman', v)}
                      error={errors.minuman}
                    />
                    <TextAreaField
                      label='Cemilan/Snack'
                      placeholder='Risol, puding, biskuit, martabak, donat, pizza, dll'
                      required
                      value={formData.cemilan}
                      onChange={(v) => handleChange('cemilan', v)}
                      error={errors.cemilan}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Aktivitas Fisik */}
            {step === 5 && (
              <div className='space-y-6 animate-fade-in'>
                <div className='bg-green-50/50 rounded-2xl p-6 border border-green-100/50'>
                  <label className='text-sm md:text-lg font-serif font-bold text-gray-900 block mb-4'>
                    Apakah Anda rutin berolahraga?
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    {['Ya', 'Tidak'].map((opt) => (
                      <button
                        key={opt}
                        type='button'
                        onClick={() => handleChange('olahraga', opt)}
                        className={`py-1 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all border-2
                             ${formData.olahraga === opt ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {formData.olahraga === 'Ya' && (
                    <div className='mt-8 space-y-6 animate-slide-down'>
                      <div className='space-y-2 md:space-y-3'>
                        <label className='text-xs md:text-sm font-semibold text-gray-700 block'>
                          Frekuensi Mingguan
                        </label>
                        <div className='flex flex-wrap gap-3'>
                          {['1-2x', '3-4x', 'Lebih dari 4x'].map((opt) => (
                            <button
                              key={opt}
                              type='button'
                              onClick={() =>
                                handleChange('frekuensiOlahraga', opt)
                              }
                              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all border
                                      ${formData.frekuensiOlahraga === opt ? 'bg-green-100 border-green-200 text-green-800' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <InputField
                        label='Jenis Olahraga'
                        placeholder='Contoh: Lari, Renang, Gym...'
                        value={formData.jenisOlahraga}
                        onChange={(v) => handleChange('jenisOlahraga', v)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className='flex items-center justify-between pt-8 border-t border-gray-100 mt-8'>
              <button
                type='button'
                onClick={handleBack}
                disabled={step === 1}
                className={`flex text-xs md:text-sm items-center gap-0 md:gap-2 px-2 md:px-8 py-2 md:py-4 rounded-full font-medium transition-all cursor-pointer
                  ${step === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <ChevronLeft className='w-5 h-5' />
                Kembali
              </button>

              <button
                type='button'
                onClick={step === steps.length ? handleSubmit : handleNext}
                className='cursor-pointer flex text-xs md:text-sm items-center gap-0 md:gap-2 px-2 md:px-8 py-2 md:py-4 rounded-full bg-primary text-white font-bold tracking-wide hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300'
              >
                {step === steps.length ? 'Kirim Assessment' : 'Lanjut'}
                {step === steps.length ? (
                  <CheckCircle className='w-5 h-5' />
                ) : (
                  <ChevronRight className='w-5 h-5' />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <p className='text-center text-gray-400 text-xs mt-8 pb-10'>
          &copy; {new Date().getFullYear()} Zahra Krisnadi Dietisien. All rights
          reserved.
        </p>
      </main>
    </div>
  );
}

// Reusable Components

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string; // Add className prop for custom styles
}

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  error,
  icon,
  className = '',
}: InputFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full group'>
      <label className='text-xs md:text-sm font-semibold text-gray-700 block'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        {icon && (
          <div className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`text-xs md:text-sm w-full ${icon ? 'pl-11' : 'px-4'} pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-200 font-medium text-gray-900 placeholder:text-gray-400 ${className}
             ${error
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              : 'border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-orange-100'
            }`}
        />
      </div>
      {error && (
        <span className='text-xs text-red-500 font-medium ml-1'>{error}</span>
      )}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  className = '',
}: TextAreaFieldProps) {
  return (
    <div className='flex flex-col gap-2 w-full group'>
      <label className='text-sm font-semibold text-gray-700 block'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-200 font-medium text-gray-900 placeholder:text-gray-400 resize-none ${className}
          ${error
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
            : 'border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-orange-100'
          }`}
      />
      {error && (
        <span className='text-xs text-red-500 font-medium ml-1'>{error}</span>
      )}
    </div>
  );
}
