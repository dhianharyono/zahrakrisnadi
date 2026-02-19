'use client';

import { useState, useEffect } from 'react';
import { Users, BarChart as BarChartIcon, Calendar, Award, Activity, AlertCircle, Clock } from 'lucide-react';
import {
    PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

export default function AdminDashboardAnalytics() {
    const [stats, setStats] = useState({
        totalAssessments: 0,
        newToday: 0,
        avgAge: 0,
        genderDist: { male: 0, female: 0 },
        avgRating: 0,
        totalReviews: 0,
        bmiData: [] as any[],
        trendData: [] as any[],
        goalData: [] as any[],
        complaintData: [] as any[],
        recentActivity: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/assessments');
            if (res.ok) {
                const data = await res.json();
                const total = data.length;
                const today = new Date().toISOString().split('T')[0];
                const newToday = data.filter((item: any) => item.createdAt.startsWith(today)).length;

                let totalAge = 0;
                let males = 0;
                let females = 0;

                let bmiCounts = { underweight: 0, normal: 0, overweight: 0, obese: 0 };
                let goalCounts: any = {};
                let complaintCounts: any = {};

                // Process Trend Data (Last 30 days)
                const days30 = [...Array(30)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    return d.toISOString().split('T')[0];
                });
                const trendMap: any = {};
                days30.forEach(day => trendMap[day] = 0);

                data.forEach((item: any) => {
                    // Age & Gender
                    totalAge += parseInt(item.usia) || 0;
                    if (item.jenisKelamin === 'Laki-laki') males++;
                    if (item.jenisKelamin === 'Perempuan') females++;

                    // BMI
                    if (item.beratBadan && item.tinggiBadan) {
                        const h = item.tinggiBadan / 100;
                        const bmi = item.beratBadan / (h * h);
                        if (bmi < 18.5) bmiCounts.underweight++;
                        else if (bmi < 25) bmiCounts.normal++;
                        else if (bmi < 30) bmiCounts.overweight++;
                        else bmiCounts.obese++;
                    }

                    // Goals
                    const goal = item.targetKonsultasi || 'Lainnya';
                    goalCounts[goal] = (goalCounts[goal] || 0) + 1;

                    // Complaints
                    if (Array.isArray(item.keluhan)) {
                        item.keluhan.forEach((c: string) => {
                            complaintCounts[c] = (complaintCounts[c] || 0) + 1;
                        });
                    }

                    // Trend
                    const date = item.createdAt.split('T')[0];
                    if (trendMap[date] !== undefined) {
                        trendMap[date]++;
                    }
                });

                // Format Chart Data
                const bmiData = [
                    { name: 'Underweight', value: bmiCounts.underweight, color: '#3b82f6' },
                    { name: 'Normal', value: bmiCounts.normal, color: '#22c55e' },
                    { name: 'Overweight', value: bmiCounts.overweight, color: '#eab308' },
                    { name: 'Obese', value: bmiCounts.obese, color: '#ef4444' },
                ].filter(d => d.value > 0);

                const trendData = days30.map(date => ({
                    date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                    count: trendMap[date]
                }));

                const goalData = Object.entries(goalCounts)
                    .map(([name, count]) => ({ name, count: count as number }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                const complaintData = Object.entries(complaintCounts)
                    .map(([name, count]) => ({ name, count: count as number }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                // Fetch Testimonials for Rating & Activity
                let calculatedRating = 0;
                let reviewCount = 0;
                let reviews: any[] = [];
                try {
                    const resTestimonials = await fetch('/api/testimonials');
                    if (resTestimonials.ok) {
                        const testimonialData = await resTestimonials.json();
                        if (testimonialData.success && testimonialData.data.length > 0) {
                            reviews = testimonialData.data;
                            const totalRating = reviews.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0);
                            reviewCount = reviews.length;
                            calculatedRating = parseFloat((totalRating / reviewCount).toFixed(1));
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch testimonials", err);
                }

                // Recent Activity (Merge Assessments & Reviews)
                const recentAssessments = data.map((d: any) => ({
                    type: 'assessment',
                    id: d._id,
                    title: `Assessment Baru: ${d.namaLengkap}`,
                    date: d.createdAt,
                    icon: Users,
                    color: 'text-blue-500',
                    bg: 'bg-blue-50'
                }));
                const recentReviews = reviews.map((r: any) => ({
                    type: 'review',
                    id: r._id,
                    title: `Ulasan Baru: ${r.patientName} (${r.rating}★)`,
                    date: r.createdAt,
                    icon: Award,
                    color: 'text-orange-500',
                    bg: 'bg-orange-50'
                }));

                const recentActivity = [...recentAssessments, ...recentReviews]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5);

                setStats({
                    totalAssessments: total,
                    newToday,
                    avgAge: total > 0 ? Math.round(totalAge / total) : 0,
                    genderDist: { male: males, female: females },
                    avgRating: calculatedRating,
                    totalReviews: reviewCount,
                    bmiData,
                    trendData,
                    goalData,
                    complaintData,
                    recentActivity
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Memuat data analitik...</div>;

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Analitik</h1>
                    <p className="text-gray-500 mt-1 text-sm">Ringkasan aktivitas dan statistik pasien.</p>
                </div>
                <div className="flex gap-3">
                    <div className="hidden md:block bg-white/50 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-white/50 shadow-sm backdrop-blur-sm">
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Pasien"
                    value={stats.totalAssessments}
                    icon={Users}
                    color="from-blue-500 to-blue-600"
                    bgColor="bg-blue-50"
                    textColor="text-blue-600"
                />
                <StatCard
                    title="Pasien Hari Ini"
                    value={stats.newToday}
                    icon={Calendar}
                    color="from-green-500 to-green-600"
                    bgColor="bg-green-50"
                    textColor="text-green-600"
                />
                <StatCard
                    title="Rata-rata Usia"
                    value={`${stats.avgAge} Th`}
                    icon={BarChartIcon}
                    color="from-purple-500 to-purple-600"
                    bgColor="bg-purple-50"
                    textColor="text-purple-600"
                />
                <StatCard
                    title="Rating Layanan"
                    value={`${stats.avgRating}/5`}
                    icon={Award}
                    trend={`${stats.totalReviews} Ulasan`}
                    color="from-orange-500 to-orange-600"
                    bgColor="bg-orange-50"
                    textColor="text-orange-600"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* BMI Distribution */}
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 relative overflow-hidden flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-400" /> Distribusi BMI
                    </h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.bmiData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.bmiData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        {stats.bmiData.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                Belum ada data fisik
                            </div>
                        )}
                    </div>
                </div>

                {/* Trend Chart */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 relative overflow-hidden flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChartIcon className="w-5 h-5 text-gray-400" /> Tren Assessment (30 Hari)
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.trendData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} tickLine={false} axisLine={false} minTickGap={30} />
                                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickLine={false} axisLine={false} allowDecimals={false} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Consultation Goals */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60 relative overflow-hidden">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" /> Tujuan Populer
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={stats.goalData} margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                <XAxis type="number" tick={{ fontSize: 12, fill: '#9CA3AF' }} tickLine={false} axisLine={false} allowDecimals={false} />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#4B5563', fontWeight: 500 }} tickLine={false} axisLine={false} />
                                <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Complaints & Recent Activity */}
                <div className="space-y-6">
                    {/* Complaints */}
                    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-gray-400" /> Keluhan Utama
                        </h3>
                        <div className="space-y-3">
                            {stats.complaintData.map((item: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm font-medium">{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-400 rounded-full"
                                                style={{ width: `${(item.count / stats.totalAssessments) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500">{item.count}</span>
                                    </div>
                                </div>
                            ))}
                            {stats.complaintData.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Belum ada data keluhan</p>}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-gray-100/50 border border-white/60">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-400" /> Aktivitas Terbaru
                        </h3>
                        <div className="space-y-4">
                            {stats.recentActivity.map((item: any, i: number) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-gray-800 truncate group-hover:text-primary transition-colors">{item.title}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {stats.recentActivity.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Belum ada aktivitas</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend, color, bgColor, textColor }: any) {
    return (
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-orange-100/20 border border-white/60 hover:shadow-xl hover:shadow-orange-100/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform duration-500`}></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} text-white shadow-lg mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h2>
                </div>
                {trend && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 shadow-sm animate-pulse-slow">
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
