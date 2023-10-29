import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserCarts: (state, action) => {
      state.user.carts = [...state.user.carts,action.payload];
    },
    updateWholeCarts: (state, action) => {
        state.user.carts =action.payload;
      },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLogout: (state, action) => {
      localStorage.removeItem("ashishToken");
      state.user = null;
    },
  },
  extraReducers: {},
});

export const { setUser, setLogout, updateUser,updateUserCarts,updateWholeCarts } = authSlice.actions;

export default authSlice.reducer;
