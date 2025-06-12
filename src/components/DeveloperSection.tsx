
import React from 'react';
import { Code, Zap, Wrench, Heart } from 'lucide-react';

interface DeveloperSectionProps {
  currentLanguage: 'hebrew' | 'english';
}

const DeveloperSection: React.FC<DeveloperSectionProps> = ({ currentLanguage }) => {
  const content = {
    hebrew: {
      label: 'מיועד לבעלי סלונים',
      title: 'נהל את הסלון שלך בקלות עם כלים מתקדמים',
      description: 'חסוך זמן עם פונקציונליות ניהול מאוחדת. אנחנו דואגים למורכבות הטכנית כדי שתוכל להתמקד במה שחשוב - הלקוחות שלך.',
      features: [
        { icon: 'smartphone', text: 'ממשק פשוט לשימוש' },
        { icon: 'zap', text: 'הגדרה מהירה' },
        { icon: 'wrench', text: 'תמיכה מלאה' },
        { icon: 'heart', text: 'נבנה באהבה' }
      ],
      cta: 'התחל עכשיו',
      dashboardTitle: 'QFLOW לוח בקרה',
      connected: 'מחובר',
      todayRevenue: 'הכנסות היום',
      appointments: 'תורים',
      satisfaction: 'שביעות רצון',
      todayCapacity: 'תפוסה היום',
      dailyAverage: 'ממוצע ביום',
      returningCustomers: 'לקוחות חוזרים'
    },
    english: {
      label: 'Designed for salon owners',
      title: 'Manage your salon effortlessly with powerful tools',
      description: 'Save time with unified management functionality. We handle the technical complexity so you can focus on what matters - your customers.',
      features: [
        { icon: 'smartphone', text: 'Simple interface to use' },
        { icon: 'zap', text: 'Quick setup' },
        { icon: 'wrench', text: 'Full support' },
        { icon: 'heart', text: 'Built with love' }
      ],
      cta: 'Get Started',
      dashboardTitle: 'QFLOW Dashboard',
      connected: 'Connected',
      todayRevenue: 'Today\'s Revenue',
      appointments: 'Appointments',
      satisfaction: 'Satisfaction',
      todayCapacity: 'Today\'s Capacity',
      dailyAverage: 'Daily Average',
      returningCustomers: 'Returning Customers'
    }
  };

  const currentContent = content[currentLanguage];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone':
        return '📱';
      case 'zap':
        return '⚡';
      case 'wrench':
        return '🔧';
      case 'heart':
        return '❤️';
      default:
        return '✨';
    }
  };

  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{
        background: 'var(--bg-dark)',
        transform: 'skewY(-1.5deg)',
        margin: '100px 0'
      }}
    >
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-80 h-40 opacity-20 animate-float"
          style={{
            background: 'linear-gradient(45deg, rgba(58, 58, 255, 0.2), rgba(110, 195, 244, 0.2))',
            borderRadius: '20px',
            transform: 'rotate(-15deg)',
            bottom: '-50px',
            left: '-100px',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute w-6 h-6 bg-purple-400 rounded-full opacity-60"
          style={{ top: '25%', right: '20%' }}
        />
        <div 
          className="absolute w-6 h-6 bg-blue-400 rounded-full opacity-60"
          style={{ bottom: '30%', right: '30%' }}
        />
      </div>

      <div 
        className="relative z-10"
        style={{ transform: 'skewY(1.5deg)' }} // Counter-rotate content
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className={`${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'} text-white space-y-8`}>
              <div className="space-y-6">
                <span 
                  className="text-purple-400 font-medium text-sm uppercase tracking-wide"
                  style={{
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                >
                  {currentContent.label}
                </span>
                
                <h2 
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                  dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                >
                  {currentContent.title}
                </h2>
                
                <p 
                  className="text-xl text-gray-300 leading-relaxed max-w-2xl"
                  style={{
                    fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                  }}
                  dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
                >
                  {currentContent.description}
                </p>
              </div>

              {/* Features List */}
              <div className={`grid grid-cols-2 gap-4 max-w-md ${currentLanguage === 'hebrew' ? 'mr-0' : 'ml-0'}`}>
                {currentContent.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 ${currentLanguage === 'hebrew' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <span className="text-2xl">{getIcon(feature.icon)}</span>
                    <span 
                      className="text-white font-medium"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="primary-button">
                <span style={{
                  fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                }}>
                  {currentContent.cta}
                </span>
              </button>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className={`flex items-center justify-between mb-6 ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : ''}`}>
                  <h3 
                    className="text-white font-semibold text-lg"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {currentContent.dashboardTitle}
                  </h3>
                  <div className={`flex items-center space-x-2 ${currentLanguage === 'hebrew' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span 
                      className="text-green-400 text-sm font-medium"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.connected}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">₪1,450</div>
                    <div 
                      className="text-gray-400 text-xs mt-1"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.todayRevenue}
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">15</div>
                    <div 
                      className="text-gray-400 text-xs mt-1"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.appointments}
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div 
                      className="text-gray-400 text-xs mt-1"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.satisfaction}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className={`flex justify-between items-center mb-2 ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : ''}`}>
                    <span 
                      className="text-white text-sm font-medium"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.todayCapacity}
                    </span>
                    <span className="text-purple-400 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className={`text-center ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                    <div 
                      className="text-gray-400 text-xs"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.dailyAverage}
                    </div>
                    <div className="text-white font-bold">₪1,207</div>
                  </div>
                  <div className={`text-center ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                    <div 
                      className="text-gray-400 text-xs"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    >
                      {currentContent.returningCustomers}
                    </div>
                    <div className="text-white font-bold">78%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
