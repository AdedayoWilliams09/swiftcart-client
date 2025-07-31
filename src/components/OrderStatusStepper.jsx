import React from 'react';

const statuses = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];

const OrderStatusStepper = ({ currentStatus }) => {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex items-center space-x-4 my-4">
      {statuses.map((status, idx) => (
        <div key={status} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
            ${idx <= currentIndex ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
            {idx + 1}
          </div>
          <div className={`ml-2 ${idx === currentIndex ? 'font-bold text-green-600' : ''}`}>{status}</div>
          {idx < statuses.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2"></div>}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusStepper;