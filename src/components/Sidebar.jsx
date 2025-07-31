import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="bg-white shadow h-full p-4 w-64">
    <nav className="flex flex-col space-y-2">
      <Link to="/admin/dashboard" className="font-semibold hover:text-green-600">Dashboard</Link>
      <Link to="/admin/orders" className="hover:text-green-600">Orders</Link>
      <Link to="/admin/users" className="hover:text-green-600">Users</Link>
      <Link to="/admin/coupons" className="hover:text-green-600">Coupons</Link>
      <Link to="/admin/banners" className="hover:text-green-600">Banners</Link>
    </nav>
  </aside>
);

export default Sidebar;