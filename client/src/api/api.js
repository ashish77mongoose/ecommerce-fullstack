import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("ashishToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("ashishToken")}`;
  }
  return req;
});

// Category API

export const getCategories = () => API.get("categories");
export const addCategory = (formData) => API.post("categories", formData);
export const deleteCategory = (id) => API.delete(`categories/${id}`);
export const updateCategory = (id, formData) =>
  API.put(`categories/${id}`, formData);

// Products
export const getProducts = () => API.get("products");
export const addProduct = (formData) => API.post("products", formData);
export const deleteProduct = (id) => API.delete(`products/${id}`);
export const updateProduct = (id, formData) =>
  API.put(`products/${id}`, formData);
export const deleteProductImage = (id, formData) =>
  API.put(`products/delete-product-image/${id}`, formData);


// Sub Category
export const addSubCategory = (formData) =>
  API.post("sub-categories/add", formData);
export const deleteSubCategory = (id) => API.delete(`sub-categories/${id}`);
export const updateSubCategory = (id, formData) =>
  API.put(`sub-categories/${id}`, formData);
export const getAllSubCategories = (formData) =>
  API.post("sub-categories", formData);
export const getSubCategories = (formData) =>
  API.get("sub-categories", formData);

// Product API
export const getFeaturedProducts = () => API.get("products/featured");
export const getAllProducts = () => API.get("products");
export const getSingleProduct = (id) => API.get(`products/${id}`);

// User
export const login = (formData) => API.post(`auth/login`, formData);
export const register = (formData) => API.post(`auth/register`, formData);
export const forgotRequest = (formData) =>
  API.post(`auth/requestResetPassword`, formData);
export const resetPassword = (formData) =>
  API.post(`auth/resetPassword`, formData);
export const uploadProfileImage = (id, formData) =>
  API.post(`auth/profileImage/${id}`, formData);
export const getUser = () => API.get("auth/profile");
