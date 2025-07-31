import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../store/wishlistSlice';
import WishlistItem from '../components/WishlistItem';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.wishlist);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist!');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div>
          Please <Link to="/login" className="text-green-600">login</Link> to view your wishlist.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>Your wishlist is empty. <Link to="/products" className="text-green-600">Browse products</Link></div>
      ) : (
        products.map(product => (
          <WishlistItem key={product._id} product={product} onRemove={handleRemove} />
        ))
      )}
    </div>
  );
};

export default Wishlist;