import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search products..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border rounded px-3 py-2 w-full md:w-64"
  />
);

export default SearchBar;