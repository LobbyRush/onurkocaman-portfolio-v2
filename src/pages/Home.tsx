import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import WhySection from '../components/WhySection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <WhySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}