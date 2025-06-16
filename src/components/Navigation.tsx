
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ModernGradientHeart from '@/components/ui/ModernGradientHeart';

interface NavigationProps {
  currentLanguage: 'hebrew' | 'english';
  onLanguageChange: (language: 'hebrew' | 'english') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentLanguage, onLanguageChange }) => {
  const navigate = useNavigate();
  const { user, openAuthModal, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDiscoverSalons = () => {
    if (currentLanguage === 'hebrew') {
      navigate('/גלה-סלונים');
    } else {
      navigate('/discover-salons');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <ModernGradientHeart size="md" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
              QFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" dir="ltr">
            <Button
              variant="ghost"
              onClick={handleDiscoverSalons}
              className="text-gray-700 hover:text-[#635bff] font-medium"
            >
              {currentLanguage === 'hebrew' ? 'גלה סלונים' : 'Discover Salons'}
            </Button>
            
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-[#635bff] font-medium"
            >
              {currentLanguage === 'hebrew' ? 'תמחור' : 'Pricing'}
            </Button>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={currentLanguage === 'hebrew' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('hebrew')}
                className="text-sm"
              >
                עב
              </Button>
              <Button
                variant={currentLanguage === 'english' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('english')}
                className="text-sm"
              >
                EN
              </Button>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {currentLanguage === 'hebrew' ? 'שלום' : 'Hello'}, {user.email}
                </span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  {currentLanguage === 'hebrew' ? 'התנתק' : 'Logout'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal('login')}
                  className="text-gray-700 hover:text-[#635bff]"
                >
                  {currentLanguage === 'hebrew' ? 'התחבר' : 'Login'}
                </Button>
                <Button
                  onClick={() => openAuthModal('signup')}
                  className="bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5a52e8] hover:to-[#0052cc] text-white px-6"
                >
                  {currentLanguage === 'hebrew' ? 'הרשמה' : 'Sign Up'}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              <Button
                variant="ghost"
                onClick={handleDiscoverSalons}
                className="text-left text-gray-700 hover:text-[#635bff] font-medium justify-start"
              >
                {currentLanguage === 'hebrew' ? 'גלה סלונים' : 'Discover Salons'}
              </Button>
              
              <Button
                variant="ghost"
                className="text-left text-gray-700 hover:text-[#635bff] font-medium justify-start"
              >
                {currentLanguage === 'hebrew' ? 'תמחור' : 'Pricing'}
              </Button>

              {/* Language Toggle */}
              <div className="flex items-center gap-2 px-3">
                <Button
                  variant={currentLanguage === 'hebrew' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onLanguageChange('hebrew')}
                  className="text-sm"
                >
                  עב
                </Button>
                <Button
                  variant={currentLanguage === 'english' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onLanguageChange('english')}
                  className="text-sm"
                >
                  EN
                </Button>
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="px-3 space-y-2">
                  <p className="text-sm text-gray-600">
                    {currentLanguage === 'hebrew' ? 'שלום' : 'Hello'}, {user.email}
                  </p>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full border-gray-300 hover:bg-gray-50"
                  >
                    {currentLanguage === 'hebrew' ? 'התנתק' : 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="px-3 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal('login')}
                    className="w-full text-gray-700 hover:text-[#635bff] justify-start"
                  >
                    {currentLanguage === 'hebrew' ? 'התחבר' : 'Login'}
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="w-full bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5a52e8] hover:to-[#0052cc] text-white"
                  >
                    {currentLanguage === 'hebrew' ? 'הרשמה' : 'Sign Up'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
