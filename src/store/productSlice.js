import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetch', async (params, thunkAPI) => {
  try {
    const res = await api.get('/products', { params });
    return res.data;
  } catch (err) {
    const msg = err?.response?.data?.message || 'Failed to fetch products';
    return thunkAPI.rejectWithValue(msg);
  }
});

// Fetch single product
export const fetchProduct = createAsyncThunk('products/fetchOne', async (id, thunkAPI) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    const msg = err?.response?.data?.message || 'Product not found';
    return thunkAPI.rejectWithValue(msg);
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
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload.products) ? action.payload.products : [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
