import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
import api from '../api'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(0),
  category: yup.string().required(),
  brand: yup.string(),
  stock: yup.number().required().min(0),
});

const AdminProductForm = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
    if (id) {
      api.get(`/products/${id}`).then(res => {
        const { name, description, price, category, brand, stock } = res.data;
        setValue('name', name);
        setValue('description', description);
        setValue('price', price);
        setValue('category', category?._id);
        setValue('brand', brand);
        setValue('stock', stock);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }
    try {
      if (id) {
        await api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated!');
      } else {
        await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product created!');
      }
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Product</h2>
      <input {...register('name')} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" />
      <textarea {...register('description')} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded resize-none" />
      <input type="number" {...register('price')} placeholder="Price" className="w-full mb-2 px-3 py-2 border rounded" />
      <select {...register('category')} className="w-full mb-2 px-3 py-2 border rounded">
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
      </select>
      <input {...register('brand')} placeholder="Brand" className="w-full mb-2 px-3 py-2 border rounded" />
      <input type="number" {...register('stock')} placeholder="Stock" className="w-full mb-2 px-3 py-2 border rounded" />
      <input type="file" {...register('images')} multiple className="w-full mb-2" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default AdminProductForm;