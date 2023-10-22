import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    categories: [],
    myPosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCategoriesOfPost: (state, action) => {
      state.categories = action.payload;
    },
    updatePosts: (state, action) => {
      state.posts = state.posts.map((item) =>
        item._id === action.payload._id
          ? { ...item, likes: action.payload.likes }
          : item
      );
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    updateMyPosts: (state, action) => {
      state.myPosts = state.myPosts.filter((item) =>
        item._id !== action.payload
         
      );
    },
  },
  extraReducers: {},
});

export const {
  setPosts,
  updatePosts,
  setMyPosts,
  updateMyPosts,
  setCategoriesOfPost,
} = postSlice.actions;

export default postSlice.reducer;
