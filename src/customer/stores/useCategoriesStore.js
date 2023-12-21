import {create} from 'zustand';

const useCategoriesStore = create((set) => ({
  categories: [],
  setCategories: (newCategories) => set({ categories: newCategories }),
}));

export default useCategoriesStore;