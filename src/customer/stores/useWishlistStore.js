import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../../Constants";

import { persist } from "zustand/middleware";
import debounce from 'lodash/debounce';
const access_token = localStorage.getItem("access_token");

const debounceTime = 300;

const useWishlistStore = create((set) => ({
  wishlist: [],
  
  fetchWishlist: async () => {
    try {
      const response = await axios.get(API_URL + 'api/user/wishlists', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      set({ wishlist: response.data.data || [] });
      console.log(response.data.data)
    } catch (error) {
      console.error('Could not fetch wishlist', error);
      set({ wishlist: [] });
    }
  },

  // Hàm addToWishlist với debounce
  addToWishlist: async (course) => {
    try {
      const response = await axios.post(API_URL + `api/user/wishlists`,{
        course_id :course.id
      }, {headers: {
        Authorization: `Bearer ${access_token}`,
      },});

      set((state) => ({ wishlist: [...state.wishlist, course] }));
    } catch (error) {
      console.error('Could not add to wishlist', error);
    }
  },
  
  removeFromWishlist: async (id) => {
    try {
      const response = await axios.delete(API_URL + `api/user/wishlists/${id}`,{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      set((state) => ({ wishlist: state.wishlist.filter((course) => course.id !== id) }));
    } catch (error) {
      console.error('Could not remove from wishlist', error);
    }
  },
}), {
  // Thực hiện debounce cho các hàm trong store
  name: "useWishlistStore",
  effects: (set, get) => ({
    fetchWishlist: debounce(get().fetchWishlist, debounceTime),
    addToWishlist: debounce(get().addToWishlist, debounceTime),
    removeFromWishlist: debounce(get().removeFromWishlist, debounceTime),
  })
});

export default useWishlistStore;
