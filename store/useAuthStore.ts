import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from '@/data/users'

interface AuthState {
  user: User | null
  activeRole: UserRole | null
  isAuthenticated: boolean
  setAuth: (user: User, activeRole?: UserRole) => void
  setActiveRole: (role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      activeRole: null,
      isAuthenticated: false,
      setAuth: (user, activeRole) => set({ 
        user, 
        isAuthenticated: true, 
        activeRole: activeRole || user.roles[0] 
      }),
      setActiveRole: (role) => set({ activeRole: role }),
      logout: () => set({ user: null, isAuthenticated: false, activeRole: null }),
    }),
    {
      name: 'bazar-auth-storage',
    }
  )
)
