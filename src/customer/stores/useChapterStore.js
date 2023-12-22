import { create } from 'zustand';

const useChapterStore = create((set) => ({
  chapter: null,
  setChapter: (newChapter) => set({ chapter: newChapter }),
}));

export default useChapterStore;