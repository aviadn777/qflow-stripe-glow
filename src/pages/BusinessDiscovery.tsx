
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBusinessDiscovery } from '@/hooks/useBusinessDiscovery';
import { SearchFilters, Business as BusinessType } from '@/types/business';
import HeartfeltWelcomeHero from '@/components/discovery/HeartfeltWelcomeHero';
import SmartSearchExperience from '@/components/discovery/SmartSearchExperience';
import IntelligentMoodFilters from '@/components/discovery/IntelligentMoodFilters';
import MagicalBusinessCard from '@/components/discovery/MagicalBusinessCard';
import DiscoveryGameification from '@/components/discovery/DiscoveryGameification';
import JoyfulLoadingStates from '@/components/discovery/JoyfulLoadingStates';

interface BusinessDiscoveryProps {
  currentLanguage?: 'hebrew' | 'english';
}

// Extended business interface for discovery components
interface DiscoveryBusiness extends BusinessType {
  services_count: number;
  image_url?: string;
}

const BusinessDiscovery: React.FC<BusinessDiscoveryProps> = ({ 
  currentLanguage = 'hebrew' 
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hearts, setHearts] = useState(0);
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: ['All'],
    business_type: 'all',
    price_range: [30, 300],
    rating: 4.0,
    availability: 'any'
  });

  const { data: businesses, isLoading, error } = useBusinessDiscovery(filters);

  // Transform businesses to include services_count
  const discoveryBusinesses: DiscoveryBusiness[] = businesses?.map(business => ({
    ...business,
    services_count: business.services?.length || 0,
    image_url: business.photo_url
  })) || [];

  const filteredBusinesses = discoveryBusinesses.filter(business => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (currentLanguage === 'hebrew' ? business.name_he : business.name).toLowerCase();
    const city = business.city.toLowerCase();
    return name.includes(query) || city.includes(query);
  });

  const handleBookNow = (businessId: string) => {
    navigate(`/business/${businessId}/book`);
  };

  const handleViewProfile = (businessId: string) => {
    navigate(`/business/${businessId}`);
    setHearts(prev => prev + 5); // Reward for viewing full details
  };

  const handleAddHeart = (amount: number = 1) => {
    setHearts(prev => prev + amount);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {currentLanguage === 'hebrew' ? 'שגיאה בטעינת הנתונים' : 'Error loading data'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {currentLanguage === 'hebrew' ? 'נסה שוב' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInStaggered {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        {/* Heartfelt Welcome Hero */}
        <HeartfeltWelcomeHero currentLanguage={currentLanguage} />

        {/* Gamification Header */}
        <DiscoveryGameification hearts={hearts} currentLanguage={currentLanguage} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Smart Search Experience */}
          <SmartSearchExperience
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentLanguage={currentLanguage}
            onAddHeart={handleAddHeart}
          />

          <div className="flex gap-8 mt-8">
            {/* Intelligent Mood Filters */}
            {showFilters && (
              <div className="w-80 flex-shrink-0">
                <IntelligentMoodFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  currentLanguage={currentLanguage}
                  onAddHeart={handleAddHeart}
                />
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className={`text-xl font-semibold text-gray-900 ${
                    currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                  }`}>
                    {isLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      `${filteredBusinesses.length} ${
                        currentLanguage === 'hebrew' ? 'עסקים נמצאו' : 'businesses found'
                      }`
                    )}
                  </h2>
                  {filteredBusinesses.length > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {currentLanguage === 'hebrew' ? 'זמין לתיאום' : 'Available for booking'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-6 py-3 border-gray-200 hover:bg-gray-50 ${
                      currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                    }`}
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    {currentLanguage === 'hebrew' ? 'מסננים' : 'Filters'}
                  </Button>
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Business Grid */}
              {isLoading ? (
                <JoyfulLoadingStates currentLanguage={currentLanguage} />
              ) : filteredBusinesses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <div className="text-6xl mb-4">💄</div>
                  </div>
                  <h3 className={`text-lg font-medium text-gray-900 mb-2 ${
                    currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                  }`}>
                    {currentLanguage === 'hebrew' ? 'לא מצאנו בדיוק מה שחיפשת, אבל יש לנו רעיונות אחרים ❤️' : 'We didn\'t find exactly what you were looking for, but we have other ideas ❤️'}
                  </h3>
                  <p className={`text-gray-600 mb-4 ${
                    currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                  }`}>
                    {currentLanguage === 'hebrew' 
                      ? 'חזרי מתי שתרצי, אנחנו תמיד כאן 🌟'
                      : 'Come back whenever you want, we\'re always here 🌟'
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        location: ['All'],
                        business_type: 'all',
                        price_range: [30, 300],
                        rating: 4.0,
                        availability: 'any'
                      });
                      setSearchQuery('');
                    }}
                    className={currentLanguage === 'hebrew' ? 'font-hebrew' : ''}
                  >
                    {currentLanguage === 'hebrew' ? 'נקה סינונים' : 'Clear Filters'}
                  </Button>
                </div>
              ) : (
                <div 
                  className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}
                  style={{
                    animation: 'fadeInStaggered 0.6s ease-out'
                  }}
                >
                  {filteredBusinesses.map((business, index) => (
                    <MagicalBusinessCard
                      key={business.id}
                      business={business}
                      currentLanguage={currentLanguage}
                      onBookNow={handleBookNow}
                      onViewProfile={handleViewProfile}
                      onAddHeart={handleAddHeart}
                      animationDelay={index * 0.1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDiscovery;
