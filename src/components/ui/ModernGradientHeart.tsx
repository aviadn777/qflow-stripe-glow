
import React from 'react';
import { cn } from "@/lib/utils";

interface ModernGradientHeartProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const ModernGradientHeart: React.FC<ModernGradientHeartProps> = ({ 
  size = 'md', 
  className,
  animated = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div 
      className={cn(
        "modern-gradient-heart relative inline-block",
        sizeClasses[size],
        animated && "animate-pulse",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 30%, #9c44dc 70%, #5f27cd 100%)',
        transform: 'rotate(-45deg)',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
      }}
    >
      <div 
        className="absolute w-full h-full rounded-full"
        style={{
          background: 'inherit',
          left: '50%',
          top: '0',
          transformOrigin: '0 100%',
          transform: 'rotate(-45deg)'
        }}
      />
      <div 
        className="absolute w-full h-full rounded-full"
        style={{
          background: 'inherit',
          left: '0',
          top: '-50%',
          transformOrigin: '100% 100%',
          transform: 'rotate(45deg)'
        }}
      />
    </div>
  );
};

export default ModernGradientHeart;
