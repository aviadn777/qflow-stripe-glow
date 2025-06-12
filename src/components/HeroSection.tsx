import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import GradientBackground from './GradientBackground';
import PhoneMockup from './PhoneMockup';
import AuthModal from './auth/AuthModal';

const HeroSection: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { user, business } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('register');
  const [showDemo, setShowDemo] = React.useState(false);

  const content = {
    hebrew: {
      title: 'מהפכה בניהול התורים לסלונים ישראליים',
      subtitle: 'פלטפורמה מתקדמת לחיסכון בזמן, הגדלת רווחים ושביעות רצון לקוחות מירבית',
      primaryCTA: user ? 'עבור ללוח הבקרה' : 'התחל תקופת ניסיון 14 יום בחינם ❤️',
      secondaryCTA: 'צפה בהדגמה חיה',
      trialStatus: 'בתקופת ניסיון',
      demoPrompt: 'רוצה לראות את זה בפעולה עבור הסלון שלך?',
      demoSignup: 'התחל את המהפכה שלך עכשיו'
    },
    english: {
      title: 'Revolutionary Queue Management for Israeli Beauty Salons',
      subtitle: 'Advanced platform for saving time, increasing profits, and maximum customer satisfaction',
      primaryCTA: user ? 'Go to Dashboard' : 'Start 14-Day Free Trial ❤️',
      secondaryCTA: 'Watch Live Demo',
      trialStatus: 'Trial Active',
      demoPrompt: 'Ready to see this in action for your salon?',
      demoSignup: 'Start Your Transformation Now'
    }
  };

  const currentContent = content[currentLanguage];

  const handlePrimaryCTA = () => {
    if (user) {
      // Redirect to dashboard for logged-in users
      window.location.href = '/dashboard';
    } else {
      // Open registration for new users
      setAuthMode('register');
      setIsAuthModalOpen(true);
    }
  };

  const handleSecondaryCTA = () => {
    if (user) {
      // Show demo overlay or redirect to demo page
      setShowDemo(true);
    } else {
      // Show demo first, then prompt for signup
      setShowDemo(true);
      // After 10 seconds, show signup prompt
      setTimeout(() => {
        setShowDemo(false);
        setAuthMode('register');
        setIsAuthModalOpen(true);
      }, 10000);
    }
  };

  const getStatusMessage = () => {
    if (!user || !business) return null;
    
    if (business.subscription_status === 'trial') {
      const trialDaysLeft = business.trial_ends_at 
        ? Math.max(0, Math.ceil((new Date(business.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
        : 14;
      
      return currentLanguage === 'hebrew' 
        ? `${trialDaysLeft} ימים נותרו בתקופת הניסיון`
        : `${trialDaysLeft} days left in trial`;
    }
    
    return null;
  };

  return (
    <>
      <section className="hero-gradient-background">
        {/* Animated Gradient Background with Organic Shapes */}
        <GradientBackground />

        {/* Floating Geometric Shapes */}
        <div className="floating-shapes">
          <div className="shape-rectangle shape-rectangle-1" />
          <div className="shape-circle shape-circle-1" />
          <div className="shape-rectangle shape-rectangle-2" />
          <div className="shape-circle shape-circle-2" />
          <div className="accent-dots accent-dots-1" />
          <div className="accent-dots accent-dots-2" />
          <div className="accent-dots accent-dots-3" />
        </div>

        {/* Demo Overlay */}
        {showDemo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl p-8 relative">
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentLanguage === 'hebrew' ? 'הדגמה חיה של QFLOW' : 'QFLOW Live Demo'}
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === 'hebrew' 
                    ? 'צפו כיצד QFLOW משנה את אופן ניהול הסלון שלכם'
                    : 'See how QFLOW transforms your salon management'
                  }
                </p>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <PhoneMockup />
              </div>
              
              {!user && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    {currentContent.demoPrompt}
                  </p>
                  <button
                    onClick={() => {
                      setShowDemo(false);
                      setAuthMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="auth-button-primary text-lg px-8 py-4"
                  >
                    {currentContent.demoSignup}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="hero-content">
          {/* Left Side - Content */}
          <div className={`hero-text ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
            <div className="space-y-6">
              <h1
                className="hero-title text-white"
                data-text={currentContent.title}
                style={{
                  mixBlendMode: 'difference',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}
                dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
              >
                {currentContent.title}
              </h1>

              <p
                className="hero-subtitle"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
              >
                {currentContent.subtitle}
              </p>

              {/* Trial Status for Logged-in Users */}
              {user && business && business.subscription_status === 'trial' && (
                <div className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-100 font-medium">
                      {getStatusMessage()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={`hero-buttons ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : 'flex-row'}`}>
              <button 
                className="btn-gradient-primary"
                onClick={handlePrimaryCTA}
              >
                {currentContent.primaryCTA}
              </button>
              <button 
                className="btn-gradient-secondary"
                onClick={handleSecondaryCTA}
              >
                {currentContent.secondaryCTA}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`trust-indicators ${currentLanguage === 'hebrew' ? 'justify-end' : 'justify-start'}`}>
              <div className={`trust-item ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                <div className="trust-value">500+</div>
                <div className="trust-label">{currentLanguage === 'hebrew' ? 'עסקים' : 'Businesses'}</div>
              </div>
              <div className={`trust-item ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                <div className="trust-value">99.2%</div>
                <div className="trust-label">{currentLanguage === 'hebrew' ? 'זמינות' : 'Uptime'}</div>
              </div>
              <div className={`trust-item ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                <div className="trust-value">₪3M+</div>
                <div className="trust-label">{currentLanguage === 'hebrew' ? 'הכנסות נוספות' : 'Additional Revenue'}</div>
              </div>
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="iphone-container">
            <PhoneMockup />
          </div>
        </div>
      </section>
      {/* Organic transition to next section */}
      <div className="hero-to-content-transition"></div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default HeroSection;
