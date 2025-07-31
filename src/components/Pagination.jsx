import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center mt-6">
      {[...Array(pages).keys()].map(x => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`mx-1 px-3 py-1 rounded ${page === x + 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;