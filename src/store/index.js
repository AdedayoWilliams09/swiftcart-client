import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import orderReducer from './orderSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});

export default store;