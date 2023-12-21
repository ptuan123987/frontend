import axios from 'axios';
import { API_URL } from '../../Constants';

const createCourse = async ({ category_ids, title, description, price, author }) => {
  const courseData = {
    category_ids,
    title,
    description,
    price,
    author,
  };

  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.post(API_URL + "api/courses", courseData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('Course created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error.message);
    throw error; 
  }
};

const CourseService = {
  createCourse,
};

export default CourseService;