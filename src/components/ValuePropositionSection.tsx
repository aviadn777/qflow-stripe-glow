
import React from 'react';
import { Clock, TrendingUp, Star, Smartphone, Globe, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './auth/AuthModal';

const ValuePropositionSection: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('register');
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);

  const content = {
    hebrew: {
      title: 'למה אלפי סלונים ישראליים בוחרים ב-QFLOW?',
      getStarted: 'התחל עכשיו ❤️',
      tryFeature: 'נסה את התכונה',
      cards: [
        {
          icon: Clock,
          title: 'ניהול זמן חכם',
          stat: '3+ שעות נחסכות יומית',
          description: 'ניהול תורים אוטומטי עם ממשק אינטואיטיווי המתאים לקצב העבודה המהיר בסלונים ישראליים'
        },
        {
          icon: TrendingUp,
          title: 'גידול ברווחיות',
          stat: '₪890 הכנסה נוספת בחודש',
          description: 'פחות ביטולים ולקוחות מרוצים יותר מובילים לגידול משמעותי ברווחים חודשיים'
        },
        {
          icon: Star,
          title: 'שביעות רצון לקוחות',
          stat: '98% דירוג שביעות רצון',
          description: 'חוויית 5 כוכבים עם מערכת התור החיה המפחיתה זמני המתנה ומשפרת את השירות'
        },
        {
          icon: Smartphone,
          title: 'מובייל מתקדם',
          stat: 'מותאם לכל מכשיר',
          description: 'ממוטב במיוחד לשימוש בסמארטפון עם ממשק מהיר ונוח לשימוש גם בעת לחץ'
        },
        {
          icon: Globe,
          title: 'עברית מושלמת',
          stat: 'תמיכה מלאה ב-RTL',
          description: 'עוצב במיוחד עבור השוק הישראלי עם תמיכה מושלמת בעברית וכל המאפיינים הייחודיים'
        },
        {
          icon: Zap,
          title: 'תור חי ייחודי',
          stat: 'תכונה ראשונה בישראל',
          description: 'ניהול תור בזמן אמת המאפשר ללקוחות לראות את מקומם בתור - יתרון תחרותי אמיתי'
        }
      ]
    },
    english: {
      title: 'Why Thousands of Israeli Salons Choose QFLOW?',
      getStarted: 'Get Started Now ❤️',
      tryFeature: 'Try This Feature',
      cards: [
        {
          icon: Clock,
          title: 'Smart Time Management',
          stat: '3+ hours saved daily',
          description: 'Automatic queue management with intuitive interface suited for the fast-paced Israeli salon environment'
        },
        {
          icon: TrendingUp,
          title: 'Revenue Growth',
          stat: '₪890 additional monthly income',
          description: 'Fewer cancellations and happier customers lead to significant monthly revenue growth'
        },
        {
          icon: Star,
          title: 'Customer Satisfaction',
          stat: '98% satisfaction rating',
          description: '5-star experience with live queue system that reduces wait times and improves service quality'
        },
        {
          icon: Smartphone,
          title: 'Mobile Excellence',
          stat: 'Optimized for all devices',
          description: 'Specially optimized for smartphone use with fast and convenient interface even under pressure'
        },
        {
          icon: Globe,
          title: 'Perfect Hebrew',
          stat: 'Full RTL support',
          description: 'Designed specifically for the Israeli market with perfect Hebrew support and unique characteristics'
        },
        {
          icon: Zap,
          title: 'Unique Live Queue',
          stat: 'First feature in Israel',
          description: 'Real-time queue management allowing customers to see their position - a true competitive advantage'
        }
      ]
    }
  };

  const currentContent = content[currentLanguage];

  const handleFeatureCTA = (featureTitle: string) => {
    if (user) {
      // Redirect to dashboard with feature highlight
      window.location.href = `/dashboard?feature=${encodeURIComponent(featureTitle)}`;
    } else {
      // Open registration with feature context
      setSelectedFeature(featureTitle);
      setAuthMode('register');
      setIsAuthModalOpen(true);
    }
  };

  const handleMainCTA = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setAuthMode('register');
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <section
        className="relative py-32 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 97, 171, 0.1) 0%, rgba(110, 195, 244, 0.1) 100%)',
          transform: 'skewY(-3deg)',
          transformOrigin: 'top left',
          marginTop: '-100px',
          paddingTop: '200px'
        }}
      >
        {/* Geometric Overlay */}
        <div
          className="absolute top-0 right-0 w-80 h-80 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 91, 255, 0.2), rgba(255, 186, 39, 0.2))',
            borderRadius: '20px',
            transform: 'rotate(15deg)',
            right: '-100px',
            top: '-50px'
          }}
        />

        <div
          className="relative z-10"
          style={{
            transform: 'skewY(3deg)' // Counter-rotate content
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Title */}
            <div className={`text-center mb-16 ${currentLanguage === 'hebrew' ? 'hebrew-text' : ''}`}>
              <h2
                className="section-title text-white max-w-4xl mx-auto"
                dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
              >
                {currentContent.title}
              </h2>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContent.cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className="glass-card min-h-[300px] fade-in-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'} h-full flex flex-col`}>
                      {/* Icon and Title */}
                      <div className={`flex items-center ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                          style={{ background: 'var(--gradient-card)' }}
                        >
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: 'var(--stripe-purple)' }}
                          />
                        </div>
                        <h3
                          className="card-title text-gray-900"
                          style={{
                            fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                          }}
                        >
                          {card.title}
                        </h3>
                      </div>

                      {/* Statistics */}
                      <div
                        className="text-2xl font-bold mb-4"
                        style={{ color: 'var(--stripe-purple)' }}
                      >
                        {card.stat}
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-600 leading-relaxed flex-1 mb-4"
                        style={{
                          fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                        }}
                        dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                      >
                        {card.description}
                      </p>

                      {/* Feature CTA Button */}
                      <div className="mt-auto">
                        <button
                          onClick={() => handleFeatureCTA(card.title)}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        >
                          {currentContent.tryFeature}
                        </button>
                      </div>

                      {/* Love accent */}
                      <div className={`mt-2 ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                        <span className="text-red-500 opacity-70">❤️</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <button 
                className="primary-button"
                onClick={handleMainCTA}
              >
                <span style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}>
                  {currentContent.getStarted}
                </span>
              </button>
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
        initialContext={selectedFeature ? `feature:${selectedFeature}` : undefined}
      />
    </>
  );
};

export default ValuePropositionSection;
