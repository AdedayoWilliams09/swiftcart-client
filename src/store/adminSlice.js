import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'

// Dashboard stats
export const fetchDashboardStats = createAsyncThunk('admin/fetchStats', async (_, thunkAPI) => {
  try {
    const res = await api.get('/admin/dashboard');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Orders
export const fetchAdminOrders = createAsyncThunk('admin/fetchOrders', async (_, thunkAPI) => {
  try {
    const res = await api.get('/admin/orders');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Users
export const fetchAdminUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
  try {
    const res = await api.get('/admin/users');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Coupons
export const fetchCoupons = createAsyncThunk('admin/fetchCoupons', async (_, thunkAPI) => {
  try {
    const res = await api.get('/admin/coupons');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Banners
export const fetchBanners = createAsyncThunk('admin/fetchBanners', async (_, thunkAPI) => {
  try {
    const res = await api.get('/admin/banners');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    orders: [],
    users: [],
    coupons: [],
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => { state.loading = true; })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(fetchDashboardStats.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => { state.orders = action.payload; })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => { state.users = action.payload; })
      .addCase(fetchCoupons.fulfilled, (state, action) => { state.coupons = action.payload; })
      .addCase(fetchBanners.fulfilled, (state, action) => { state.banners = action.payload; });
  }
});

export default adminSlice.reducer;