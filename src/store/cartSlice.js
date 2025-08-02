import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'



// Fetch cart
export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const res = await api.get('/cart');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Add to cart
export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity }, thunkAPI) => {
  try {
    const res = await api.post('/cart/add', { productId, quantity });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Update cart item
export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, quantity }, thunkAPI) => {
  try {
    const res = await api.put('/cart/update', { productId, quantity });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Remove from cart
export const removeFromCart = createAsyncThunk('cart/remove', async (productId, thunkAPI) => {
  try {
    const res = await api.delete('/cart/remove', { data: { productId } });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Clear cart
export const clearCart = createAsyncThunk('cart/clear', async (_, thunkAPI) => {
  try {
    const res = await api.delete('/cart/clear');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.items = action.payload.items; })
      .addCase(updateCartItem.fulfilled, (state, action) => { state.items = action.payload.items; })
      .addCase(removeFromCart.fulfilled, (state, action) => { state.items = action.payload.items; })
      .addCase(clearCart.fulfilled, (state, action) => { state.items = []; });
  }
});

export default cartSlice.reducer;