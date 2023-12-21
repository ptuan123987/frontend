import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import MainDash from "../components/MainDash/MainDash";
import CourseForm from "../components/Form/CourseForm";
import CategoriesService from "../../customer/services/CategoriesService";
import useCategoriesStore from "../../customer/stores/useCategoriesStore";
import CourseService from "../../customer/services/CourseService";
const AdminAddCourse = () => {
  const { categories, setCategories } = useCategoriesStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId ] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log("Selected Category ID:", selectedCategoryId);
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Check if both category and subcategory are selected
        if (selectedCategoryId && selectedSubcategoryId) {
          const courseData = {
            category_ids: [selectedCategoryId, selectedSubcategoryId],
            title,
            description,
            price,
            author,
          };
  
          const response = await CourseService.createCourse(courseData);
  
          console.log("Course created successfully:", response);
  
          // Optionally, reset the form fields
          setTitle("");
          setDescription("");
          setPrice("");
          setAuthor("");
        } else {
          console.error("Please select both category and subcategory");
        }
      } catch (error) {
        console.error("Error creating course:", error.message);
      }
    };
  
    
  }, [selectedCategoryId]);
  
  
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


  return (
    <AdminLayout>
      <div className="MainDash bg-gray-100 p-6 rounded-md">
        <h3 className="text-center">Form Add New Course</h3>
        <form>
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
            <select id="subcategories" className="w-full border p-2" onChange={handleSubcategoryChange}>
              {selectedCategory &&
                selectedCategory.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name} {subcategory.id}
                  </option>
                ))}
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

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
              onClick={handleSubmit}
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminAddCourse;
