import axios from "axios";
import { API_URL } from "../../Constants";
const access_token = localStorage.getItem('access_token');
const MOMO = 'momo'
const MomoCheckoutCourse = async (amount, user_id, course_id) => {
    try {
        const response = await axios.post(API_URL + `api/user/check-out/momo`,{
            amount: amount,
            user_id: user_id,
            course_id: course_id,
            payment_type: "momo",
          }, {headers: {
            Authorization: `Bearer ${access_token}`,
          },});
        return response;
      } catch (error) {
        throw error;
    }
}

export const CheckoutService = {
  MomoCheckoutCourse
}