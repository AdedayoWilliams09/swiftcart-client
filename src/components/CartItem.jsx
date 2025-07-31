import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onUpdate, onRemove }) => {
  if (!item || !item.product || typeof item.product.price !== 'number') return null;

  const imageUrl =
    item.product.images && item.product.images.length > 0 && item.product.images[0].url
      ? item.product.images[0].url
      : '/placeholder.png';

  const handleQuantityChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    onUpdate(item.product._id, value);
  };

  const handleIncrease = () => {
    onUpdate(item.product._id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdate(item.product._id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center border-b py-4">
      <img
        src={imageUrl}
        alt={item.product.name}
        className="h-16 w-16 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <Link to={`/products/${item.product._id}`} className="font-bold">
          {item.product.name}
        </Link>
        <div className="text-gray-500">
          ₦{item.product.price.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="px-2 py-1 bg-gray-200 rounded-l"
          disabled={item.quantity <= 1}
        >-</button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 border-t border-b border-gray-300 text-center"
        />
        <button
          onClick={handleIncrease}
          className="px-2 py-1 bg-gray-200 rounded-r"
        >+</button>
      </div>
      <button
        onClick={() => onRemove(item.product._id)}
        className="text-red-600 hover:underline ml-4"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;