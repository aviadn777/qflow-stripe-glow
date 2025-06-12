
import React from 'react';
import { Clock, TrendingUp, Star, Smartphone, Globe, Zap } from 'lucide-react';

interface ValuePropositionSectionProps {
  currentLanguage: 'hebrew' | 'english';
}

const ValuePropositionSection: React.FC<ValuePropositionSectionProps> = ({ currentLanguage }) => {
  const content = {
    hebrew: {
      title: 'למה אלפי סלונים ישראליים בוחרים ב-QFLOW?',
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

  return (
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
              className="section-title text-gray-900 max-w-4xl mx-auto"
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
                  className="glass-card min-h-[300px] fade-in-up"
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
                      className="text-gray-600 leading-relaxed flex-1"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                      dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                    >
                      {card.description}
                    </p>

                    {/* Love accent */}
                    <div className={`mt-4 ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                      <span className="text-red-500 opacity-70">❤️</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <button className="primary-button">
              <span style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}>
                {currentLanguage === 'hebrew' 
                  ? 'התחל עכשיו ❤️' 
                  : 'Get Started Now ❤️'
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
