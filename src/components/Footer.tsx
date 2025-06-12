
import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  currentLanguage: 'hebrew' | 'english';
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const content = {
    hebrew: {
      brandMessage: 'פותח באהבה בישראל לסלונים ישראליים ❤️',
      quickLinks: {
        title: 'קישורים מהירים',
        items: ['דף הבית', 'תמחור', 'עזרה', 'צור קשר']
      },
      legal: {
        title: 'משפטי',
        items: ['תנאי שימוש', 'פרטיות', 'עוגיות']
      },
      support: {
        title: 'תמיכה',
        items: ['תמיכה טכנית', 'מצב מערכת', 'מדריכים']
      },
      copyright: '© 2025 QFLOW ❤️ כל הזכויות שמורות'
    },
    english: {
      brandMessage: 'Made with love in Israel for Israeli salons ❤️',
      quickLinks: {
        title: 'Quick Links',
        items: ['Home', 'Pricing', 'Help', 'Contact']
      },
      legal: {
        title: 'Legal',
        items: ['Terms', 'Privacy', 'Cookies']
      },
      support: {
        title: 'Support',
        items: ['Technical Support', 'Status', 'Guides']
      },
      copyright: '© 2025 QFLOW ❤️ All rights reserved'
    }
  };

  const currentContent = content[currentLanguage];

  return (
    <footer 
      className="py-16 mt-20"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className={`flex items-center mb-4 ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : ''}`}>
              <span className="text-2xl font-bold text-purple-400">Q</span>
              <div className="relative">
                <span className="text-2xl font-bold text-purple-400">FLOW</span>
                <Heart className="absolute -top-1 -right-6 w-4 h-4 text-red-500" fill="currentColor" />
              </div>
            </div>
            <p 
              className="text-gray-300 max-w-md leading-relaxed"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
              dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
            >
              {currentContent.brandMessage}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-white font-semibold mb-4"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {currentContent.quickLinks.title}
            </h4>
            <ul className="space-y-3">
              {currentContent.quickLinks.items.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 
              className="text-white font-semibold mb-4"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {currentContent.support.title}
            </h4>
            <ul className="space-y-3">
              {currentContent.support.items.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p 
            className="text-gray-400"
            style={{
              fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
            }}
          >
            {currentContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
