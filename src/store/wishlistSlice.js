import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, thunkAPI) => {
  try {
    const res = await api.get('/wishlist');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId, thunkAPI) => {
  try {
    const res = await api.post('/wishlist/add', { productId });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (productId, thunkAPI) => {
  try {
    const res = await api.delete('/wishlist/remove', { data: { productId } });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.products || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToWishlist.fulfilled, (state, action) => { state.products = action.payload.products; })
      .addCase(removeFromWishlist.fulfilled, (state, action) => { state.products = action.payload.products; });
  }
});

export default wishlistSlice.reducer;