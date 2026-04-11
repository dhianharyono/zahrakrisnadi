/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, Search, X, Edit } from 'lucide-react';
import { createPortal } from 'react-dom';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

type Assessment = {
  _id: string; // From Mongo
  namaLengkap: string;
  usia: string;
  tanggalLahir: string;
  jenisKelamin: string;
  targetKonsultasi: string;
  createdAt: string;
  [key: string]: any;
};

export default function AdminAssessments() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  useEffect(() => {
    fetchAssessments();
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setPricingPlans(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch packages', error);
    }
  };

  const fetchAssessments = async () => {
    try {
      const res = await fetch('/api/assessments');
      if (res.ok) {
        const data = await res.json();
        setAssessments(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch', error);
      toast.error('Gagal memuat data assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const performDelete = async () => {
    if (!deleteConfirmation.id) return;

    try {
      setIsDeleting(true);
      await fetch(`/api/assessments?id=${deleteConfirmation.id}`, {
        method: 'DELETE',
      });
      setAssessments((prev) =>
        prev.filter((item) => item._id !== deleteConfirmation.id),
      );
      setDeleteConfirmation({ isOpen: false, id: null });
      toast.success('Data assessment berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus data');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (assessment: Assessment) => {
    setEditingAssessment(assessment);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssessment) return;

    try {
      setIsSaving(true);
      const res = await fetch('/api/assessments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingAssessment._id,
          ...editingAssessment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update local state
        setAssessments((prev) =>
          prev.map((item) =>
            item._id === editingAssessment._id ? editingAssessment : item,
          ),
        );
        setEditingAssessment(null);
        toast.success('Perubahan berhasil disimpan');
      } else {
        toast.error('Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error('Failed to update', error);
      toast.error('Terjadi kesalahan saat menyimpan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    if (editingAssessment) {
      setEditingAssessment({ ...editingAssessment, [field]: value });
    }
  };

  const filteredData = assessments.filter(
    (item) =>
      item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetKonsultasi.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className='p-8 h-125 items-center place-content-center text-sm text-center text-gray-500'>
        Memuat data...
      </div>
    );

  return (
    <div className='space-y-8 animate-fade-in pb-10'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>
            Daftar Assessment
          </h1>
          <p className='text-gray-500 mt-1 text-sm'>
            Kelola data assessment pasien
          </p>
        </div>
        <div className='relative w-full md:w-72 group'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' />
          <input
            type='text'
            placeholder='Cari nama pasien...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-6 py-3 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm'
          />
        </div>
      </div>

      <div className='bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-orange-50/50 border-b border-orange-100'>
              <tr>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Tanggal
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Nama Lengkap
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Usia
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Tujuan
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Pembayaran
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right'>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className='hover:bg-white/80 transition-all duration-200 group'
                  >
                    <td className='px-8 py-5 text-sm text-gray-500 whitespace-nowrap font-medium'>
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className='px-8 py-5 text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors'>
                      {item.namaLengkap}
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600'>
                      <span className='px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600'>
                        {item.usia} th
                      </span>
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600 truncate max-w-[200px]'>
                      {item.targetKonsultasi}
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600'>
                      <div className='flex flex-col gap-1.5 items-start'>
                        {item.pilihanPaket ? (
                          <span className='px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md text-[10px] font-bold whitespace-nowrap'>
                            {item.pilihanPaket}
                          </span>
                        ) : (
                          <span className='text-[10px] text-gray-400'>-</span>
                        )}
                        {item.buktiPembayaran && item.buktiPembayaran !== 'Mengunggah file...' && item.buktiPembayaran !== 'Gagal unggah' ? (
                          <span className='px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[10px] font-bold whitespace-nowrap'>
                            Bukti Pembayaran
                          </span>
                        ) : (
                          <span className='px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold whitespace-nowrap'>
                            Belum Ada File
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-8 py-5 text-right'>
                      <div className='flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={() => setSelectedAssessment(item)}
                          className='cursor-pointer p-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all shadow-sm'
                          title='Lihat Detail'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        {/* <a
                          href={`https://wa.me/6281234567890?text=Halo ${item.namaLengkap}, terkait hasil assessment awal...`}
                          target='_blank'
                          rel='noreferrer'
                          className='cursor-pointer p-2 rounded-xl text-green-600 bg-green-50 hover:bg-green-100 hover:scale-110 transition-all shadow-sm'
                          title='Hubungi via WA'
                        >
                          <MessageCircle className='w-4 h-4' />
                        </a> */}
                        <button
                          onClick={() => handleEditClick(item)}
                          className='cursor-pointer p-2 rounded-xl text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:scale-110 transition-all shadow-sm'
                          title='Edit'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className='cursor-pointer p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 hover:scale-110 transition-all shadow-sm'
                          title='Hapus'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className='px-8 py-16 text-center text-gray-400'
                  >
                    <div className='flex flex-col items-center gap-3'>
                      <Search className='w-10 h-10 text-gray-300' />
                      <p>Belum ada data ditemukan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal (Reusing existing component structure) */}
      {selectedAssessment &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4'>
            <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up'>
              <div className='flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50/80 to-white'>
                <div>
                  <h2 className='text-2xl font-serif font-bold text-gray-800'>
                    Detail Assessment
                  </h2>
                  <p className='text-xs text-gray-500 font-bold uppercase tracking-wider mt-1'>
                    {selectedAssessment?._id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className='p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400 cursor-pointer'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='p-8 overflow-y-auto font-sans custom-scrollbar'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <DetailGroup title='Identitas'>
                    <DetailItem
                      label='Nama'
                      value={selectedAssessment?.namaLengkap}
                    />
                    <DetailItem
                      label='Usia'
                      value={
                        selectedAssessment?.usia
                          ? selectedAssessment.usia + ' Tahun'
                          : '-'
                      }
                    />
                    <DetailItem
                      label='Tgl Lahir'
                      value={selectedAssessment?.tanggalLahir}
                    />
                    <DetailItem
                      label='Gender'
                      value={selectedAssessment?.jenisKelamin}
                    />
                    <DetailItem
                      label='Pendidikan'
                      value={selectedAssessment?.pendidikan}
                    />
                    <DetailItem
                      label='Target Konsultasi'
                      value={selectedAssessment?.pilihanPaket || selectedAssessment?.targetKonsultasi}
                    />
                  </DetailGroup>

                  <DetailGroup title='Fisik'>
                    <DetailItem
                      label='BB'
                      value={
                        selectedAssessment?.beratBadan
                          ? selectedAssessment.beratBadan + ' kg'
                          : '-'
                      }
                    />
                    <DetailItem
                      label='TB'
                      value={
                        selectedAssessment?.tinggiBadan
                          ? selectedAssessment.tinggiBadan + ' cm'
                          : '-'
                      }
                    />
                    <DetailItem
                      label='LILA'
                      value={
                        selectedAssessment?.lila
                          ? selectedAssessment.lila + ' cm'
                          : '-'
                      }
                    />
                  </DetailGroup>

                  <DetailGroup title='Kesehatan' className='md:col-span-2'>
                    <DetailItem
                      label='Lab'
                      value={selectedAssessment?.pemeriksaanLab}
                    />
                    <DetailItem
                      label='Dokumen Lab'
                      value={
                        selectedAssessment?.pemeriksaanLabFile &&
                          selectedAssessment?.pemeriksaanLabFile !==
                          'Mengunggah file...' &&
                          selectedAssessment?.pemeriksaanLabFile !==
                          'Gagal unggah' ? (
                          <div className='flex items-center justify-end gap-2 mt-1 sm:mt-0'>
                            <span className='truncate max-w-[150px] md:max-w-[200px]'>
                              {selectedAssessment.pemeriksaanLabFile}
                            </span>
                            <a
                              href={`#`}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `/api/uploads/${selectedAssessment.pemeriksaanLabFile}`,
                                  '_blank',
                                );
                              }}
                              className='bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-xs font-bold transition-colors shrink-0 flex items-center gap-1'
                            >
                              Lihat File
                            </a>
                          </div>
                        ) : null
                      }
                    />
                    <DetailItem
                      label='Keluhan'
                      value={selectedAssessment?.keluhan?.join(', ')}
                    />
                    <DetailItem
                      label='Penyakit'
                      value={selectedAssessment?.riwayatPenyakit}
                    />
                    <DetailItem
                      label='Obat'
                      value={selectedAssessment?.obatKonsumsi}
                    />
                    <DetailItem
                      label='Suplemen'
                      value={selectedAssessment?.suplemenKonsumsi}
                    />
                  </DetailGroup>

                  <DetailGroup title='Pola Makan' className='md:col-span-2'>
                    <DetailItem
                      label='Pola Makan'
                      value={selectedAssessment?.polaMakan?.join(', ')}
                    />
                    <DetailItem
                      label='Frekuensi'
                      value={
                        selectedAssessment?.frekuensiMakan === 'Lainnya'
                          ? selectedAssessment?.frekuensiMakanLainnya
                          : selectedAssessment?.frekuensiMakan
                      }
                    />
                    <DetailItem
                      label='Waktu Makan'
                      value={selectedAssessment?.waktuMakan}
                    />
                    <DetailItem
                      label='Sedang Diet'
                      value={selectedAssessment?.riwayatDiet}
                    />
                    {selectedAssessment?.riwayatDiet === 'Ya' && (
                      <DetailItem
                        label='Alasan Berhenti'
                        value={selectedAssessment?.alasanBerhentiDiet}
                      />
                    )}
                  </DetailGroup>

                  <DetailGroup
                    title='Food Recall (Detail Konsumsi)'
                    className='md:col-span-2'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                      <DetailItem
                        label='Karbohidrat'
                        value={selectedAssessment?.sumberKarbohidrat}
                      />
                      <DetailItem
                        label='Lauk Hewani'
                        value={selectedAssessment?.laukHewani}
                      />
                      <DetailItem
                        label='Lauk Nabati'
                        value={selectedAssessment?.laukNabati}
                      />
                      <DetailItem
                        label='Sayuran'
                        value={selectedAssessment?.sayuran}
                      />
                      <DetailItem
                        label='Buah-buahan'
                        value={selectedAssessment?.buahbuahan}
                      />
                      <DetailItem
                        label='Minuman'
                        value={selectedAssessment?.minuman}
                      />
                      <DetailItem
                        label='Cemilan'
                        value={selectedAssessment?.cemilan}
                      />
                    </div>
                  </DetailGroup>

                  <DetailGroup
                    title='Aktivitas Fisik'
                    className='md:col-span-2'
                  >
                    <DetailItem
                      label='Olahraga Rutin'
                      value={selectedAssessment?.olahraga}
                    />
                    {selectedAssessment?.olahraga === 'Ya' && (
                      <>
                        <DetailItem
                          label='Frekuensi'
                          value={selectedAssessment?.frekuensiOlahraga}
                        />
                        <DetailItem
                          label='Jenis Olahraga'
                          value={selectedAssessment?.jenisOlahraga}
                        />
                      </>
                    )}
                  </DetailGroup>

                  <DetailGroup title='Pembayaran' className='md:col-span-2'>
                    {selectedAssessment?.pilihanPaket && (
                      <DetailItem
                        label='Paket Tagihan'
                        value={
                          <div className='flex gap-5 items-end sm:items-center '>
                            <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-bold text-xs w-fit'>
                              {selectedAssessment.pilihanPaket}
                            </span>
                            {(() => {
                              const plan = pricingPlans.find(p => p.name === selectedAssessment.pilihanPaket);
                              return plan ? (
                                <span className='text-xs font-semibold text-gray-700 block mt-0.5'>
                                  {plan.price} ({plan.duration})
                                </span>
                              ) : null;
                            })()}
                          </div>
                        }
                      />
                    )}
                    <DetailItem
                      label='Bukti Pembayaran'
                      value={
                        selectedAssessment?.buktiPembayaran &&
                          selectedAssessment?.buktiPembayaran !==
                          'Mengunggah file...' &&
                          selectedAssessment?.buktiPembayaran !==
                          'Gagal unggah' ? (
                          <div className='flex items-center justify-end gap-2 mt-1 sm:mt-0'>
                            <span className='truncate max-w-[150px] md:max-w-[200px]'>
                              {selectedAssessment.buktiPembayaran}
                            </span>
                            <a
                              href={`#`}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `/api/uploads/${selectedAssessment.buktiPembayaran}`,
                                  '_blank',
                                );
                              }}
                              className='bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-xs font-bold transition-colors shrink-0 flex items-center gap-1'
                            >
                              Lihat File
                            </a>
                          </div>
                        ) : (
                          '-'
                        )
                      }
                    />
                  </DetailGroup>
                </div>
              </div>

              {/* <div className='p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end font-sans'>
                <a
                  href={`https://wa.me/6281234567890?text=Halo ${selectedAssessment?.namaLengkap}, terkait hasil assessment awal...`}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-linear-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm'
                >
                  <MessageCircle className='w-4 h-4' />
                  Hubungi via WA
                </a>
              </div> */}
            </div>
          </div>,
          document.body,
        )
      }

      {/* Edit Modal */}
      {
        editingAssessment &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4'>
            <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up'>
              <div className='flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50/80 to-white'>
                <div>
                  <h2 className='text-xl md:text-2xl font-serif font-bold text-gray-800'>
                    Edit Data Assessment
                  </h2>
                  <p className='text-xs text-gray-500 mt-1'>
                    Perbarui data jika terdapat kesalahan input.
                  </p>
                </div>
                <button
                  onClick={() => setEditingAssessment(null)}
                  className='p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400 cursor-pointer'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              <form
                onSubmit={handleSaveEdit}
                className='flex flex-col h-full overflow-hidden'
              >
                <div className='p-6 md:p-8 overflow-y-auto font-sans custom-scrollbar space-y-6 flex-1'>
                  <EditGroup title='Identitas Pasien'>
                    <EditInput
                      label='Nama Lengkap'
                      value={editingAssessment.namaLengkap}
                      onChange={(v: string) =>
                        handleInputChange('namaLengkap', v)
                      }
                    />
                    <EditInput
                      label='Usia'
                      value={editingAssessment.usia}
                      onChange={(v: string) => handleInputChange('usia', v)}
                      type='number'
                    />
                    <EditInput
                      label='Tanggal Lahir'
                      value={editingAssessment.tanggalLahir}
                      onChange={(v: string) =>
                        handleInputChange('tanggalLahir', v)
                      }
                      type='date'
                    />
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Jenis Kelamin
                      </label>
                      <select
                        value={editingAssessment.jenisKelamin}
                        onChange={(e) =>
                          handleInputChange('jenisKelamin', e.target.value)
                        }
                        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                      >
                        <option value='Laki-laki'>Laki-laki</option>
                        <option value='Perempuan'>Perempuan</option>
                      </select>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Pendidikan
                      </label>
                      <select
                        value={editingAssessment.pendidikan}
                        onChange={(e) =>
                          handleInputChange('pendidikan', e.target.value)
                        }
                        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                      >
                        <option value=''>Pilih...</option>
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
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Tujuan Konsultasi
                      </label>
                      <input
                        list='tujuan-options'
                        value={editingAssessment.targetKonsultasi || ''}
                        onChange={(e) =>
                          handleInputChange('targetKonsultasi', e.target.value)
                        }
                        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                        placeholder='Ketik atau pilih tujuan...'
                      />
                      <datalist id='tujuan-options'>
                        <option value='Body Goals' />
                        <option value='Clinic Care' />
                        <option value="Women's Health" />
                        <option value='Body for Baby' />
                      </datalist>
                    </div>
                  </EditGroup>

                  <EditGroup title='Pembayaran'>
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Bukti Pembayaran
                      </label>
                      <div className='flex items-center gap-3'>
                        <label className='cursor-pointer bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center'>
                          Pilih File
                          <input
                            type='file'
                            className='hidden'
                            accept='image/*,.pdf'
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploadingFile(true);
                                const fd = new FormData();
                                fd.append('file', file);
                                try {
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: fd,
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    handleInputChange(
                                      'buktiPembayaran',
                                      data.fileName,
                                    );
                                  } else {
                                    toast.error('Gagal unggah');
                                  }
                                } catch (err) {
                                  toast.error('Gagal unggah');
                                } finally {
                                  setIsUploadingFile(false);
                                }
                              }
                            }}
                          />
                        </label>
                        <span className='text-sm text-gray-500 truncate max-w-[200px]'>
                          {isUploadingFile
                            ? 'Mengunggah file...'
                            : editingAssessment.buktiPembayaran &&
                              editingAssessment.buktiPembayaran !==
                              'Mengunggah file...' &&
                              editingAssessment.buktiPembayaran !==
                              'Gagal unggah'
                              ? editingAssessment.buktiPembayaran
                              : 'Belum ada file'}
                        </span>
                      </div>
                    </div>
                  </EditGroup>

                  <EditGroup title='Data Fisik'>
                    <EditInput
                      label='Berat Badan (kg)'
                      value={editingAssessment.beratBadan}
                      onChange={(v: string) =>
                        handleInputChange('beratBadan', v)
                      }
                      type='number'
                    />
                    <EditInput
                      label='Tinggi Badan (cm)'
                      value={editingAssessment.tinggiBadan}
                      onChange={(v: string) =>
                        handleInputChange('tinggiBadan', v)
                      }
                      type='number'
                    />
                    <EditInput
                      label='LILA (cm)'
                      value={editingAssessment.lila}
                      onChange={(v: string) => handleInputChange('lila', v)}
                      type='number'
                    />
                  </EditGroup>

                  <EditGroup title='Riwayat Kesehatan'>
                    <EditTextArea
                      label='Pemeriksaan Lab'
                      value={editingAssessment.pemeriksaanLab}
                      onChange={(v: string) =>
                        handleInputChange('pemeriksaanLab', v)
                      }
                    />
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Dokumen Lab (Jika ada)
                      </label>
                      <div className='flex items-center gap-3'>
                        <label className='cursor-pointer bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center'>
                          Pilih File
                          <input
                            type='file'
                            className='hidden'
                            accept='image/*,.pdf,.doc,.docx'
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploadingFile(true);
                                const fd = new FormData();
                                fd.append('file', file);
                                try {
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: fd,
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    handleInputChange(
                                      'pemeriksaanLabFile',
                                      data.fileName,
                                    );
                                  } else {
                                    toast.error('Gagal unggah');
                                  }
                                } catch (err) {
                                  toast.error('Gagal unggah');
                                } finally {
                                  setIsUploadingFile(false);
                                }
                              }
                            }}
                          />
                        </label>
                        <span className='text-sm text-gray-500 truncate max-w-[200px]'>
                          {isUploadingFile
                            ? 'Mengunggah file...'
                            : editingAssessment.pemeriksaanLabFile &&
                              editingAssessment.pemeriksaanLabFile !==
                              'Mengunggah file...' &&
                              editingAssessment.pemeriksaanLabFile !==
                              'Gagal unggah'
                              ? editingAssessment.pemeriksaanLabFile
                              : 'Belum ada file'}
                        </span>
                      </div>
                    </div>
                    {/* Note: Keluhan is array, simplified to text input for MVP or need join/split logic */}
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Keluhan (Pisahkan dengan koma)
                      </label>
                      <input
                        type='text'
                        value={
                          Array.isArray(editingAssessment.keluhan)
                            ? editingAssessment.keluhan.join(', ')
                            : editingAssessment.keluhan
                        }
                        onChange={(e) =>
                          handleInputChange(
                            'keluhan',
                            e.target.value.split(',').map((s) => s.trim()),
                          )
                        } // Basic handling
                        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                      />
                    </div>
                    <EditTextArea
                      label='Riwayat Penyakit'
                      value={editingAssessment.riwayatPenyakit}
                      onChange={(v: string) =>
                        handleInputChange('riwayatPenyakit', v)
                      }
                    />
                    <EditTextArea
                      label='Obat Konsumsi'
                      value={editingAssessment.obatKonsumsi}
                      onChange={(v: string) =>
                        handleInputChange('obatKonsumsi', v)
                      }
                    />
                    <EditTextArea
                      label='Suplemen'
                      value={editingAssessment.suplemenKonsumsi}
                      onChange={(v: string) =>
                        handleInputChange('suplemenKonsumsi', v)
                      }
                    />
                  </EditGroup>

                  <EditGroup title='Pola Makan & Food Recall'>
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Pola Makan (Waktu)
                      </label>
                      <input
                        type='text'
                        value={
                          Array.isArray(editingAssessment.polaMakan)
                            ? editingAssessment.polaMakan.join(', ')
                            : editingAssessment.polaMakan
                        }
                        onChange={(e) =>
                          handleInputChange(
                            'polaMakan',
                            e.target.value.split(',').map((s) => s.trim()),
                          )
                        }
                        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                        placeholder='Sarapan, Makan Siang...'
                      />
                    </div>
                    <EditInput
                      label='Frekuensi Makan'
                      value={
                        editingAssessment.frekuensiMakan === 'Lainnya'
                          ? editingAssessment.frekuensiMakanLainnya
                          : editingAssessment.frekuensiMakan
                      }
                      onChange={(v: string) => {
                        // Simplified logic: assume direct input is custom if not 1x/2x/3x, or just let them type freely
                        handleInputChange('frekuensiMakan', 'Lainnya');
                        handleInputChange('frekuensiMakanLainnya', v);
                      }}
                    />
                    <EditTextArea
                      label='Detail Waktu Makan'
                      value={editingAssessment.waktuMakan}
                      onChange={(v: string) =>
                        handleInputChange('waktuMakan', v)
                      }
                    />

                    <div className='md:col-span-2 h-px bg-gray-100 my-2'></div>

                    <EditTextArea
                      label='Sumber Karbohidrat'
                      value={editingAssessment.sumberKarbohidrat}
                      onChange={(v: string) =>
                        handleInputChange('sumberKarbohidrat', v)
                      }
                    />
                    <EditTextArea
                      label='Lauk Hewani'
                      value={editingAssessment.laukHewani}
                      onChange={(v: string) =>
                        handleInputChange('laukHewani', v)
                      }
                    />
                    <EditTextArea
                      label='Lauk Nabati'
                      value={editingAssessment.laukNabati}
                      onChange={(v: string) =>
                        handleInputChange('laukNabati', v)
                      }
                    />
                    <EditTextArea
                      label='Sayuran'
                      value={editingAssessment.sayuran}
                      onChange={(v: string) => handleInputChange('sayuran', v)}
                    />
                    <EditTextArea
                      label='Buah-buahan'
                      value={editingAssessment.buahbuahan}
                      onChange={(v: string) =>
                        handleInputChange('buahbuahan', v)
                      }
                    />
                    <EditTextArea
                      label='Minuman'
                      value={editingAssessment.minuman}
                      onChange={(v: string) => handleInputChange('minuman', v)}
                    />
                    <EditTextArea
                      label='Cemilan'
                      value={editingAssessment.cemilan}
                      onChange={(v: string) => handleInputChange('cemilan', v)}
                    />
                  </EditGroup>
                </div>

                <div className='p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 font-sans'>
                  <button
                    type='button'
                    onClick={() => setEditingAssessment(null)}
                    className='px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors'
                    disabled={isSaving}
                  >
                    Batal
                  </button>
                  <button
                    type='submit'
                    className='bg-primary text-white px-8 py-2.5 rounded-xl font-bold hover:bg-orange-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2'
                    disabled={isSaving}
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )
      }

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmation.isOpen}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus data assessment ini? Tindakan ini tidak dapat dibatalkan.'
        confirmLabel='Ya, Hapus'
        cancelLabel='Batal'
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={performDelete}
        onCancel={() => setDeleteConfirmation({ isOpen: false, id: null })}
      />
    </div >
  );
}

function DetailGroup({ title, children, className }: any) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className='font-bold text-gray-800 border-b pb-1 text-sm uppercase tracking-wide'>
        {title}
      </h3>
      <div className='space-y-2'>{children}</div>
    </div>
  );
}

function EditGroup({ title, children, className }: any) {
  return (
    <div
      className={`space-y-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 ${className}`}
    >
      <h3 className='font-bold text-gray-800 border-b pb-2 text-sm uppercase tracking-wide flex items-center gap-2'>
        <span className='w-1 h-4 bg-primary rounded-full'></span>
        {title}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{children}</div>
    </div>
  );
}

function EditInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: any) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
      />
    </div>
  );
}

function EditTextArea({ label, value, onChange, rows = 3 }: any) {
  return (
    <div className='flex flex-col gap-1.5 md:col-span-2'>
      <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y'
      />
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  if (!value) return null;
  return (
    <div className='flex flex-col sm:flex-row sm:justify-between text-sm py-1 border-b border-gray-50/50 last:border-0 gap-1 sm:gap-4'>
      <span className='text-gray-500 font-medium shrink-0'>{label}:</span>
      <span className='text-gray-800 sm:text-right font-medium break-words sm:max-w-xs md:max-w-sm'>
        {value}
      </span>
    </div>
  );
}
