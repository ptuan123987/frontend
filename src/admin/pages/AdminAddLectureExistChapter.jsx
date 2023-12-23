import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import MainDash from "../components/MainDash/MainDash";
import CategoriesService from "../../customer/services/CategoriesService";
import useCategoriesStore from "../../customer/stores/useCategoriesStore";
import CourseService from "../../customer/services/CourseService";
import SuccessModal from "../../customer/components/modal/SuccessModal";
import useCourseStore from "../../customer/stores/useCourseStore";

const AdminAddLectureExistChapter = () => {
  const navigate = useNavigate();

  const { categories, setCategories } = useCategoriesStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  
  
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);

  const [resources, setResources] = useState([{ title: "", link: "" }]);



  useEffect(() => {
    const parentCategories = async () => {
      try {
        const categories = await CategoriesService.filterParentCategories();
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    parentCategories();
  }, []);

  useEffect(() => {}, [categories]);

  useEffect(() => {
    console.log("Selected Category ID:", selectedCategoryId);
  }, [selectedCategoryId]);

  const getCourseByCategoriesId = async () => {
    try {
      const courses = await CourseService.getCoursesBySubCategoryId(
        selectedSubcategoryId
      );
      setCourses(courses);
    } catch (error) {
      console.log("Error Fetching ");
    }
  };
  const getChapterByCourseId = async () => {
    try {
      const chapters = await CourseService.getChaptersByCourseId(
        selectedCourseId
      );
      setChapters(chapters);

      // Assuming lectures are available in the chapters response
      if (chapters.length > 0) {
        setSelectedChapter(chapters[0]);
      }
    } catch (error) {
      console.log("Error Fetching Chapters:", error);
    }
  };

  useEffect(() => {
    if (selectedSubcategoryId) {
      getCourseByCategoriesId(selectedSubcategoryId);
    }
  }, [selectedSubcategoryId]);
  useEffect(() => {
    if (selectedCourseId) {
      getChapterByCourseId(selectedCourseId);
      console.log("Selected Course ID:", selectedCourseId);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (courses.length === 1) {
      const defaultCourseId = courses[0].id;
      setSelectedCourseId(defaultCourseId);
  
      try {
        const chapters = CourseService.getChaptersByCourseId(
          defaultCourseId
        );
        setChapters(chapters);
      } catch (error) {
        console.log("Error fetching chapters:", error);
      }
    }
  }, [courses]);

  useEffect(() => {
    if (chapters.length === 1) {
      const defaultChapterId = chapters[0].id;
      setSelectedChapterId(defaultChapterId);
      setSelectedChapter(chapters[0]);
  
      if (chapters[0].lectures.length > 0) {
        setSelectedLectureId([chapters[0].lectures[0].id]);
      }
    }
  }, [chapters]);
  


  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );

    setSelectedCategory(selectedCategory);
    setSelectedCategoryId(categoryId);

    console.log("Selected Category:", selectedCategory);
    console.log("Selected Category ID:", selectedCategoryId);
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = parseInt(e.target.value);
    console.log("Selected Subcategory ID:", subcategoryId);
    setSelectedSubcategoryId(subcategoryId);
  };

  const handleCourseChange = async (e) => {
    const courseId = parseInt(e.target.value);
    console.log("Selected Course ID:", courseId);
    setSelectedCourseId(courseId);
    setSelectedChapterId(null);

    try {
      const chapters = await CourseService.getChaptersByCourseId(courseId);
      setChapters(chapters);
    } catch (error) {
      console.log("Error fetching chapters:", error);
    }
  };

  const handleChapterChange = (e) => {
    const chapterId = parseInt(e.target.value);
    const selectedChapter = chapters.find(
      (chapter) => chapter.id === chapterId
    );

    setSelectedChapter(selectedChapter);
    setSelectedChapterId(chapterId);
    setSelectedLectureId([]); 
    // Reset selected lectures when a new chapter is selected
    console.log("Selected Chapter ID:", selectedChapter.id);
  };


  const handleAddResource = () => {
    setResources([...resources, { title: "", link: "" }]);
  };

  const handleRemoveResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...resources];
    updatedResources[index][field] = value;
    setResources(updatedResources);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const lectureData = {
      chapter_id: selectedChapter.id,
      title,
      video,
      thumbnailImg,
      resources,
    };
    console.log(lectureData);

    CourseService.createLecture(lectureData).then(
      (response) => {
        console.log("Lecture created successfully:", response);
        setShowSuccessModal(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorMessage(resMessage);
      }
    );
  };

  return (
    <AdminLayout>
      <div className="MainDash bg-gray-100 p-6 rounded-md">
        <h3 className="text-center">Form Add New Chapter</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="categories" className="block mb-2 font-bold">
              Categories
            </label>
            <select
              id="categories"
              className="w-full border p-2"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.id}
                </option>
              ))}
            </select>

            <label htmlFor="subcategories" className="block mb-2 font-bold">
              Sub Categories
            </label>
            <select
              id="subcategories"
              className="w-full border p-2"
              onChange={handleSubcategoryChange}
            >
              {selectedCategory &&
                selectedCategory.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name} {subcategory.id}
                  </option>
                ))}
            </select>

            {courses.length > 0 && (
              <div>
                <label htmlFor="courses" className="block mb-2 font-bold">
                  Courses
                </label>
                <select
                  id="courses"
                  className="w-full border p-2"
                  onChange={handleCourseChange}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} {course.id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Display Chapters dropdown if a course is selected */}
            {chapters.length > 0 && (
              <div>
                <label htmlFor="chapters" className="block mb-2 font-bold">
                  Chapters
                </label>
                <select
                  id="chapters"
                  className="w-full border p-2"
                  onChange={handleChapterChange}
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title} {chapter.id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Display Lectures dropdown if a chapter is selected */}
            {selectedChapter && selectedChapter.lectures.length > 0 && (
              <div>
                <label htmlFor="lectures" className="block mb-2 font-bold">
                  Lectures
                </label>
                <select
                  id="lectures"
                  className="w-full border p-2"
                  onChange={(e) =>
                    setSelectedLectureId([parseInt(e.target.value)])
                  }
                >
                  {selectedChapter.lectures.map((lecture) => (
                    <option key={lecture.id} value={lecture.id}>
                      {lecture.title} {lecture.id}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="video" className="block mb-1">
              Video
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <p className="text-xs text-gray-700">
              Choose a video for the lecture.
            </p>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="thumbnailImg" className="block mb-1">
              Thumbnail (Image)
            </label>
            <input
              type="file"
              id="thumbnailImg"
              accept="image/*"
              onChange={(e) => setThumbnailImg(e.target.files[0])}
            />
            <p className="text-xs text-gray-700">
              (Optional) Choose a thumbnail for the lecture.
            </p>
          </div>

          {resources.map((resource, index) => (
            <div key={index} className="form-group mb-4">
              <label htmlFor={`resourceTitle${index}`} className="block mb-1">
                Resource Title
              </label>
              <input
                type="text"
                id={`resourceTitle${index}`}
                className="w-full border p-2"
                value={resource.title}
                onChange={(e) =>
                  handleResourceChange(index, "title", e.target.value)
                }
              />

              <label
                htmlFor={`resourceLink${index}`}
                className="block mb-1 mt-2"
              >
                Resource Link
              </label>
              <input
                type="text"
                id={`resourceLink${index}`}
                className="w-full border p-2"
                value={resource.link}
                onChange={(e) =>
                  handleResourceChange(index, "link", e.target.value)
                }
              />
              <p className="text-xs text-gray-700">
                (Optional) Choose a resource for the lecture.
              </p>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveResource(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Resource
                </button>
              )}
            </div>
          ))}

          <div className="form-group mb-4">
            <button
              type="button"
              className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
              onClick={handleAddResource}
            >
              Add Resource
            </button>
          </div>

          {showSuccessModal && (
            <SuccessModal onClick={() => setShowSuccessModal(false)}>
              <h2>Success!</h2>
              <p>Lecture created successfully.</p>
            </SuccessModal>
          )}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
              onClick={handleSubmit}
            >
              Create Lecture
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminAddLectureExistChapter;
