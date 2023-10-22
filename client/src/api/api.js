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

// Posts
export const createPost = (formData) => API.post("posts", formData);
export const addToFavourite = (id) => API.get(`posts/favourite/${id}`);
export const removeFromFavourites = (id) =>
  API.get(`posts/remove-favourite/${id}`);
export const uploadImage = (formData) => API.post("upload", formData);
export const postComment = (formData) => API.post("posts/comment", formData);
export const postCommentReply = (formData) =>
  API.post("posts/comment-reply", formData);
export const updateComment = (id, formData) =>
  API.patch(`posts/update-comment/${id}`, formData);
export const updateCommentReply = (id, formData) =>
  API.patch(`posts/update-comment-reply/${id}`, formData);

export const getPosts = (page, searchText, tag) =>
  API.get(`posts?page=${page}&search=${searchText}&tag=${tag}`);
export const getFavouritePosts = (page) =>
  API.get(`posts/favourite?page=${page}`);

export const getRecentPosts = () => API.get("posts/recent-posts");
export const getPostByTags = (form) => API.post("posts/related", form);
export const getCategoriesOfPosts = () => API.get("posts/categories");

export const getUserPosts = (id, page) =>
  API.get(`posts/me/${id}?page=${page}`);
export const getSinglePost = (id) => API.get(`posts/${id}`);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const postLike = (id) => API.patch(`posts/${id}/like`);
export const updatePost = (id, formData) => API.patch(`/posts/${id}`, formData);

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
export const getUsers = () => API.get("auth/all-users");
export const addFollower = (formData) =>
  API.post("auth/add-follower", formData);
export const removeFollower = (formData) =>
  API.post("auth/remove-follower", formData);
export const addUserDetails = (formData) =>
  API.post("auth/user-details", formData);
