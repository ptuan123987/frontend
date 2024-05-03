import { create } from 'zustand';
import axios from 'axios';
import { API_URL, access_token } from "../../Constants";

const usePaidCoursesStore = create((set) => ({
    paidCourses: [],
    addPaidCourse: (course) => set((state) => ({ paidCourses: [...state.paidCourses, course] })),
   
    fetchPaidCourse: async (pageNum, pageSize) => { 
        try {
            const response = await axios.get(API_URL + 'api/user/paid-courses', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                params: {
                    pageNum,
                    pageSize,
                },
            });
            set({ paidCourses: response.data.data || [] });
            console.log(response.data.data)
        } catch (error) {
            console.error('Could not fetch wishlist', error);
            set({ paidCourses: [] });
        }
    },
}));

export default usePaidCoursesStore;
