import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Service } from '@/data/mock'

export interface BookedService extends Service {
  bookingDate: string
}

interface CalendarState {
  bookedServices: BookedService[]
  addService: (service: Service, date: string) => void
  removeService: (serviceId: string, date: string) => void
  clearCalendar: () => void
  totalBookings: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  redemptionContext: { campaignId: string; vendorId: string } | null
  setRedemptionContext: (ctx: { campaignId: string; vendorId: string } | null) => void
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      bookedServices: [],
      totalBookings: 0,
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      redemptionContext: null,
      setRedemptionContext: (redemptionContext) => set({ redemptionContext }),
// ...

      addService: (service, date) => {
        const bookedServices = get().bookedServices
        const isAlreadyBooked = bookedServices.some(
          (s) => s.id === service.id && s.bookingDate === date
        )

        if (!isAlreadyBooked) {
          set({
            bookedServices: [...bookedServices, { ...service, bookingDate: date }],
            totalBookings: get().totalBookings + 1,
          })
        }
      },

      removeService: (serviceId, date) => {
        set({
          bookedServices: get().bookedServices.filter(
            (s) => !(s.id === serviceId && s.bookingDate === date)
          ),
          totalBookings: get().totalBookings - 1,
        })
      },

      clearCalendar: () => set({ bookedServices: [], totalBookings: 0 }),
    }),
    {
      name: 'bazar-calendar-storage',
    }
  )
)
