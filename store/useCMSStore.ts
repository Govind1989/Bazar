import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VendorCMS, VendorCategory, VendorSubCategory } from '@/types/cms'
import { VENDORS } from '@/data/mock'

interface CMSState {
  previewConfig: VendorCMS | null
  savedConfigs: Record<string, VendorCMS> // vendorId -> config
  isDirty: boolean
  init: (vendorId: string) => void
  updateConfig: (updates: Partial<VendorCMS>) => void
  updateTheme: (updates: Partial<VendorCMS['theme']>) => void
  addCategory: (category: Omit<VendorCategory, 'id' | 'subCategories' | 'status'>) => void
  updateCategory: (categoryId: string, updates: Partial<VendorCategory>) => void
  archiveCategory: (categoryId: string) => void
  addSubCategory: (categoryId: string, subCategory: Omit<VendorSubCategory, 'id' | 'status'>) => void
  updateSubCategory: (categoryId: string, subCategoryId: string, updates: Partial<VendorSubCategory>) => void
  archiveSubCategory: (categoryId: string, subCategoryId: string) => void
  save: (vendorId: string) => void
  reset: (vendorId: string) => void
  getVendorConfig: (vendorId: string) => VendorCMS | undefined
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      previewConfig: null,
      savedConfigs: {},
      isDirty: false,

      init: (vendorId) => {
        const saved = get().savedConfigs[vendorId]
        if (saved) {
          set({ previewConfig: { ...saved }, isDirty: false })
          return
        }

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

      addCategory: (category) => {
        const newCategory: VendorCategory = {
          ...category,
          id: `vc-${Math.random().toString(36).substr(2, 9)}`,
          subCategories: [],
          status: 'active'
        };
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: [...(state.previewConfig.categories || []), newCategory]
          } : null,
          isDirty: true
        }));
      },

      updateCategory: (categoryId, updates) => {
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: state.previewConfig.categories?.map(c => 
              c.id === categoryId ? { ...c, ...updates } : c
            )
          } : null,
          isDirty: true
        }));
      },

      archiveCategory: (categoryId) => {
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: state.previewConfig.categories?.map(c => 
              c.id === categoryId ? { ...c, status: 'archived' } : c
            )
          } : null,
          isDirty: true
        }));
      },

      addSubCategory: (categoryId, subCategory) => {
        const newSub: VendorSubCategory = {
          ...subCategory,
          id: `vsc-${Math.random().toString(36).substr(2, 9)}`,
          status: 'active'
        };
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: state.previewConfig.categories?.map(c => 
              c.id === categoryId ? { ...c, subCategories: [...c.subCategories, newSub] } : c
            )
          } : null,
          isDirty: true
        }));
      },

      updateSubCategory: (categoryId, subCategoryId, updates) => {
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: state.previewConfig.categories?.map(c => 
              c.id === categoryId ? {
                ...c,
                subCategories: c.subCategories.map(s => s.id === subCategoryId ? { ...s, ...updates } : s)
              } : c
            )
          } : null,
          isDirty: true
        }));
      },

      archiveSubCategory: (categoryId, subCategoryId) => {
        set((state) => ({
          previewConfig: state.previewConfig ? {
            ...state.previewConfig,
            categories: state.previewConfig.categories?.map(c => 
              c.id === categoryId ? {
                ...c,
                subCategories: c.subCategories.map(s => s.id === subCategoryId ? { ...s, status: 'archived' } : s)
              } : c
            )
          } : null,
          isDirty: true
        }));
      },

      save: (vendorId) => {
        const config = get().previewConfig
        if (config) {
          set((state) => ({
            savedConfigs: {
              ...state.savedConfigs,
              [vendorId]: config
            },
            isDirty: false
          }))
        }
      },

      reset: (vendorId) => {
        const saved = get().savedConfigs[vendorId]
        if (saved) {
          set({ previewConfig: { ...saved }, isDirty: false })
        } else {
          const vendor = VENDORS.find(v => v.id === vendorId)
          if (vendor?.cmsConfig) {
            set({ previewConfig: { ...vendor.cmsConfig }, isDirty: false })
          }
        }
      },

      getVendorConfig: (vendorId) => {
        return get().savedConfigs[vendorId] || VENDORS.find(v => v.id === vendorId)?.cmsConfig
      }
    }),
    {
      name: 'bazar-cms-storage',
    }
  )
)
