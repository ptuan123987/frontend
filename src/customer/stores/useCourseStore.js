import { create } from 'zustand';

const useCourseStore = create((set) => ({
  course: [],
  setCourse: (newCourse) => set({ course: newCourse }),
}));

export default useCourseStore;