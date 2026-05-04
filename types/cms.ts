export type TemplateTier = 'silver' | 'gold' | 'platinum';
export type ProductCategory = 'foods' | 'wearables' | 'electronics' | 'woods' | 'furnitures' | 'computers' | 'mobiles';

export type TemplateId = 
  | 'minimal' 
  | 'bold' 
  | 'classic'
  | 'food-silver'
  | 'food-gold'
  | 'food-platinum';

export interface ThemeConfig {
  primaryColor: string; // Hex color
  fontFamily: 'sans' | 'mono' | 'serif';
  borderRadius: 'none' | 'md' | 'lg' | 'full';
  headerStyle: 'transparent' | 'solid';
  cardVariant: 'default' | 'surface' | 'outline';
}

export interface SectionConfig {
  enabled: boolean;
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'list' | 'carousel';
}

export interface VendorCMS {
  templateId: TemplateId;
  category: ProductCategory;
  tier: TemplateTier;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroVideo?: string; // Platinum only
  aboutTitle: string;
  aboutContent: string;
  sections?: {
    specials?: SectionConfig;
    gallery?: SectionConfig;
    testimonials?: SectionConfig;
    contact?: SectionConfig;
  };
  theme: ThemeConfig;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: ProductCategory | 'all';
  tier: TemplateTier;
  description: string;
  thumbnail: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'minimal',
    name: 'Minimalist',
    category: 'all',
    tier: 'silver',
    description: 'A clean, distraction-free layout focusing on simplicity.',
    thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'bold',
    name: 'Bold Identity',
    category: 'all',
    tier: 'gold',
    description: 'High-contrast design with strong typography and large elements.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'food-silver',
    name: 'Bistro Classic',
    category: 'foods',
    tier: 'silver',
    description: 'Clean, list-focused design for efficient menu browsing.',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7ed9d87083?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'food-gold',
    name: 'Epicurean',
    category: 'foods',
    tier: 'gold',
    description: 'Visual-heavy card layout with focus on food photography.',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'food-platinum',
    name: 'The Grande Experience',
    category: 'foods',
    tier: 'platinum',
    description: 'Immersive storytelling with video backgrounds and parallax.',
    thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop'
  }
];

