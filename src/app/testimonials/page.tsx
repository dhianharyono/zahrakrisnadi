'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle } from 'lucide-react';

export default function NewTestimonial() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        patientName: '',
        role: '',
        program: 'Konsultasi Gizi',
        message: '',
        rating: 5,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Failed to submit testimonial', error);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-1 md:mb-2">Terima Kasih!</h2>
                    <p className="text-gray-600 mb-6 text-xs md:text-sm">Cerita sukses Anda telah kami terima.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors text-xs md:text-sm"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 font-sans">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-xl md:text-3xl font-serif font-bold text-gray-800 mb-1 md:mb-3">Bagikan Cerita Suksesmu</h1>
                    <p className="text-gray-600 text-xs md:text-sm">Pengalaman Anda sangat berarti bagi kami dan orang lain.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                required
                                value={formData.patientName}
                                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                                placeholder="Nama Anda"
                                className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 text-sm md:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Profesi</label>
                            <input
                                type="text"
                                required
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 text-sm md:text-sm"
                                placeholder="Pekerjaan atau status Anda. Contoh: Ibu Rumah Tangga, Mahasiswa"
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Program yang Diikuti</label>
                            <select
                                value={formData.program}
                                onChange={e => setFormData({ ...formData, program: e.target.value })}
                                className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none bg-white text-sm md:text-sm"
                            >
                                <option value="Konsultasi Gizi">Konsultasi Gizi</option>
                                <option value="Penurunan Berat Badan">Penurunan Berat Badan</option>
                                <option value="Pengaturan Massa Otot">Pengaturan Massa Otot</option>
                                <option value="Terapi Gizi Medis">Terapi Gizi Medis</option>
                                <option value="Katering Sehat">Katering Sehat</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-6 h-6 md:w-8 md:h-8 ${star <= (hoverRating || formData.rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Ceritakan Pengalaman Anda</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-xs md:text-sm placeholder:text-gray-400"
                                placeholder="Bagaimana perubahan yang Anda rasakan setelah berkonsultasi?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-xs md:text-sm bg-primary text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20"
                        >
                            Kirim Testimoni
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}
