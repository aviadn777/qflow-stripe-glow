
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import DeveloperSection from '../components/DeveloperSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Animated Gradient */}
      <HeroSection />

      {/* Value Proposition Section with Diagonal Transition */}
      <ValuePropositionSection />

      {/* Developer/Business Owner Section */}
      <DeveloperSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
