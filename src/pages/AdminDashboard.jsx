import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../store/adminSlice';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDashboardStats());
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return (
    <div className="p-8 text-center text-red-600">
      Error: {error}
      <button
        onClick={handleRefresh}
        className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Retry
      </button>
    </div>
  );
  if (!stats) return <div className="p-8 text-center text-red-600">No stats available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleRefresh}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Sales" value={`₦${stats.totalSales?.toLocaleString() || 0}`} />
        <StatsCard title="Orders" value={stats.ordersCount || 0} />
        <StatsCard title="Users" value={stats.usersCount || 0} />
        <StatsCard title="Products" value={stats.productsCount || 0} />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Chart bestsellers={stats.bestsellers || []} />
      </motion.div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Low Stock Products</h3>
        <ul>
          {(stats.lowStock || []).length === 0 ? (
            <li className="text-gray-500">No low stock products.</li>
          ) : (
            stats.lowStock.map(prod => (
              <li key={prod._id} className="text-red-600">{prod.name} (Stock: {prod.stock})</li>
            ))
          )}
        </ul>
      </div>
      {/* Quick Links */}
      <div className="mt-12 space-y-4">
        <h3 className="text-xl font-bold mb-2">Quick Admin Actions</h3>
        <Link to="/admin/products/new" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</Link>
        <Link to="/admin/categories/new" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Category</Link>
        <Link to="/admin/products" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Manage Products</Link>
        <Link to="/admin/categories" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Manage Categories</Link>
        <Link to="/admin/reviews" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Moderate Reviews</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;