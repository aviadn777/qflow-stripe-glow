
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import DeveloperSection from '../components/DeveloperSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'hebrew' | 'english'>('hebrew');

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
