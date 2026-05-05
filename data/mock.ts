import { VendorCMS } from "@/types/cms";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subCategories?: { id: string; name: string; slug: string }[];
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage?: string;
  themeColor?: string;
  categories: string[];
  rating: number;
  reviewsCount?: number;
  cmsConfig?: VendorCMS;
}

export interface BazarEvent {
  id: string;
  name: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  location: string;
  description?: string;
}

export const EVENTS: BazarEvent[] = [
  {
    id: 'e1',
    name: 'Food Festival 2026',
    slug: 'food-fest-2026',
    category: 'foods',
    date: 'May 15, 2026',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    location: 'Kathmandu',
    description: 'Experience the largest culinary gathering in Nepal with 50+ local vendors and live music.'
  },
  {
    id: 'e2',
    name: 'Tech Expo 2026',
    slug: 'tech-expo-2026',
    category: 'electronics',
    date: 'June 01, 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-176a7e0c3f5d?q=80&w=800&auto=format&fit=crop',
    location: 'Lalitpur',
    description: 'Discover the latest innovations in software, hardware, and sustainable technology from across the region.'
  }
];

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
  { 
    id: '1', 
    name: 'Foods', 
    slug: 'foods', 
    icon: 'Utensils', 
    description: 'Fresh and delicious local cuisines.',
    subCategories: [
      { id: '1-1', name: 'Organic', slug: 'organic' },
      { id: '1-2', name: 'Spices', slug: 'spices' },
      { id: '1-3', name: 'Dairy', slug: 'dairy' },
      { id: '1-4', name: 'Bakery', slug: 'bakery' }
    ]
  },
  { 
    id: '2', 
    name: 'Wearables', 
    slug: 'wearables', 
    icon: 'Shirt', 
    description: 'Fashionable clothes and accessories.',
    subCategories: [
      { id: '2-1', name: 'Handmade', slug: 'handmade' },
      { id: '2-2', name: 'Traditional', slug: 'traditional' },
      { id: '2-3', name: 'Modern', slug: 'modern' }
    ]
  },
  { 
    id: '3', 
    name: 'Electronics', 
    slug: 'electronics', 
    icon: 'Zap', 
    description: 'Latest gadgets and hardware.',
    subCategories: [
      { id: '3-1', name: 'Accessories', slug: 'accessories' },
      { id: '3-2', name: 'Components', slug: 'components' },
      { id: '3-3', name: 'Gaming', slug: 'gaming' }
    ]
  },
  { 
    id: '4', 
    name: 'Woods', 
    slug: 'woods', 
    icon: 'TreePine', 
    description: 'Premium furniture and woodcraft.',
    subCategories: [
      { id: '4-1', name: 'Carvings', slug: 'carvings' },
      { id: '4-2', name: 'Timber', slug: 'timber' },
      { id: '4-3', name: 'Raw Materials', slug: 'raw' }
    ]
  },
  { id: '5', name: 'Furnitures', slug: 'furnitures', icon: 'Armchair', description: 'Modern and traditional furniture for every space.' },
  { id: '6', name: 'Computers & Accessories', slug: 'computers', icon: 'Monitor', description: 'Laptops, desktops, and peripherals.' },
  { id: '7', name: 'Mobiles & Accessories', slug: 'mobiles', icon: 'Smartphone', description: 'Smartphones and mobile gear.' },
];

export const SERVICE_CATEGORIES: Category[] = [
  {
    id: "appointment",
    name: "Appointments",
    slug: "appointment",
    icon: "Calendar",
    description: "Book expert consultations",
  },
  {
    id: "holiday",
    name: "Holidays",
    slug: "holiday",
    icon: "MapPin",
    description: "Guided tours & treks",
  },
  {
    id: "service",
    name: "Services",
    slug: "service",
    icon: "Clock",
    description: "Home & professional services",
  },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Apple Store NP',
    slug: 'apple',
    description: 'Authorized reseller of Apple products in Nepal.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Apple',
    coverImage: 'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?q=80&w=1200&auto=format&fit=crop',
    categories: ['electronics', 'computers', 'mobiles'],
    rating: 4.9,
    reviewsCount: 1240,
    cmsConfig: {
      templateId: 'minimal',
      category: 'electronics',
      tier: 'platinum',
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
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    categories: ['foods'],
    rating: 4.7,
    reviewsCount: 856,
    cmsConfig: {
      templateId: 'food-gold',
      category: 'foods',
      tier: 'gold',
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
    coverImage: 'https://images.unsplash.com/photo-1590059300649-74e2d3df9765?q=80&w=1200&auto=format&fit=crop',
    categories: ['woods', 'furnitures'],
    rating: 4.8,
    reviewsCount: 432,
    cmsConfig: {
      templateId: 'minimal',
      category: 'woods',
      tier: 'silver',
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
  },
  {
    id: 'v4',
    name: 'Elite Decors',
    slug: 'elite-decors',
    description: 'Premium interior design and home renovation services.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Elite',
    categories: ['appointment'],
    rating: 4.9,
    reviewsCount: 230
  },
  {
    id: 'v5',
    name: 'Himalayan Expeditions',
    slug: 'himalayan-expeditions',
    description: 'Expert-led treks and adventure tours across Nepal.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Expeditions',
    categories: ['holiday'],
    rating: 5.0,
    reviewsCount: 1540
  },
  {
    id: 'v6',
    name: 'Focus Studio',
    slug: 'focus-studio',
    description: 'Professional photography and videography services.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Focus',
    categories: ['service'],
    rating: 4.7,
    reviewsCount: 312
  },
  {
    id: 'v8',
    name: 'Kathmandu Textiles',
    slug: 'ktm-textiles',
    description: 'Traditional fabrics and modern garments.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Textiles',
    coverImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop',
    categories: ['wearables'],
    rating: 4.2,
    reviewsCount: 150,
    cmsConfig: {
      templateId: 'minimal',
      category: 'wearables',
      tier: 'silver',
      heroTitle: 'Handwoven Heritage',
      heroSubtitle: 'Sustainable fashion from the heart of Kathmandu.',
      heroImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1200&auto=format&fit=crop',
      aboutTitle: 'Our Craft',
      aboutContent: 'We work with local weavers to bring you the finest handwoven fabrics.',
      theme: {
        primaryColor: '#4c1d95',
        fontFamily: 'sans',
        borderRadius: 'lg',
        headerStyle: 'solid',
        cardVariant: 'surface'
      }
    }
  }
];

export const PRODUCTS: Product[] = [
  // ... existing products ...
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
    compareAtPrice: 600,
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=800&auto=format&fit=crop',
    description: 'Naturally leavened bread with a crispy crust.',
    category: 'foods',
    stock: 50
  },
  {
    id: 'p8',
    vendorId: 'v2',
    name: 'Himalayan Momo Mix',
    slug: 'momo-mix',
    price: 350,
    compareAtPrice: 400,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172d67b?q=80&w=800&auto=format&fit=crop',
    description: 'Authentic momo masala mix.',
    category: 'foods',
    stock: 100
  },
  {
    id: 'p9',
    vendorId: 'v8',
    name: 'Pashmina Shawl',
    slug: 'pashmina-shawl',
    price: 5500,
    compareAtPrice: 7000,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop',
    description: 'Soft cashmere pashmina shawl.',
    category: 'wearables',
    stock: 20
  },
  {
    id: 'p10',
    vendorId: 'v8',
    name: 'Cotton Kurta',
    slug: 'cotton-kurta',
    price: 1800,
    compareAtPrice: 2200,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop',
    description: 'Handwoven cotton kurta.',
    category: 'wearables',
    stock: 35
  },
  // ... existing products ...
{
    id:"p11",
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
  category: 'service' | 'holiday' | 'appointment';
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
    category: 'service',
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
    categories: ['electronics', 'computers', 'mobiles'],
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
    categories: ['foods'],
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
    categories: ['electronics'],
    rating: 0,
    status: 'active',
    joinedDate: 'Today'
  },
  {
    id: 'v8',
    name: 'Kathmandu Textiles',
    slug: 'ktm-textiles',
    description: 'Traditional fabrics and modern garments.',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Textiles',
    categories: ['wearables'],
    rating: 4.2,
    status: 'suspended',
    joinedDate: 'Dec 20, 2023'
  }
];

export interface PreOwnedProduct {
  id: string;
  userId: string;
  name: string;
  slug: string;
  price: number;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  image: string;
  description: string;
  category: string;
  location: string;
  isSold: boolean;
}

export interface Job {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  sector: string;
  location: string;
  salary: string;
  postedAt: string;
  requirements: string[];
}

export const JOBS: Job[] = [
  {
    id: 'j1',
    vendorId: 'v1',
    title: 'Senior Software Engineer',
    description: 'We are looking for a Senior Software Engineer to join our growing team.',
    type: 'full-time',
    sector: 'Technology',
    location: 'Remote / Kathmandu',
    salary: 'Rs. 150,000 - 250,000',
    postedAt: '2 days ago',
    requirements: ['5+ years of experience', 'Proficiency in React and Node.js', 'Experience with cloud platforms']
  },
  {
    id: 'j2',
    vendorId: 'v3',
    title: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and functional user experiences.',
    type: 'contract',
    sector: 'Design',
    location: 'Lalitpur',
    salary: 'Negotiable',
    postedAt: '1 week ago',
    requirements: ['3+ years of experience', 'Strong portfolio', 'Expertise in Figma']
  },
  {
    id: 'j3',
    vendorId: 'v2',
    title: 'Marketing Specialist',
    description: 'Drive our brand forward with creative marketing strategies.',
    type: 'part-time',
    sector: 'Marketing',
    location: 'Kathmandu',
    salary: 'Rs. 40,000 - 60,000',
    postedAt: '3 days ago',
    requirements: ['Experience in digital marketing', 'Strong communication skills']
  },
  {
    id: 'j4',
    vendorId: 'v1',
    title: 'Frontend Intern',
    description: 'Learn and grow with our experienced frontend development team.',
    type: 'full-time',
    sector: 'Technology',
    location: 'Kathmandu',
    salary: 'Rs. 15,000',
    postedAt: 'Just now',
    requirements: ['Basic knowledge of HTML, CSS, and JS', 'Eagerness to learn']
  },
  {
    id: 'j5',
    vendorId: 'v3',
    title: 'Freelance Illustrator',
    description: 'Looking for a creative illustrator for a series of brand assets.',
    type: 'freelance',
    sector: 'Design',
    location: 'Remote',
    salary: 'Project-based',
    postedAt: '5 days ago',
    requirements: ['Proven track record in illustration', 'Ability to meet deadlines']
  }
];

export const PRE_OWNED_PRODUCTS: PreOwnedProduct[] = [
  {
    id: 'po1',
    userId: 'u1',
    name: 'Vintage Nikon Camera',
    slug: 'vintage-nikon',
    price: 12000,
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    description: 'Perfectly working vintage camera for enthusiasts.',
    category: 'electronics',
    location: 'Kathmandu',
    isSold: false
  },
  {
    id: 'po2',
    userId: 'u2',
    name: 'Ergonomic Office Chair',
    slug: 'office-chair',
    price: 8500,
    condition: 'like-new',
    image: 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?q=80&w=800&auto=format&fit=crop',
    description: 'Used for only 2 months, selling due to relocation.',
    category: 'furnitures',
    location: 'Lalitpur',
    isSold: false
  }
];

export const SALES_ANALYTICS = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 145 },
  { month: 'Mar', sales: 48000, orders: 130 },
  { month: 'Apr', sales: 61000, orders: 168 },
  { month: 'May', sales: 55000, orders: 152 },
  { month: 'Jun', sales: 67000, orders: 185 },
];

export const MONTHLY_PROJECTIONS = [
  { month: 'Jul', projected: 72000 },
  { month: 'Aug', projected: 75000 },
  { month: 'Sep', projected: 80000 },
  { month: 'Oct', projected: 95000 },
  { month: 'Nov', projected: 88000 },
  { month: 'Dec', projected: 92000 },
];

