import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import {
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconFilled,
  ShoppingCartIcon as ShoppingCartIconFilled,
} from '@heroicons/react/24/solid';
import api from '../api';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);

  const { user } = useSelector(state => state.auth);
  const items = useSelector(state => state.cart.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = useSelector(state => state.wishlist.products);
  const wishlistCount = wishlistProducts.length;
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SwiftCart Logo" className="h-10 w-auto mr-2" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/products" className="hover:text-green-600 transition">Products</Link>

          {/* Clickable Desktop Categories Dropdown */}
          <div className="relative">
            <button
              className="hover:text-green-600 transition flex items-center"
              onClick={() => setShowCatDropdown(prev => !prev)}
            >
              Categories <span className={`ml-1 transition-transform ${showCatDropdown ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showCatDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-50">
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    to={`/products?category=${cat._id}`}
                    className="block px-4 py-2 hover:bg-green-50"
                    onClick={() => setShowCatDropdown(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="hover:text-green-600 transition relative flex items-center">
            {cartCount > 0 ? (
              <ShoppingCartIconFilled className="h-6 w-6 mr-1 text-green-600" />
            ) : (
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
            )}
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="hover:text-green-600 transition relative flex items-center">
            {wishlistCount > 0 ? (
              <HeartIconFilled className="h-6 w-6 mr-1 text-pink-500" />
            ) : (
              <HeartIcon className="h-6 w-6 mr-1" />
            )}
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <Link to="/admin/dashboard" className="hover:text-green-600 transition">Admin Dashboard</Link>
          )}

          {user ? (
            <Link to="/profile" className="hover:text-green-600 transition">Profile</Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-600 transition">Login</Link>
              <Link to="/register" className="hover:text-green-600 transition">Register</Link>
            </>
          )}
        </nav>

        {/* Hamburger Menu */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={`block h-1 w-6 bg-green-600 mb-1 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-1 w-6 bg-green-600 mb-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-1 w-6 bg-green-600 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md w-full flex flex-col items-center z-50 px-4 py-4">
          <Link to="/" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Home</Link>
          <Link to="/products" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Products</Link>

          {/* Mobile Categories */}
          <div className="w-full relative text-center">
            <button
              className="py-2 w-full hover:bg-green-50 font-medium"
              onClick={() => setShowCatDropdown(prev => !prev)}
            >
              Categories
              <span className={`ml-1 inline-block transform transition-transform ${showCatDropdown ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {showCatDropdown && (
              <div className="bg-white border-t w-full">
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    to={`/products?category=${cat._id}`}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-green-50 text-left"
                    onClick={() => {
                      setShowCatDropdown(false);
                      toggleMenu();
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className="py-2 w-full text-center hover:bg-green-50 relative flex items-center justify-center" onClick={toggleMenu}>
            {cartCount > 0 ? (
              <ShoppingCartIconFilled className="h-6 w-6 mr-1 text-green-600" />
            ) : (
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
            )}
            Cart
            {cartCount > 0 && (
              <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="py-2 w-full text-center hover:bg-green-50 relative flex items-center justify-center" onClick={toggleMenu}>
            {wishlistCount > 0 ? (
              <HeartIconFilled className="h-6 w-6 mr-1 text-pink-500" />
            ) : (
              <HeartIcon className="h-6 w-6 mr-1" />
            )}
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <>
              <Link to="/admin/dashboard" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Admin Dashboard</Link>
              <Link to="/admin/products/new" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Add Product</Link>
              <Link to="/admin/categories/new" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Add Category</Link>
            </>
          )}

          {user ? (
            <Link to="/profile" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Profile</Link>
          ) : (
            <>
              <Link to="/login" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="py-2 w-full text-center hover:bg-green-50" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
