
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { SearchFilters } from '@/types/business';

interface IntelligentMoodFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  currentLanguage: 'hebrew' | 'english';
  onAddHeart: (amount: number) => void;
}

const IntelligentMoodFilters: React.FC<IntelligentMoodFiltersProps> = ({
  filters,
  onFiltersChange,
  currentLanguage,
  onAddHeart
}) => {
  const moods = {
    hebrew: [
      { emoji: '😊', text: 'רוצה לחייך יותר', type: 'hair_salon' },
      { emoji: '💆‍♀️', text: 'צריכה להירגע', type: 'beauty_salon' },
      { emoji: '✨', text: 'רוצה להזריח', type: 'beauty_salon' },
      { emoji: '💅', text: 'זמן לפרטים הקטנים', type: 'nail_studio' }
    ],
    english: [
      { emoji: '😊', text: 'Want to smile more', type: 'hair_salon' },
      { emoji: '💆‍♀️', text: 'Need to relax', type: 'beauty_salon' },
      { emoji: '✨', text: 'Want to shine', type: 'beauty_salon' },
      { emoji: '💅', text: 'Time for small details', type: 'nail_studio' }
    ]
  };

  const occasions = {
    hebrew: [
      { emoji: '👰', text: 'חתונה/אירוע מיוחד' },
      { emoji: '📅', text: 'יום רגיל עם פינוק' },
      { emoji: '💼', text: 'ראיון עבודה חשוב' },
      { emoji: '🎉', text: 'חגיגה אישית' }
    ],
    english: [
      { emoji: '👰', text: 'Wedding/Special event' },
      { emoji: '📅', text: 'Regular day with pampering' },
      { emoji: '💼', text: 'Important job interview' },
      { emoji: '🎉', text: 'Personal celebration' }
    ]
  };

  const budgetRanges = {
    hebrew: [
      { emoji: '💝', text: 'מתנה לעצמי', range: [50, 100] as [number, number] },
      { emoji: '👑', text: 'אני שווה את זה', range: [100, 200] as [number, number] },
      { emoji: '✨', text: 'יום מיוחד', range: [200, 300] as [number, number] },
      { emoji: '🌟', text: 'פעם בחיים', range: [300, 500] as [number, number] }
    ],
    english: [
      { emoji: '💝', text: 'Gift to myself', range: [50, 100] as [number, number] },
      { emoji: '👑', text: 'I\'m worth it', range: [100, 200] as [number, number] },
      { emoji: '✨', text: 'Special day', range: [200, 300] as [number, number] },
      { emoji: '🌟', text: 'Once in a lifetime', range: [300, 500] as [number, number] }
    ]
  };

  const handleMoodClick = (mood: any) => {
    onFiltersChange({
      ...filters,
      business_type: mood.type
    });
    onAddHeart(2);
  };

  const handleBudgetClick = (budget: any) => {
    onFiltersChange({
      ...filters,
      price_range: budget.range
    });
    onAddHeart(1);
  };

  return (
    <>
      <style>{`
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <Card className="p-6 space-y-6" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        {/* Mood Section */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${
            currentLanguage === 'hebrew' ? 'font-hebrew text-right' : 'text-left'
          }`}>
            {currentLanguage === 'hebrew' ? 'איך את מרגישה היום?' : 'How are you feeling today?'}
          </h3>
          
          <div className="space-y-2">
            {moods[currentLanguage].map((mood, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`w-full p-3 cursor-pointer hover:bg-[#635bff] hover:text-white transition-all duration-200 justify-start ${
                  currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                }`}
                onClick={() => handleMoodClick(mood)}
              >
                <span className="mr-2">{mood.emoji}</span>
                {mood.text}
              </Badge>
            ))}
          </div>
        </div>

        {/* Occasion Section */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${
            currentLanguage === 'hebrew' ? 'font-hebrew text-right' : 'text-left'
          }`}>
            {currentLanguage === 'hebrew' ? 'לאיזה מטרה?' : 'For what occasion?'}
          </h3>
          
          <div className="space-y-2">
            {occasions[currentLanguage].map((occasion, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`w-full p-3 cursor-pointer hover:bg-[#635bff] hover:text-white transition-all duration-200 justify-start ${
                  currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                }`}
              >
                <span className="mr-2">{occasion.emoji}</span>
                {occasion.text}
              </Badge>
            ))}
          </div>
        </div>

        {/* Budget Section */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${
            currentLanguage === 'hebrew' ? 'font-hebrew text-right' : 'text-left'
          }`}>
            {currentLanguage === 'hebrew' ? 'תקציב' : 'Budget'}
          </h3>
          
          <div className="space-y-2">
            {budgetRanges[currentLanguage].map((budget, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`w-full p-3 cursor-pointer hover:bg-[#635bff] hover:text-white transition-all duration-200 justify-between ${
                  currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                }`}
                onClick={() => handleBudgetClick(budget)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{budget.emoji}</span>
                  {budget.text}
                </div>
                <span className="text-sm">
                  ₪{budget.range[0]}-₪{budget.range[1]}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range Slider */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${
            currentLanguage === 'hebrew' ? 'font-hebrew text-right' : 'text-left'
          }`}>
            {currentLanguage === 'hebrew' ? 'טווח מחירים' : 'Price Range'}
          </h3>
          
          <div className="px-3">
            <Slider
              value={filters.price_range}
              onValueChange={(value) => onFiltersChange({...filters, price_range: value as [number, number]})}
              max={500}
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
      </Card>
    </>
  );
};

export default IntelligentMoodFilters;
