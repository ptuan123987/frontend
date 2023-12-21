import axios from "axios";
import { API_URL } from "../../Constants";

const getAllCategories = () => {
  return axios.get(API_URL + "api/categories").then(async (res) => {
    return res.data.data;
  });
};

const filterParentCategories = async () => {
  try {
    const categories = await CategoriesService.getAllCategories();

    if (Array.isArray(categories)) {
      const filter = categories.filter(
        (element) => element.parent_category === null
      );


      return filter;
    } else {
      console.log("Categories is not an array.");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const filterSubCategories = async () => {
  try {
    const categories = await CategoriesService.getAllCategories();

    if (Array.isArray(categories)) {
      const filter = categories.filter(
        (element) => element.parent_category !== null
      );


      return filter;
    } else {
      console.log("Categories is not an array.");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const CategoriesService = {
  getAllCategories,
  filterParentCategories,
  filterSubCategories
};
export default CategoriesService;
