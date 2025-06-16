
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { SearchFilters } from '@/types/business';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  language: 'hebrew' | 'english';
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  language
}) => {
  const cities = language === 'hebrew' 
    ? ['הכל', 'תל אביב', 'ירושלים', 'חיפה']
    : ['All', 'Tel Aviv', 'Jerusalem', 'Haifa'];

  const businessTypes = [
    { value: 'all', label: language === 'hebrew' ? 'כל הסוגים' : 'All Types' },
    { value: 'hair_salon', label: language === 'hebrew' ? 'מספרות' : 'Hair Salons' },
    { value: 'beauty_salon', label: language === 'hebrew' ? 'מכוני יופי' : 'Beauty Centers' },
    { value: 'nail_studio', label: language === 'hebrew' ? 'סטודיו ציפורניים' : 'Nail Studios' }
  ];

  const availabilityOptions = [
    { value: 'any', label: language === 'hebrew' ? 'בכל זמן' : 'Any Time' },
    { value: 'today', label: language === 'hebrew' ? 'היום' : 'Today' },
    { value: 'this_week', label: language === 'hebrew' ? 'השבוע' : 'This Week' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6" dir={language === 'hebrew' ? 'rtl' : 'ltr'}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {language === 'hebrew' ? 'סינון תוצאות' : 'Filter Results'}
      </h3>

      {/* Location Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {language === 'hebrew' ? 'מיקום' : 'Location'}
        </label>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => {
            const isSelected = city === 'הכל' || city === 'All' 
              ? filters.location.includes('All') || filters.location.length === 0
              : filters.location.includes(city);
            
            return (
              <Button
                key={city}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  if (city === 'הכל' || city === 'All') {
                    onFiltersChange({ ...filters, location: ['All'] });
                  } else {
                    const newLocation = isSelected
                      ? filters.location.filter(l => l !== city)
                      : [...filters.location.filter(l => l !== 'All'), city];
                    onFiltersChange({ ...filters, location: newLocation });
                  }
                }}
                className={isSelected ? 'bg-[#635bff] hover:bg-[#5a52e8]' : ''}
              >
                {city}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Business Type Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {language === 'hebrew' ? 'סוג עסק' : 'Business Type'}
        </label>
        <div className="space-y-2">
          {businessTypes.map((type) => (
            <Button
              key={type.value}
              variant={filters.business_type === type.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, business_type: type.value })}
              className={`w-full justify-start ${
                filters.business_type === type.value ? 'bg-[#635bff] hover:bg-[#5a52e8]' : ''
              }`}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {language === 'hebrew' ? 'טווח מחירים' : 'Price Range'}
        </label>
        <div className="px-2">
          <Slider
            value={filters.price_range}
            onValueChange={(value) => onFiltersChange({ ...filters, price_range: value as [number, number] })}
            max={300}
            min={30}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₪{filters.price_range[0]}</span>
            <span>₪{filters.price_range[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {language === 'hebrew' ? 'דירוג מינימלי' : 'Minimum Rating'}
        </label>
        <div className="flex gap-2">
          {[4.0, 4.5, 4.8].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, rating })}
              className={filters.rating === rating ? 'bg-[#635bff] hover:bg-[#5a52e8]' : ''}
            >
              {rating}+ ⭐
            </Button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {language === 'hebrew' ? 'זמינות' : 'Availability'}
        </label>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.availability === option.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, availability: option.value as any })}
              className={`w-full justify-start ${
                filters.availability === option.value ? 'bg-[#635bff] hover:bg-[#5a52e8]' : ''
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
