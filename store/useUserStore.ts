import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  favoriteCategories: string[]
  favoriteSubCategories: string[]
  followedVendors: string[]
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
