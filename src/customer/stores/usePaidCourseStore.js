import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../../Constants";
import { persist } from "zustand/middleware";
import debounce from 'lodash/debounce';

const access_token = localStorage.getItem("access_token");
const debounceTime = 300;

const usePaidCourseStore = create(persist((set) => ({
    paidCourses: [],
    addPaidCourse: async (course) => {
        try {
            const response = await axios.post(API_URL + 'api/user/paid-courses', {
                course_id: course.id
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            set((state) => ({ paidCourses: [...state.paidCourses, course] }));
        } catch (error) {
            console.error('Could not add to paid courses', error);
        }
    },
    fetchPaidCourse: debounce(async (pageNum, pageSize) => {
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
            console.error('Could not fetch paid courses', error);
            set({ paidCourses: [] });
        }
    }, debounceTime),
}), {
    name: "usePaidCourseStore"
}));

export default usePaidCourseStore;
