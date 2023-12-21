import React from "react";
import "../MainDash/MainDash.css";

const CourseForm = () => {

    
  return (
    <div className="MainDash bg-gray-100 p-6 rounded-md">
      <h3 className="text-center">Form Add New Course</h3>
      <form>
        <div className="form-group mb-4">
          <label htmlFor="categories" className="block mb-2 font-bold">
            Categories
          </label>
          <select id="categories" className="w-full border p-2">
            <option>English (US)</option>
            <option>French</option>
            <option>Korean</option>
            <option>Japanese</option>
          </select>

          <label htmlFor="categories" className="block mb-2 font-bold">
            Sub Categories
          </label>
          <select id="categories" className="w-full border p-2">
            <option>English (US)</option>
            <option>French</option>
            <option>Korean</option>
            <option>Japanese</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border p-2"
            //   value={displayName}
            //   onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea id="description" className="w-full border p-2"></textarea>
          <p className="text-xs text-gray-700">
            Description for courses (require)
          </p>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="title" className="block mb-1">
            Price ($$)
          </label>
          <input
            type="text"
            id="title"
            className="w-full border p-2"
            //   value={displayName}
            //   onChange={(e) => setDisplayName(e.target.value)}
          />
          <p className="text-xs text-gray-700">
            $$$$$
          </p>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="title" className="block mb-1">
           Author
          </label>
          <input
            type="text"
            id="title"
            className="w-full border p-2"
            //   value={displayName}
            //   onChange={(e) => setDisplayName(e.target.value)}
          />
          <p className="text-xs text-gray-700">
           Require Full Name
          </p>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};
export default CourseForm;
