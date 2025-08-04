import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';
import toast from 'react-hot-toast';
import ReviewForm from '../components/ReviewForm';

// Helper to render stars
const renderStars = (rating = 0) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className="text-yellow-400">★</span>);
  }
  if (halfStar) stars.push(<span key="half" className="text-yellow-400">☆</span>);
  while (stars.length < 5) {
    stars.push(<span key={stars.length} className="text-gray-300">★</span>);
  }
  return stars;
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

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

  if (loading || !product) return <div className="p-8 text-center">Loading...</div>;

  const approvedReviews = product.reviews?.filter(r => r.status === 'approved') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={product.images?.[0]?.url || '/placeholder.png'}
            alt={product.name}
            className="w-full max-w-xs h-96 object-cover rounded"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">{product.name}</h2>
          <p className="text-green-600 text-2xl font-semibold mb-2 text-center md:text-left">
            ₦{product.price.toLocaleString()}
          </p>
          <div className="flex items-center mb-2 justify-center md:justify-start">
            {renderStars(product.rating)}
            <span className="ml-2 text-gray-600 text-sm">
              {product.rating ? product.rating.toFixed(1) : 'No rating'}
              {product.numReviews ? ` (${product.numReviews} review${product.numReviews > 1 ? 's' : ''})` : ''}
            </span>
          </div>
          <p className="mb-4 text-center md:text-left">{product.description}</p>
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Category:</b> {product.category?.name}</p>
          <p><b>Stock:</b> {product.stock}</p>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full sm:w-auto"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>

        {/* No approved reviews */}
        {approvedReviews.length === 0 && (
          <div className="text-gray-500 mb-4">No approved reviews yet.</div>
        )}

        {/* Approved reviews list */}
        {approvedReviews.map((review) => (
          <div key={review._id || review.user} className="mb-4 border-b pb-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{review.name}</span>
              <span className="text-yellow-400 text-sm">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
            </div>
            <div className="text-gray-600 mt-1">{review.comment}</div>
            <div className="text-gray-400 text-xs mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}

        {/* Review form */}
        <div className="mt-8">
          <ReviewForm productId={product._id} onReviewAdded={() => dispatch(fetchProduct(id))} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;