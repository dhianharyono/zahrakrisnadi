'use client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import ServiceSteps from '../components/ServiceSteps';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ServiceSteps />
      <Services showPricing={false} />
      <Testimonials />
      <Footer />
    </main>
  );
}
