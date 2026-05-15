export type ModulePermission = 
  | 'INVENTORY' 
  | 'ANALYTICS' 
  | 'AI_ASSISTANT' 
  | 'CRM' 
  | 'CAMPAIGNS' 
  | 'CMS_CUSTOMIZER' 
  | 'SOCIAL_HUB';

export type SubscriptionTier = 'FREE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  description: string;
  modules: ModulePermission[];
  maxProducts: number | 'unlimited';
  maxUsers: number | 'unlimited';
  features: string[];
}

export interface VendorSubscription {
  vendorId: string;
  planId: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  moduleOverrides: ModulePermission[]; // Modules explicitly enabled/disabled regardless of plan
}

export interface SaaSStats {
  totalmrr: number;
  activeSubscriptions: number;
  tierDistribution: Record<SubscriptionTier, number>;
  topModules: { module: ModulePermission; usage: number }[];
}
