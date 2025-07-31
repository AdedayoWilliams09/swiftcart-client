import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
    <Link to="/products" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Continue Shopping</Link>
  </div>
);

export default OrderSummary;