import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order }) => (
  <div className="bg-white rounded shadow p-4 mb-4">
    <div className="flex justify-between items-center">
      <div>
        <div className="font-bold">Order #{order._id}</div>
        <div className="text-gray-500">Placed: {new Date(order.createdAt).toLocaleString()}</div>
        <div>Status: <span className="font-semibold">{order.status}</span></div>
      </div>
      <Link to={`/order-detail/${order._id}`} className="text-green-600 hover:underline">View Details</Link>
    </div>
    <div className="mt-2">
      {order.items.map(item => (
        <div key={item.product} className="flex items-center">
          <img src={item.image || '/placeholder.png'} alt={item.name} className="h-8 w-8 object-cover rounded mr-2" />
          <span>{item.name} x {item.quantity}</span>
        </div>
      ))}
    </div>
    <div className="mt-2 font-bold">Total: ₦{order.total}</div>
  </div>
);

export default OrderCard;