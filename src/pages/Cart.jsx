import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleUpdate = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity }));
    toast.success('Cart updated!');
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed!');
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.success('Cart cleared!');
  };

  // Defensive subtotal calculation
  const subtotal = Array.isArray(items) && items.length > 0
    ? items
        .filter(item => item && item.product && typeof item.product.price === 'number')
        .reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    : 0;

 

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div>
          Please <Link to="/login" className="text-green-600">login</Link> to view your cart.
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(items)) {
    return <div className="text-red-500">Error loading cart. {typeof items === 'object' && items?.message ? items.message : ''}</div>;
  }

  if (items.length === 0) {
    return <div>Your cart is empty. <Link to="/products" className="text-green-600">Shop now</Link></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <>
        {items
          .filter(item => item && item.product && typeof item.product.price === 'number')
          .map(item => (
            <CartItem
              key={item.product?._id || item._id || Math.random()}
              item={item}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        <div className="flex justify-between items-center mt-6">
          <div className="font-bold text-xl">Subtotal: ₦{subtotal.toLocaleString()}</div>
          <div>
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Cart;