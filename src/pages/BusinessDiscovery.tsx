
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartfeltWelcomeHero from '@/components/discovery/HeartfeltWelcomeHero';
import SmartSearchExperience from '@/components/discovery/SmartSearchExperience';
import IntelligentMoodFilters from '@/components/discovery/IntelligentMoodFilters';
import MagicalBusinessCard from '@/components/discovery/MagicalBusinessCard';
import DiscoveryGameification from '@/components/discovery/DiscoveryGameification';
import JoyfulLoadingStates from '@/components/discovery/JoyfulLoadingStates';
import { useBusinessDiscovery } from '@/hooks/useBusinessDiscovery';
import { SearchFilters, Business } from '@/types/business';

interface BusinessDiscoveryProps {
  currentLanguage?: 'hebrew' | 'english';
}

const BusinessDiscovery: React.FC<BusinessDiscoveryProps> = ({ 
  currentLanguage = 'hebrew' 
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hearts, setHearts] = useState(0);
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: ['All'],
    business_type: 'all',
    price_range: [30, 500],
    rating: 4.0,
    availability: 'any'
  });

  const { data: businesses, isLoading, error } = useBusinessDiscovery(filters);

  const handleAddHeart = (amount: number) => {
    setHearts(prev => prev + amount);
  };

  const handleBookNow = (businessId: string) => {
    navigate(`/business/${businessId}/book`);
  };

  const handleViewProfile = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  const filteredBusinesses = businesses?.filter(business => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (currentLanguage === 'hebrew' ? business.name_he : business.name).toLowerCase();
    const city = business.city.toLowerCase();
    return name.includes(query) || city.includes(query);
  }) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {currentLanguage === 'hebrew' ? 'שגיאה בטעינת הנתונים' : 'Error loading data'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .font-hebrew {
          font-family: "Noto Sans Hebrew", system-ui;
        }
        
        .discovery-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }
        
        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .discovery-grid {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        @media (max-width: 1024px) {
          .discovery-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .business-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .business-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="discovery-container" dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}>
        <DiscoveryGameification 
          hearts={hearts}
          currentLanguage={currentLanguage}
        />
        
        <div className="content-wrapper">
          <HeartfeltWelcomeHero 
            currentLanguage={currentLanguage}
            onAddHeart={handleAddHeart}
          />
          
          <SmartSearchExperience
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentLanguage={currentLanguage}
            onAddHeart={handleAddHeart}
          />
          
          <div className="discovery-grid">
            <div className="filters-sidebar">
              <IntelligentMoodFilters
                filters={filters}
                onFiltersChange={setFilters}
                currentLanguage={currentLanguage}
                onAddHeart={handleAddHeart}
              />
            </div>
            
            <div className="main-content">
              {isLoading ? (
                <JoyfulLoadingStates currentLanguage={currentLanguage} />
              ) : filteredBusinesses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className={`text-xl font-semibold text-gray-700 mb-2 ${
                    currentLanguage === 'hebrew' ? 'font-hebrew' : ''
                  }`}>
                    {currentLanguage === 'hebrew' ? 'לא נמצאו תוצאות' : 'No results found'}
                  </h3>
                  <p className={`text-gray-500 ${currentLanguage === 'hebrew' ? 'font-hebrew' : ''}`}>
                    {currentLanguage === 'hebrew' 
                      ? 'נסי לשנות את הסינון או החיפוש'
                      : 'Try adjusting your filters or search terms'
                    }
                  </p>
                </div>
              ) : (
                <div className="business-cards-grid">
                  {filteredBusinesses.map((business, index) => {
                    // Transform the business to match MagicalBusinessCard interface
                    const transformedBusiness = {
                      id: business.id,
                      name: business.name,
                      name_he: business.name_he,
                      city: business.city,
                      rating: business.rating,
                      services_count: business.services_count || business.services_offered?.length || 0,
                      price_range: [50, 200] as [number, number], // Convert string to range for card
                      image_url: business.photo_url
                    };
                    
                    return (
                      <MagicalBusinessCard
                        key={business.id}
                        business={transformedBusiness}
                        currentLanguage={currentLanguage}
                        onBookNow={handleBookNow}
                        onViewProfile={handleViewProfile}
                        onAddHeart={handleAddHeart}
                        animationDelay={index * 0.1}
                      />
                    );
                  })}
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
