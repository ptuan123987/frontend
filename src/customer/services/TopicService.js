// TopicService.js
import axios from "axios";
import { API_URL } from "../../Constants";

const getCoursesByTopicId = async (id) => {
  try {
    const response = await axios.get(API_URL + `api/topics/${id}/courses`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting courses by topic:", error.message);
    throw error;
  }
};

const TopicService = {
  getCoursesByTopicId,
};

export default TopicService;
