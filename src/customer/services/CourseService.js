import axios from "axios";
import { API_URL } from "../../Constants";

const createCourse = async ({
  category_ids,
  title,
  description,
  price,
  author,
  thumbnail,
}) => {
  const courseData = new FormData();

  category_ids.forEach((id, index) => {
    courseData.append(`category_ids[${index}]`, id);
  });

  courseData.append("title", title);
  courseData.append("description", description);
  courseData.append("price", price);
  courseData.append("author", author);

  courseData.append("thumbnail", thumbnail);

  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.post(API_URL + "api/courses", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("Course created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error.message);
    throw error;
  }
};

const createChapter = async ({ course_id, title }) => {
  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.post(
      API_URL + "api/chapters",
      {
        course_id,
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error.message);
  }
};

const createLecture = async ({
  chapter_id,
  title,
  video,
  thumbnailImg,
  resources,
}) => {
  const lectureData = new FormData();

  lectureData.append("chapter_id", chapter_id);
  lectureData.append("title", title);
  lectureData.append("video", video);
  lectureData.append("thumbnail_img", thumbnailImg);

  resources.forEach((resource, index) => {
    lectureData.append(`resources[${index}][title]`, resource.title);
    lectureData.append(`resources[${index}][link]`, resource.link);
  });

  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.post(API_URL + "api/lectures", lectureData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("Lecture created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating lecture:", error.message);
    throw error;
  }
};

const CourseService = {
  createCourse,
  createChapter,
  createLecture,
};

export default CourseService;
