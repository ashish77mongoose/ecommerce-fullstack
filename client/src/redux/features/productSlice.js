import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateProducts: (state, action) => {
     
    },
    
  },
  extraReducers: {},
});

export const {
    setProducts,
    setCategories,
    updateProducts
} = productSlice.actions;

export default productSlice.reducer;
