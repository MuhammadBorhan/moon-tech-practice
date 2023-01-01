import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  deleteSuccess: false,
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

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id, thunkAPI) => {
    const res = await axios.delete(`http://localhost:5000/product/${id}`);
    thunkAPI.dispatch(removeFromList(id));
    return res.data.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removeFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
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
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        state.deleteSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.deleteSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } =
  productsSlice.actions;

export default productsSlice.reducer;
