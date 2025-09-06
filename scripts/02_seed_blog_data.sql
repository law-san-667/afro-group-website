-- Seed initial blog categories for AFRO Group
INSERT INTO blog_categories (name_fr, name_en, slug, description_fr, description_en, color) VALUES
('Innovation Financière', 'Financial Innovation', 'financial-innovation', 
 'Articles sur les dernières innovations dans le secteur financier africain', 
 'Articles about the latest innovations in African financial sector', '#10493F'),

('Éducation Financière', 'Financial Education', 'financial-education',
 'Conseils et guides pour améliorer la littératie financière',
 'Tips and guides to improve financial literacy', '#2D6A4F'),

('Technologie', 'Technology', 'technology',
 'Actualités et tendances technologiques en Afrique',
 'Technology news and trends in Africa', '#154360'),

('Transformation Digitale', 'Digital Transformation', 'digital-transformation',
 'Guides et stratégies pour la transformation digitale des entreprises',
 'Guides and strategies for business digital transformation', '#1A5276'),

('Actualités AFRO Group', 'AFRO Group News', 'afro-group-news',
 'Nouvelles et mises à jour de notre entreprise',
 'Company news and updates', '#D97706');

-- Seed initial blog tags
INSERT INTO blog_tags (name_fr, name_en, slug) VALUES
('FinTech', 'FinTech', 'fintech'),
('Blockchain', 'Blockchain', 'blockchain'),
('Intelligence Artificielle', 'Artificial Intelligence', 'ai'),
('Mobile Banking', 'Mobile Banking', 'mobile-banking'),
('Inclusion Financière', 'Financial Inclusion', 'financial-inclusion'),
('Startup', 'Startup', 'startup'),
('Investissement', 'Investment', 'investment'),
('Crypto-monnaies', 'Cryptocurrency', 'cryptocurrency'),
('Paiements Digitaux', 'Digital Payments', 'digital-payments'),
('Banque Digitale', 'Digital Banking', 'digital-banking');

-- Seed sample blog posts
INSERT INTO blog_posts (
  slug, 
  title_fr, 
  title_en, 
  excerpt_fr, 
  excerpt_en,
  content_fr, 
  content_en,
  meta_description_fr,
  meta_description_en,
  featured_image_url,
  author_name,
  status,
  featured,
  published_at
) VALUES
(
  'avenir-fintech-afrique-2024',
  'L''avenir de la FinTech en Afrique : Tendances 2024',
  'The Future of FinTech in Africa: 2024 Trends',
  'Découvrez les principales tendances qui façonnent l''écosystème FinTech africain en 2024.',
  'Discover the key trends shaping the African FinTech ecosystem in 2024.',
  'L''Afrique connaît une révolution FinTech sans précédent. En 2024, plusieurs tendances émergent qui transforment le paysage financier du continent...',
  'Africa is experiencing an unprecedented FinTech revolution. In 2024, several emerging trends are transforming the continent''s financial landscape...',
  'Analyse des tendances FinTech en Afrique pour 2024 - Innovation financière et inclusion',
  'Analysis of FinTech trends in Africa for 2024 - Financial innovation and inclusion',
  '/placeholder.svg?height=400&width=800',
  'AFRO Group',
  'published',
  true,
  NOW() - INTERVAL '2 days'
),
(
  'education-financiere-digitale-impact',
  'L''impact de l''éducation financière digitale sur l''inclusion',
  'The Impact of Digital Financial Education on Inclusion',
  'Comment les plateformes d''éducation financière digitale transforment l''accès aux services financiers.',
  'How digital financial education platforms are transforming access to financial services.',
  'L''éducation financière digitale représente un levier majeur pour l''inclusion financière en Afrique...',
  'Digital financial education represents a major lever for financial inclusion in Africa...',
  'Impact de l''éducation financière digitale sur l''inclusion financière en Afrique',
  'Impact of digital financial education on financial inclusion in Africa',
  '/placeholder.svg?height=400&width=800',
  'AFRO Group',
  'published',
  false,
  NOW() - INTERVAL '5 days'
),
(
  'transformation-digitale-entreprises-africaines',
  'Guide de transformation digitale pour les entreprises africaines',
  'Digital Transformation Guide for African Businesses',
  'Un guide complet pour accompagner les entreprises africaines dans leur transformation digitale.',
  'A comprehensive guide to support African businesses in their digital transformation.',
  'La transformation digitale n''est plus une option mais une nécessité pour les entreprises africaines...',
  'Digital transformation is no longer an option but a necessity for African businesses...',
  'Guide complet de transformation digitale pour les entreprises en Afrique',
  'Complete digital transformation guide for businesses in Africa',
  '/placeholder.svg?height=400&width=800',
  'AFRO Group',
  'published',
  false,
  NOW() - INTERVAL '1 week'
);

-- Link posts to categories
INSERT INTO blog_post_categories (post_id, category_id)
SELECT 
  bp.id,
  bc.id
FROM blog_posts bp, blog_categories bc
WHERE 
  (bp.slug = 'avenir-fintech-afrique-2024' AND bc.slug = 'financial-innovation') OR
  (bp.slug = 'education-financiere-digitale-impact' AND bc.slug = 'financial-education') OR
  (bp.slug = 'transformation-digitale-entreprises-africaines' AND bc.slug = 'digital-transformation');

-- Link posts to tags
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT 
  bp.id,
  bt.id
FROM blog_posts bp, blog_tags bt
WHERE 
  (bp.slug = 'avenir-fintech-afrique-2024' AND bt.slug IN ('fintech', 'financial-inclusion')) OR
  (bp.slug = 'education-financiere-digitale-impact' AND bt.slug IN ('fintech', 'mobile-banking', 'financial-inclusion')) OR
  (bp.slug = 'transformation-digitale-entreprises-africaines' AND bt.slug IN ('startup', 'digital-payments'));
