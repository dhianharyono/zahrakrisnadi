'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Trash2, Pencil, X, Image as ImageIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

type Portfolio = {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    createdAt: string;
};

export default function AdminPortfolio() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedPortfolio, setSelectedPortfolio] =
        useState<Portfolio | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        id: string | null;
    }>({ isOpen: false, id: null });

    const [newPortfolio, setNewPortfolio] = useState({
        title: '',
        category: '',
        description: '',
        image: '',
    });

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
            return imagePath;
        }
        return `/api/uploads/${imagePath}`;
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const res = await fetch('/api/portfolio');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setPortfolios(data.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch', error);
            toast.error('Gagal memuat data portofolio');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Harap unggah file gambar (JPG, PNG)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('Ukuran gambar maksimal 5MB');
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setNewPortfolio(prev => ({
                    ...prev,
                    image: data.fileName
                }));
                toast.success('Gambar berhasil diunggah');
            } else {
                throw new Error(data.message || 'Upload gagal');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Terjadi kesalahan saat mengunggah gambar');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteConfirmation({ isOpen: true, id });
    };

    const performDelete = async () => {
        if (!deleteConfirmation.id) return;

        try {
            setIsDeleting(true);
            await fetch(`/api/portfolio/${deleteConfirmation.id}`, {
                method: 'DELETE',
            });
            setPortfolios((prev) =>
                prev.filter((p) => p._id !== deleteConfirmation.id),
            );
            setDeleteConfirmation({ isOpen: false, id: null });
            toast.success('Portofolio berhasil dihapus');
        } catch (error) {
            toast.error('Gagal menghapus data');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (portfolio: Portfolio) => {
        setNewPortfolio({
            title: portfolio.title,
            category: portfolio.category,
            description: portfolio.description,
            image: portfolio.image,
        });
        setEditingId(portfolio._id);
        setIsAddModalOpen(true);
    };

    const handleSavePortfolio = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPortfolio.image) {
            toast.error('Harap unggah gambar terlebih dahulu');
            return;
        }
        try {
            setIsSaving(true);
            const url = editingId ? `/api/portfolio/${editingId}` : '/api/portfolio';
            const method = editingId ? 'PUT' : 'POST';
            const body = newPortfolio;

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                await fetchPortfolios();
                setIsAddModalOpen(false);
                setEditingId(null);
                setNewPortfolio({
                    title: '',
                    category: '',
                    description: '',
                    image: '',
                });
                toast.success(
                    editingId
                        ? 'Portofolio berhasil diperbarui'
                        : 'Portofolio berhasil ditambahkan',
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
        setNewPortfolio({
            title: '',
            category: '',
            description: '',
            image: '',
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
                        Daftar Portofolio
                    </h1>
                    <p className='text-gray-500 mt-1 text-sm'>
                        Kelola data portofolio kegiatan
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className='bg-linear-to-r from-primary to-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer'
                >
                    + Tambah Portofolio
                </button>
            </div>

            <div className='bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead className='bg-orange-50/50 border-b border-orange-100'>
                            <tr>
                                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                                    Gambar
                                </th>
                                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                                    Judul
                                </th>
                                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                                    Kategori
                                </th>
                                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider'>
                                    Deskripsi
                                </th>
                                <th className='px-8 py-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right'>
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {portfolios.length > 0 ? (
                                portfolios.map((item) => (
                                    <tr
                                        key={item._id}
                                        className='hover:bg-white/80 transition-all duration-200 group'
                                    >
                                        <td className='px-8 py-5'>
                                            <div className='w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shadow-sm'>
                                                <img
                                                    src={getImageUrl(item.image)}
                                                    alt={item.title}
                                                    className='w-full h-full object-cover'
                                                    loading='lazy'
                                                />
                                            </div>
                                        </td>
                                        <td className='px-8 py-5 text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors'>
                                            {item.title}
                                        </td>
                                        <td className='px-8 py-5 text-sm text-gray-600'>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className='px-8 py-5 text-sm text-gray-600 truncate max-w-[300px]'>
                                            {item.description}
                                        </td>
                                        <td className='px-8 py-5 text-right'>
                                            <div className='flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity'>
                                                <button
                                                    onClick={() => setSelectedPortfolio(item)}
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
                                        colSpan={5}
                                        className='px-8 py-16 text-center text-gray-400'
                                    >
                                        <div className='flex flex-col items-center gap-3'>
                                            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                                                <ImageIcon className='w-8 h-8 text-gray-300' />
                                            </div>
                                            <p>Belum ada portofolio.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {isAddModalOpen &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
                        <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up max-h-[90vh]'>
                            <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white'>
                                <h3 className='text-xl font-bold font-serif text-gray-800'>
                                    {editingId ? 'Edit Portofolio' : 'Tambah Portofolio'}
                                </h3>
                            </div>

                            <div className='p-6 overflow-y-auto'>
                                <form onSubmit={handleSavePortfolio} className='space-y-5'>
                                    <div>
                                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                            Judul Kegiatan
                                        </label>
                                        <input
                                            type='text'
                                            required
                                            value={newPortfolio.title}
                                            onChange={(e) =>
                                                setNewPortfolio({
                                                    ...newPortfolio,
                                                    title: e.target.value,
                                                })
                                            }
                                            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                            placeholder='Contoh: Seminar Gizi Nasional'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                            Kategori
                                        </label>
                                        <input
                                            type='text'
                                            required
                                            value={newPortfolio.category}
                                            onChange={(e) =>
                                                setNewPortfolio({
                                                    ...newPortfolio,
                                                    category: e.target.value,
                                                })
                                            }
                                            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                            placeholder='Contoh: Pembicara'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                            Gambar
                                        </label>
                                        <div className='flex items-center gap-4'>
                                            {newPortfolio.image ? (
                                                <div className='relative w-20 h-20 rounded-xl overflow-hidden shadow border border-gray-200 group shrink-0'>
                                                    <img src={getImageUrl(newPortfolio.image)} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            ) : null}
                                            <label className={`cursor-pointer grow flex flex-col items-center justify-center px-4 py-6 bg-gray-50 border-2 border-dashed rounded-xl transition-all hover:bg-orange-50 ${isUploading ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-gray-300 hover:border-primary'}`}>
                                                <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {isUploading ? 'Mengunggah...' : 'Pilih Gambar'}
                                                </span>
                                                <span className="text-xs text-gray-400 mt-1">Maks. 5MB (JPG, PNG)</span>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                                    className="hidden"
                                                    onChange={handleFileUpload}
                                                    disabled={isUploading}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                            Deskripsi
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={newPortfolio.description}
                                            onChange={(e) =>
                                                setNewPortfolio({
                                                    ...newPortfolio,
                                                    description: e.target.value,
                                                })
                                            }
                                            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all'
                                            placeholder='Tulis deskripsi kegiatan di sini...'
                                        />
                                    </div>
                                    <div className='flex gap-3 justify-end pt-4 border-t border-gray-100'>
                                        <button
                                            type='button'
                                            onClick={() => setIsAddModalOpen(false)}
                                            className='cursor-pointer px-6 py-2.5 text-gray-600 hover:bg-gray-300 rounded-xl font-medium transition-colors'
                                            disabled={isSaving || isUploading}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type='submit'
                                            className='cursor-pointer px-6 py-2.5 bg-primary text-white hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
                                            disabled={isSaving || isUploading}
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
            {selectedPortfolio &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
                        <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up relative'>
                            <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white flex justify-between items-center'>
                                <h3 className='text-xl font-serif font-bold text-gray-800'>
                                    Detail Portofolio
                                </h3>
                                <button
                                    onClick={() => setSelectedPortfolio(null)}
                                    className='p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400'
                                >
                                    <X className='w-5 h-5' />
                                </button>
                            </div>

                            <div className='p-8 space-y-6'>
                                <div className='w-full aspect-video rounded-2xl bg-gray-100 text-white text-2xl font-bold overflow-hidden shadow-lg shadow-gray-200'>
                                    <img
                                        src={getImageUrl(selectedPortfolio.image)}
                                        alt={selectedPortfolio.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 w-fit">
                                            {selectedPortfolio.category}
                                        </span>
                                    </div>
                                    <h4 className='text-xl font-bold text-gray-800'>
                                        {selectedPortfolio.title}
                                    </h4>
                                </div>

                                <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 relative'>
                                    <p className='text-gray-700 leading-relaxed text-sm'>
                                        {selectedPortfolio.description}
                                    </p>
                                </div>

                                <div className='flex justify-end pt-4 border-t border-gray-100'>
                                    <div className='flex flex-col items-end'>
                                        <span className='text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>
                                            Tanggal Ditambahkan
                                        </span>
                                        <span className='text-sm font-medium text-gray-600'>
                                            {new Date(
                                                selectedPortfolio.createdAt,
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
                message='Apakah Anda yakin ingin menghapus portofolio ini? Tindakan ini tidak dapat dibatalkan.'
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
