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

export interface AgenticSession {
  id: string
  role: 'CUSTOMER' | 'VENDOR' | 'SUPERADMIN'
  title: string
  startTime: string
  lastUpdateTime: string
  interactions: Array<{
    id: string
    timestamp: string
    type: 'USER' | 'THOUGHT' | 'TOOL_CALL' | 'CONTENT' | 'ACTION'
    content: string
    metadata?: Record<string, any>
  }>
}

interface UserState {
  favoriteCategories: string[]
  favoriteSubCategories: string[]
  followedVendors: string[]
  enrolledCampaignIds: string[]
  complaints: Complaint[]
  reviews: Review[]
  agenticSessions: AgenticSession[]
  activeSessionId: string | null
  activeConversationVendorId: string | null
  isMessageModalOpen: boolean
  aiSettings: {
    user: {
      provider: 'google' | 'openai' | 'anthropic' | null
      apiKey?: string
      model: string
    }
    vendor: {
      provider: 'google' | 'openai' | 'anthropic' | null
      apiKey?: string
      model: string
    }
  }
  toggleFavoriteCategory: (categoryId: string) => void
  toggleFavoriteSubCategory: (subCategoryId: string, parentCategoryId: string) => void
  toggleFollowVendor: (vendorId: string) => void
  toggleEnrollCampaign: (campaignId: string) => void
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  createAgenticSession: (role: AgenticSession['role'], title: string) => string
  addInteraction: (sessionId: string, interaction: Omit<AgenticSession['interactions'][0], 'id' | 'timestamp'>) => void
  deleteInteraction: (sessionId: string, interactionId: string) => void
  deleteAgenticSession: (sessionId: string) => void
  setActiveSession: (sessionId: string | null) => void
  updateAiSettings: (role: 'user' | 'vendor', settings: Partial<UserState['aiSettings']['user']>) => void
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
      agenticSessions: [],
      activeSessionId: null,
      activeConversationVendorId: null,
      isMessageModalOpen: false,
      aiSettings: {
        user: { provider: null, model: 'gemini-1.5-pro' },
        vendor: { provider: null, model: 'gemini-1.5-pro' }
      },
      toggleFavoriteCategory: (categoryId: string) => set((state) => ({
        favoriteCategories: state.favoriteCategories.includes(categoryId)
          ? state.favoriteCategories.filter(id => id !== categoryId)
          : [...state.favoriteCategories, categoryId]
      })),
      toggleFavoriteSubCategory: (subCategoryId: string, parentCategoryId: string) => set((state) => {
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
      toggleFollowVendor: (vendorId: string) => set((state) => ({
        followedVendors: state.followedVendors.includes(vendorId)
          ? state.followedVendors.filter(id => id !== vendorId)
          : [...state.followedVendors, vendorId]
      })),
      toggleEnrollCampaign: (campaignId: string) => set((state) => ({
        enrolledCampaignIds: state.enrolledCampaignIds.includes(campaignId)
          ? state.enrolledCampaignIds.filter(id => id !== campaignId)
          : [...state.enrolledCampaignIds, campaignId]
      })),
      addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => set((state) => ({
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
      addReview: (review: Omit<Review, 'id' | 'createdAt'>) => set((state) => ({
        reviews: [
          {
            ...review,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString()
          },
          ...state.reviews
        ]
      })),
      createAgenticSession: (role, title) => {
        const id = Math.random().toString(36).substring(7);
        const newSession: AgenticSession = {
          id,
          role,
          title,
          startTime: new Date().toISOString(),
          lastUpdateTime: new Date().toISOString(),
          interactions: []
        };
        set((state) => ({
          agenticSessions: [newSession, ...state.agenticSessions],
          activeSessionId: id
        }));
        return id;
      },
      addInteraction: (sessionId, interaction) => set((state) => ({
        agenticSessions: state.agenticSessions.map(s => 
          s.id === sessionId 
            ? { 
                ...s, 
                lastUpdateTime: new Date().toISOString(),
                interactions: [...s.interactions, { 
                  ...interaction, 
                  id: Math.random().toString(36).substring(7),
                  timestamp: new Date().toISOString() 
                }] 
              }
            : s
        )
      })),
      deleteInteraction: (sessionId, interactionId) => set((state) => ({
        agenticSessions: state.agenticSessions.map(s => 
          s.id === sessionId 
            ? { ...s, interactions: s.interactions.filter(i => i.id !== interactionId) }
            : s
        )
      })),
      deleteAgenticSession: (sessionId) => set((state) => ({
        agenticSessions: state.agenticSessions.filter(s => s.id !== sessionId),
        activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId
      })),
      setActiveSession: (sessionId) => set({ activeSessionId: sessionId }),
      updateAiSettings: (role, settings: Partial<UserState['aiSettings']['user']>) => set((state) => ({
        aiSettings: {
          ...state.aiSettings,
          [role]: { ...state.aiSettings[role], ...settings }
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
