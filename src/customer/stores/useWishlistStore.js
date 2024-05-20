import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../../Constants";
import { persist } from "zustand/middleware";
import debounce from 'lodash/debounce';

const access_token = localStorage.getItem("access_token");

const debounceTime = 300;

const useWishlistStore = create(persist((set, get) => {
  const calculateTotal = (wishlist) => {
    let total = wishlist.reduce((sum, item) => sum + (item.course.price || 0), 0);
    console.log(total);
    return total;
  };

  return {
    wishlist: [],
    total: 0,

    fetchWishlist: async () => {
      try {
        const response = await axios.get(API_URL + 'api/user/wishlists', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const wishlist = response.data.data || [];
        set({ wishlist, total: calculateTotal(wishlist) });
        console.log(response.data.data);
      } catch (error) {
        console.error('Could not fetch wishlist', error);
        set({ wishlist: [], total: 0 });
      }
    },

    addToWishlist: async (course) => {
      try {
        const response = await axios.post(API_URL + `api/user/wishlists`, {
          course_id: course.id
        }, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        set((state) => {
          const newWishlist = [...state.wishlist, course];
          return { wishlist: newWishlist, total: calculateTotal(newWishlist) };
        });
      } catch (error) {
        console.error('Could not add to wishlist', error);
      }
    },

    removeFromWishlist: async (id) => {
      try {
        const response = await axios.delete(API_URL + `api/user/wishlists/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        set((state) => {
          const newWishlist = state.wishlist.filter((course) => course.id !== id);
          return { wishlist: newWishlist, total: calculateTotal(newWishlist) };
        });
      } catch (error) {
        console.error('Could not remove from wishlist', error);
      }
    },
  };
}, {
  name: "useWishlistStore",
  effects: (set, get) => ({
    fetchWishlist: debounce(get().fetchWishlist, debounceTime),
    addToWishlist: debounce(get().addToWishlist, debounceTime),
    removeFromWishlist: debounce(get().removeFromWishlist, debounceTime),
  })
}));

export default useWishlistStore;
