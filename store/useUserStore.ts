import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Complaint {
  id: string
  itemId: string
  itemName: string
  itemType: 'PRODUCT' | 'SERVICE'
  vendorId: string
  reason: string
  proofUrl?: string
  proofType?: 'IMAGE' | 'VIDEO'
  status: 'PENDING' | 'RESOLVED' | 'REJECTED'
  createdAt: string
}

export interface Review {
  id: string
  itemId: string
  itemName: string
  itemType: 'PRODUCT' | 'SERVICE'
  vendorId: string
  rating: number
  comment: string
  proofUrl?: string
  proofType?: 'IMAGE' | 'VIDEO'
  createdAt: string
}

interface UserState {
  favoriteCategories: string[]
  favoriteSubCategories: string[]
  followedVendors: string[]
  enrolledCampaignIds: string[]
  complaints: Complaint[]
  reviews: Review[]
  activeConversationVendorId: string | null
  isMessageModalOpen: boolean
  aiSettings: {
    userApiKey?: string
    vendorApiKey?: string
    preferredModel: string
  }
  toggleFavoriteCategory: (categoryId: string) => void
  toggleFavoriteSubCategory: (subCategoryId: string, parentCategoryId: string) => void
  toggleFollowVendor: (vendorId: string) => void
  toggleEnrollCampaign: (campaignId: string) => void
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  setAiApiKey: (type: 'user' | 'vendor', key: string) => void
  setActiveConversation: (vendorId: string | null) => void
  setMessageModalOpen: (open: boolean) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      favoriteCategories: [],
      favoriteSubCategories: [],
      followedVendors: [],
      enrolledCampaignIds: [],
      complaints: [],
      reviews: [],
      activeConversationVendorId: null,
      isMessageModalOpen: false,
      aiSettings: {
        preferredModel: 'gpt-4o'
      },
      toggleFavoriteCategory: (categoryId) => set((state) => ({
        favoriteCategories: state.favoriteCategories.includes(categoryId)
          ? state.favoriteCategories.filter(id => id !== categoryId)
          : [...state.favoriteCategories, categoryId]
      })),
      toggleFavoriteSubCategory: (subCategoryId, parentCategoryId) => set((state) => {
        const isCurrentlyFav = state.favoriteSubCategories.includes(subCategoryId);
        const nextSubFavs = isCurrentlyFav
          ? state.favoriteSubCategories.filter(id => id !== subCategoryId)
          : [...state.favoriteSubCategories, subCategoryId];
        
        // Auto-favorite parent if not already favorited when adding a sub-category
        let nextCatFavs = [...state.favoriteCategories];
        if (!isCurrentlyFav && !nextCatFavs.includes(parentCategoryId)) {
          nextCatFavs.push(parentCategoryId);
        }

        return {
          favoriteSubCategories: nextSubFavs,
          favoriteCategories: nextCatFavs
        };
      }),
      toggleFollowVendor: (vendorId) => set((state) => ({
        followedVendors: state.followedVendors.includes(vendorId)
          ? state.followedVendors.filter(id => id !== vendorId)
          : [...state.followedVendors, vendorId]
      })),
      toggleEnrollCampaign: (campaignId) => set((state) => ({
        enrolledCampaignIds: state.enrolledCampaignIds.includes(campaignId)
          ? state.enrolledCampaignIds.filter(id => id !== campaignId)
          : [...state.enrolledCampaignIds, campaignId]
      })),
      addComplaint: (complaint) => set((state) => ({
        complaints: [
          {
            ...complaint,
            id: Math.random().toString(36).substring(7),
            status: 'PENDING',
            createdAt: new Date().toISOString()
          },
          ...state.complaints
        ]
      })),
      addReview: (review) => set((state) => ({
        reviews: [
          {
            ...review,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString()
          },
          ...state.reviews
        ]
      })),
      setAiApiKey: (type, key) => set((state) => ({
        aiSettings: {
          ...state.aiSettings,
          [type === 'user' ? 'userApiKey' : 'vendorApiKey']: key
        }
      })),
      setActiveConversation: (vendorId) => set({ 
        activeConversationVendorId: vendorId,
        isMessageModalOpen: vendorId !== null 
      }),
      setMessageModalOpen: (open) => set({ isMessageModalOpen: open }),
    }),
    {
      name: 'bazar-user-storage',
    }
  )
)
