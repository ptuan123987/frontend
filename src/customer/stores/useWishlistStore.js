import {create} from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(persist(
  (set) => ({
    wishlist: [],
    addToWishlist: (course) => set((state) => ({
      wishlist: [...state.wishlist, course]
    })),
    removeFromWishlist: (courseId) => set((state) => ({
      wishlist: state.wishlist.filter((course) => course.id !== courseId)
    })),
    clearWishlist: () => set({ wishlist: [] })
  }),
  {
    name: 'wishlist-storage', 
    getStorage: () => localStorage, 
  }
));

export default useWishlistStore;
