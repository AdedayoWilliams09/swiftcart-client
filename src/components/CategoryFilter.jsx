import React from 'react';

const CategoryFilter = ({ categories, selected, onChange }) => (
  <select
    value={selected}
    onChange={e => onChange(e.target.value)}
    className="border rounded px-3 py-2"
  >
    <option value="">All Categories</option>
    {categories.map(cat => (
      <option key={cat._id} value={cat._id}>{cat.name}</option>
    ))}
  </select>
);

export default CategoryFilter;