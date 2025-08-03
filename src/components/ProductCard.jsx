import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  if (!product || typeof product !== 'object') return null;

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add to cart!');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error('Please login to add to wishlist!');
      navigate('/login');
      return;
    }
    dispatch(addToWishlist(product._id));
    toast.success('Added to wishlist!');
  };

  const imageUrl =
    product.images && Array.isArray(product.images) && product.images[0] && product.images[0].url
      ? product.images[0].url
      : '/placeholder.png';

  return (
    <motion.div
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
      whileHover={{
        scale: 1.04,
        y: -8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/products/${product._id}`}>
        <motion.img
          src={imageUrl}
          alt={product.name || 'Product'}
          className="w-full h-48 object-cover rounded mb-2"
          whileHover={{ scale: 1.08, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h3 className="font-bold text-lg mb-1">{product.name || 'No Name'}</h3>
        <p className="text-green-600 font-semibold text-xl mb-1">
          ₦{typeof product.price === 'number' ? product.price.toLocaleString() : '0.00'}
        </p>
        <p className="text-gray-500 text-sm mb-2">{product.brand || ''}</p>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{product.rating || 0}</span>
        </div>
      </Link>
      <div className="mt-2 flex space-x-2">
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Add to Wishlist
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;