import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'



// Fetch products
export const fetchProducts = createAsyncThunk('products/fetch', async (params, thunkAPI) => {
  try {
    const res = await api.get('/products', { params });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Fetch single product
export const fetchProduct = createAsyncThunk('products/fetchOne', async (id, thunkAPI) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    total: 0,
    page: 1,
    pages: 1,
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProduct.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; })
      .addCase(fetchProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;