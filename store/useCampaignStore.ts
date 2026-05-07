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
          title: 'Dashain Festival Sale',
          description: 'Special discounts on all traditional food items for the festive season.',
          type: 'SALE',
          value: 20,
          valueType: 'PERCENT',
          targetType: 'CATEGORY',
          targetIds: ['food-1'],
          startDate: '2026-09-01T00:00:00Z',
          endDate: '2026-10-15T23:59:59Z',
          status: 'ACTIVE',
          userCount: 1250,
          totalSales: 450000,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-2',
          vendorId: 'v1',
          title: 'Loyal Foodie Program',
          description: 'Order 5 times from Himalayan Kitchen and get a massive discount on your 6th order.',
          type: 'LOYALTY',
          value: 50,
          valueType: 'PERCENT',
          targetType: 'ALL',
          targetIds: [],
          startDate: '2026-01-01T00:00:00Z',
          endDate: '2026-12-31T23:59:59Z',
          status: 'ACTIVE',
          userCount: 840,
          totalSales: 280000,
          loyaltyTarget: 5,
          createdAt: new Date().toISOString()
        },
        {
          id: 'cmp-3',
          vendorId: 'v1',
          title: 'New Year Bash',
          description: 'Flat discount for everyone to celebrate the upcoming new year.',
          type: 'OCCASIONAL',
          value: 500,
          valueType: 'FLAT',
          targetType: 'ALL',
          targetIds: [],
          startDate: '2027-01-01T00:00:00Z',
          endDate: '2027-01-05T23:59:59Z',
          status: 'UPCOMING',
          userCount: 0,
          totalSales: 0,
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
