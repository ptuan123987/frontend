import axios from "axios";
import { API_URL } from "../../Constants";
const access_token = localStorage.getItem('access_token');
const MOMO = 'momo'
const MomoCheckoutCourse = async (amount, course_ids) => {
  try {
      const formData = new FormData();
      
      formData.append('amount', amount);

      course_ids.forEach((course_id, index) => {
          formData.append(`course_ids[${index}]`, course_id);
      });

      formData.append('payment_type', 'momo');

      const response = await axios.post(API_URL + 'api/user/check-out/momo', formData, {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'multipart/form-data'
          },
      });

      return response;
  } catch (error) {
      throw error;
  }
}
const VietQrCheckoutCourse = async (amount, course_ids) => {
  try {
      const formData = new FormData();
      
      formData.append('amount', amount);

      course_ids.forEach((course_id, index) => {
          formData.append(`course_ids[${index}]`, course_id);
      });

      formData.append('payment_type', 'payos');

      const response = await axios.post(API_URL + 'api/user/create-payment-link', formData, {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'multipart/form-data'
          },
      });

      return response;
  } catch (error) {
      throw error;
  }
}


export const CheckoutService = {
  MomoCheckoutCourse,
  VietQrCheckoutCourse
}