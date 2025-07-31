import React, { useState } from 'react';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../api'

const PaymentForm = ({ orderId }) => {
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);

  const handlePaystackPay = async () => {
    setLoading(true);
    try {
      const res = await api.post('/orders/pay/paystack', {
        orderId,
        email: user.email,
      });
      window.location.href = res.data.authorization_url;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePaystackPay}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Pay with Paystack'}
      </button>
    </div>
  );
};

export default PaymentForm;