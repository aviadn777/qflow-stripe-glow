
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Business, SearchFilters } from '@/types/business';

// Helper function to calculate price range from services
const calculatePriceRange = (services: any[]) => {
  if (!services || services.length === 0) return '₪50-₪100';
  
  const prices = services.map(s => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  
  return `₪${min}-₪${max}`;
};

// Helper function to get business photo based on type
const getBusinessPhoto = (type: string) => {
  const photos = {
    hair_salon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    beauty_salon: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    nail_studio: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  };
  return photos[type as keyof typeof photos] || photos.hair_salon;
};

export function useBusinessDiscovery(filters: SearchFilters) {
  return useQuery({
    queryKey: ['businesses', filters],
    queryFn: async () => {
      console.log('Fetching businesses with filters:', filters);
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          services (
            id,
            name,
            name_he,
            price,
            duration,
            category,
            description,
            description_he
          )
        `)
        .eq('is_verified', true)
        .in('subscription_status', ['active', 'trial']);

      // Apply location filter
      if (filters.location.length && !filters.location.includes('All')) {
        query = query.in('city', filters.location);
      }

      // Apply business type filter
      if (filters.business_type !== 'all') {
        query = query.eq('type', filters.business_type);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      console.log('Fetched businesses:', data);

      // Transform data with computed fields
      return data.map((business: any): Business => {
        const minPrice = business.services?.length ? Math.min(...business.services.map((s: any) => s.price)) : 50;
        const maxPrice = business.services?.length ? Math.max(...business.services.map((s: any) => s.price)) : 200;
        
        // Filter by price range
        if (minPrice > filters.price_range[1] || maxPrice < filters.price_range[0]) {
          return null;
        }

        const rating = 4.5 + Math.random() * 0.4; // Mock 4.5-4.9
        
        // Filter by rating
        if (rating < filters.rating) {
          return null;
        }

        return {
          ...business,
          rating: Number(rating.toFixed(1)),
          review_count: Math.floor(Math.random() * 100) + 50, // Mock 50-150
          price_range: calculatePriceRange(business.services),
          photo_url: getBusinessPhoto(business.type),
          is_available_today: Math.random() > 0.3 // 70% availability
        };
      }).filter(Boolean); // Remove null entries from filtering
    }
  });
}
