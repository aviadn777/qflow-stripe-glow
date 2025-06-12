
import React from 'react';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  currentLanguage: 'hebrew' | 'english';
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentLanguage }) => {
  const content = {
    hebrew: {
      badge: 'הפופולרי ביותר',
      title: 'תמחור פשוט ושקוף',
      subtitle: 'מחיר אחד לכל התכונות - ללא הפתעות',
      price: '₪89',
      period: 'לחודש',
      trial: 'תקופת ניסיון של 14 יום בחינם',
      cta: 'התחל תקופת ניסיון בחינם ❤️',
      features: [
        'ניהול תורים ללא הגבלה',
        'אפליקציה מובילה ללקוחות',
        'לוח בקרה מתקדם',
        'התראות SMS ו-WhatsApp',
        'ניתוח נתונים ודוחות',
        'תמיכה טכנית 24/7',
        'התחלה מהירה תוך 5 דקות',
        'עדכונים אוטומטיים'
      ],
      guarantee: 'ערבות החזר כספי למשך 30 יום'
    },
    english: {
      badge: 'Most Popular',
      title: 'Simple and Transparent Pricing',
      subtitle: 'One price for all features - no surprises',
      price: '₪89',
      period: 'per month',
      trial: '14-day free trial',
      cta: 'Start Free Trial ❤️',
      features: [
        'Unlimited queue management',
        'Customer mobile app',
        'Advanced dashboard',
        'SMS & WhatsApp notifications',
        'Analytics and reports',
        '24/7 technical support',
        'Quick 5-minute setup',
        'Automatic updates'
      ],
      guarantee: '30-day money-back guarantee'
    }
  };

  const currentContent = content[currentLanguage];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${currentLanguage === 'hebrew' ? 'hebrew-text' : ''}`}>
          <h2 
            className="section-title text-gray-900 mb-4"
            style={{
              fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
            }}
            dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
          >
            {currentContent.title}
          </h2>
          <p 
            className="text-xl text-gray-600"
            style={{
              fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
            }}
            dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
          >
            {currentContent.subtitle}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div 
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
            style={{ border: '2px solid var(--stripe-purple)' }}
          >
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span 
                className="px-6 py-2 text-sm font-semibold text-white rounded-full"
                style={{ background: 'var(--stripe-purple)' }}
              >
                {currentContent.badge}
              </span>
            </div>

            <div className="p-8 pt-12">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-gray-900">{currentContent.price}</span>
                  <span 
                    className="text-xl text-gray-600"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {currentContent.period}
                  </span>
                </div>
                <p 
                  className="text-green-600 font-medium mt-2"
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
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span 
                      className="text-gray-700"
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
              <button className="w-full primary-button mb-4">
                <span style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}>
                  {currentContent.cta}
                </span>
              </button>

              {/* Guarantee */}
              <p 
                className="text-center text-sm text-gray-600"
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
              className="text-gray-600"
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
              className="text-gray-600"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {currentLanguage === 'hebrew' ? 'זמינות מערכת' : 'System Uptime'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">₪3M+</div>
            <div 
              className="text-gray-600"
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
  );
};

export default PricingSection;
