import React from 'react';
import { MousePointerClick, Video, FileText, Sparkles } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Pilih Program',
        description: 'Tentukan program konsultasi sesuai kebutuhanmu dan selesaikan pembayaran.',
        icon: <MousePointerClick className="w-8 h-8 text-orange-500" strokeWidth={1.5} />,
        accent: 'bg-orange-100'
    },
    {
        number: '02',
        title: 'Sesi Konsultasi',
        description: 'Terhubung langsung dengan Dietisien / Ahli Gizi tersertifikasi.',
        icon: <Video className="w-8 h-8 text-teal-500" strokeWidth={1.5} />,
        accent: 'bg-teal-100'
    },
    {
        number: '03',
        title: 'Meal Plan',
        description: 'Dapatkan rencana makan (meal plan) yang dipersonalisasi khusus untuk tubuh Anda.',
        icon: <FileText className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
        accent: 'bg-blue-100'
    },
    {
        number: '04',
        title: 'Mulai Sehat',
        description: 'Nikmati perjalanan baru menuju tubuh yang lebih sehat!',
        icon: <Sparkles className="w-8 h-8 text-purple-500" strokeWidth={1.5} />,
        accent: 'bg-purple-100'
    }
];

const ServiceSteps: React.FC = () => {
    return (
        <section className="py-12 lg:py-32 relative overflow-hidden bg-orange-50/50 flex flex-col items-center">
            {/* Soft Organic Background Blurs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center mb-12 lg:mb-16">
                    <span className='text-primary font-serif italic text-sm md:text-lg mb-2 block'>
                        Tahap Layanan
                    </span>
                    <h2 className='text-xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 leading-tight'>
                        Cara Mudah <span className='text-primary italic font-serif'>Mulai Layanan</span>
                    </h2>
                    <p className='text-gray-600 text-sm max-w-2xl mx-auto'>
                        Hanya butuh 4 tahapan sederhana untuk merencanakan kesehatan masa depan Anda.
                    </p>
                </div>

                <div className="relative">
                    {/* Flowing dashed path hidden on mobile, visible on lg */}
                    <div className="hidden lg:block absolute top-16 left-[10%] w-[80%] h-px border-t-2 border-dashed border-gray-300 pointer-events-none z-0"></div>

                    {/* Timeline line for mobile/tablet */}
                    <div className="block lg:hidden absolute top-4 bottom-4 left-[2rem] w-px border-l-2 border-dashed border-gray-300 pointer-events-none z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 pt-0 lg:pt-4">
                        {steps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center group">

                                {/* Floating Icon Circle */}
                                <div className={`shrink-0 w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-white flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.06)] lg:shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-0 lg:mb-8 mr-4 lg:mr-0 lg:group-hover:-translate-y-4 transition-all duration-500 group-hover:shadow-[0_10px_30px_rgb(0,0,0,0.1)] relative`}>
                                    <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 lg:group-hover:scale-110 transition-all duration-500 scale-90 -z-10 ${step.accent}`}></div>
                                    <div className="transform scale-75 lg:scale-100">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Free flowing text without any stiff borders */}
                                <div className="flex-1 text-left lg:text-center mt-1 lg:mt-2 relative">
                                    <h3 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2 transition-colors duration-300 group-hover:text-primary flex items-center gap-2 lg:justify-center">
                                        <span className="lg:hidden text-primary text-xs font-black opacity-60">
                                            {step.number}
                                        </span>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSteps;
