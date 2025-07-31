import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { width, height } = useWindowSize();

  return (
    <div className="container mx-auto px-4 py-16 text-center relative">
      {/* Confetti Animation */}
      <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
      <h2 className="text-3xl font-bold mb-4 text-green-600">Thank you for your order!</h2>
      <p className="mb-4">Your order <b>#{orderId}</b> has been placed successfully.</p>
      <Link
        to="/orders"
        className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold"
      >
        View My Orders
      </Link>
      <div className="mt-4">
        <Link to="/products" className="text-green-600 hover:underline">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;