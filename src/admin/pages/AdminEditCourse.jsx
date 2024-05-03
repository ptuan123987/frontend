import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import MainDash from "../components/MainDash/MainDash";
import CategoriesService from "../../customer/services/CategoriesService";
import useCategoriesStore from "../../customer/stores/useCategoriesStore";
import CourseService from "../../customer/services/CourseService";
import SuccessModal from "../../customer/components/modal/SuccessModal";
import useCourseStore from "../../customer/stores/useCourseStore";
const AdminEditCourse = () => {
  const navigate = useNavigate();

  const { categories, setCategories } = useCategoriesStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const parentCategories = async () => {
      try {
        const categories = await CategoriesService.filterParentCategories();
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    parentCategories();
  }, []);

  useEffect(() => {}, [categories]);

  useEffect(() => {
    console.log("Selected Category ID:", selectedCategoryId);
  }, [selectedCategoryId]);

  useEffect(() => {
    if (courses.length === 1) {
      const defaultCourseId = courses[0].id;
      setSelectedCourseId(defaultCourseId);
      console.log(selectedCourseId);
    }
  }, [courses]);

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

  useEffect(() => {
    console.log("Selected Category ID:", selectedCategoryId);
  }, [selectedCategoryId]);

  useEffect(() => {
    if (courses.length === 1) {
      const defaultCourseId = courses[0].id;
      setSelectedCourseId(defaultCourseId);
    }
  }, [courses]);

  const handleSubcategoryChange = async (e) => {
    const subcategoryId = parseInt(e.target.value);
    console.log("Selected Subcategory ID:", subcategoryId);
    setSelectedSubcategoryId(subcategoryId);

    await getCourseByCategoriesId();

    if (courses.length === 1) {
      setSelectedCourseId(courses[0].id);
    } else {
      setSelectedCourseId(null);
    }
  };

  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value);
    console.log("Selected Course ID:", courseId);
    setSelectedCourseId(courseId);

    if (courseId) {
      const selectedCourse = courses.find((course) => course.id === courseId);

      if (selectedCourse) {
          setTitle(selectedCourse.title || "");
          setDescription(selectedCourse.description || "");
          setPrice(selectedCourse.price || "");
          setAuthor(selectedCourse.author || "");
          setThumbnail(selectedCourse.thumbnail || "");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      course_id: selectedCourseId,
      title,
      description,
      price,
      author,
      thumbnail: thumbnail,
    };

    console.log(courseData);

    CourseService.editCourse(courseData).then(
      (response) => {
        console.log("Course edited successfully:", response);
        setShowSuccessModal(true);
      },
      (error) => {
        console.error("Error edited course:", error);
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
        <h3 className="text-center"> Form Update Course</h3>
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
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-700">
              Description for courses (require)
            </p>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="title" className="block mb-1">
              Price ($$)
            </label>
            <input
              type="number"
              id="title"
              className="w-full border p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="text-xs text-gray-700">(require numberic ) $</p>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="title" className="block mb-1">
              Author
            </label>
            <input
              type="text"
              id="title"
              className="w-full border p-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <p className="text-xs text-gray-700">Require Full Name</p>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="thumbnail" className="block mb-1">
              Thumbnail (Image)
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            <p className="text-xs text-gray-700">
              (Optional) Choose a thumbnail for the course.
            </p>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {showSuccessModal && (
            <SuccessModal onClick={() => setShowSuccessModal(false)}>
              <h2>Success!</h2>
              <p>Course updated successfully.</p>
            </SuccessModal>
          )}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
              onClick={handleSubmit}
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminEditCourse;
