import { SubscriptionPlan, VendorSubscription, SaaSStats } from "@/types/saas";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'Bazar Basic',
    tier: 'FREE',
    price: 0,
    billingCycle: 'monthly',
    description: 'Perfect for small local vendors starting their digital journey.',
    modules: ['INVENTORY', 'CMS_CUSTOMIZER'],
    maxProducts: 10,
    maxUsers: 1,
    features: ['Standard Storefront', 'Basic Inventory', 'Bazar Marketplace Listing']
  },
  {
    id: 'plan_silver',
    name: 'Bazar Growth',
    tier: 'SILVER',
    price: 5000,
    billingCycle: 'monthly',
    description: 'Advanced tools for growing businesses needing more reach.',
    modules: ['INVENTORY', 'CMS_CUSTOMIZER', 'ANALYTICS', 'CAMPAIGNS'],
    maxProducts: 100,
    maxUsers: 3,
    features: ['Advanced Analytics', 'Campaign Manager', 'Priority Support', 'Custom Domain']
  },
  {
    id: 'plan_gold',
    name: 'Bazar Pro',
    tier: 'GOLD',
    price: 15000,
    billingCycle: 'monthly',
    description: 'The complete toolkit for high-volume retailers and service providers.',
    modules: ['INVENTORY', 'CMS_CUSTOMIZER', 'ANALYTICS', 'CAMPAIGNS', 'AI_ASSISTANT', 'CRM'],
    maxProducts: 1000,
    maxUsers: 10,
    features: ['Bazar AI Assistant', 'CRM Integration', 'Loyalty Program', 'Multi-staff Access']
  },
  {
    id: 'plan_platinum',
    name: 'Bazar Enterprise',
    tier: 'PLATINUM',
    price: 45000,
    billingCycle: 'monthly',
    description: 'Bespoke solutions for established brands and large-scale operations.',
    modules: ['INVENTORY', 'CMS_CUSTOMIZER', 'ANALYTICS', 'CAMPAIGNS', 'AI_ASSISTANT', 'CRM', 'SOCIAL_HUB'],
    maxProducts: 'unlimited',
    maxUsers: 'unlimited',
    features: ['Social Hub Integration', 'Dedicated Account Manager', 'Custom API Access', 'SLA Guarantee']
  }
];

export const VENDOR_SUBSCRIPTIONS: VendorSubscription[] = [
  {
    vendorId: 'v1', // Apple Store NP
    planId: 'plan_platinum',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2026-06-12',
    moduleOverrides: []
  },
  {
    vendorId: 'v2', // Himalayan Bakery
    planId: 'plan_gold',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2026-06-05',
    moduleOverrides: []
  },
  {
    vendorId: 'v3', // Local Artisan
    planId: 'plan_silver',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2026-06-15',
    moduleOverrides: []
  },
  {
    vendorId: 'v8', // Kathmandu Textiles
    planId: 'plan_silver',
    status: 'past_due',
    billingCycle: 'monthly',
    nextBillingDate: '2026-05-10',
    moduleOverrides: []
  }
];

export const SAAS_STATS: SaaSStats = {
  totalmrr: 185000, // Monthly Recurring Revenue
  activeSubscriptions: 124,
  tierDistribution: {
    FREE: 450,
    SILVER: 82,
    GOLD: 35,
    PLATINUM: 7
  },
  topModules: [
    { module: 'AI_ASSISTANT', usage: 85 },
    { module: 'ANALYTICS', usage: 92 },
    { module: 'INVENTORY', usage: 100 },
    { module: 'SOCIAL_HUB', usage: 12 }
  ]
};
