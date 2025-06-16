
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import BusinessCard from '@/components/discovery/BusinessCard';
import SearchFiltersComponent from '@/components/discovery/SearchFilters';
import { useBusinessDiscovery } from '@/hooks/useBusinessDiscovery';
import { SearchFilters } from '@/types/business';
import ModernGradientHeart from '@/components/ui/ModernGradientHeart';

interface DiscoverSalonsProps {
  currentLanguage?: 'hebrew' | 'english';
}

const DiscoverSalons: React.FC<DiscoverSalonsProps> = ({ currentLanguage = 'hebrew' }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: ['All'],
    business_type: 'all',
    price_range: [30, 300],
    rating: 4.0,
    availability: 'any'
  });

  const { data: businesses, isLoading, error } = useBusinessDiscovery(filters);

  const filteredBusinesses = businesses?.filter(business => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (currentLanguage === 'hebrew' ? business.name_he : business.name).toLowerCase();
    const city = business.city.toLowerCase();
    return name.includes(query) || city.includes(query);
  }) || [];

  const handleBookNow = (businessId: string) => {
    navigate(`/business/${businessId}/book`);
  };

  const handleViewProfile = (businessId: string) => {
    navigate(`/business/${businessId}`);
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
    <div className="min-h-screen bg-gray-50" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ModernGradientHeart size="md" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
                {currentLanguage === 'hebrew' ? 'גלה סלונים בישראל' : 'Discover Salons in Israel'}
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-gray-200 hover:bg-gray-50"
            >
              {currentLanguage === 'hebrew' ? 'חזרה לבית' : 'Back to Home'}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={currentLanguage === 'hebrew' ? 'חפש לפי שם או עיר...' : 'Search by name or city...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-200 focus:border-[#635bff] focus:ring-[#635bff]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border-gray-200 hover:bg-gray-50"
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                language={currentLanguage}
              />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
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
            </div>

            {/* Business Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <ModernGradientHeart size="lg" className="mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {currentLanguage === 'hebrew' ? 'לא נמצאו תוצאות' : 'No results found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentLanguage === 'hebrew' 
                    ? 'נסה לשנות את הסינון או החיפוש'
                    : 'Try adjusting your filters or search terms'
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
                >
                  {currentLanguage === 'hebrew' ? 'נקה סינונים' : 'Clear Filters'}
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    language={currentLanguage}
                    onBookNow={handleBookNow}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSalons;
