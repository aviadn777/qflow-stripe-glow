
import React, { useState, useEffect } from 'react';

interface PhoneMockupProps {
  currentLanguage: 'hebrew' | 'english';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ currentLanguage }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: 'booking',
      hebrew: {
        title: 'בחירת שירות - מספרת מיה',
        time: '14:30',
        services: [
          { name: 'תספורת גברים', price: '₪80', duration: '45 דק׳' },
          { name: 'עיצוב זקן', price: '₪40', duration: '30 דק׳' }
        ],
        cta: 'המשך להזמנה ❤️'
      },
      english: {
        title: 'Select Service - Mia Salon',
        time: '2:30 PM',
        services: [
          { name: 'Men\'s Haircut', price: '₪80', duration: '45 min' },
          { name: 'Beard Styling', price: '₪40', duration: '30 min' }
        ],
        cta: 'Continue Booking ❤️'
      }
    },
    {
      id: 'dashboard',
      hebrew: {
        title: 'היום - מספרת מיה',
        stats: [
          { value: '₪1,450', label: 'הכנסות' },
          { value: '15', label: 'תורים' },
          { value: '4', label: 'לקוחות חדשים' }
        ],
        appointments: [
          { name: 'דוד כהן', service: 'תספורת', time: '14:30' },
          { name: 'מיכל לוי', service: 'צבע', time: '15:15' }
        ]
      },
      english: {
        title: 'Today - Mia Salon',
        stats: [
          { value: '₪1,450', label: 'Revenue' },
          { value: '15', label: 'Appointments' },
          { value: '4', label: 'New Customers' }
        ],
        appointments: [
          { name: 'David Cohen', service: 'Haircut', time: '2:30 PM' },
          { name: 'Michal Levy', service: 'Color', time: '3:15 PM' }
        ]
      }
    },
    {
      id: 'queue',
      hebrew: {
        title: 'תור חי - זמן אמת',
        subtitle: '5 לקוחות ממתינים',
        queue: [
          { position: 1, name: 'אמיר שלום', status: 'בטיפול כעת', time: '', heart: true },
          { position: 2, name: 'רונית ברק', status: 'הבא בתור', time: '10 דק׳' },
          { position: 3, name: 'יוסי גרין', status: 'ממתין', time: '25 דק׳' }
        ]
      },
      english: {
        title: 'Live Queue - Real Time',
        subtitle: '5 customers waiting',
        queue: [
          { position: 1, name: 'Amir Shalom', status: 'Currently serving', time: '', heart: true },
          { position: 2, name: 'Ronit Barak', status: 'Next in line', time: '10 min' },
          { position: 3, name: 'Yossi Green', status: 'Waiting', time: '25 min' }
        ]
      }
    },
    {
      id: 'services',
      hebrew: {
        title: 'ניהול שירותים',
        addButton: '+ הוסף שירות',
        services: [
          { name: 'תספורת גברים', price: '₪80', duration: '45 דק׳' },
          { name: 'עיצוב זקן', price: '₪40', duration: '30 דק׳' }
        ]
      },
      english: {
        title: 'Service Management',
        addButton: '+ Add Service',
        services: [
          { name: 'Men\'s Haircut', price: '₪80', duration: '45 min' },
          { name: 'Beard Styling', price: '₪40', duration: '30 min' }
        ]
      }
    },
    {
      id: 'analytics',
      hebrew: {
        title: 'ניתוח ביצועים',
        period: 'השבוע',
        chartTitle: 'הכנסות שבועיות',
        chartValue: '₪8,450',
        trend: '+12% ❤️',
        metrics: [
          { label: 'ממוצע ביום', value: '₪1,207' },
          { label: 'לקוחות חוזרים', value: '78%' }
        ]
      },
      english: {
        title: 'Performance Analytics',
        period: 'This Week',
        chartTitle: 'Weekly Revenue',
        chartValue: '₪8,450',
        trend: '+12% ❤️',
        metrics: [
          { label: 'Daily Average', value: '₪1,207' },
          { label: 'Returning Customers', value: '78%' }
        ]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [screens.length]);

  const currentData = screens[currentScreen][currentLanguage];

  const renderScreen = () => {
    const screen = screens[currentScreen];
    
    switch (screen.id) {
      case 'booking':
        return (
          <div className={`p-5 h-full ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`} dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{currentData.title}</h3>
              <div className="text-sm text-gray-600">{currentData.time}</div>
            </div>
            <div className="space-y-3 mb-6">
              {currentData.services.map((service, index) => (
                <div key={index} className={`p-3 rounded-lg border-2 ${index === 0 ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                  <div className="font-medium text-gray-900">{service.name}</div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{service.price}</span>
                    <span>{service.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium">
              {currentData.cta}
            </button>
          </div>
        );

      case 'dashboard':
        return (
          <div className={`p-5 h-full ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`} dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
            <h3 className="font-semibold text-gray-900 mb-4">{currentData.title}</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {currentData.stats.map((stat, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="font-bold text-lg text-purple-600">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {currentData.appointments.map((appointment, index) => (
                <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${index === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                  <div>
                    <div className="font-medium text-gray-900">{appointment.name}</div>
                    <div className="text-sm text-gray-600">{appointment.service}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'queue':
        return (
          <div className={`p-5 h-full ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`} dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">{currentData.title}</h3>
              <div className="text-sm text-gray-600">{currentData.subtitle}</div>
            </div>
            <div className="space-y-3">
              {currentData.queue.map((item, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg ${
                  item.heart ? 'bg-green-50 border border-green-200' : 
                  index === 1 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    item.heart ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {item.position}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.status}</div>
                  </div>
                  {item.heart ? (
                    <div className="text-red-500">❤️</div>
                  ) : (
                    <div className="text-sm text-gray-600">{item.time}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className={`p-5 h-full ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`} dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">{currentData.title}</h3>
              <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg">
                {currentData.addButton}
              </button>
            </div>
            <div className="space-y-3">
              {currentData.services.map((service, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.duration}</div>
                    </div>
                    <div className="font-bold text-purple-600">{service.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className={`p-5 h-full ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`} dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">{currentData.title}</h3>
              <div className="text-sm text-gray-600">{currentData.period}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <div className="text-sm text-gray-600 mb-1">{currentData.chartTitle}</div>
              <div className="text-2xl font-bold text-purple-600">{currentData.chartValue}</div>
              <div className="text-sm text-green-600 font-medium">{currentData.trend}</div>
            </div>
            <div className="space-y-3">
              {currentData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className="font-medium text-gray-900">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full">
      <div 
        className="relative w-80 h-[600px] bg-black rounded-[40px] p-2 shadow-2xl transform perspective-1000 hover:scale-105 transition-all duration-500"
        style={{
          transform: 'perspective(1000px) rotateX(5deg) rotateY(-15deg)',
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
        }}
      >
        {/* iPhone Screen */}
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
          {/* Screen indicator dots */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentScreen 
                    ? 'bg-purple-600' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Screen Content */}
          <div className="pt-8 h-full transition-opacity duration-500">
            {renderScreen()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
