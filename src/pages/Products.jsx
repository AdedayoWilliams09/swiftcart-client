import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const dispatch = useDispatch();
  const { products, total, page, pages, loading, error } = useSelector(state => state.products);

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const query = useQuery();
  const navigate = useNavigate();
  const urlCategory = query.get('category') || '';
  const [category, setCategory] = useState(urlCategory);

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Category load error:', err));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ search, category, page: pageNum }));
  }, [search, category, pageNum, dispatch]);

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setPageNum(1);
    if (catId) {
      navigate(`/products?category=${encodeURIComponent(catId)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} selected={category} onChange={handleCategoryChange} />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) =>
            product && typeof product === 'object' ? (
              <ProductCard key={product._id} product={product} />
            ) : null
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">No products found.</div>
      )}

      <Pagination page={page} pages={pages} onPageChange={setPageNum} />
    </div>
  );
};

export default Products;
