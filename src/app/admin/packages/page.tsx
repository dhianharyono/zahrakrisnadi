'use client';

import { useState, useEffect } from 'react';
import { Eye, Trash2, Pencil, X, Plus, Check } from 'lucide-react';
import { createPortal } from 'react-dom';
import ConfirmModal from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

type PackageFeature = {
    name: string;
    value: string | boolean;
};

type Package = {
    _id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    features: PackageFeature[];
    highlight: boolean;
    order: number;
};

export default function AdminPackages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        id: string | null;
    }>({ isOpen: false, id: null });

    const [newPackage, setNewPackage] = useState({
        name: '',
        price: '',
        duration: '',
        description: '',
        features: [{ name: '', value: '' }] as PackageFeature[],
        highlight: false,
        order: 0,
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await fetch('/api/packages');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setPackages(data.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch', error);
            toast.error('Gagal memuat data paket');
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
            await fetch(`/api/packages/${deleteConfirmation.id}`, {
                method: 'DELETE',
            });
            setPackages((prev) =>
                prev.filter((p) => p._id !== deleteConfirmation.id),
            );
            setDeleteConfirmation({ isOpen: false, id: null });
            toast.success('Paket berhasil dihapus');
        } catch (error) {
            toast.error('Gagal menghapus data');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (pkg: Package) => {
        setNewPackage({
            name: pkg.name,
            price: pkg.price,
            duration: pkg.duration,
            description: pkg.description,
            features: [...pkg.features],
            highlight: pkg.highlight,
            order: pkg.order,
        });
        setEditingId(pkg._id);
        setIsAddModalOpen(true);
    };

    const handleSavePackage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const url = editingId ? `/api/packages/${editingId}` : '/api/packages';
            const method = editingId ? 'PUT' : 'POST';
            const body = {
                ...newPackage,
                features: newPackage.features.map(f => ({
                    name: f.name,
                    value: f.value === 'true' ? true : f.value === 'false' ? false : f.value
                }))
            };

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                await fetchPackages();
                setIsAddModalOpen(false);
                setEditingId(null);
                resetForm();
                toast.success(
                    editingId
                        ? 'Paket berhasil diperbarui'
                        : 'Paket berhasil ditambahkan',
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

    const resetForm = () => {
        setNewPackage({
            name: '',
            price: '',
            duration: '',
            description: '',
            features: [{ name: '', value: '' }],
            highlight: false,
            order: 0,
        });
    }

    const openAddModal = () => {
        setEditingId(null);
        resetForm();
        setIsAddModalOpen(true);
    };

    const addFeature = () => {
        setNewPackage(prev => ({
            ...prev,
            features: [...prev.features, { name: '', value: '' }]
        }));
    }

    const removeFeature = (index: number) => {
        setNewPackage(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    }

    const updateFeature = (index: number, key: 'name' | 'value', value: string) => {
        setNewPackage(prev => {
            const updated = [...prev.features];
            updated[index] = { ...updated[index], [key]: value };
            return { ...prev, features: updated };
        });
    }

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
                        Daftar Paket Konsultasi
                    </h1>
                    <p className='text-gray-500 mt-1 text-sm'>
                        Kelola pilihan paket yang tersedia
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className='bg-linear-to-r from-primary to-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer'
                >
                    <Plus size={18} /> Tambah Paket
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {packages.length > 0 ? packages.map(pkg => (
                    <div key={pkg._id} className={`bg-white rounded-3xl p-6 relative flex flex-col transition-all duration-300 border ${pkg.highlight ? 'border-orange-300 shadow-xl shadow-orange-100' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
                        {pkg.highlight && (
                            <div className='absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-3xl shadow-sm'>
                                POPULAR
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-4 pr-16 pt-2">
                            <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                        <div className='mb-4 pb-4 border-b border-gray-100'>
                            <span className="text-2xl font-extrabold text-gray-900 block">{pkg.price}</span>
                            <span className="text-xs font-medium text-primary">/ {pkg.duration}</span>
                        </div>

                        <ul className='space-y-2 mb-6 grow'>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Fitur ({pkg.features.length})</span>
                            {pkg.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className='flex items-start gap-2 text-xs'>
                                    <Check size={12} className="text-green-500 mt-0.5 shrink-0" strokeWidth={3} />
                                    <span className="text-gray-600 truncate">{feature.name}</span>
                                </li>
                            ))}
                            {pkg.features.length > 3 && (
                                <li className='text-xs text-gray-400 italic pt-1'>+ {pkg.features.length - 3} fitur lainnya</li>
                            )}
                        </ul>

                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                            <button
                                onClick={() => setSelectedPackage(pkg)}
                                className='flex-1 py-2 text-center rounded-xl text-blue-600 bg-blue-50 text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer'
                            >
                                Detail
                            </button>
                            <button
                                onClick={() => handleEdit(pkg)}
                                className='p-2 rounded-xl text-yellow-600 bg-yellow-50 hover:bg-yellow-100 transition-colors cursor-pointer'
                            >
                                <Pencil className='w-4 h-4' />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(pkg._id)}
                                className='p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer'
                            >
                                <Trash2 className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                        <p>Belum ada paket yg ditambahkan.</p>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
                        <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-2xl overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up max-h-[95vh]'>
                            <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white'>
                                <h3 className='text-xl font-bold font-serif text-gray-800'>
                                    {editingId ? 'Edit Paket Konsultasi' : 'Tambah Paket Konsultasi'}
                                </h3>
                            </div>

                            <div className='p-6 overflow-y-auto'>
                                <form onSubmit={handleSavePackage} className='space-y-6'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                                Nama Paket
                                            </label>
                                            <input
                                                type='text'
                                                required
                                                value={newPackage.name}
                                                onChange={(e) =>
                                                    setNewPackage({
                                                        ...newPackage,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                                placeholder='Contoh: Basic Plan'
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                                Urutan Tampil
                                            </label>
                                            <input
                                                type='number'
                                                required
                                                value={newPackage.order}
                                                onChange={(e) =>
                                                    setNewPackage({
                                                        ...newPackage,
                                                        order: Number(e.target.value),
                                                    })
                                                }
                                                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                                placeholder='Contoh: 0'
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                                Harga
                                            </label>
                                            <input
                                                type='text'
                                                required
                                                value={newPackage.price}
                                                onChange={(e) =>
                                                    setNewPackage({
                                                        ...newPackage,
                                                        price: e.target.value,
                                                    })
                                                }
                                                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                                placeholder='Contoh: Rp 150.000'
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                                Durasi
                                            </label>
                                            <input
                                                type='text'
                                                required
                                                value={newPackage.duration}
                                                onChange={(e) =>
                                                    setNewPackage({
                                                        ...newPackage,
                                                        duration: e.target.value,
                                                    })
                                                }
                                                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
                                                placeholder='Contoh: 30 HARI'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>
                                            Deskripsi
                                        </label>
                                        <textarea
                                            required
                                            rows={2}
                                            value={newPackage.description}
                                            onChange={(e) =>
                                                setNewPackage({
                                                    ...newPackage,
                                                    description: e.target.value,
                                                })
                                            }
                                            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all'
                                            placeholder='Tulis ringkasan singkat paket...'
                                        />
                                    </div>

                                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center justify-between cursor-pointer" onClick={() => setNewPackage(prev => ({ ...prev, highlight: !prev.highlight }))}>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">Sorot Paket Ini?</h4>
                                            <p className="text-xs text-gray-500">Buat paket ini lebih menonjol dengan label "Popular".</p>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full transition-colors relative ${newPackage.highlight ? 'bg-primary' : 'bg-gray-300'}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${newPackage.highlight ? 'left-7' : 'left-1'}`}></div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                                Fitur Paket
                                            </label>
                                            <button type="button" onClick={addFeature} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold hover:bg-gray-200">
                                                <Plus size={14} /> Tambah Fitur
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {newPackage.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-2 pl-4 rounded-xl border border-gray-200">
                                                    <div className="flex-1 space-y-2 py-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Nama Fitur (cth: Konseling 1on1)"
                                                            required
                                                            value={feature.name}
                                                            onChange={(e) => updateFeature(idx, 'name', e.target.value)}
                                                            className="w-full bg-transparent text-sm text-gray-800 focus:outline-none placeholder:text-gray-400 font-medium"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Keterangan (cth: 1 kali, atau 'true' jika ceklis saja)"
                                                            required
                                                            value={feature.value as string}
                                                            onChange={(e) => updateFeature(idx, 'value', e.target.value)}
                                                            className="w-full bg-transparent text-xs text-gray-500 focus:outline-none placeholder:text-gray-400"
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            {newPackage.features.length === 0 && (
                                                <p className="text-xs text-center text-gray-400 py-4">Belum ada fitur ditambahkan.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex gap-3 justify-end pt-4 border-t border-gray-100 mt-8'>
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
            {selectedPackage &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
                        <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up relative'>
                            <div className='p-6 border-b border-gray-100 bg-linear-to-r from-orange-50/80 to-white flex justify-between items-center relative overflow-hidden'>
                                <h3 className='text-xl font-serif font-bold text-gray-800 relative z-10'>
                                    Detail Paket
                                </h3>
                                <button
                                    onClick={() => setSelectedPackage(null)}
                                    className='p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400 relative z-10'
                                >
                                    <X className='w-5 h-5' />
                                </button>

                                {selectedPackage.highlight && (
                                    <div className='absolute top-0 right-14 bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-b-lg shadow-sm z-10'>
                                        POPULAR
                                    </div>
                                )}
                            </div>

                            <div className='p-8 space-y-6'>
                                <div className="text-center mb-6">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedPackage.name}</h4>
                                    <p className="text-gray-500 text-sm">{selectedPackage.description}</p>
                                </div>

                                <div className='mb-6 pb-6 border-b border-gray-100 text-center'>
                                    <span className="text-4xl font-extrabold text-gray-900 block">{selectedPackage.price}</span>
                                    <span className="text-sm font-medium text-primary uppercase">/ {selectedPackage.duration}</span>
                                </div>

                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">Daftar Fitur</span>
                                    <ul className="space-y-3">
                                        {selectedPackage.features.map((f, i) => (
                                            <li key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Check size={16} className="text-green-500 mt-0.5 shrink-0" strokeWidth={3} />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-800 block">{f.name}</span>
                                                    {f.value !== true && f.value !== 'true' && (
                                                        <span className="text-xs text-gray-500 block mt-1">{String(f.value)}</span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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
                message='Apakah Anda yakin ingin menghapus paket ini? Tindakan ini tidak dapat dibatalkan.'
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
