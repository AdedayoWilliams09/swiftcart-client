import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import api from '../api'
import { motion } from 'framer-motion';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes, bannerRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?limit=8'),
          api.get('/banners'),
        ]);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setFeaturedProducts(Array.isArray(prodRes.data.products) ? prodRes.data.products : []);
        setBanners(Array.isArray(bannerRes.data) ? bannerRes.data : []);
        // console.log('Banners:', bannerRes.data);
        // console.log('Categories:', catRes.data);
        // console.log('Products:', prodRes.data.products);
      } catch (err) {
        setCategories([]);
        setFeaturedProducts([]);
        setBanners([]);
        console.error('Error fetching data:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Banners Section */}
      {!loading && banners.length > 0 && (
        <section className="container mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {banners.map(banner => (
              <a
                key={banner._id}
                href={banner.link || "#"}
                target={banner.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={
                    banner.image.startsWith('http')
                      ? banner.image
                      : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${banner.image}`
                  }
                  alt={banner.title || "Banner"}
                  className="w-full h-40 object-cover rounded shadow"
                />
                {banner.title && (
                  <div className="mt-2 text-center font-semibold">{banner.title}</div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
<section className="container mx-auto px-4 py-8 overflow-hidden">
  <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>

  <div className="flex overflow-x-auto space-x-4 py-2 px-1 scrollbar scrollbar-thumb-green-300 scrollbar-track-transparent">
    {!loading && categories.length === 0 && (
      <div className="text-gray-500">No categories found.</div>
    )}
    
    {categories.map(cat => (
      <Link
        to={`/products?category=${encodeURIComponent(cat._id)}`}
        key={cat._id}
        className="flex-shrink-0 flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg p-4 transition group min-w-[120px] w-[120px] sm:w-[140px] text-center"
      >
        <div className="bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mb-2 group-hover:bg-green-200">
          <span className="text-xl font-bold text-green-600">
            {cat.name[0]}
          </span>
        </div>
        <span className="font-semibold text-sm text-center">{cat.name}</span>
      </Link>
    ))}
  </div>
</section>


      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No featured products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {featuredProducts.map(product => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;