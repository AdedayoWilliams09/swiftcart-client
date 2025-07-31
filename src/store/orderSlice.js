import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'

export const placeOrder = createAsyncThunk('order/place', async (data, thunkAPI) => {
  try {
    const res = await api.post('/orders', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchOrders = createAsyncThunk('order/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/orders/my');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchOrder = createAsyncThunk('order/fetchOne', async (id, thunkAPI) => {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.loading = false; state.order = action.payload; })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.orders = action.payload; })
      .addCase(fetchOrder.fulfilled, (state, action) => { state.order = action.payload; });
  }
});

export default orderSlice.reducer;