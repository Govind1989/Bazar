import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'ORDER' | 'CAMPAIGN' | 'SYSTEM' | 'PROMO'
  read: boolean
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: '1',
          title: 'Order Delivered',
          message: 'Your order #BZ-4401 has been delivered successfully.',
          time: '2 mins ago',
          type: 'ORDER',
          read: false
        },
        {
          id: '2',
          title: 'New Campaign Alert',
          message: 'Heritage Artisan just launched a new loyalty quest!',
          time: '1 hour ago',
          type: 'CAMPAIGN',
          read: false
        },
        {
          id: '3',
          title: 'System Update',
          message: 'Bazar AI core has been optimized for your preferences.',
          time: '5 hours ago',
          type: 'SYSTEM',
          read: true
        }
      ],
      unreadCount: 2,
      markAsRead: (id) => set((state) => {
        const nextNotifs = state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
        return {
          notifications: nextNotifs,
          unreadCount: nextNotifs.filter(n => !n.read).length
        }
      }),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      })),
      addNotification: (notif) => set((state) => {
        const newNotif = {
          ...notif,
          id: Math.random().toString(36).substring(7),
          read: false
        }
        return {
          notifications: [newNotif, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }
      }),
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: 'bazar-notification-storage',
    }
  )
)
