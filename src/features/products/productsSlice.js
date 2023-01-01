import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    // const res = await fetch("http://localhost:5000/products");
    // const data = await res.json();
    // return data.data
    const res = await axios.get("http://localhost:5000/products");
    return res.data.data;
  }
);

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (productData) => {
    const res = await axios.post("http://localhost:5000/product", productData);
    return res.data.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProducts.fulfilled, (state) => {
        state.postSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.postSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
