export type MembershipType = 'VISIT_BASED' | 'SPEND_BASED';
export type RewardType = 'CASHBACK_PERCENT' | 'FREE_DELIVERY' | 'FLAT_DISCOUNT';

export interface MembershipPlan {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  type: MembershipType;
  rewardType: RewardType;
  
  // Rules
  targetVisits: number; // e.g., 10th visit
  rewardValue: number; // percentage, flat amount, or N/A for free delivery
  rewardDescription: string;
  isOnlineOnlyReward: boolean; // True for things like Free Delivery
  
  // Validation
  secretPin: string; // 6-digit numerical pin for in-store validation
  
  // Meta
  status: 'ACTIVE' | 'INACTIVE';
  enrolledUsers: number;
  totalRedemptions: number;
  createdAt: string;
}

export interface UserMembership {
  id: string;
  userId: string;
  vendorId: string;
  planId: string;
  
  // Progress
  currentVisits: number;
  totalSpent: number; // For average calculation
  lastVisitAt: string;
  
  // Rewards
  isRewardAvailable: boolean;
  rewardValue?: number; // Calculated average value of X visits
  
  status: 'ENROLLED' | 'COMPLETED';
  enrolledAt: string;
}

export interface MembershipPurchase {
  id: string;
  membershipId: string;
  userId: string;
  vendorId: string;
  amount: number;
  type: 'IN_STORE' | 'ONLINE';
  timestamp: string;
}
