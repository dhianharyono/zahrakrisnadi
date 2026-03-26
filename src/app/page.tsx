'use client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import ServiceSteps from '../components/ServiceSteps';
import BMICalculator from '../components/BMICalculator';
import GTMChecklist from '../components/GTMChecklist';
import Testimonials from '../components/Testimonials';
import Collaboration from '../components/Collaboration';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ServiceSteps />
      <Services />
      <BMICalculator />
      <GTMChecklist />
      <Testimonials />
      <Collaboration />
      <Portfolio />
      <Footer />
    </main>
  );
}
