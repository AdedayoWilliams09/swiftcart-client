import React from 'react';

const steps = ['Shipping', 'Billing', 'Payment', 'Review'];

const CheckoutSteps = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((step, idx) => (
      <div key={step} className="flex-1 flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
          {idx + 1}
        </div>
        <div className={`mt-2 text-sm ${idx === currentStep ? 'font-bold text-green-600' : ''}`}>{step}</div>
      </div>
    ))}
  </div>
);

export default CheckoutSteps;