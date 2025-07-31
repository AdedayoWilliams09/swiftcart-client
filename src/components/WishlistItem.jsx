import React from 'react';
import { Link } from 'react-router-dom';

const WishlistItem = ({ product, onRemove }) => {
  if (!product) return null;

  const imageUrl =
    product.images && product.images.length > 0 && product.images[0].url
      ? product.images[0].url
      : '/placeholder.png';

  return (
    <div className="flex items-center border-b py-4">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-16 w-16 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <Link to={`/products/${product._id}`} className="font-bold">
          {product.name}
        </Link>
        <div className="text-gray-500">₦{product.price}</div>
      </div>
      <button
        onClick={() => onRemove(product._id)}
        className="text-red-600 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistItem;