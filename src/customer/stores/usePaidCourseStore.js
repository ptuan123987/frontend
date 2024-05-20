import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../../Constants";
import { persist } from "zustand/middleware";
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";

const access_token = localStorage.getItem("access_token");
const debounceTime = 300;

const usePaidCourseStore = create(persist((set) => {
    const fetchPaidCourseDebounced = debounce(async (pageNum, pageSize) => {
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
        } catch (error) {
            set({ paidCourses: [] });
            console.error("Failed to fetch paid courses:", error);
        }
    }, debounceTime);

    return {
        paidCourses: [],
        addPaidCourse: async (course) => {
            try {
                await axios.post(API_URL + 'api/user/paid-courses', {
                    course_id: course.id
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                set((state) => ({ paidCourses: [...state.paidCourses, course] }));
            } catch (error) {
                console.error("Error adding paid course:", error);
            }
        },
        fetchPaidCourse: (pageNum, pageSize) => {
            return new Promise((resolve, reject) => {
                fetchPaidCourseDebounced(pageNum, pageSize);
                resolve();
            });
        }
    };
}, {
    name: "usePaidCourseStore"
}));

export default usePaidCourseStore;
