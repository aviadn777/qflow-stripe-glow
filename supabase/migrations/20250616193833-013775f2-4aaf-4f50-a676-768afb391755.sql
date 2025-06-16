
-- Insert 3 Israeli businesses with complete data
INSERT INTO businesses (
  name,
  name_he,
  type,
  city,
  address,
  phone,
  description,
  description_he,
  opening_hours,
  services_offered,
  staff_count,
  monthly_revenue_target,
  is_verified,
  setup_completed,
  subscription_status
) VALUES 
(
  'Maya''s Hair Studio',
  'מספרת מיה',
  'hair_salon',
  'Tel Aviv',
  '123 Dizengoff Street, Tel Aviv',
  '050-123-4567',
  'Premium hair salon in the heart of Tel Aviv. Specializing in modern cuts, styling, and hair treatments for men and women.',
  'מספרה פרימיום בלב תל אביב. מתמחים בתספורות מודרניות, עיצוב ושיקום שיער לגברים ונשים.',
  '{"sunday": "09:00-19:00", "monday": "09:00-19:00", "tuesday": "09:00-19:00", "wednesday": "09:00-19:00", "thursday": "09:00-19:00", "friday": "09:00-14:00", "saturday": "closed"}',
  ARRAY['Hair Cutting', 'Hair Styling', 'Hair Coloring', 'Hair Treatment'],
  3,
  15000,
  true,
  true,
  'active'
),
(
  'Rachel''s Beauty Center',
  'מרכז יופי רחל',
  'beauty_salon',
  'Jerusalem',
  '45 King George Street, Jerusalem',
  '052-987-6543',
  'Full-service beauty center offering facial treatments, massages, and wellness services in the heart of Jerusalem.',
  'מרכז יופי שלם המציע טיפולי פנים, עיסויים ושירותי בריאות בלב ירושלים.',
  '{"sunday": "08:00-18:00", "monday": "08:00-18:00", "tuesday": "08:00-18:00", "wednesday": "08:00-18:00", "thursday": "08:00-18:00", "friday": "08:00-13:00", "saturday": "closed"}',
  ARRAY['Facial Treatment', 'Massage Therapy', 'Beauty Treatments', 'Wellness'],
  2,
  12000,
  true,
  true,
  'active'
),
(
  'Beautiful Nails',
  'ציפורניים יפות',
  'nail_studio',
  'Haifa',
  '78 Herzl Street, Haifa',
  '054-456-7890',
  'Professional nail studio specializing in manicures, pedicures, and creative nail art in Haifa.',
  'סטודיו ציפורניים מקצועי המתמחה במניקור, פדיקור ואמנות ציפורניים יצירתית בחיפה.',
  '{"sunday": "10:00-20:00", "monday": "10:00-20:00", "tuesday": "10:00-20:00", "wednesday": "10:00-20:00", "thursday": "10:00-20:00", "friday": "10:00-15:00", "saturday": "closed"}',
  ARRAY['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish'],
  2,
  8000,
  true,
  true,
  'active'
);

-- Insert services for Maya's Hair Studio
INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Men''s Haircut',
  'תספורת גברים',
  'Professional men''s haircut with styling',
  'תספורת גברים מקצועית עם עיצוב',
  45,
  80,
  'hair'
FROM businesses b WHERE b.name = 'Maya''s Hair Studio';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Women''s Cut & Style',
  'תספורת ועיצוב נשים',
  'Complete haircut and styling service',
  'שירות תספורת ועיצוב מלא',
  90,
  150,
  'hair'
FROM businesses b WHERE b.name = 'Maya''s Hair Studio';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Hair Coloring',
  'צביעת שיער',
  'Professional hair coloring and highlights',
  'צביעת שיער מקצועית והבהרות',
  120,
  200,
  'hair'
FROM businesses b WHERE b.name = 'Maya''s Hair Studio';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Hair Treatment',
  'טיפול שיער',
  'Deep conditioning and hair repair treatment',
  'טיפול מזין ומשקם לשיער',
  60,
  120,
  'hair'
FROM businesses b WHERE b.name = 'Maya''s Hair Studio';

-- Insert services for Rachel's Beauty Center (using 'beauty' category)
INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Deep Cleansing Facial',
  'טיפול פנים עמוק',
  'Comprehensive facial treatment with deep cleansing',
  'טיפול פנים מקיף עם ניקוי עמוק',
  60,
  120,
  'beauty'
FROM businesses b WHERE b.name = 'Rachel''s Beauty Center';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Relaxation Massage',
  'עיסוי רגיעה',
  'Full body relaxation massage therapy',
  'עיסוי רגיעה לכל הגוף',
  90,
  180,
  'beauty'
FROM businesses b WHERE b.name = 'Rachel''s Beauty Center';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Anti-Aging Facial',
  'טיפול פנים אנטי אייג׳ינג',
  'Advanced anti-aging facial treatment',
  'טיפול פנים מתקדם נגד הזדקנות',
  75,
  160,
  'beauty'
FROM businesses b WHERE b.name = 'Rachel''s Beauty Center';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Aromatherapy Massage',
  'עיסוי ארומתרפיה',
  'Therapeutic massage with essential oils',
  'עיסוי טיפולי עם שמנים אתריים',
  75,
  200,
  'beauty'
FROM businesses b WHERE b.name = 'Rachel''s Beauty Center';

-- Insert services for Beautiful Nails
INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Classic Manicure',
  'מניקור קלאסי',
  'Professional manicure with polish',
  'מניקור מקצועי עם לק',
  45,
  60,
  'nails'
FROM businesses b WHERE b.name = 'Beautiful Nails';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Gel Manicure',
  'מניקור ג׳ל',
  'Long-lasting gel manicure treatment',
  'טיפול מניקור ג׳ל עמיד',
  60,
  90,
  'nails'
FROM businesses b WHERE b.name = 'Beautiful Nails';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Pedicure',
  'פדיקור',
  'Complete pedicure with foot massage',
  'פדיקור מלא עם עיסוי כפות רגליים',
  60,
  80,
  'nails'
FROM businesses b WHERE b.name = 'Beautiful Nails';

INSERT INTO services (business_id, name, name_he, description, description_he, duration, price, category)
SELECT 
  b.id,
  'Nail Art',
  'אמנות ציפורניים',
  'Creative nail art and design',
  'אמנות ועיצוב ציפורניים יצירתי',
  30,
  40,
  'nails'
FROM businesses b WHERE b.name = 'Beautiful Nails';
