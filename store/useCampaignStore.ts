import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Campaign, CampaignStatus } from '@/types/campaign'

interface CampaignState {
  campaigns: Campaign[]
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'userCount' | 'totalSales' | 'createdAt'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  getVendorCampaigns: (vendorId: string) => Campaign[]
  getCampaignStatus: (startDate: string, endDate: string) => CampaignStatus
  refreshStatuses: () => void
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: [
        {
          id: 'cmp-1',
          vendorId: 'v1',
          title: 'Dashain Festival Feast',
          description: 'Celebrate the grandest festival with our special Thakali Thali sets at an unbeatable price.',
          type: 'SALE',
          value: 25,
          valueType: 'PERCENT',
          targetType: 'CATEGORY',
          targetIds: ['food-1'],
          startDate: '2026-10-01T00:00:00Z',
          endDate: '2026-10-20T23:59:59Z',
          status: 'UPCOMING',
          userCount: 0,
          totalSales: 0,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-2',
          vendorId: 'v1',
          title: 'Elite Foodie Circle',
          description: 'Order 10 times this month and get your next 3 meals absolutely free!',
          type: 'LOYALTY',
          value: 100,
          valueType: 'PERCENT',
          targetType: 'ALL',
          targetIds: [],
          startDate: '2026-05-01T00:00:00Z',
          endDate: '2026-05-31T23:59:59Z',
          status: 'ACTIVE',
          userCount: 2450,
          totalSales: 890000,
          loyaltyTarget: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-3',
          vendorId: 'v1',
          title: 'Momo Madness Weekend',
          description: 'Flat discount on all varieties of Momos. C-Momo, Jhol Momo, or Steamed - take your pick!',
          type: 'OCCASIONAL',
          value: 150,
          valueType: 'FLAT',
          targetType: 'SUB_CATEGORY',
          targetIds: ['momo-cat'],
          startDate: '2026-05-12T00:00:00Z',
          endDate: '2026-05-14T23:59:59Z',
          status: 'ACTIVE',
          userCount: 420,
          totalSales: 125000,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-4',
          vendorId: 'v1',
          title: 'TikTok Foodie Challenge',
          description: 'Upload a video of your meal, tag #BazarFeast, and get a flat NPR 500 voucher!',
          type: 'SOCIAL_SHOUTOUT',
          value: 500,
          valueType: 'FLAT',
          targetType: 'ALL',
          targetIds: [],
          startDate: '2026-05-01T00:00:00Z',
          endDate: '2026-06-30T23:59:59Z',
          status: 'ACTIVE',
          userCount: 185,
          totalSales: 0,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-5',
          vendorId: 'v1',
          title: 'Midnight Cravings',
          description: 'Free delivery for all orders placed between 10 PM and 2 AM. Late night hunger solved.',
          type: 'FREE_DELIVERY',
          value: 0,
          valueType: 'FLAT',
          targetType: 'ALL',
          targetIds: [],
          startDate: '2026-04-01T00:00:00Z',
          endDate: '2026-08-31T23:59:59Z',
          status: 'ACTIVE',
          userCount: 3100,
          totalSales: 1200000,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-6',
          vendorId: 'v1',
          title: 'Himalayan Coffee Mornings',
          description: 'BOGO on all organic Himalayan coffee beans every Monday morning.',
          type: 'SALE',
          value: 50,
          valueType: 'PERCENT',
          targetType: 'PRODUCT',
          targetIds: ['p3', 'p4'],
          startDate: '2026-01-01T00:00:00Z',
          endDate: '2026-12-31T23:59:59Z',
          status: 'ACTIVE',
          userCount: 890,
          totalSales: 450000,
          createdAt: new Date().toISOString()
        }
      ],

      getCampaignStatus: (startDate: string, endDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return 'UPCOMING';
        if (now > end) return 'EXPIRED';
        return 'ACTIVE';
      },

      addCampaign: (campaignData) => {
        const id = `cmp-${Math.random().toString(36).substr(2, 9)}`;
        const status = get().getCampaignStatus(campaignData.startDate, campaignData.endDate);
        
        const newCampaign: Campaign = {
          ...campaignData,
          id,
          status,
          userCount: 0,
          totalSales: 0,
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          campaigns: [...state.campaigns, newCampaign]
        }));
      },

      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map((c) => {
            if (c.id === id) {
              const updated = { ...c, ...updates };
              if (updates.startDate || updates.endDate) {
                updated.status = get().getCampaignStatus(updated.startDate, updated.endDate);
              }
              return updated;
            }
            return c;
          })
        }));
      },

      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter((c) => c.id !== id)
        }));
      },

      getVendorCampaigns: (vendorId) => {
        return get().campaigns.filter((c) => c.vendorId === vendorId);
      },

      refreshStatuses: () => {
        set((state) => ({
          campaigns: state.campaigns.map((c) => ({
            ...c,
            status: get().getCampaignStatus(c.startDate, c.endDate)
          }))
        }));
      }
    }),
    {
      name: 'bazar-campaign-storage',
    }
  )
)
