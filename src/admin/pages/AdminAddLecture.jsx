import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import CategoriesService from "../../customer/services/CategoriesService";
import useCategoriesStore from "../../customer/stores/useCategoriesStore";
import CourseService from "../../customer/services/CourseService";
import SuccessModal from "../../customer/components/modal/SuccessModal";
import useChapterStore from "../../customer/stores/useChapterStore";

const AdminAddLecture = () => {
  const chapterData = useChapterStore((state) => state.chapter);

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);

  const [resources, setResources] = useState([{ title: "", link: "" }]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
//   console.log(chapterData.data.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lectureData = {
      chapter_id: chapterData.data.id,
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

  return (
    <AdminLayout>
      <div className="MainDash bg-gray-100 p-6 rounded-md">
        <h3 className="text-center">Step 3: Form Add New Lecture</h3>
        <form onSubmit={handleSubmit}>
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

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

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

export default AdminAddLecture;
