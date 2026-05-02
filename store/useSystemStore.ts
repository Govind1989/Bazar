import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SystemState {
  language: 'en' | 'np'
  setLanguage: (lang: 'en' | 'np') => void
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'bazar-system-storage',
    }
  )
)
