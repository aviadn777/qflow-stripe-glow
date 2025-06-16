
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
  language: 'hebrew' | 'english';
  onBookNow: (businessId: string) => void;
  onViewProfile: (businessId: string) => void;
}

const getBusinessTypeName = (type: string, language: 'hebrew' | 'english') => {
  const names = {
    hair_salon: { hebrew: 'מספרה', english: 'Hair Salon' },
    beauty_salon: { hebrew: 'מכון יופי', english: 'Beauty Center' },
    nail_studio: { hebrew: 'סטודיו ציפורניים', english: 'Nail Studio' }
  };
  return names[type as keyof typeof names]?.[language] || type;
};

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  language,
  onBookNow,
  onViewProfile
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Hero Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={business.photo_url} 
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {business.is_available_today && (
          <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white border-0">
            {language === 'hebrew' ? 'זמין היום' : 'Available Today'}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Business Info */}
      <div className="p-6" dir={language === 'hebrew' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {language === 'hebrew' ? business.name_he : business.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{business.rating}</span>
            <span className="text-sm text-gray-500">({business.review_count})</span>
          </div>
        </div>

        {/* Location & Type */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{business.city}</span>
          <Badge variant="secondary" className="text-xs">
            {getBusinessTypeName(business.type, language)}
          </Badge>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-[#635bff]">{business.price_range}</span>
          <span className="text-sm text-gray-500">
            {language === 'hebrew' ? 'לשירות' : 'per service'}
          </span>
        </div>

        {/* Services Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services_offered.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {business.services_offered.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{business.services_offered.length - 3} {language === 'hebrew' ? 'עוד' : 'more'}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => onBookNow(business.id)}
            className="flex-1 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5a52e8] hover:to-[#0052cc] text-white border-0 font-medium"
          >
            {language === 'hebrew' ? 'הזמן תור' : 'Book Now'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onViewProfile(business.id)}
            className="flex-1 border-gray-200 hover:bg-gray-50"
          >
            {language === 'hebrew' ? 'צפה בפרופיל' : 'View Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
