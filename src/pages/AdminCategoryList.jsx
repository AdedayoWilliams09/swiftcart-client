import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../api'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted!');
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting category');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <Link to="/admin/categories/new" className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Category</Link>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Parent</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id} className="border-t">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">{cat.parent ? cat.parent.name : '-'}</td>
              <td className="p-2">
                <Link to={`/admin/categories/${cat._id}/edit`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryList;