
export interface Business {
  id: string;
  name: string;
  name_he: string;
  type: 'hair_salon' | 'beauty_salon' | 'nail_studio';
  city: string;
  address: string;
  phone: string;
  description: string;
  description_he: string;
  services_offered: string[];
  staff_count: number;
  opening_hours: Record<string, string>;
  // Computed fields
  rating: number;
  review_count: number;
  price_range: string;
  photo_url: string;
  is_available_today: boolean;
  services?: Service[];
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  name_he: string;
  description: string;
  description_he: string;
  duration: number;
  price: number;
  category: string;
  is_active: boolean;
}

export interface SearchFilters {
  location: string[];
  business_type: string;
  price_range: [number, number];
  rating: number;
  availability: 'today' | 'this_week' | 'any';
}
