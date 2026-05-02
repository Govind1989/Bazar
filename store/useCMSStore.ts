import { create } from 'zustand'
import { VendorCMS, TemplateId } from '@/types/cms'
import { VENDORS } from '@/data/mock'

interface CMSState {
  previewConfig: VendorCMS | null
  isDirty: boolean
  init: (vendorId: string) => void
  updateConfig: (updates: Partial<VendorCMS>) => void
  updateTheme: (updates: Partial<VendorCMS['theme']>) => void
  save: () => void
  reset: () => void
}

export const useCMSStore = create<CMSState>((set, get) => ({
  previewConfig: null,
  isDirty: false,

  init: (vendorId) => {
    const vendor = VENDORS.find(v => v.id === vendorId)
    if (vendor?.cmsConfig) {
      set({ previewConfig: { ...vendor.cmsConfig }, isDirty: false })
    }
  },

  updateConfig: (updates) => {
    set((state) => ({
      previewConfig: state.previewConfig ? { ...state.previewConfig, ...updates } : null,
      isDirty: true
    }))
  },

  updateTheme: (updates) => {
    set((state) => ({
      previewConfig: state.previewConfig 
        ? { 
            ...state.previewConfig, 
            theme: { ...state.previewConfig.theme, ...updates } 
          } 
        : null,
      isDirty: true
    }))
  },

  save: () => {
    // In a real app, this would be an API call
    console.log('Saving CMS Config:', get().previewConfig)
    set({ isDirty: false })
  },

  reset: () => {
    // Logic to reset to last saved state
    set({ isDirty: false })
  }
}))
