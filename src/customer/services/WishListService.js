import axios from "axios";
import { API_URL } from "../../Constants";

const access_token = localStorage.getItem("access_token");
const addCourseToWishlist = async (courseId) => {
    try {
        const response = await axios.post(API_URL + `api/user/wishlists`,{
            course_id :courseId
          }, {headers: {
            Authorization: `Bearer ${access_token}`,
          },});
        return response;
      } catch (error) {
        throw error;
      }
}
const removeCourseToWishlist = async (id) => {
    try {
        const response = await axios.delete(API_URL + `api/user/wishlists/${id}`,{
            id :id
        }, {headers: {
            Authorization: `Bearer ${access_token}`,
        },});

        return response
    } catch (error) {
        throw error;
    }
}
const getAllWishlist = async() => {
    try {
        const response = await axios.get(API_URL + `api/user/wishlists`, 
        { 
            headers: {
                Authorization: `Bearer ${access_token}`,
        },});

        return response.data;
    } catch (error) {
        throw error;
    }
}
const WishListService = {
    addCourseToWishlist,
    removeCourseToWishlist,
    getAllWishlist
}
export default WishListService;