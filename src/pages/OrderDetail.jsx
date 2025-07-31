import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../store/orderSlice';
import { useParams } from 'react-router-dom';
import OrderStatusStepper from '../components/OrderStatusStepper';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [id, dispatch]);

  if (loading || !order) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order #{order._id}</h2>
      <OrderStatusStepper currentStatus={order.status} />
      <div className="mb-4">
        <b>Shipping:</b> {order.shipping.fullName}, {order.shipping.street}, {order.shipping.city}, {order.shipping.country}
      </div>
      <div className="mb-4">
        <b>Payment:</b> {order.payment.method} ({order.payment.status})
      </div>
      <div className="mb-4">
        <b>Items:</b>
        {order.items.map(item => (
          <div key={item.product} className="flex items-center">
            <img src={item.image || '/placeholder.png'} alt={item.name} className="h-8 w-8 object-cover rounded mr-2" />
            <span>{item.name} x {item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="font-bold">Total: ₦{order.total}</div>
    </div>
  );
};

export default OrderDetail;