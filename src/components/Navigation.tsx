
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface NavigationProps {
  currentLanguage: 'hebrew' | 'english';
  onLanguageChange: (language: 'hebrew' | 'english') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = {
    hebrew: ['דף הבית', 'גלה סלונים', 'כניסה לעסק', 'תמחור', 'עזרה'],
    english: ['Home', 'Discover Salons', 'Business Login', 'Pricing', 'Help']
  };

  const currentItems = navigationItems[currentLanguage];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: 'var(--stripe-purple)' }}>
                Q
              </span>
              <div className="relative">
                <span className="text-2xl font-bold" style={{ color: 'var(--stripe-purple)' }}>
                  FLOW
                </span>
                <Heart 
                  className="absolute -top-1 -right-6 w-4 h-4 text-red-500 animate-pulse" 
                  fill="currentColor"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className={`text-xs ${currentLanguage === 'hebrew' ? 'hebrew-text' : ''}`}>
                {currentLanguage === 'hebrew' 
                  ? 'מערכת ניהול תורים מתקדמת' 
                  : 'Advanced Queue Management'
                }
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                  currentLanguage === 'hebrew' ? 'hebrew-text' : ''
                } ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(currentLanguage === 'hebrew' ? 'english' : 'hebrew')}
              className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                isScrolled ? 'bg-gray-200' : 'bg-white/20 backdrop-blur-md'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-purple-600 rounded-full transition-transform duration-200 flex items-center justify-center ${
                currentLanguage === 'hebrew' ? 'transform translate-x-1' : 'transform translate-x-9'
              }`}>
                <span className="text-xs font-bold text-white">
                  {currentLanguage === 'hebrew' ? 'ע' : 'EN'}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t">
            <div className="px-6 py-4 space-y-4">
              {currentItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block text-lg font-medium text-gray-900 hover:text-purple-600 transition-colors ${
                    currentLanguage === 'hebrew' ? 'hebrew-text text-right' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
