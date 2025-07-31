import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/orderSlice';
import OrderCard from '../components/OrderCard';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div>No orders yet.</div>
      ) : (
        orders.map(order => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default OrderHistory;