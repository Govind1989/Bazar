import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SystemState {
  language: 'en' | 'np'
  marketplaceView: 'classic' | 'social'
  setLanguage: (lang: 'en' | 'np') => void
  setMarketplaceView: (view: 'classic' | 'social') => void
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      language: 'en',
      marketplaceView: 'classic',
      setLanguage: (lang) => set({ language: lang }),
      setMarketplaceView: (view) => set({ marketplaceView: view }),
    }),
    {
      name: 'bazar-system-storage',
    }
  )
)
