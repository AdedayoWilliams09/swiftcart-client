import React, { useState } from 'react';
// import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api'

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/products/${productId}/reviews`, { rating, comment }, { withCredentials: true });
      toast.success('Review submitted!');
      setRating(5);
      setComment('');
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting review');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-gray-50 p-4 rounded">
      <div className="mb-2">
        <label className="block font-semibold mb-1">Your Rating</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border rounded px-2 py-1">
          {[5,4,3,2,1].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Comment</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} className="border rounded px-2 py-1 w-full" />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;