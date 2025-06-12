import React from 'react';
import GradientBackground from './GradientBackground';
import PhoneMockup from './PhoneMockup';

interface HeroSectionProps {
  currentLanguage: 'hebrew' | 'english';
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentLanguage }) => {
  const content = {
    hebrew: {
      title: 'מהפכה בניהול התורים לסלונים ישראליים',
      subtitle: 'פלטפורמה מתקדמת לחיסכון בזמן, הגדלת רווחים ושביעות רצון לקוחות מירבית',
      primaryCTA: 'התחל תקופת ניסיון 14 יום בחינם ❤️',
      secondaryCTA: 'צפה בהדגמה חיה'
    },
    english: {
      title: 'Revolutionary Queue Management for Israeli Beauty Salons',
      subtitle: 'Advanced platform for saving time, increasing profits, and maximum customer satisfaction',
      primaryCTA: 'Start 14-Day Free Trial ❤️',
      secondaryCTA: 'Watch Live Demo'
    }
  };

  const currentContent = content[currentLanguage];

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
            </div>

            <div className={`hero-buttons ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : 'flex-row'}`}>
              <button className="btn-gradient-primary">
                {currentContent.primaryCTA}
              </button>
              <button className="btn-gradient-secondary">
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
            <PhoneMockup currentLanguage={currentLanguage} />
          </div>
        </div>
      </section>
      {/* Organic transition to next section */}
      <div className="hero-to-content-transition"></div>
    </>
  );
};

export default HeroSection;
