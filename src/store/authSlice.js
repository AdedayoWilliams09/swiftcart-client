import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api'

// Set base URL for axios
api.defaults.baseURL = 'http://localhost:5000/api';
api.defaults.withCredentials = true;

// Thunks for async actions
export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
    return null;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  try {
    const res = await api.get('/auth/profile');
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; })
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.user = null; });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;