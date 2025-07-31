import React from 'react';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <PaymentForm orderId={orderId} />
    </div>
  );
};

export default Payment;