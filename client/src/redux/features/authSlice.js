import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    carts:[],
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateCartItem: (state, action) => {
      state.carts = [...state.carts,action.payload];
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

export const { setUser, setLogout, updateUser,updateCartItem } = authSlice.actions;

export default authSlice.reducer;
