export type TemplateId = 'minimal' | 'bold' | 'classic';

export interface ThemeConfig {
  primaryColor: string; // Hex color
  fontFamily: 'sans' | 'mono' | 'serif';
  borderRadius: 'none' | 'md' | 'lg' | 'full';
  headerStyle: 'transparent' | 'solid';
  cardVariant: 'default' | 'surface' | 'outline';
}

export interface VendorCMS {
  templateId: TemplateId;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutTitle: string;
  aboutContent: string;
  theme: ThemeConfig;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Clean, high-whitespace design. Ideal for premium brands.',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'bold',
    name: 'Bold Dark',
    description: 'High contrast, centered hero sections. Makes an impact.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop'
  }
];
