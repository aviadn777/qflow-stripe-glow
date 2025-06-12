
import React from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './auth/AuthModal';

const PricingSection: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { user, business } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('register');

  const content = {
    hebrew: {
      badge: 'הפופולרי ביותר',
      title: 'תמחור פשוט ושקוף',
      subtitle: 'מחיר אחד לכל התכונות - ללא הפתעות',
      price: '89',
      period: 'לחודש',
      trial: 'תקופת ניסיון של 14 יום בחינם',
      cta: user ? 'שדרג לתוכנית מלאה' : 'התחל תקופת ניסיון בחינם ❤️',
      loginLink: 'כבר יש לך חשבון? התחבר כאן',
      features: [
        'ניהול תורים ללא הגבלה',
        'אפליקציה מובילה ללקוחות',
        'לוח בקרה מתקדם',
        'התראות SMS ו-WhatsApp',
        'ניתוח נתונים ודוחות',
        'תמיכה טכנית 24/7',
        'התחלה מהירה תוך 5 דקות',
        'עדכונים אוטומטיים',
        'החזר כספי למשך 30 יום'
      ],
      guarantee: 'ללא צורך בכרטיס אשראי • ביטול בכל עת',
      alreadyOnTrial: 'אתה כבר בתקופת ניסיון! גש ללוח הבקרה שלך',
      goToDashboard: 'עבור ללוח הבקרה'
    },
    english: {
      badge: 'Most Popular',
      title: 'Simple and Transparent Pricing',
      subtitle: 'One price for all features - no surprises',
      price: '89',
      period: 'per month',
      trial: '14-day free trial',
      cta: user ? 'Upgrade to Full Plan' : 'Start Free Trial ❤️',
      loginLink: 'Already have an account? Sign in here',
      features: [
        'Unlimited queue management',
        'Customer mobile app',
        'Advanced dashboard',
        'SMS & WhatsApp notifications',
        'Analytics and reports',
        '24/7 technical support',
        'Quick 5-minute setup',
        'Automatic updates',
        '30-day money-back guarantee'
      ],
      guarantee: 'No credit card required • Cancel anytime',
      alreadyOnTrial: 'You\'re already on trial! Go to your dashboard',
      goToDashboard: 'Go to Dashboard'
    }
  };

  const currentContent = content[currentLanguage];

  const handleCTAClick = () => {
    if (user) {
      if (business?.subscription_status === 'trial') {
        // Redirect to billing/upgrade page
        window.location.href = '/dashboard/billing';
      } else {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } else {
      // Open registration modal
      setAuthMode('register');
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginLink = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const getTrialStatus = () => {
    if (!user || !business || business.subscription_status !== 'trial') return null;
    
    const trialDaysLeft = business.trial_ends_at 
      ? Math.max(0, Math.ceil((new Date(business.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
      : 14;
    
    return currentLanguage === 'hebrew' 
      ? `${trialDaysLeft} ימים נותרו בתקופת הניסיון`
      : `${trialDaysLeft} days left in trial`;
  };

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 ${currentLanguage === 'hebrew' ? 'hebrew-text' : ''}`}>
            <h2
              className="section-title text-gray-900 mb-4 text-optimized"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
              dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
            >
              {currentContent.title}
            </h2>
            <p
              className="text-xl text-gray-600 text-optimized"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
              dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
            >
              {currentContent.subtitle}
            </p>
          </div>

          {/* Pricing Card Wrapper with Badge */}
          <div className="relative max-w-lg mx-auto flex flex-col items-center">
            {/* Popular Badge - now outside the card */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
              <span
                className="px-6 py-2 text-sm font-semibold text-white rounded-full hebrew-on-gradient"
                style={{ background: 'var(--stripe-purple)' }}
              >
                {currentContent.badge}
              </span>
            </div>
            
            {/* Card */}
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full"
              style={{ border: '2px solid var(--stripe-purple)' }}
            >
              <div className="p-8 pt-8">
                {/* Trial Status for Logged-in Users */}
                {user && business?.subscription_status === 'trial' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 font-medium text-sm">
                        {getTrialStatus()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="price-shekel">₪</span>
                    <span className="text-5xl font-bold text-gray-900">{currentContent.price}</span>
                    <span
                      className="text-xl text-gray-600 text-optimized"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.period}
                    </span>
                  </div>
                  <p
                    className="text-green-600 font-medium mt-2 text-optimized"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {currentContent.trial}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {currentContent.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${currentLanguage === 'hebrew' ? 'flex-row-reverse text-right' : 'text-left'} space-x-3 ${currentLanguage === 'hebrew' ? 'space-x-reverse' : ''}`}
                    >
                      <div className="feature-checkmark">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span
                        className="text-gray-700 text-optimized hebrew-card-text"
                        style={{
                          fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleCTAClick}
                  className="w-full primary-button mb-4 text-optimized"
                >
                  <span style={{
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}>
                    {user && business?.subscription_status === 'trial' 
                      ? currentContent.goToDashboard 
                      : currentContent.cta
                    }
                  </span>
                </button>

                {/* Login Link for Non-Users */}
                {!user && (
                  <div className="text-center mb-4">
                    <button
                      onClick={handleLoginLink}
                      className="text-sm text-purple-600 hover:text-purple-700 underline"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.loginLink}
                    </button>
                  </div>
                )}

                {/* Guarantee */}
                <p
                  className="text-center text-sm text-gray-600 text-optimized"
                  style={{
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                >
                  {currentContent.guarantee}
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div
                className="text-gray-600 text-optimized"
                style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}
              >
                {currentLanguage === 'hebrew' ? 'עסקים מרוצים' : 'Happy Businesses'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">99.2%</div>
              <div
                className="text-gray-600 text-optimized"
                style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}
              >
                {currentLanguage === 'hebrew' ? 'זמינות מערכת' : 'System Uptime'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                <span className="price-shekel">₪</span>3M+
              </div>
              <div
                className="text-gray-600 text-optimized"
                style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}
              >
                {currentLanguage === 'hebrew' ? 'הכנסות נוספות' : 'Additional Revenue'}
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default PricingSection;
