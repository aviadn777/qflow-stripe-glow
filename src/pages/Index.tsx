
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import DeveloperSection from '../components/DeveloperSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'hebrew' | 'english'>('hebrew');
  
  // Prevent body scrolling on mobile when necessary
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isHeroSection = 
        target.closest('.hero-section-mobile-fixed') ||
        target.closest('.hero-content-wrapper');
        
      // Only prevent default for hero section interactions
      if (isHeroSection) {
        e.preventDefault();
      }
    };

    // Fix viewport height for mobile browsers
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    
    // Apply fix for mobile URL bar
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.getElementById('root')!.style.height = '100%';

    return () => {
      window.removeEventListener('resize', setVhProperty);
    };
  }, []);

  const handleLanguageChange = (language: 'hebrew' | 'english') => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />

      {/* Hero Section with Animated Gradient */}
      <HeroSection currentLanguage={currentLanguage} />

      {/* Value Proposition Section with Diagonal Transition */}
      <ValuePropositionSection currentLanguage={currentLanguage} />

      {/* Developer/Business Owner Section */}
      <DeveloperSection currentLanguage={currentLanguage} />

      {/* Pricing Section */}
      <PricingSection currentLanguage={currentLanguage} />

      {/* Footer */}
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Index;
