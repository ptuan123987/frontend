import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import MainDash from "../components/MainDash/MainDash";
import CourseForm from "../components/Form/CourseForm";
import CategoriesService from "../../customer/services/CategoriesService";
import useCategoriesStore from "../../customer/stores/useCategoriesStore";
import CourseService from "../../customer/services/CourseService";
import SuccessModal from "../../customer/components/modal/SuccessModal";
import useCourseStore from "../../customer/stores/useCourseStore";
import useChapterStore from "../../customer/stores/useChapterStore";
const AdminAddChapter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const courseData = useCourseStore((state) => state.course);

  const setChapter = useChapterStore((state) => state.setChapter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course_id = courseData.data.id;
    if (course_id) {
      const chapterData = {
        course_id,
        title,
      };
      CourseService.createChapter(chapterData).then(
        (response) => {
          console.log("Chapter created successfully:", response);
          setChapter(response);
          setShowSuccessModal(true);
          setTimeout(() => {
            navigate('/admin/add-course/add-chapter/add-lecture');
          }, 500);
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
    }
  };

  return (
    <AdminLayout>
      <div className="MainDash bg-gray-100 p-6 rounded-md">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-5">Step 2 :Form Add New Chapter</h3>
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
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {showSuccessModal && (
            <SuccessModal onClick={() => setShowSuccessModal(false)}>
              <h2>Success!</h2>
              <p>Chapter Created successfully.</p>
            </SuccessModal>
          )}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
              onClick={handleSubmit}
            >
              Create Chapter
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminAddChapter;
