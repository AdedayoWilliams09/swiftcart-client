import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../api'
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/reviews', { withCredentials: true });
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load reviews');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatus = async (productId, reviewId, status) => {
    try {
      await api.put(`/admin/reviews/${productId}/${reviewId}`, { status }, { withCredentials: true });
      toast.success(`Review ${status}`);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update review');
    }
  };

  const handleDelete = async (productId, reviewId) => {
    try {
      await api.delete(`/admin/reviews/${productId}/${reviewId}`, { withCredentials: true });
      toast.success('Review deleted');
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Moderate Customer Reviews</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center">No reviews found.</div>
      ) : (
        <>
          {/* Table layout for md and above */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Rating</th>
                  <th className="px-4 py-2 text-left">Comment</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{r.productName}</td>
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{r.rating}</td>
                    <td className="px-4 py-2">{r.comment}</td>
                    <td className="px-4 py-2">{r.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      {r.status !== 'approved' && (
                        <button
                          onClick={() => handleStatus(r.productId, r._id, 'approved')}
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== 'hidden' && (
                        <button
                          onClick={() => handleStatus(r.productId, r._id, 'hidden')}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Hide
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r.productId, r._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile-friendly card layout */}
          <div className="md:hidden space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white rounded shadow p-4 space-y-2 border">
                <div><span className="font-semibold">Product:</span> {r.productName}</div>
                <div><span className="font-semibold">User:</span> {r.name}</div>
                <div><span className="font-semibold">Rating:</span> {r.rating}</div>
                <div><span className="font-semibold">Comment:</span> {r.comment}</div>
                <div><span className="font-semibold">Status:</span> {r.status}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {r.status !== 'approved' && (
                    <button
                      onClick={() => handleStatus(r.productId, r._id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== 'hidden' && (
                    <button
                      onClick={() => handleStatus(r.productId, r._id, 'hidden')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Hide
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r.productId, r._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReviews;
