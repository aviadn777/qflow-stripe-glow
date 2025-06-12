
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <GradientBackground />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div 
          className="absolute w-96 h-48 opacity-20 animate-float"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 91, 255, 0.1), rgba(116, 169, 252, 0.1))',
            borderRadius: '20px',
            transform: 'rotate(15deg)',
            top: '10%',
            right: '-5%',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute w-72 h-72 opacity-20 animate-pulse-custom"
          style={{
            background: 'radial-gradient(circle, rgba(255, 97, 171, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '30%',
            right: '5%',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-80 h-40 opacity-20 animate-float"
          style={{
            background: 'linear-gradient(45deg, rgba(255, 97, 171, 0.1), rgba(255, 186, 39, 0.1))',
            borderRadius: '20px',
            transform: 'rotate(-15deg)',
            bottom: '20%',
            left: '-5%',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Side - Content */}
            <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'} space-y-8`}>
              <div className="space-y-6">
                <h1 
                  className="hero-title text-white"
                  style={{
                    mixBlendMode: 'difference',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                  dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                >
                  {currentContent.title}
                </h1>
                
                <p 
                  className="text-xl font-normal leading-relaxed max-w-lg"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                  dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                >
                  {currentContent.subtitle}
                </p>
              </div>

              <div className={`flex ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : 'flex-row'} gap-4 flex-wrap`}>
                <button className="btn-gradient-primary flex-1 min-w-[200px]">
                  {currentContent.primaryCTA}
                </button>
                <button className="btn-gradient-secondary flex-1 min-w-[200px]">
                  {currentContent.secondaryCTA}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className={`flex ${currentLanguage === 'hebrew' ? 'justify-end' : 'justify-start'} space-x-8 text-white/80 text-sm`}>
                <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                  <div className="font-semibold">500+</div>
                  <div>{currentLanguage === 'hebrew' ? 'עסקים' : 'Businesses'}</div>
                </div>
                <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                  <div className="font-semibold">99.2%</div>
                  <div>{currentLanguage === 'hebrew' ? 'זמינות' : 'Uptime'}</div>
                </div>
                <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                  <div className="font-semibold">₪3M+</div>
                  <div>{currentLanguage === 'hebrew' ? 'הכנסות נוספות' : 'Additional Revenue'}</div>
                </div>
              </div>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="relative">
              <PhoneMockup currentLanguage={currentLanguage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
