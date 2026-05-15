import { ModulePermission, SubscriptionTier } from "@/types/saas";

export interface ModuleDefinition {
  id: ModulePermission;
  name: string;
  description: string;
  icon: string;
  minTier: SubscriptionTier;
  category: 'CORE' | 'INTELLIGENCE' | 'COMMERCE' | 'MARKETING';
  status: 'beta' | 'stable' | 'deprecated';
}

export const MODULE_REGISTRY: ModuleDefinition[] = [
  {
    id: 'INVENTORY',
    name: 'Inventory Pro',
    description: 'Real-time multi-channel inventory synchronization and stock alerts.',
    icon: 'Zap',
    minTier: 'FREE',
    category: 'CORE',
    status: 'stable'
  },
  {
    id: 'CMS_CUSTOMIZER',
    name: 'White-label CMS',
    description: 'Bespoke storefront customization with premium templates and custom CSS.',
    icon: 'Layout',
    minTier: 'FREE',
    category: 'CORE',
    status: 'stable'
  },
  {
    id: 'ANALYTICS',
    name: 'Deep Analytics',
    description: 'Advanced traffic attribution, conversion funnels, and heatmaps.',
    icon: 'BarChart3',
    minTier: 'SILVER',
    category: 'COMMERCE',
    status: 'stable'
  },
  {
    id: 'CAMPAIGNS',
    name: 'Campaign Manager',
    description: 'Email, SMS, and WhatsApp marketing orchestration with automated triggers.',
    icon: 'Megaphone',
    minTier: 'SILVER',
    category: 'MARKETING',
    status: 'stable'
  },
  {
    id: 'AI_ASSISTANT',
    name: 'Bazar Intelligence',
    description: 'Generative AI for product descriptions, smart SEO, and autonomous customer chat.',
    icon: 'Cpu',
    minTier: 'GOLD',
    category: 'INTELLIGENCE',
    status: 'stable'
  },
  {
    id: 'CRM',
    name: 'Customer Relations',
    description: 'Unified customer profiles with loyalty tiers and dispute resolution hub.',
    icon: 'Users',
    minTier: 'GOLD',
    category: 'COMMERCE',
    status: 'stable'
  },
  {
    id: 'SOCIAL_HUB',
    name: 'Social Commerce Hub',
    description: 'Direct integration with Meta, TikTok, and Instagram for cross-platform selling.',
    icon: 'Globe',
    minTier: 'PLATINUM',
    category: 'MARKETING',
    status: 'stable'
  }
];

export interface UserVisit {
  id: string;
  userId?: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  timestamp: string;
  duration: number; // seconds
  path: string;
  action: 'PAGE_VIEW' | 'CLICK' | 'CART_ADD' | 'PURCHASE';
}

export const USER_VISITS: UserVisit[] = [
  { id: 'v_1', userId: 'u3', ip: '192.168.1.45', location: 'Kathmandu, NP', device: 'iPhone 15 Pro', browser: 'Safari', timestamp: '2026-05-15T10:30:00Z', duration: 450, path: '/apple/p/iphone-15-pro', action: 'CART_ADD' },
  { id: 'v_2', userId: 'u3', ip: '192.168.1.45', location: 'Kathmandu, NP', device: 'iPhone 15 Pro', browser: 'Safari', timestamp: '2026-05-15T10:45:00Z', duration: 120, path: '/checkout', action: 'PURCHASE' },
  { id: 'v_3', ip: '202.166.192.1', location: 'Lalitpur, NP', device: 'MacBook M3', browser: 'Chrome', timestamp: '2026-05-15T11:00:00Z', duration: 800, path: '/', action: 'PAGE_VIEW' },
  { id: 'v_4', userId: 'u2', ip: '103.1.2.3', location: 'Pokhara, NP', device: 'Dell XPS 15', browser: 'Edge', timestamp: '2026-05-15T11:15:00Z', duration: 2400, path: '/dashboard', action: 'PAGE_VIEW' },
  { id: 'v_5', ip: '110.44.112.5', location: 'Bhaktapur, NP', device: 'Samsung S24', browser: 'Samsung Internet', timestamp: '2026-05-15T11:20:00Z', duration: 300, path: '/himalayan-bakery', action: 'PAGE_VIEW' }
];

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'a_1', adminId: 'u1', action: 'PLAN_UPDATE', module: 'SaaS Console', details: 'Updated Gold Plan price from 12k to 15k NPR', timestamp: '2026-05-14T09:00:00Z', severity: 'WARNING' },
  { id: 'a_2', adminId: 'u1', action: 'VENDOR_APPROVAL', module: 'Merchants Hub', details: 'Approved "New Nepal Electronics" application', timestamp: '2026-05-14T14:30:00Z', severity: 'INFO' },
  { id: 'a_3', adminId: 'u1', action: 'SECURITY_SCAN', module: 'Kernel', details: 'Completed platform-wide vulnerability audit', timestamp: '2026-05-15T01:00:00Z', severity: 'INFO' },
  { id: 'a_4', adminId: 'u1', action: 'OVERRIDE_ENABLE', module: 'SaaS Console', details: 'Enabled AI Assistant override for "Himalayan Bakery"', timestamp: '2026-05-15T08:45:00Z', severity: 'WARNING' }
];
