import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import AddressForm from '../components/AddressForm';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../store/orderSlice';

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState(null);
  const [billing, setBilling] = useState(null);
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShipping = (data) => {
    setShipping(data);
    setStep(1);
  };

  const handleBilling = (data) => {
    setBilling(data);
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPayment({ method: 'paystack' }); // Use 'paystack'
    setStep(3);
  };

  const handleReview = async () => {
    try {
      const res = await dispatch(placeOrder({
        shipping,
        billing,
        paymentMethod: 'paystack',
      }));

      if (res.payload && res.payload._id) {
        toast.success('Order placed!');
        navigate(`/payment/${res.payload._id}`);
      } else {
        console.error('Order placement error:', res);
        toast.error('Order placement failed');
      }
    } catch (err) {
      console.error('Order placement exception:', err);
      toast.error('Order placement failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={step} />
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <AddressForm onSubmit={handleShipping} buttonText="Continue to Billing" />
        </div>
      )}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Billing Address</h2>
          <AddressForm onSubmit={handleBilling} buttonText="Continue to Payment" />
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <form onSubmit={handlePayment}>
            <div className="mb-4">Payment method: <b>Paystack</b></div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Continue to Review</button>
          </form>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Review Order</h2>
          <div className="mb-2"><b>Shipping:</b> {shipping?.fullName}, {shipping?.street}, {shipping?.city}</div>
          <div className="mb-2"><b>Billing:</b> {billing?.fullName}, {billing?.street}, {billing?.city}</div>
          <div className="mb-2"><b>Payment:</b> Paystack</div>
          <button onClick={handleReview} className="bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;