import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../../Constants";

import { persist } from "zustand/middleware";

// USING LOCAL STORAGE
const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      // add to wishlist
      addToWishlist: (course) =>
        set((state) => {
          const isAlreadyInWishlist = state.wishlist.some(
            (item) => item.id === course.id
          );
          if (!isAlreadyInWishlist) {
            return { wishlist: [...state.wishlist, course] };
          } else {
            return state;
          }
        }),

      // remove from wishlist
      removeFromWishlist: (courseId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((course) => course.id !== courseId),
        })),
    }),
    {
      name: "wishlist-storage",
      getStorage: () => localStorage,
    }
  )
);

// USING API 
// const useWishlistStore = create((set) => ({
//   wishlist: [],
  
//   fetchWishlist: async () => {
//     try {
//       const response = await axios.get(API_URL + 'api/user/wishlists');
//       set({ wishlist: response.data || [] });
//     } catch (error) {
//       console.error('Could not fetch wishlist', error);
//       set({ wishlist: [] });
//     }
//   },

//   addToWishlist: async (course) => {
//     try {
//       const response = await axios.post(API_URL + 'api/user/wishlists', { courseId: course.id });
//       if (response.status === 200) {
//         set((state) => ({ wishlist: [...state.wishlist, course] }));
//       }
//     } catch (error) {
//       console.error('Could not add to wishlist', error);
//     }
//   },
  
//   removeFromWishlist: async (courseId) => {
//     try {
//       const response = await axios.delete(API_URL + `api/user/wishlists/${courseId}`);
//       if (response.status === 200) {
//         set((state) => ({ wishlist: state.wishlist.filter((course) => course.id !== courseId) }));
//       }
//     } catch (error) {
//       console.error('Could not remove from wishlist', error);
//     }
//   },
// }));

export default useWishlistStore;
