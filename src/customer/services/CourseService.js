import axios from "axios";
import { API_URL } from "../../Constants";
import { ToastContainer, toast } from 'react-toastify';

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

const getCoursesBySubCategoryId = async (id) => {
  return axios
    .get(API_URL + `api/categories/${id}/courses`)
    .then(async (res) => {
      return res.data.data;
    });
};

const getChaptersByCourseId = async (id) => {
  return axios.get(API_URL + `api/courses/${id}/chapters`).then(async (res) => {
    return res.data.data;
  });
};
const getLecturesByChapterId = async () => {
  return axios.get(API_URL + ``).then(async (res) => {
    return res.data.data;
  });
};

const searchCourseByName = async (searchTerm) => {
  const response = await axios.get(
    API_URL +
      `api/search/courses?searchTerm=${searchTerm}&page_num=1&page_size=10`
  );
  return response.data.data;
};

const editCourse = async ({
  course_id,
  title,
  description,
  price,
  author,
  thumbnail,
}) => {
  const courseData = new FormData();

  courseData.append("course_id", course_id);
  courseData.append("title", title);
  courseData.append("description", description);
  courseData.append("price", price);
  courseData.append("author", author);

  courseData.append("thumbnail", thumbnail);

  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.put(
      API_URL + `api/courses/${course_id}`,
      courseData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Course created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error.message);
    throw error;
  }
};

const editChapter = async ({ course_id, title }) => {
  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.put(
      API_URL + `api/chapters/${course_id}`,
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
    console.error("Error updating course:", error.message);
  }
};

const editLecture = async ({
  lecture_id,
  title,
  video,
  thumbnailImg,
  resources,
}) => {
  const lectureData = new FormData();

  lectureData.append("id", lecture_id);
  lectureData.append("title", title);
  lectureData.append("video", video);
  lectureData.append("thumbnail_img", thumbnailImg);

  resources.forEach((resource, index) => {
    lectureData.append(`resources[${index}][title]`, resource.title);
    lectureData.append(`resources[${index}][link]`, resource.link);
  });

  try {
    const access_token = localStorage.getItem("access_token");

    const response = await axios.put(
      API_URL + `api/lectures/${lecture_id}`,
      lectureData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Lecture created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating lecture:", error.message);
    throw error;
  }
};
const checkPaidCourse = async (course_id) => {
  try {
    const access_token = localStorage.getItem("access_token");
  
    const response = await axios.get(
      API_URL + `api/check-paid-course/${course_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  
    return response.data;
  } catch (error) {
  }
}
const acceptCourse = async(course_id) => {
    const access_token = localStorage.getItem("access_token");
  
    const response = await axios.post(
      API_URL + `api/accept-course`,
      {
        course_id : course_id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(course_id);
    return response.data;
}

const CourseService = {
  createCourse,
  createChapter,
  createLecture,
  getCoursesBySubCategoryId,
  getChaptersByCourseId,
  searchCourseByName,
  editCourse,
  editChapter,
  editLecture,
  checkPaidCourse,
  acceptCourse
};

export default CourseService;
