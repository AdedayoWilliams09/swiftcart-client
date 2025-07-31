import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../api'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted!');
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id} className="border-t">
              <td className="p-2">
                <img src={prod.images[0]?.url || '/placeholder.png'} alt={prod.name} className="h-12 w-12 object-cover rounded" />
              </td>
              <td className="p-2">{prod.name}</td>
              <td className="p-2">${prod.price}</td>
              <td className="p-2">{prod.stock}</td>
              <td className="p-2">
                <Link to={`/admin/products/${prod._id}/edit`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;