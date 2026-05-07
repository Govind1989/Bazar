export type CampaignType = 
  | 'SALE' 
  | 'REFERRAL' 
  | 'LOYALTY' 
  | 'OCCASIONAL' 
  | 'SOCIAL_SHOUTOUT' 
  | 'FREE_DELIVERY';

export type CampaignStatus = 'ACTIVE' | 'EXPIRED' | 'UPCOMING';

export type TargetType = 'ALL' | 'CATEGORY' | 'SUB_CATEGORY' | 'PRODUCT';

export interface Campaign {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  type: CampaignType;
  value: number; // percentage or flat value
  valueType: 'PERCENT' | 'FLAT';
  targetType: TargetType;
  targetIds: string[]; // IDs of categories/sub-categories/products
  startDate: string; // ISO format
  endDate: string; // ISO format
  status: CampaignStatus;
  userCount: number;
  totalSales: number;
  loyaltyTarget?: number; // X buys for LOYALTY type
  createdAt: string;
}
