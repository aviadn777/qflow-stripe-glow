
import React from 'react';

interface JoyfulLoadingStatesProps {
  currentLanguage: 'hebrew' | 'english';
}

const JoyfulLoadingStates: React.FC<JoyfulLoadingStatesProps> = ({ currentLanguage }) => {
  const loadingMessages = {
    hebrew: [
      'מחפשים את המקום הכי יפה בשבילך...',
      'בודקים איזה סלון יעשה לך הכי שמח...',
      'מכינים רשימה מיוחדת רק בשבילך...'
    ],
    english: [
      'Finding the most beautiful place for you...',
      'Checking which salon will make you happiest...',
      'Preparing a special list just for you...'
    ]
  };

  const currentMessage = loadingMessages[currentLanguage][
    Math.floor(Math.random() * loadingMessages[currentLanguage].length)
  ];

  return (
    <>
      <style>{`
        @keyframes dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .dancing-tool {
          animation: dance 2s ease-in-out infinite;
        }
        
        .lipstick-progress {
          animation: progress 2s ease-in-out infinite;
        }
        
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <div className="text-center py-12" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        {/* Dancing Beauty Tools */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="dancing-tool text-3xl" style={{ animationDelay: '0s' }}>💄</div>
          <div className="dancing-tool text-3xl" style={{ animationDelay: '0.3s' }}>🖌️</div>
          <div className="dancing-tool text-3xl" style={{ animationDelay: '0.6s' }}>💅</div>
          <div className="dancing-tool text-3xl" style={{ animationDelay: '0.9s' }}>✂️</div>
        </div>

        {/* Progress Message */}
        <h3 className={`text-lg font-medium text-gray-900 mb-4 ${
          currentLanguage === 'hebrew' ? 'font-hebrew' : ''
        }`}>
          {currentMessage}
        </h3>

        {/* Lipstick Progress Bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full lipstick-progress"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center items-center gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#635bff] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JoyfulLoadingStates;
