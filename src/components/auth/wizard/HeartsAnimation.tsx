
import React, { useEffect, useState } from 'react';

const HeartsAnimation: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating hearts
    const heartElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    
    setHearts(heartElements);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Burst Hearts */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="burst-hearts text-6xl">❤️</div>
      </div>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute success-hearts text-2xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`
          }}
        >
          ❤️
        </div>
      ))}

      {/* Sparkle Elements */}
      <div className="absolute top-1/4 left-1/4 sparkle-elements text-xl">✨</div>
      <div className="absolute top-3/4 right-1/4 sparkle-elements text-xl" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-1/2 left-3/4 sparkle-elements text-xl" style={{ animationDelay: '2s' }}>✨</div>

      <style jsx>{`
        @keyframes floatingHearts {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes heartsBurst {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .success-hearts {
          animation: floatingHearts 3s ease-in-out infinite;
        }

        .burst-hearts {
          animation: heartsBurst 0.8s ease-out;
        }

        .sparkle-elements {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeartsAnimation;
