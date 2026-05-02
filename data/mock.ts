import { VendorCMS } from "@/types/cms";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  themeColor?: string;
  category: string;
  rating: number;
  cmsConfig?: VendorCMS;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Foods', slug: 'foods', icon: 'Utensils', description: 'Fresh and delicious local cuisines.' },
  { id: '2', name: 'Wearables', slug: 'wearables', icon: 'Shirt', description: 'Fashionable clothes and accessories.' },
  { id: '3', name: 'Electronics', slug: 'electronics', icon: 'Zap', description: 'Latest gadgets and hardware.' },
  { id: '4', name: 'Woods', slug: 'woods', icon: 'TreePine', description: 'Premium furniture and woodcraft.' },
  { id: '5', name: 'Furnitures', slug: 'furnitures', icon: 'Armchair', description: 'Modern and traditional furniture for every space.' },
  { id: '6', name: 'Computers & Accessories', slug: 'computers', icon: 'Monitor', description: 'Laptops, desktops, and peripherals.' },
  { id: '7', name: 'Mobiles & Accessories', slug: 'mobiles', icon: 'Smartphone', description: 'Smartphones and mobile gear.' },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Apple Store NP',
    slug: 'apple',
    description: 'Authorized reseller of Apple products in Nepal.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Apple',
    category: 'electronics',
    rating: 4.9,
    cmsConfig: {
      templateId: 'minimal',
      heroTitle: 'Think Different.',
      heroSubtitle: 'The most powerful personal devices in the world.',
      heroImage: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1200&auto=format&fit=crop',
      aboutTitle: 'About Apple NP',
      aboutContent: 'We bring the latest innovation from Apple directly to you. Authorized quality, guaranteed.',
      theme: {
        primaryColor: '#000000',
        fontFamily: 'sans',
        borderRadius: 'lg',
        headerStyle: 'transparent',
        cardVariant: 'default'
      }
    }
  },
  {
    id: 'v2',
    name: 'Himalayan Bakery',
    slug: 'himalayan-bakery',
    description: 'Handcrafted bread and pastries delivered fresh.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Bakery',
    category: 'foods',
    rating: 4.7,
    cmsConfig: {
      templateId: 'bold',
      heroTitle: 'Freshly Baked. Daily.',
      heroSubtitle: 'Traditional Himalayan recipes meets modern baking.',
      heroImage: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=1200&auto=format&fit=crop',
      aboutTitle: 'Our Heritage',
      aboutContent: 'Started in 2021, we believe in the magic of natural fermentation and local ingredients.',
      theme: {
        primaryColor: '#171717',
        fontFamily: 'serif',
        borderRadius: 'md',
        headerStyle: 'solid',
        cardVariant: 'surface'
      }
    }
  },
  {
    id: 'v3',
    name: 'Local Artisan',
    slug: 'local-artisan',
    description: 'Traditional woodcraft and home decors.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Artisan',
    category: 'woods',
    rating: 4.8,
    cmsConfig: {
      templateId: 'minimal',
      heroTitle: 'Handcrafted Elegance',
      heroSubtitle: 'Timeless Nepalese woodcraft for your home.',
      heroImage: 'https://images.unsplash.com/photo-1590059300649-74e2d3df9765?q=80&w=1200&auto=format&fit=crop',
      aboutTitle: 'Our Story',
      aboutContent: 'Preserving the ancient art of wood carving through modern designs.',
      theme: {
        primaryColor: '#262626',
        fontFamily: 'mono',
        borderRadius: 'none',
        headerStyle: 'transparent',
        cardVariant: 'outline'
      }
    }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    price: 185000,
    compareAtPrice: 195000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    description: 'The latest iPhone with Titanium design.',
    category: 'electronics',
    stock: 12
  },
  {
    id: 'p2',
    vendorId: 'v2',
    name: 'Artisan Sourdough',
    slug: 'artisan-sourdough',
    price: 450,
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=800&auto=format&fit=crop',
    description: 'Naturally leavened bread with a crispy crust.',
    category: 'foods',
    stock: 50
  },
  {
    id: 'p3',
    vendorId: 'v3',
    name: 'Hand-carved Mandala Mask',
    slug: 'mandala-mask',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1590059300649-74e2d3df9765?q=80&w=800&auto=format&fit=crop',
    description: 'Traditional Nepalese wood carving.',
    category: 'woods',
    stock: 5
  },
  {
  id: 'p4',
  vendorId: 'v1',
  name: 'MacBook Air M3',
  slug: 'macbook-air-m3',
  price: 185000,
  compareAtPrice: 210000,
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&auto=format&fit=crop',
  description: 'Lightning-fast M3 chip in a thin aluminum enclosure.',
  category: 'computers',
  stock: 8
  },
  {
    id: 'p5',
    vendorId: 'v1',
    name: 'Samsung Galaxy S24',
    slug: 'galaxy-s24',
    price: 125000,
    compareAtPrice: 140000,
    image: 'https://images.unsplash.com/photo-1610945265078-3858a0828671?q=80&w=800&auto=format&fit=crop',
    description: 'Latest flagship smartphone with AI photography.',
    category: 'mobiles',
    stock: 15
  },
  {
    id: 'p6',
    vendorId: 'v3',
    name: 'Teakwood Dining Table',
    slug: 'teak-dining-table',
    price: 45000,
    compareAtPrice: 55000,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop',
    description: 'Solid teakwood craftsmanship, seats six.',
    category: 'furnitures',
    stock: 3
  },
  {
    id: 'p7',
    vendorId: 'v2',
    name: 'Organic Coffee Beans',
    slug: 'organic-coffee',
    price: 850,
    compareAtPrice: 1200,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    description: 'Single-origin Himalayan arabica.',
    category: 'foods',
    stock: 40
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Suman Thapa',
    role: 'Tech Enthusiast',
    content: 'Bazar has revolutionized how I shop for gadgets locally. The experience is seamless and premium.',
    rating: 5
  },
  {
    id: 't2',
    author: 'Priya Rai',
    role: 'Home Decorator',
    content: 'The artisan collection is unmatched. I love supporting local vendors through this platform.',
    rating: 5
  }
];

export interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'shipped' | 'cancelled';
}

export interface DashboardStats {
  revenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  productsListed: number;
  outOfStock: number;
  visitors: number;
  visitorsChange: number;
}

export const DASHBOARD_STATS: DashboardStats = {
  revenue: 420000,
  revenueChange: 18,
  totalOrders: 318,
  ordersChange: 24,
  productsListed: 824,
  outOfStock: 12,
  visitors: 9140,
  visitorsChange: 6
};

export const RECENT_ORDERS: Order[] = [
  { id: '#BZ-4401', customer: 'Priya Sharma', product: 'Wild honey 500g', date: 'Today, 2:14pm', amount: 1350, status: 'paid' },
  { id: '#BZ-4400', customer: 'Rohan Thapa', product: 'Sel roti mix x3', date: 'Today, 11:30am', amount: 540, status: 'shipped' },
  { id: '#BZ-4398', customer: 'Asha Gurung', product: 'Gundruk + Timur', date: 'Yesterday', amount: 570, status: 'paid' },
  { id: '#BZ-4395', customer: 'Bikram KC', product: 'Himalayan salt 2kg', date: 'Yesterday', amount: 280, status: 'pending' },
  { id: '#BZ-4391', customer: 'Sita Rai', product: 'Wild honey 1kg', date: 'Apr 30', amount: 850, status: 'shipped' },
];

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'booking' | 'holiday' | 'appointment';
  image: string;
  rating: number;
  providerName: string;
}

export const SERVICES: Service[] = [
  {
    id: 's1',
    vendorId: 'v4',
    name: 'Home Interior Consult',
    slug: 'interior-consult',
    description: 'Expert interior design consultation for your space.',
    price: 2500,
    duration: 60,
    category: 'appointment',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    providerName: 'Elite Decors'
  },
  {
    id: 's2',
    vendorId: 'v5',
    name: 'Everest Base Camp Trek',
    slug: 'ebc-trek',
    description: '14-day guided trek to the base of the world\'s highest peak.',
    price: 145000,
    duration: 20160, // 14 days
    category: 'holiday',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    providerName: 'Himalayan Expeditions'
  },
  {
    id: 's3',
    vendorId: 'v6',
    name: 'Professional Photography',
    slug: 'photo-session',
    description: 'Outdoor or studio portrait sessions.',
    price: 5000,
    duration: 120,
    category: 'booking',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    providerName: 'Focus Studio'
  }
];

export const INVENTORY_ALERTS = [
  { name: 'Wild honey 500g', stock: 14, low: false },
  { name: 'Yak butter 250g', stock: 3, low: true },
  { name: 'Chhurpi hard', stock: 2, low: true },
  { name: 'Sel roti mix', stock: 28, low: false },
];

export interface PlatformStats {
  totalGmv: number;
  totalVendors: number;
  totalProducts: number;
  activeUsers: number;
  gmvGrowth: number;
  vendorGrowth: number;
}

export const PLATFORM_STATS: PlatformStats = {
  totalGmv: 48500000, // 4.85 Crore
  totalVendors: 1240,
  totalProducts: 48000,
  activeUsers: 92400,
  gmvGrowth: 22.4,
  vendorGrowth: 8.5
};

export const ALL_VENDORS: (Vendor & { status: 'active' | 'pending' | 'suspended', joinedDate: string })[] = [
  {
    id: 'v1',
    name: 'Apple Store NP',
    slug: 'apple',
    description: 'Authorized reseller of Apple products in Nepal.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Apple',
    category: 'electronics',
    rating: 4.9,
    status: 'active',
    joinedDate: 'Jan 12, 2024'
  },
  {
    id: 'v2',
    name: 'Himalayan Bakery',
    slug: 'himalayan-bakery',
    description: 'Handcrafted bread and pastries delivered fresh.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Bakery',
    category: 'foods',
    rating: 4.7,
    status: 'active',
    joinedDate: 'Feb 05, 2024'
  },
  {
    id: 'v7',
    name: 'New Nepal Electronics',
    slug: 'new-nepal',
    description: 'Local electronics and accessories shop.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=New',
    category: 'electronics',
    rating: 0,
    status: 'pending',
    joinedDate: 'Today'
  },
  {
    id: 'v8',
    name: 'Kathmandu Textiles',
    slug: 'ktm-textiles',
    description: 'Traditional fabrics and modern garments.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Textiles',
    category: 'wearables',
    rating: 4.2,
    status: 'suspended',
    joinedDate: 'Dec 20, 2023'
  }
];
