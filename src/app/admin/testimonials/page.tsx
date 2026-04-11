/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Trash2, Pencil, X, Star } from 'lucide-react';
import { createPortal } from 'react-dom';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

type Testimonial = {
  _id: string;
  patientName: string;
  program: string;
  role: string;
  message: string;
  rating: number;
  gender?: 'l' | 'p';
  isVisible: boolean;
  createdAt: string;
  [key: string]: any;
};

export default function AdminTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });
  const [newTestimonial, setNewTestimonial] = useState({
    patientName: '',
    role: '',
    program: 'Konsultasi Gizi',
    message: '',
    rating: 5,
    gender: 'p' as 'l' | 'p',
    isVisible: true,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const getProgramBadgeStyle = (program: string) => {
    switch (program) {
      case 'Konsultasi Gizi': return 'text-amber-700';
      case 'Penurunan Berat Badan': return 'text-emerald-700';
      case 'Pengaturan Massa Otot': return 'text-purple-700';
      case 'Terapi Gizi Medis': return 'text-rose-700';
      case 'Katering Sehat': return 'text-green-700';
      default: return 'text-orange-700';
    }
  };

  const getAvatarUrl = (name: string, gender?: string) => {
    const seed = encodeURIComponent(name);

    if (gender === 'l') {
      return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&facialHairProbability=30&hair=dougFunny,fonze,mrClean,mrT&backgroundColor=b6e3f4`;
    }
    if (gender === 'p') {
      return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&facialHairProbability=0&hair=full,pixie,dannyPhantom&backgroundColor=ffdfbf`;
    }

    return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e1f5fe`;
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch', error);
      toast.error('Gagal memuat data testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const url = '/api/testimonials';
      // Using PUT to update visibility as per updated API
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isVisible: !currentStatus }),
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, isVisible: !currentStatus } : t,
          ),
        );
        toast.success(
          `Testimonial berhasil ${!currentStatus ? 'ditampilkan' : 'disembunyikan'}`,
        );
      } else {
        toast.error('Gagal mengubah status visibilitas');
      }
    } catch (error) {
      console.error('Failed to update', error);
      toast.error('Terjadi kesalahan saat mengubah status');
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const performDelete = async () => {
    if (!deleteConfirmation.id) return;

    try {
      setIsDeleting(true);
      await fetch(`/api/testimonials?id=${deleteConfirmation.id}`, {
        method: 'DELETE',
      });
      setTestimonials((prev) =>
        prev.filter((t) => t._id !== deleteConfirmation.id),
      );
      setDeleteConfirmation({ isOpen: false, id: null });
      toast.success('Testimonial berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus data');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setNewTestimonial({
      patientName: testimonial.patientName,
      role: testimonial.role || '',
      program: testimonial.program,
      message: testimonial.message,
      rating: testimonial.rating,
      gender: testimonial.gender || 'p',
      isVisible: testimonial.isVisible,
    });
    setEditingId(testimonial._id);
    setIsAddModalOpen(true);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const url = '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId
        ? { id: editingId, ...newTestimonial }
        : newTestimonial;

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchTestimonials();
        setIsAddModalOpen(false);
        setEditingId(null);
        setNewTestimonial({
          patientName: '',
          role: '',
          program: 'Konsultasi Gizi',
          message: '',
          rating: 5,
          gender: 'p',
          isVisible: true,
        });
        toast.success(
          editingId
            ? 'Testimonial berhasil diperbarui'
            : 'Testimonial berhasil ditambahkan',
        );
      } else {
        toast.error('Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Failed to save', error);
      toast.error('Terjadi kesalahan saat menyimpan');
    } finally {
      setIsSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewTestimonial({
      patientName: '',
      role: '',
      program: 'Konsultasi Gizi',
      message: '',
      rating: 5,
      gender: 'p',
      isVisible: true,
    });
    setIsAddModalOpen(true);
  };

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
            Daftar Testimonial
          </h1>
          <p className='text-gray-500 mt-1 text-sm'>
            Kelola testimoni dari pasien
          </p>
        </div>
        <button
          onClick={openAddModal}
          className='bg-linear-to-r from-primary to-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer'
        >
          + Tambah Testimonial
        </button>
      </div>

      <div className='bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-orange-50/50 border-b border-orange-100'>
              <tr>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Nama
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Gender
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Role
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Program
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Rating
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Pesan
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right'>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {testimonials.length > 0 ? (
                testimonials.map((item) => (
                  <tr
                    key={item._id}
                    className='hover:bg-white/80 transition-all duration-200 group'
                  >
                    <td className='px-8 py-5 text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors'>
                      {item.patientName}
                    </td>
                    <td className='px-8 py-5 text-sm font-semibold text-gray-600'>
                      {item.gender === 'l' ? 'L' : item.gender === 'p' ? 'P' : '-'}
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600'>
                      {item.role}
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600'>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getProgramBadgeStyle(item.program)}`}>
                        {item.program}
                      </span>
                    </td>
                    <td className='px-8 py-5 text-sm font-bold text-yellow-500'>
                      <div className='flex gap-0.5 w-fit'>
                        {'★'.repeat(item.rating)}
                        <span className='text-gray-300'>
                          {'★'.repeat(5 - item.rating)}
                        </span>
                      </div>
                    </td>
                    <td className='px-8 py-5 text-sm text-gray-600 truncate max-w-50 italic'>
                      "{item.message}"
                    </td>
                    <td className='px-8 py-5 text-sm'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${item.isVisible ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                      >
                        {item.isVisible ? 'Tampil' : 'Sembunyi'}
                      </span>
                    </td>
                    <td className='px-8 py-5 text-right'>
                      <div className='flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={() => setSelectedTestimonial(item)}
                          className='p-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all shadow-sm cursor-pointer'
                          title='Lihat Detail'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className='p-2 rounded-xl text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:scale-110 transition-all shadow-sm cursor-pointer'
                          title='Edit'
                        >
                          <Pencil className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleVisibility(item._id, item.isVisible)
                          }
                          className={`p-2 rounded-xl transition-all shadow-sm hover:scale-110 cursor-pointer ${item.isVisible
                            ? 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                            : 'text-green-600 bg-green-50 hover:bg-green-100'
                            }`}
                          title={item.isVisible ? 'Sembunyikan' : 'Tampilkan'}
                        >
                          {item.isVisible ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className='p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 hover:scale-110 transition-all shadow-sm cursor-pointer'
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
                    colSpan={8}
                    className='px-8 py-16 text-center text-gray-400'
                  >
                    <div className='flex flex-col items-center gap-3'>
                      <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                        <EyeOff className='w-8 h-8 text-gray-300' />
                      </div>
                      <p>Belum ada testimonial.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {isAddModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
            <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up max-h-[90vh]'>
              <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white'>
                <h3 className='text-xl font-bold font-serif text-gray-800'>
                  {editingId ? 'Edit Testimonial' : 'Tambah Testimonial'}
                </h3>
              </div>

              <div className='p-6 overflow-y-auto'>
                <form onSubmit={handleSaveTestimonial} className='space-y-5'>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Nama Pasien
                    </label>
                    <input
                      type='text'
                      required
                      value={newTestimonial.patientName}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          patientName: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                      placeholder='Contoh: Budi Santoso'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Role / Pekerjaan
                    </label>
                    <input
                      type='text'
                      required
                      value={newTestimonial.role}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          role: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                      placeholder='Contoh: Mahasiswa / IRT'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Jenis Kelamin
                    </label>
                    <div className='flex gap-4'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='gender'
                          value='l'
                          checked={newTestimonial.gender === 'l'}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              gender: 'l',
                            })
                          }
                          className='w-4 h-4 text-primary focus:ring-primary/20'
                        />
                        <span className='text-sm text-gray-700'>Laki-laki</span>
                      </label>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='radio'
                          name='gender'
                          value='p'
                          checked={newTestimonial.gender === 'p'}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              gender: 'p',
                            })
                          }
                          className='w-4 h-4 text-primary focus:ring-primary/20'
                        />
                        <span className='text-sm text-gray-700'>Perempuan</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Program
                    </label>
                    <div className='relative'>
                      <select
                        value={newTestimonial.program}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            program: e.target.value,
                          })
                        }
                        className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none'
                      >
                        <option value='Konsultasi Gizi'>Konsultasi Gizi</option>
                        <option value='Penurunan Berat Badan'>
                          Penurunan Berat Badan
                        </option>
                        <option value='Pengaturan Massa Otot'>
                          Pengaturan Massa Otot
                        </option>
                        <option value='Terapi Gizi Medis'>
                          Terapi Gizi Medis
                        </option>
                        <option value='Katering Sehat'>Katering Sehat</option>
                      </select>
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                        <svg
                          className='w-4 h-4 text-gray-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 9l-7 7-7-7'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Rating
                    </label>
                    <div className='flex gap-2'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type='button'
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() =>
                            setNewTestimonial({
                              ...newTestimonial,
                              rating: star,
                            })
                          }
                          className='focus:outline-none transition-transform hover:scale-110'
                        >
                          <Star
                            className={`w-6 h-6 md:w-8 md:h-8 ${star <= (hoverRating || newTestimonial.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                      Pesan Testimoni
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newTestimonial.message}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          message: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all'
                      placeholder='Tulis pesan testimoni di sini...'
                    />
                  </div>
                  <div className='flex gap-3 justify-end pt-4 border-t border-gray-100'>
                    <button
                      type='button'
                      onClick={() => setIsAddModalOpen(false)}
                      className='cursor-pointer px-6 py-2.5 text-gray-600 hover:bg-gray-300 rounded-xl font-medium transition-colors'
                      disabled={isSaving}
                    >
                      Batal
                    </button>
                    <button
                      type='submit'
                      className='cursor-pointer px-6 py-2.5 bg-primary text-white hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={isSaving}
                    >
                      {isSaving ? 'Menyimpan...' : 'Simpan Data'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Detail Modal */}
      {selectedTestimonial &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
            <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up relative'>
              <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white flex justify-between items-center'>
                <h3 className='text-xl font-serif font-bold text-gray-800'>
                  Detail Testimonial
                </h3>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className='p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              <div className='p-8 space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-orange-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-200 overflow-hidden'>
                    <img
                      src={getAvatarUrl(selectedTestimonial.patientName, selectedTestimonial.gender)}
                      alt={selectedTestimonial.patientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className='text-xl font-bold text-gray-800'>
                      {selectedTestimonial.patientName}
                    </h4>
                    <p className='text-gray-500 text-sm'>
                      {selectedTestimonial.role || 'Pasien'}
                      {selectedTestimonial.gender ? ` • ${selectedTestimonial.gender === 'l' ? 'Laki-laki' : 'Perempuan'}` : ''}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gray-50 p-4 rounded-2xl border border-gray-100'>
                    <span className='text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1'>
                      Program
                    </span>
                    <span className='font-semibold text-primary'>
                      {selectedTestimonial.program}
                    </span>
                  </div>
                  <div className='bg-gray-50 p-4 rounded-2xl border border-gray-100'>
                    <span className='text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1'>
                      Rating
                    </span>
                    <div className='flex text-yellow-500 font-bold text-lg'>
                      {'★'.repeat(selectedTestimonial.rating)}
                    </div>
                  </div>
                </div>

                <div className='bg-orange-50/50 p-6 rounded-2xl border border-orange-100 relative'>
                  <span className='absolute top-4 left-4 text-4xl text-orange-200 font-serif leading-none'>
                    "
                  </span>
                  <p className='text-gray-700 italic relative z-10 px-4 text-center leading-relaxed'>
                    {selectedTestimonial.message}
                  </p>
                  <span className='absolute bottom-[-10px] right-4 text-4xl text-orange-200 font-serif leading-none transform rotate-180'>
                    "
                  </span>
                </div>

                <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                  <div className='flex flex-col'>
                    <span className='text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>
                      Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border w-fit ${selectedTestimonial.isVisible ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                    >
                      {selectedTestimonial.isVisible
                        ? 'Ditampilkan'
                        : 'Disembunyikan'}
                    </span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>
                      Tanggal
                    </span>
                    <span className='text-sm font-medium text-gray-600'>
                      {new Date(
                        selectedTestimonial.createdAt,
                      ).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmation.isOpen}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus testimonial ini? Tindakan ini tidak dapat dibatalkan.'
        confirmLabel='Ya, Hapus'
        cancelLabel='Batal'
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={performDelete}
        onCancel={() => setDeleteConfirmation({ isOpen: false, id: null })}
      />
    </div>
  );
}
