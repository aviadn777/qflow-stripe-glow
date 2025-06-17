
import React, { useState, useEffect } from 'react';

interface HeartfeltWelcomeHeroProps {
  currentLanguage: 'hebrew' | 'english';
  onAddHeart: (amount: number) => void;
}

const HeartfeltWelcomeHero: React.FC<HeartfeltWelcomeHeroProps> = ({ 
  currentLanguage, 
  onAddHeart 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    
    if (currentLanguage === 'hebrew') {
      if (hour >= 6 && hour < 12) {
        return "בוקר יפה! בואי נמצא לך את המקום המושלם להתחיל את היום ❤️";
      } else if (hour >= 12 && hour < 18) {
        return "אחר צהריים נעים! זמן לפנק את עצמך ולהרגיש מדהימה ✨";
      } else {
        return "ערב טוב! בואי נסיים את היום במשהו יפה ומיוחד 🌙";
      }
    } else {
      if (hour >= 6 && hour < 12) {
        return "Good morning! Let's find you the perfect place to start your day ❤️";
      } else if (hour >= 12 && hour < 18) {
        return "Good afternoon! Time to treat yourself and feel amazing ✨";
      } else {
        return "Good evening! Let's end the day with something beautiful and special 🌙";
      }
    }
  };

  const floatingElements = ['💄', '🖌️', '💅', '✂️', '🌟', '✨'];

  const handleWelcomeInteraction = () => {
    onAddHeart(1); // Add a heart when user interacts with the welcome section
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <div className="relative overflow-hidden bg-gradient-to-br from-[#635bff] via-[#0570de] to-[#0038A8] py-16 md:py-24">
        {/* Israeli Flag Color Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0038A8]/10 via-transparent to-[#E8B4B8]/10" />
        
        {/* Floating Beauty Elements */}
        {floatingElements.map((emoji, index) => (
          <div
            key={index}
            className="absolute text-2xl md:text-3xl opacity-20 animate-float cursor-pointer hover:opacity-40 transition-opacity"
            style={{
              left: `${15 + (index * 15)}%`,
              top: `${20 + (index % 3) * 20}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + (index % 3)}s`
            }}
            onClick={handleWelcomeInteraction}
          >
            {emoji}
          </div>
        ))}

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            {/* Time-based Greeting */}
            <h1 
              className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight cursor-pointer hover:scale-105 transition-transform ${
                currentLanguage === 'hebrew' ? 'font-hebrew' : ''
              }`}
              dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
              style={{
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
              onClick={handleWelcomeInteraction}
            >
              {getTimeBasedGreeting()}
            </h1>

            {/* Cultural Pride Message */}
            <p 
              className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto ${
                currentLanguage === 'hebrew' ? 'font-hebrew' : ''
              }`}
              dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
              style={{
                textShadow: '0 1px 10px rgba(0,0,0,0.2)',
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {currentLanguage === 'hebrew' 
                ? 'הטיפוח הישראלי הכי יפה - גלי את המקומות הכי מיוחדים בישראל'
                : 'Israel\'s most beautiful beauty care - Discover the most special places in Israel'
              }
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center items-center gap-8 mt-8">
              <div className="text-center cursor-pointer hover:scale-110 transition-transform" onClick={handleWelcomeInteraction}>
                <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-white/80">
                  {currentLanguage === 'hebrew' ? 'סלונים' : 'Salons'}
                </div>
              </div>
              <div className="text-center cursor-pointer hover:scale-110 transition-transform" onClick={handleWelcomeInteraction}>
                <div className="text-2xl md:text-3xl font-bold text-white">99.2%</div>
                <div className="text-sm text-white/80">
                  {currentLanguage === 'hebrew' ? 'שביעות רצון' : 'Satisfaction'}
                </div>
              </div>
              <div className="text-center cursor-pointer hover:scale-110 transition-transform" onClick={handleWelcomeInteraction}>
                <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">
                  {currentLanguage === 'hebrew' ? 'תמיכה' : 'Support'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            viewBox="0 0 1200 120" 
            className="w-full h-12 md:h-16"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              fill="#f9fafb"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeartfeltWelcomeHero;
