
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ModernGradientHeart from '@/components/ui/ModernGradientHeart';

interface HeroSectionProps {
  currentLanguage: 'hebrew' | 'english';
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const { openAuthModal } = useAuth();

  const handleDiscoverSalons = () => {
    if (currentLanguage === 'hebrew') {
      navigate('/גלה-סלונים');
    } else {
      navigate('/discover-salons');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#635bff] via-[#0066ff] to-[#00d4aa]">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4aa] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#ff6b6b] rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        {/* Heart Logo */}
        <div className="flex justify-center mb-8">
          <ModernGradientHeart size="xl" className="animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {currentLanguage === 'hebrew' ? (
            <>
              פלטפורמת <span className="text-[#00d4aa]">תיאום תורים</span>
              <br />
              לעסקי יופי בישראל
            </>
          ) : (
            <>
              Appointment Booking <span className="text-[#00d4aa]">Platform</span>
              <br />
              for Beauty Businesses in Israel
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          {currentLanguage === 'hebrew' 
            ? 'הפלטפורמה המובילה לניהול תורים, לקוחות ותשלומים עבור מספרות, מכוני יופי וסלוני ציפורניים'
            : 'The leading platform for managing appointments, customers, and payments for hair salons, beauty centers, and nail studios'
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            onClick={() => openAuthModal('signup')}
            size="lg"
            className="bg-white text-[#635bff] hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            {currentLanguage === 'hebrew' ? 'התחל בחינם' : 'Start Free Trial'}
          </Button>
          
          <Button
            onClick={handleDiscoverSalons}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#635bff] px-12 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            {currentLanguage === 'hebrew' ? 'גלה סלונים' : 'Discover Salons'}
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <ModernGradientHeart size="sm" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {currentLanguage === 'hebrew' ? 'ניהול תורים חכם' : 'Smart Scheduling'}
            </h3>
            <p className="text-sm text-center">
              {currentLanguage === 'hebrew' 
                ? 'מערכת תיאום תורים אוטומטית עם התראות SMS ואימייל'
                : 'Automated appointment scheduling with SMS and email notifications'
              }
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <ModernGradientHeart size="sm" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {currentLanguage === 'hebrew' ? 'תשלומים מאובטחים' : 'Secure Payments'}
            </h3>
            <p className="text-sm text-center">
              {currentLanguage === 'hebrew' 
                ? 'עיבוד תשלומים מאובטח עם תמיכה בכל כרטיסי האשראי'
                : 'Secure payment processing with support for all major credit cards'
              }
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <ModernGradientHeart size="sm" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {currentLanguage === 'hebrew' ? 'ניתוח נתונים' : 'Analytics Dashboard'}
            </h3>
            <p className="text-sm text-center">
              {currentLanguage === 'hebrew' 
                ? 'מעקב אחר ביצועים והכנסות עם דוחות מפורטים'
                : 'Track performance and revenue with detailed reports'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
