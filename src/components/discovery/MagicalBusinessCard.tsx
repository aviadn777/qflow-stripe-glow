
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Star, Clock } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  name_he: string;
  city: string;
  rating: number;
  services_count: number;
  price_range: [number, number];
  image_url?: string;
}

interface MagicalBusinessCardProps {
  business: Business;
  currentLanguage: 'hebrew' | 'english';
  onBookNow: (businessId: string) => void;
  onViewProfile: (businessId: string) => void;
  onAddHeart: (amount: number) => void;
  animationDelay?: number;
}

const MagicalBusinessCard: React.FC<MagicalBusinessCardProps> = ({
  business,
  currentLanguage,
  onBookNow,
  onViewProfile,
  onAddHeart,
  animationDelay = 0
}) => {
  const displayName = currentLanguage === 'hebrew' ? business.name_he : business.name;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-entrance {
          animation: slideUp 0.6s ease-out;
          animation-delay: ${animationDelay}s;
          animation-fill-mode: both;
        }
        
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <Card 
        className="card-entrance overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
      >
        {/* Business Image */}
        <div className="relative h-48 bg-gradient-to-br from-[#635bff]/10 to-[#0570de]/10 overflow-hidden">
          {business.image_url ? (
            <img 
              src={business.image_url} 
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#635bff] to-[#0570de]">
              <div className="text-white text-4xl">💄</div>
            </div>
          )}
          
          {/* Floating Heart Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={() => onAddHeart(1)}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </Button>

          {/* Live Status Badge */}
          <Badge className="absolute bottom-3 left-3 bg-green-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            {currentLanguage === 'hebrew' ? 'פתוח עכשיו' : 'Open Now'}
          </Badge>
        </div>

        {/* Business Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-semibold text-gray-900 ${
              currentLanguage === 'hebrew' ? 'font-hebrew' : ''
            }`}>
              {displayName}
            </h3>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{business.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className={`text-sm text-gray-600 ${
              currentLanguage === 'hebrew' ? 'font-hebrew' : ''
            }`}>
              {business.city}
            </span>
          </div>

          {/* Services and Price */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className={currentLanguage === 'hebrew' ? 'font-hebrew' : ''}>
              {business.services_count} {currentLanguage === 'hebrew' ? 'שירותים' : 'services'}
            </Badge>
            
            <span className="text-sm font-medium text-[#635bff]">
              ₪{business.price_range[0]}-₪{business.price_range[1]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(business.id)}
              className={`flex-1 ${currentLanguage === 'hebrew' ? 'font-hebrew' : ''}`}
            >
              {currentLanguage === 'hebrew' ? 'צפה בפרופיל' : 'View Profile'}
            </Button>
            
            <Button
              size="sm"
              onClick={() => onBookNow(business.id)}
              className={`flex-1 bg-[#635bff] hover:bg-[#5248ff] ${
                currentLanguage === 'hebrew' ? 'font-hebrew' : ''
              }`}
            >
              {currentLanguage === 'hebrew' ? 'קבע תור' : 'Book Now'}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MagicalBusinessCard;
