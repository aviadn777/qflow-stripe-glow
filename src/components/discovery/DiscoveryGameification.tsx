
import React from 'react';
import { Heart, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DiscoveryGameificationProps {
  hearts: number;
  currentLanguage: 'hebrew' | 'english';
}

const DiscoveryGameification: React.FC<DiscoveryGameificationProps> = ({
  hearts,
  currentLanguage
}) => {
  const achievements = [
    {
      id: 'explorer',
      threshold: 5,
      icon: '🔍',
      name: currentLanguage === 'hebrew' ? 'מגלת סלונים' : 'Salon Explorer',
      description: currentLanguage === 'hebrew' ? 'צפיתי ב-5 עסקים' : 'Viewed 5 businesses'
    },
    {
      id: 'expert',
      threshold: 15,
      icon: '👑',
      name: currentLanguage === 'hebrew' ? 'מומחית יופי' : 'Beauty Expert',
      description: currentLanguage === 'hebrew' ? 'צברתי 15 לבבות' : 'Collected 15 hearts'
    },
    {
      id: 'loyal',
      threshold: 25,
      icon: '⭐',
      name: currentLanguage === 'hebrew' ? 'לקוחה נאמנה' : 'Loyal Customer',
      description: currentLanguage === 'hebrew' ? 'צברתי 25 לבבות' : 'Collected 25 hearts'
    }
  ];

  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .heart-pulse {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <div className="bg-white border-b border-gray-100 py-4" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Hearts Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 heart-pulse" fill="currentColor" />
                <span className={`text-xl font-bold text-gray-900 ${
                  currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                }`}>
                  {hearts}
                </span>
              </div>
              
              <div className={`text-sm text-gray-600 ${
                currentLanguage === 'hebrew' ? 'font-hebrew' : ''
              }`}>
                {currentLanguage === 'hebrew' ? 'לבבות' : 'Hearts'}
              </div>
            </div>

            {/* Achievements */}
            <div className="flex items-center gap-2">
              {achievements.map((achievement) => {
                const isUnlocked = hearts >= achievement.threshold;
                return (
                  <Badge
                    key={achievement.id}
                    variant={isUnlocked ? "default" : "outline"}
                    className={`text-xs ${
                      isUnlocked 
                        ? 'bg-[#635bff] text-white' 
                        : 'text-gray-400 border-gray-200'
                    } ${currentLanguage === 'hebrew' ? 'font-hebrew' : ''}`}
                    title={achievement.description}
                  >
                    <span className="mr-1">{achievement.icon}</span>
                    {achievement.name}
                  </Badge>
                );
              })}
            </div>

            {/* Progress to Next Achievement */}
            <div className={`text-sm text-gray-500 ${
              currentLanguage === 'hebrew' ? 'font-hebrew' : ''
            }`}>
              {(() => {
                const nextAchievement = achievements.find(a => hearts < a.threshold);
                if (nextAchievement) {
                  const remaining = nextAchievement.threshold - hearts;
                  return currentLanguage === 'hebrew' 
                    ? `עוד ${remaining} לבבות להישג הבא`
                    : `${remaining} hearts to next achievement`;
                }
                return currentLanguage === 'hebrew' ? 'כל הישגי!' : 'All achievements unlocked!';
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoveryGameification;
