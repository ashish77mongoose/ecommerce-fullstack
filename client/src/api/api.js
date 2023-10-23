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
export const addCategory = (formData) => API.post("categories",formData);
export const getAllSubCategories = (formData) =>
  API.post("sub-categories", formData);

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
