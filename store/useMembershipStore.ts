import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MembershipPlan, UserMembership, MembershipPurchase } from '@/types/membership'

interface MembershipState {
  plans: MembershipPlan[]
  userMemberships: UserMembership[]
  purchases: MembershipPurchase[]
  
  // Plan Management
  addPlan: (plan: Omit<MembershipPlan, 'id' | 'enrolledUsers' | 'totalRedemptions' | 'createdAt'>) => void
  updatePlan: (id: string, updates: Partial<MembershipPlan>) => void
  
  // User Actions
  enrollInPlan: (userId: string, vendorId: string, planId: string) => void
  recordPurchase: (data: {
    userId: string;
    vendorId: string;
    membershipId: string;
    amount: number;
    type: 'IN_STORE' | 'ONLINE';
    pin?: string;
  }) => { success: boolean; message: string; rewardTriggered?: boolean }
  
  redeemReward: (membershipId: string) => void
  
  // Queries
  getVendorPlans: (vendorId: string) => MembershipPlan[]
  getUserMemberships: (userId: string) => UserMembership[]
  getMembershipProgress: (membershipId: string) => { current: number; target: number; average: number }
}

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set, get) => ({
      plans: [
        {
          id: 'plan-1',
          vendorId: 'v1',
          title: 'Premium Foodie Club',
          description: 'Get your 11th meal for free! Based on the average of your previous 10 orders.',
          type: 'VISIT_BASED',
          rewardType: 'CASHBACK_PERCENT',
          targetVisits: 10,
          rewardValue: 100,
          rewardDescription: 'Free meal up to average value',
          isOnlineOnlyReward: false,
          secretPin: '1234',
          status: 'ACTIVE',
          enrolledUsers: 45,
          totalRedemptions: 12,
          createdAt: new Date().toISOString()
        },
        {
          id: 'plan-2',
          vendorId: 'v1',
          title: 'Fast & Free Delivery Club',
          description: 'Join our elite circle and get Free Delivery on every 5th ONLINE order!',
          type: 'VISIT_BASED',
          rewardType: 'FREE_DELIVERY',
          targetVisits: 5,
          rewardValue: 0,
          rewardDescription: 'Free Delivery on your next online order',
          isOnlineOnlyReward: true,
          secretPin: '5678',
          status: 'ACTIVE',
          enrolledUsers: 120,
          totalRedemptions: 34,
          createdAt: new Date().toISOString()
        }
      ],
      userMemberships: [],
      purchases: [],

      addPlan: (planData) => {
        const id = `plan-${Math.random().toString(36).substr(2, 9)}`;
        const newPlan: MembershipPlan = {
          ...planData,
          id,
          enrolledUsers: 0,
          totalRedemptions: 0,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ plans: [...state.plans, newPlan] }));
      },

      updatePlan: (id, updates) => {
        set((state) => ({
          plans: state.plans.map((p) => (p.id === id ? { ...p, ...updates } : p))
        }));
      },

      enrollInPlan: (userId, vendorId, planId) => {
        const existing = get().userMemberships.find(m => m.userId === userId && m.planId === planId);
        if (existing) return;

        const newMembership: UserMembership = {
          id: `um-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          vendorId,
          planId,
          currentVisits: 0,
          totalSpent: 0,
          lastVisitAt: new Date().toISOString(),
          isRewardAvailable: false,
          status: 'ENROLLED',
          enrolledAt: new Date().toISOString()
        };

        set((state) => ({ 
          userMemberships: [...state.userMemberships, newMembership],
          plans: state.plans.map(p => p.id === planId ? { ...p, enrolledUsers: p.enrolledUsers + 1 } : p)
        }));
      },

      recordPurchase: (data) => {
        const membership = get().userMemberships.find(m => m.id === data.membershipId);
        const plan = get().plans.find(p => p.id === (membership?.planId));

        if (!membership || !plan) return { success: false, message: 'Membership not found' };

        if (data.type === 'IN_STORE' && data.pin !== plan.secretPin) {
          return { success: false, message: 'Invalid Secret PIN' };
        }

        const newPurchase: MembershipPurchase = {
          id: `pur-${Math.random().toString(36).substr(2, 9)}`,
          membershipId: data.membershipId,
          userId: data.userId,
          vendorId: data.vendorId,
          amount: data.amount,
          type: data.type,
          timestamp: new Date().toISOString()
        };

        // For online-only rewards (like Free Delivery), only ONLINE purchases increment progress
        const shouldIncrementProgress = !plan.isOnlineOnlyReward || data.type === 'ONLINE';
        
        const nextVisits = shouldIncrementProgress ? membership.currentVisits + 1 : membership.currentVisits;
        const nextSpent = membership.totalSpent + data.amount;
        let rewardTriggered = false;
        let isRewardAvailable = membership.isRewardAvailable;
        let rewardValue = membership.rewardValue;

        if (shouldIncrementProgress && nextVisits >= plan.targetVisits) {
          rewardTriggered = true;
          isRewardAvailable = true;
          
          if (plan.rewardType === 'CASHBACK_PERCENT') {
            rewardValue = (nextSpent / nextVisits) * (plan.rewardValue / 100);
          } else if (plan.rewardType === 'FREE_DELIVERY') {
            rewardValue = 0; // Indicative
          }
        }

        set((state) => ({
          purchases: [...state.purchases, newPurchase],
          userMemberships: state.userMemberships.map(m => 
            m.id === data.membershipId 
              ? { 
                  ...m, 
                  currentVisits: nextVisits, 
                  totalSpent: nextSpent, 
                  isRewardAvailable, 
                  rewardValue,
                  lastVisitAt: new Date().toISOString()
                } 
              : m
          )
        }));

        let successMessage = 'Purchase recorded';
        if (rewardTriggered) {
          successMessage = plan.rewardType === 'FREE_DELIVERY' ? 'Free Delivery Unlocked!' : 'Reward unlocked!';
        } else if (!shouldIncrementProgress) {
          successMessage = 'Purchase recorded (Progress only updates for Online orders)';
        }

        return { 
          success: true, 
          message: successMessage,
          rewardTriggered 
        };
      },

      redeemReward: (membershipId) => {
        set((state) => ({
          userMemberships: state.userMemberships.map(m => 
            m.id === membershipId 
              ? { ...m, currentVisits: 0, totalSpent: 0, isRewardAvailable: false, rewardValue: 0 } 
              : m
          ),
          plans: state.plans.map(p => {
            const m = state.userMemberships.find(um => um.id === membershipId);
            return p.id === m?.planId ? { ...p, totalRedemptions: p.totalRedemptions + 1 } : p;
          })
        }));
      },

      getVendorPlans: (vendorId) => get().plans.filter(p => p.vendorId === vendorId),
      getUserMemberships: (userId) => get().userMemberships.filter(m => m.userId === userId),
      getMembershipProgress: (membershipId) => {
        const m = get().userMemberships.find(um => um.id === membershipId);
        const p = get().plans.find(pl => pl.id === m?.planId);
        if (!m || !p) return { current: 0, target: 0, average: 0 };
        return {
          current: m.currentVisits,
          target: p.targetVisits,
          average: m.currentVisits > 0 ? m.totalSpent / m.currentVisits : 0
        };
      }
    }),
    {
      name: 'bazar-membership-storage',
    }
  )
)
