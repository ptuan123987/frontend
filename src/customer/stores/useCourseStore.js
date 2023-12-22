import { create } from 'zustand';

const useCourseStore = create((set) => ({
  course: null,
  setCourse: (newCourse) => set({ course: newCourse }),
}));

export default useCourseStore;